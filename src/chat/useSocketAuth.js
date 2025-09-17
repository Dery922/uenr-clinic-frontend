// src/features/chat/useSocketAuth.js
import { useEffect } from 'react';
import socket from '../services/socketService';
import { useSelector } from 'react-redux';




/*
 
  1.first we get the token from redux
  2.we need to check if the token really exist 
  3. then we connect , and also emit the current user to the backend
  4. finally socket disconnect method to avoid memory leaks and keep connected 
  users accurately


*/

const useSocketAuth = () => {
  const token = useSelector((state) => state.user?.token);

  useEffect(() => {  
    if (token) {
      socket.connect();

      socket.emit('join', { token });

      socket.on('connect', () => {
        console.log('Socket connected');
      });

      socket.on('disconnect', () => {
        console.log('Socket disconnected');
      });
    }

    return () => {
      socket.disconnect();
    };
  }, [token]);
};

export default useSocketAuth;
