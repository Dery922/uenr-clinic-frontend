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
<<<<<<< HEAD

const socket = io( "http://localhost:8080" ||process.env.REACT_APP_API_URL , {
  withCredentials: true,
  transports: ["websocket"],
});
=======
const socket = io(process.env.REACT_APP_API_URL ,
 {
 
  transports: ['websocket'],
})
>>>>>>> b89360a296e2e4f3149a886b8fc83e0f2768029b

export default socket;
