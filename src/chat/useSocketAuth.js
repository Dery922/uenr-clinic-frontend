// src/features/chat/useSocketAuth.js
import { useEffect } from 'react';
import socket from '../services/socketService';
import { useSelector } from 'react-redux';

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
