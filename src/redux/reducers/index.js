import { useReducer } from "react";
import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import chatReducer from "./chatReducer";


//normally this was suppose to be redux store but ended up here
const rootReducer = combineReducers({
    user : userReducer,
    chat : chatReducer,
});


export default rootReducer;