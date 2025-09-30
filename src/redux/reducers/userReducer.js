import Cookies from "js-cookie";

let savedUser = null;
// let savedToken = null;

try {
  const rawUser = Cookies.get("user");
  if (rawUser) savedUser = JSON.parse(rawUser);
  savedToken = Cookies.get("token") || null;
} catch (err) {
  console.error("Failed to load cookies", err);
}

const savedToken = Cookies.get("token") || null;

// If you also want to persist sessionId in cookies:
const savedSessionId = Cookies.get("sessionId") || null;

const initialState = {
  user: savedUser,
  token: savedToken,
};

export function userReducer(state = initialState, action) {


  switch (action.type) {
    case "LOGIN":
      Cookies.set("user", JSON.stringify(action.payload.user));
      Cookies.set("token", action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };

    case "LOGOUT":
      Cookies.remove("user");
      Cookies.remove("token");
      Cookies.remove("sessionId");
      return {
        user: null,
        token: null,
        currentSessionId: null,
      };

    default:
      return state;
  }
}
