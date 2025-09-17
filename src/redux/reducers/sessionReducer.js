// sessionReducer.js

import {
  SET_SESSION,
  CLEAR_SESSION,
  SET_ACTIVE_SESSIONS,
  END_SESSION,
} from "../actions/sessionTypes";

const initialState = {
  currentSession: null, // will hold patient session object
  activeSession: [],
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SESSION:
      return {
        ...state,
        currentSession: action.payload,
      };
      case "CLOSE_SESSION":
        return {
          ...state,
          activeSession: state.activeSession.filter(
            (session) => session._id !== action.payload
          ),
          currentSession:
            state.currentSession?._id === action.payload ? null : state.currentSession,
        };
    case CLEAR_SESSION:
      return {
        ...state,
        currentSession: null,
      };
    case SET_ACTIVE_SESSIONS:
      return {
        ...state,
        activeSession: action.payload,
      };
    case END_SESSION:
      return {
        ...state,
        activeSession: state.activeSession.filter(
          (s) => s._id !== action.payload
        ),
        // also clear if it was the current session
        currentSession:
          state.currentSession?._id === action.payload
            ? null
            : state.currentSession,
      };
    default:
      return state;
  }
};

export default sessionReducer;
