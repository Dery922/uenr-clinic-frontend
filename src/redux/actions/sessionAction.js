// actions.js (or inside same file if you want)

import { CLEAR_SESSION,SET_SESSION,END_SESSION,SET_ACTIVE_SESSIONS } from "./sessionTypes";
// actions/sessionActions.js
import axios from "axios";
// sessionActions.js
// import { SET_SESSION, CLEAR_SESSION } from "./sessionTypes";



export const setSession = (session) => {
  return {
    type: SET_SESSION,
    payload: session,
  };
};

export const clearSession = () => {
  return {
    type: CLEAR_SESSION,
  };
};

// set all active sessions
export const setActiveSessions = (sessions) => ({
  type: SET_ACTIVE_SESSIONS,
  payload: sessions,
});

// end a specific session
export const endSession = (sessionId) => ({
  type: END_SESSION,
  payload: sessionId,
});

// End/close session
export const closeSession = (sessionId) => ({
  type: "CLOSE_SESSION",
  payload: sessionId,
});



// export const closeSession = (id) => async (dispatch) => {
//   try {
//     const res = await axios.put(`http://localhost:8080/sessions/${id}/close`);
//     dispatch({ type: "CLOSE_SESSION", payload: res.data });
//   } catch (err) {
//     console.error("Failed to close session", err);
//   }
// };

