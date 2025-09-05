import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar, Header, MessagesArea, InputArea } from "../components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useChatStore, useUserStore } from "../store";
import { io } from "socket.io-client";
import baseUrl from "../config/baseUrl";

const Home = () => {
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [socket, setSocket] = useState(null);

  // Zustand store state
  const {
    chatHistory,
    currentChat,
    messages,
    isLoading,
    isCreatingChat,
    chatError,
    fetchAllChats,
    createNewChat,
    fetchChatMessages,
    setMessages,
    addMessage,
    clearMessages,
    setLoading,
    setCurrentChat,
    clearChatError,
    renameChat,
    deleteChat,
    shareChat,
  } = useChatStore();

  // User store state
  const { user, fetchCurrentUser, isAuthenticated } = useUserStore();

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const tempSocket = io(baseUrl, {
      withCredentials: true,
    });

    tempSocket.on("ai-response", ({ content }) => {
      const aiMessage = {
        id: Date.now() + 1,
        text: content,
        sender: "ai",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      addMessage(aiMessage);
      setLoading(false);
    });

    setSocket(tempSocket);

    return () => {
      tempSocket.disconnect();
    };
  }, [addMessage, setLoading]);

  useEffect(() => {
    inputRef.current?.focus();
    // Only fetch chats if chatHistory is empty (efficient approach)
    if (chatHistory.length === 0) {
      fetchAllChats();
    }
  }, [chatHistory.length, fetchAllChats]);

  // Fetch user data on component mount if not already available
  useEffect(() => {
    if (!user && !isAuthenticated) {
      fetchCurrentUser().catch((error) => {
        console.log("User not authenticated or error fetching user:", error);
      });
    }
  }, [user, isAuthenticated, fetchCurrentUser]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    // If no current chat, create a new one
    if (!currentChat) {
      try {
        setLoading(true);
        const newChat = await createNewChat(userInput);
        if (newChat) {
          setCurrentChat(newChat);
          // Navigate to the new chat route
          navigate(`/chat/${newChat.id}`);
        }
      } catch (error) {
        console.error("Error creating new chat:", error);
        setLoading(false);
      }
      return;
    }

    const userMessage = {
      id: Date.now(),
      text: userInput,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    addMessage(userMessage);
    setUserInput("");
    setLoading(true);

    // Auto-resize textarea back to original size
    if (inputRef.current) {
      inputRef.current.style.height = "48px";
    }

    // Emit to backend via Socket.IO
    if (socket && currentChat?.id) {
      socket.emit("ai-message", {
        chat: currentChat.id,
        content: userInput,
      });
    } else {
      console.warn("No active chat or socket not connected");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);

    // Auto-resize textarea
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-[#343541]">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        chatHistory={chatHistory}
        isCreatingChat={isCreatingChat}
        chatError={chatError}
        onClosePopup={clearChatError}
        onSelectChat={async (chat) => {
          setCurrentChat(chat);
          await fetchChatMessages(chat.id);
          // Navigate to the specific chat route
          navigate(`/chat/${chat.id}`);
        }}
        onRenameChat={renameChat}
        onDeleteChat={deleteChat}
        onShareChat={shareChat}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={toggleSidebar} currentChat={currentChat} />

        <MessagesArea
          messages={messages}
          isLoading={isLoading}
          messagesEndRef={messagesEndRef}
          currentChat={currentChat}
          user={user}
        />

        <InputArea
          userInput={userInput}
          handleInputChange={handleInputChange}
          handleKeyPress={handleKeyPress}
          handleSendClick={handleSendMessage}
          isLoading={isLoading}
          inputRef={inputRef}
        />
      </div>

      {/* Toast Container for notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Home;
