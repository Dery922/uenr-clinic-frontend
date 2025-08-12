// src/reducers/chatReducer.js
const initialState = {
    onlineUsers: [],
    selectedUser: null,
  };
  
  const chatReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_ONLINE_USERS':
        return { ...state, onlineUsers: action.payload };
      case 'SET_SELECTED_USER':
        return { ...state, selectedUser: action.payload };
      default:
        return state;
    }
  };
  
  export default chatReducer;
  