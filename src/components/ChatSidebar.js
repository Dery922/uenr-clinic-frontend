import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../services/socketService";
import Cookies from "js-cookie";

const ChatSidebar = ({ onSelectUser }) => {
  const [onlineUserIds, setOnlineUserIds] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const currentUser = useSelector((state) => state.user.user);


  useEffect(() => {
    // ✅ 1. Register user on connect (with token)
    socket.on("connect", () => {
      const token = Cookies.get("token");
      if (token) {
        socket.emit("join", { token });
        console.log("🔗 Sent join with token");
      }
    });

    // ✅ 2. Listen for updated online users
    socket.on("online_users", (ids) => {
      setOnlineUserIds(ids);
    });

    // ✅ 3. Fetch all users from backend
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}` || "http://localhost:8080/api/online-users");
         
        const data = await res.json();
        setAllUsers(data);
      } catch (err) {
        console.error("❌ Failed to fetch users", err);
      }
    };

    fetchUsers();

    if (!socket.connected) {
      socket.connect();
    }

    return () => {
      socket.off("connect");
      socket.off("online_users");
    };
  }, [currentUser?._id]);

  return (
    <div className="sidebar" id="sidebar">
      <div className="sidebar-inner slimscroll">
        <div className="sidebar-menu">
          <ul>
            <li>
              <Link to="/">
                <i className="fa fa-home back-icon"></i>{" "}
                <span>Back to Home</span>
              </Link>
            </li>
            {/* <li className="menu-title">
              Chat Groups{" "}
              <a
                href="#"
                className="add-user-icon"
                data-toggle="modal"
                data-target="#add_group"
              >
                <i className="fa fa-plus"></i>
              </a>
            </li> */}
            <li>
              <a href="chat.html">#General</a>
            </li>
            {/* <li className="menu-title">
              Direct Chats{" "}
              <a
                href="#"
                className="add-user-icon"
                data-toggle="modal"
                data-target="#add_chat_user"
              >
                <i className="fa fa-plus"></i>
              </a>
            </li> */}

            {/* Show all users with online/offline status */}
            <li className="menu-title">
              Direct Chats{" "}
              <a
                href="#"
                className="add-user-icon"
                data-toggle="modal"
                data-target="#add_chat_user"
              >
                <i className="fa fa-plus"></i>
              </a>
            </li>
            {allUsers
              .filter(
                (user) =>
                  onlineUserIds.includes(user._id) &&
                  user._id !== currentUser._id
              )
              .map((user) => (
                <li key={user._id}>
                  <a
                    onClick={() => onSelectUser(user)}
                  >
                    <span className="chat-avatar-sm user-img">
                      <img
                        src="assets/img/user.jpg"
                        alt=""
                        className="rounded-circle"
                      />
                      <span className="status online"></span>
                    </span>
                    {user.username}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
