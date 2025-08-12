// src/services/socketService.js
import { io } from 'socket.io-client';

// const socket = io('http://localhost:8080', {
//   autoConnect: true, // Automatically connect
//   reconnection: true, // Enable reconnection
//   reconnectionAttempts: 5, // Number of reconnection attempts
//   reconnectionDelay: 1000, // Delay between reconnection attempts
// });

const URL = 'http://localhost:8080';
const socket = io(URL, {
 
  transports: ['websocket'],
})

export default socket;