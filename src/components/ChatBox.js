import React, { useEffect, useRef, useState } from "react";
import socket from "../services/socketService"; // Import socket directly
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo,  } from "@fortawesome/free-solid-svg-icons";
import VideoCall from "./VideoCall";

const ChatWindow = ({
  selectedUser,
  messages,
  currentUserId,
  onSendMessage,

}) => {
  const [messageText, setMessageText] = useState("");
  const bottomRef = useRef(null);

  const [activeCall, setActiveCall] = useState(null);
  const [incomingCall, setIncomingCall] = useState(null);
  const currentUser = useSelector((state) => state.user.user);

  useEffect(() => {
    const handleIncomingCall = ({ callId, callerId }) => {
      if (selectedUser && `${callerId}` === `${selectedUser._id}`) {
        setIncomingCall({ callId, callerId });
      }
    };

    const handleCallInitiated = ({ callId }) => {
      setActiveCall({
        callId,
        otherUser: selectedUser,
        isInitiator: true,
      });
    };

    const handleCallAccepted = ({ callId }) => {
      if (activeCall?.callId === callId) {
        setIncomingCall(null);
      }
    };

    socket.on("incoming_call", handleIncomingCall);
    socket.on("call_initiated", handleCallInitiated);
    socket.on("call_accepted", handleCallAccepted);

    return () => {
      socket.off("incoming_call", handleIncomingCall);
      socket.off("call_initiated", handleCallInitiated);
      socket.off("call_accepted", handleCallAccepted);
    };
  }, [selectedUser, activeCall]);

  // Add call handlers
  const startVideoCall = () => {
    if (!selectedUser) return;
    socket.emit("initiate_call", {
      callerId: currentUser._id,
      recipientId: selectedUser._id,
    });
  };

  const acceptCall = () => {
    socket.emit("accept_call", {
      callId: incomingCall.callId,
      recipientId: currentUser._id,
    });
    setActiveCall({
      callId: incomingCall.callId,
      otherUser: selectedUser,
      isInitiator: false,
    });
    setIncomingCall(null);
  };

  const rejectCall = () => {
    socket.emit("end_call", { callId: incomingCall.callId });
    setIncomingCall(null);
  };

  const endActiveCall = () => {
    setActiveCall(null);
  };

  // Add video call button to your chat header
  {
    selectedUser && !activeCall && (
      <li className="nav-item">
        <a
          href="#"
          title="Video Call"
          onClick={(e) => {
            e.preventDefault();
            startVideoCall();
          }}
        >
          <i className="fa fa-video-camera"></i>
        </a>
      </li>
    );
  }

  // Add incoming call modal
  {
    incomingCall && (
      <div className="incoming-call-modal">
        <div className="modal-content">
          <h3>Incoming Video Call</h3>
          <p>{selectedUser.username} is calling...</p>
          <div className="call-buttons">
            <button onClick={acceptCall} className="btn btn-success">
              <i className="fa fa-video-camera mr-1"></i> Accept
            </button>
            <button onClick={rejectCall} className="btn btn-danger ml-2">
              <i className="fa fa-phone mr-1"></i> Reject
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Add these socket handlers in a useEffect

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  const handleSubmit = () => {
    const txt = messageText.trim();
    if (!txt) return;
    onSendMessage(txt); // send to parent
    setMessageText(""); // clear local input
  };

  return (
    <div className="chat-window">
        {selectedUser && !activeCall && (
  <button onClick={startVideoCall} className="video-call-btn">
    <FontAwesomeIcon icon={faVideo} /> Video Call
  </button>
)}

{incomingCall && (
  <div className="incoming-call-modal">
    <div className="modal-content">
      <h3>Incoming Video Call</h3>
      <p>{selectedUser.username} is calling...</p>
      <div className="call-buttons">
        <button onClick={acceptCall} className="accept-btn">
          Accept
        </button>
        <button onClick={rejectCall} className="reject-btn">
          Reject
        </button>
      </div>
    </div>
  </div>
)}

// Add active call display
{activeCall && (
  <VideoCall
    callId={activeCall.callId}
    otherUser={activeCall.otherUser}
    onEndCall={endActiveCall}
    isInitiator={activeCall.isInitiator}
  />
)}
      {selectedUser ? (
        <>
          <div className="fixed-header">
            <div className="navbar">
              <div className="user-details mr-auto">
                <div className="float-left user-img m-r-10">
                  <a href="profile.html" title={selectedUser.username}>
                    <img
                      src="assets/img/user.jpg"
                      alt=""
                      className="w-40 rounded-circle"
                    />
                    <span className="status online"></span>
                  </a>
                </div>
                <div className="user-info float-left">
                  <a href="profile.html">
                    <span className="font-bold">{selectedUser.username}</span>
                  </a>
                  <span className="last-seen">
                    {selectedUser.lastSeen || "Last seen recently"}
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
                   {/* Your existing chat UI */}
      {/* {selectedUser && !activeCall && (
        <div className="chat-controls">
          <button 
            onClick={startVideoCall}
            className="video-call-btn"
          >
            <i className="fa fa-video-camera"></i> Video Call
          </button>
        </div>
      )} */}
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

          <div className="chat-contents" style={{ minHeight: 300 }}>
            <div className="chat-content-wrap">
              <div className="chat-wrap-inner">
                <div className="chat-box">
                  <div className="chats">
                    {messages.map((msg, idx) => (
                      <div
                        key={`${msg._id}-${idx}`}
                        className={`chat ${
                          `${msg.senderId}` === `${currentUserId}`
                            ? "chat-right"
                            : "chat-left"
                        }`}
                      >
                        <div className="chat-body">
                          <div className="chat-bubble">
                            <div className="chat-content">
                              <p>{msg.content}</p>
                              <span className="chat-time">
                                {new Date(msg.timestamp).toLocaleTimeString(
                                  [],
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={bottomRef} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="chat-footer">
            <div className="message-bar">
              <div className="message-inner">
                <a
                  class="link attach-icon"
                  href="#"
                  data-toggle="modal"
                  data-target="#drag_files"
                >
                  <img src="assets/img/attachment.png" alt="" />
                </a>
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
                        onClick={handleSubmit}
                      >
                        <i className="fa fa-send"></i>
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="p-4 text-center text-muted">
          Select a user to start chatting
        </div>
      )}

      <div id="drag_files" class="modal fade" role="dialog">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="modal-title">Drag and drop files upload</h3>
              <button type="button" class="close" data-dismiss="modal">
                &times;
              </button>
            </div>
            <div class="modal-body">
              <form id="js-upload-form">
                <div class="upload-drop-zone" id="drop-zone">
                  <i class="fa fa-cloud-upload fa-2x"></i>{" "}
                  <span class="upload-text">Just drag and drop files here</span>
                </div>
                <h4>Uploading</h4>
                <ul class="upload-list">
                  <li class="file-list">
                    <div class="upload-wrap">
                      <div class="file-name">
                        <i class="fa fa-photo"></i> photo.png
                      </div>
                      <div class="file-size">1.07 gb</div>
                      <button type="button" class="file-close">
                        <i class="fa fa-close"></i>
                      </button>
                    </div>
                    <div class="progress progress-xs progress-striped">
                      <div
                        class="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: "65%" }}
                      ></div>
                    </div>
                    <div class="upload-process">37% done</div>
                  </li>
                  <li class="file-list">
                    <div class="upload-wrap">
                      <div class="file-name">
                        <i class="fa fa-file"></i> task.doc
                      </div>
                      <div class="file-size">5.8 kb</div>
                      <button type="button" class="file-close">
                        <i class="fa fa-close"></i>
                      </button>
                    </div>
                    <div class="progress progress-xs progress-striped">
                      <div
                        class="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: "65%" }}
                      ></div>
                    </div>
                    <div class="upload-process">37% done</div>
                  </li>
                  <li class="file-list">
                    <div class="upload-wrap">
                      <div class="file-name">
                        <i class="fa fa-photo"></i> dashboard.png
                      </div>
                      <div class="file-size">2.1 mb</div>
                      <button type="button" class="file-close">
                        <i class="fa fa-close"></i>
                      </button>
                    </div>
                    <div class="progress progress-xs progress-striped">
                      <div
                        class="progress-bar bg-success"
                        role="progressbar"
                        style={{ width: "65%" }}
                      ></div>
                    </div>
                    <div class="upload-process">Completed</div>
                  </li>
                </ul>
              </form>
              <div class="m-t-30 text-center">
                <button class="btn btn-primary submit-btn">
                  Add to upload
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {incomingCall && (
        <div className="incoming-call-modal">
          <div className="modal-content">
            <h3>Incoming Video Call</h3>
            <p>{selectedUser?.username} is calling...</p>
            <div className="call-buttons">
              <button onClick={acceptCall} className="btn btn-success">
                <i className="fa fa-video-camera mr-1"></i> Accept
              </button>
              <button onClick={rejectCall} className="btn btn-danger ml-2">
                <i className="fa fa-phone mr-1"></i> Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
