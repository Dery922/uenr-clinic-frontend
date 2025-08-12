import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import socket from "../../services/socketService";
import ChatSidebar from "../../components/ChatSidebar";

const MessageEmployee = () => {
  const [selectedUser, setSelectedUser] = useState(null); // user you're chatting with
  const [messages, setMessages] = useState([]); // chat history
  const [messageText, setMessageText] = useState(""); // text input
  const [allUsers, setAllUsers] = useState([]);

  const currentUser = useSelector((state) => state.user.user);
  const currentUserToken = useSelector((state) => state.user.token);

  // Handle receiving messages via socket
// Update your receive_message handler
useEffect(() => {
  if (!socket) return;

  const handleReceiveMessage = (msg) => {
    setMessages((prev) => {
      // Replace temp message with saved message if exists
      const existingTempIndex = prev.findIndex(m => 
        m.isTemp && m.content === msg.content && m.senderId === msg.senderId
      );
      
      if (existingTempIndex >= 0) {
        const newMessages = [...prev];
        newMessages[existingTempIndex] = msg;
        return newMessages;
      }
      
      // Add new message if not already present
      if (!prev.some(m => m._id === msg._id)) {
        return [...prev, msg];
      }
      
      return prev;
    });
  };

  socket.on("receive_message", handleReceiveMessage);
  socket.on("message_error", (error) => {
    console.error("Message error:", error);
    // Optionally show error to user
  });

  return () => {
    socket.off("receive_message", handleReceiveMessage);
    socket.off("message_error");
  };
}, [selectedUser]);



useEffect(() => {
  const lastSelectedUser = localStorage.getItem("selectedUser");
  if (currentUser && lastSelectedUser) {
    const parsedUser = JSON.parse(lastSelectedUser);
    setSelectedUser(parsedUser);
    fetchMessages(parsedUser._id || parsedUser.id); // make sure this runs immediately
  }
}, [currentUser]);

  


  useEffect(() => {
    if (currentUser && currentUserToken) {
      if (!socket.connected) {
        socket.connect(); // ✅ CONNECT!
      }
      socket.emit("join", { token: currentUserToken });
    }
  }, [currentUser, currentUserToken]);



  // const [activeChatUser, setActiveChatUser] = useState(null);


  // Fetch chat history when a user is selected
  const fetchMessages = async (chatUserId) => {
    if (!currentUser || !chatUserId) return;
  
    try {
      const res = await axios.get(
        `/api/messages/${currentUser.id}/${chatUserId}`
      );
      
      // Merge with any optimistic messages that haven't been confirmed
      setMessages(prev => {
        const serverMessages = res.data;
        const localMessages = prev.filter(m => m.isTemp);
        
        // Combine and deduplicate
        const combined = [...serverMessages];
        
        localMessages.forEach(localMsg => {
          if (!serverMessages.some(serverMsg => 
            serverMsg.content === localMsg.content && 
            serverMsg.senderId === localMsg.senderId
          )) {
            combined.push(localMsg);
          }
        });
        
        return combined;
      });
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    }
  };
  

  useEffect(() => {
    if (selectedUser && currentUser) {
      fetchMessages(selectedUser._id || selectedUser.id);
    }
  }, [selectedUser, currentUser]);
  

  const filteredMessages = React.useMemo(() => {
    if (!selectedUser) return [];
    return messages.filter(
      (msg) =>
        (msg.senderId === currentUser.id && msg.receiverId === selectedUser.id) ||
        (msg.senderId === selectedUser.id && msg.receiverId === currentUser.id)
    );
  }, [messages, selectedUser, currentUser.id]);
  
  const handleNewMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };
  

  // Send message
  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedUser) return;
  
    const tempId = Date.now(); // Temporary ID for local display
  
    const newMessage = {
      _id: tempId,
      senderId: currentUser.id,
      receiverId: selectedUser._id || selectedUser.id,
      content: messageText.trim(),
      timestamp: new Date().toISOString(),
      isTemp: true // Mark as temporary
    };
  
    // Optimistically update UI
    setMessages((prev) => [...prev, newMessage]);
    setMessageText("");
  
    // Emit to server
    socket.emit("send_message", {
      senderId: currentUser.id,
      receiverId: selectedUser._id || selectedUser.id,
      content: messageText.trim()
    });
  };


    // When user is selected from sidebar
    const handleUserSelect = async (user) => {
      setSelectedUser(user);
      try {
        const res = await fetch(`/api/messages/${user.id}`);
        const history = await res.json();
        setMessages((prev) => {
          // Merge old + new without duplicates
          const merged = [...prev, ...history];
          return merged.filter(
            (msg, index, self) =>
              index === self.findIndex((m) => m.id === msg.id) // remove dupes
          );
        });
      } catch (error) {
        console.error("Error fetching messages", error);
      }
    };
    
    // When a new message is received or sent


  return (
    <div className="main-wrapper">
      <ChatSidebar onSelectUser={handleUserSelect} />
      <div className="page-wrapper">
        <div className="chat-main-row">
          <div className="chat-main-wrapper">
            <div className="col-lg-9 message-view chat-view">
              <div className="chat-window"
    
              >
                {selectedUser && (
                  <div class="fixed-header">
                    <div class="navbar">
                      <div class="user-details mr-auto">
                        <div class="float-left user-img m-r-10">
                          <a href="profile.html" title="Jennifer Robinson">
                            <img
                              src="assets/img/user.jpg"
                              alt=""
                              class="w-40 rounded-circle"
                            />
                            <span class="status online"></span>
                          </a>
                        </div>
                        <div class="user-info float-left">
                          <a href="profile.html">
                            <span class="font-bold"> {selectedUser ? selectedUser.username : "Select a user"}</span>
                            {/* <i class="typing-text">Typing...</i> */}
                          </a>
                          <span class="last-seen">
                          {selectedUser ? `Last seen ${selectedUser.lastSeen}` : ""}
                          </span>
                        </div>
                      </div>
                      <div class="search-box">
                        <div class="input-group input-group-sm">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Search"
                          />
                          <span class="input-group-append">
                            <button class="btn" type="button">
                              <i class="fa fa-search"></i>
                            </button>
                          </span>
                        </div>
                      </div>
                      <ul class="nav custom-menu">
                        <li class="nav-item">
                          <a
                            href="#chat_sidebar"
                            class="nav-link task-chat profile-rightbar float-right"
                            id="task_chat"
                          >
                            <i class="fa fa-user"></i>
                          </a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="voice-call.html">
                            <i class="fa fa-phone"></i>
                          </a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="video-call.html">
                            <i class="fa fa-video-camera"></i>
                          </a>
                        </li> 
                        <li class="nav-item dropdown dropdown-action">
                          <a
                            href="#"
                            class="nav-link dropdown-toggle"
                            data-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i class="fa fa-cog"></i>
                          </a>
                          <div class="dropdown-menu dropdown-menu-right">
                            <a class="dropdown-item" href="javascript:void(0)">
                              Delete Conversations
                            </a>
                            <a class="dropdown-item" href="javascript:void(0)">
                              Settings
                            </a>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                <div className="chat-contents">
                  <div className="chat-content-wrap">
                    <div className="chat-wrap-inner">
                      <div className="chat-box">
                        <div className="chats">
                          {messages.map((msg, idx) => (
                            <div
                              key={idx}
                              className={`chat ${
                                `${msg.senderId}` === `${currentUser.id}`

                                  ? "chat-right"
                                  : "chat-left"
                              }`}
                            >
                              <div className="chat-body">
                                <div className="chat-bubble">
                                  <div className="chat-content">
                                    <p>{msg.content}</p>
                                    <span className="chat-time">
                                      {new Date(
                                        msg.timestamp
                                      ).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedUser && (
                  <div className="chat-footer">
                    <div className="message-bar">
                      <div className="message-inner">
                        <div className="message-area">
                          <div className="input-group">
                            <textarea
                              className="form-control"
                              placeholder="Type message..."
                              value={messageText}
                              onChange={(e) => setMessageText(e.target.value)}
                            />
                            <span className="input-group-append">
                              <button
                                className="btn btn-primary"
                                type="button"
                                onClick={handleSendMessage}
                              >
                                <i className="fa fa-send"></i>
                              </button>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div
              className="col-lg-3 message-view chat-profile-view chat-sidebar"
              id="chat_sidebar"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageEmployee;
