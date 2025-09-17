// src/services/socketService.js
import { io } from 'socket.io-client';

/* 
This part perform two functions 
  1. connect the frontend to the backend
  2. ensure we use websocket directly not fallback polling
  3. export this instance onces ensure we dont use multiple connection.
  4. Global control: we can connect(), disconnect(), emit(), 
  or on() from anywhere in the app using this one socket.

*/
const URL = 'http://localhost:8080';
const socket = io(URL, {
 
  transports: ['websocket'],
})

export default socket;