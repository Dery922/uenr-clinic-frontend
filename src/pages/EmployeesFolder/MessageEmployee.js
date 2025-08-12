import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import socket from "../../services/socketService";
import ChatSidebar from "../../components/ChatSidebar";
import ChatWindow from "../../components/ChatBox";

// Storage keys with versioning to handle future migrations
const STORAGE_KEYS = {
  MESSAGES: 'chat_app_messages_v3',
  SELECTED_USER: 'chat_app_selected_user_v3'
};

const MessageEmployee = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const currentUser = useSelector((state) => state.user.user);
  const currentUserToken = useSelector((state) => state.user.token);

  // Helper to normalize user IDs
  const getId = (user) => {
    if (!user) return null;
    return user._id?.toString() || user.id?.toString();
  };

  const currentUserId = getId(currentUser);
  const selectedUserId = getId(selectedUser);

  // --- Storage Utilities ---
  const saveMessagesToStorage = (msgs) => {
    try {
      // Store only the last 100 messages per conversation
      const conversations = msgs.reduce((acc, msg) => {
        const key = [msg.senderId, msg.receiverId].sort().join('_');
        if (!acc[key]) acc[key] = [];
        acc[key].push(msg);
        return acc;
      }, {});

      const toSave = Object.values(conversations)
        .flatMap(convo => convo.slice(-100))
        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(toSave));
    } catch (e) {
      console.warn("Message storage failed:", e);
    }
  };

  const loadMessagesFromStorage = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  };

  // --- Socket Message Handling ---
  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (msg) => {
      setMessages(prev => {
        // Update existing temp message or add new one
        const existingIndex = prev.findIndex(m => 
          (m.isTemp && m.content === msg.content && m.senderId === msg.senderId) ||
          m._id === msg._id
        );

        const newMessages = existingIndex >= 0
          ? [...prev.slice(0, existingIndex), msg, ...prev.slice(existingIndex + 1)]
          : [...prev, msg];

        saveMessagesToStorage(newMessages);
        return newMessages;
      });
    };

    const handleInitialHistory = (history) => {
      setMessages(prev => {
        const existingIds = new Set(prev.map(m => m._id));
        const newMessages = history.filter(msg => !existingIds.has(msg._id));
        const combined = [...prev, ...newMessages];
        saveMessagesToStorage(combined);
        return combined;
      });
    };

    socket.on("receive_message", handleReceiveMessage);
    socket.on("initial_history", handleInitialHistory);
    socket.on("message_error", console.error);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
      socket.off("initial_history", handleInitialHistory);
      socket.off("message_error");
    };
  }, []);

  // --- Socket Connection Management ---
  useEffect(() => {
    if (currentUser && currentUserToken) {
      if (!socket.connected) socket.connect();
      socket.emit("join", { token: currentUserToken });
    }

    const handleReconnect = () => {
      if (selectedUser) fetchMessagesForUser(selectedUser);
    };

    socket.on("reconnect", handleReconnect);
    return () => socket.off("reconnect", handleReconnect);
  }, [currentUser, currentUserToken, selectedUser]);

  // --- Initial Data Load ---
  useEffect(() => {
    // Load from storage immediately
    const savedMessages = loadMessagesFromStorage();
    if (savedMessages.length) setMessages(savedMessages);

    // Load last selected user
    const lastUser = localStorage.getItem(STORAGE_KEYS.SELECTED_USER);
    if (lastUser) {
      try {
        const user = JSON.parse(lastUser);
        setSelectedUser(user);
        fetchMessagesForUser(user);
      } catch (e) {
        localStorage.removeItem(STORAGE_KEYS.SELECTED_USER);
      }
    }
  }, [currentUser]);

  // --- Message Fetching ---
  const fetchMessagesForUser = async (user) => {
    const chatUserId = getId(user);
    if (!currentUserId || !chatUserId) return;

    try {
      // Add loading indicator
      setMessages(prev => [...prev, {
        _id: `loading-${Date.now()}`,
        isLoading: true,
        senderId: currentUserId,
        receiverId: chatUserId
      }]);

      const res = await axios.get(`/api/messages/${currentUserId}/${chatUserId}`);
      const serverMessages = res.data || [];

      setMessages(prev => {
        // Remove loading indicator
        const base = prev.filter(m => !m.isLoading);
        
        // Filter existing messages for this conversation
        const existing = base.filter(m => 
          (`${m.senderId}` === `${currentUserId}` && `${m.receiverId}` === `${chatUserId}`) ||
          (`${m.senderId}` === `${chatUserId}` && `${m.receiverId}` === `${currentUserId}`)
        );

        // Merge with server messages
        const merged = [...serverMessages];
        existing.forEach(msg => {
          if (!serverMessages.some(m => m._id === msg._id)) {
            merged.push(msg);
          }
        });

        // Preserve other conversations
        const otherConversations = base.filter(m => 
          !(
            (`${m.senderId}` === `${currentUserId}` && `${m.receiverId}` === `${chatUserId}`) ||
            (`${m.senderId}` === `${chatUserId}` && `${m.receiverId}` === `${currentUserId}`)
          )
        );

        const result = [...otherConversations, ...merged];
        saveMessagesToStorage(result);
        return result;
      });
    } catch (err) {
      console.error("Failed to fetch messages:", err);
      setMessages(prev => prev.filter(m => !m.isLoading));
    }
  };

  // --- Selected User Management ---
  useEffect(() => {
    if (selectedUser) {
      localStorage.setItem(STORAGE_KEYS.SELECTED_USER, JSON.stringify(selectedUser));
      fetchMessagesForUser(selectedUser);
    }
  }, [selectedUser]);

  // --- Filter Messages for Current Conversation ---
  const filteredMessages = useMemo(() => {
    if (!selectedUserId || !currentUserId) return [];
    return messages
      .filter(msg => 
        (`${msg.senderId}` === `${currentUserId}` && `${msg.receiverId}` === `${selectedUserId}`) ||
        (`${msg.senderId}` === `${selectedUserId}` && `${msg.receiverId}` === `${currentUserId}`)
      )
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  }, [messages, selectedUserId, currentUserId]);

  // --- User Selection Handler ---
  const handleUserSelect = (user) => {
    if (!user || `${getId(user)}` === `${selectedUserId}`) return;
    setSelectedUser(user);
  };

  // --- Message Sending ---
  const handleSendMessage = (text) => {
    const content = text.trim();
    if (!content || !selectedUserId || !currentUserId) return;

    const tempMsg = {
      _id: `temp-${Date.now()}`,
      senderId: currentUserId,
      receiverId: selectedUserId,
      content,
      timestamp: new Date().toISOString(),
      isTemp: true
    };

    setMessages(prev => {
      const updated = [...prev, tempMsg];
      saveMessagesToStorage(updated);
      return updated;
    });

    socket.emit("send_message", {
      senderId: currentUserId,
      receiverId: selectedUserId,
      content
    });
  };

  return (
    <div className="main-wrapper">
      <ChatSidebar onSelectUser={handleUserSelect} />
      <div className="page-wrapper">
        <div className="chat-main-row">
          <div className="chat-main-wrapper">
            <div className="col-lg-9 message-view chat-view">
              <ChatWindow
                selectedUser={selectedUser}
                messages={filteredMessages}
                currentUserId={currentUserId}
                onSendMessage={handleSendMessage}
                currentUser={currentUser} 
              />
            </div>
            <div className="col-lg-3 message-view chat-profile-view chat-sidebar" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageEmployee;