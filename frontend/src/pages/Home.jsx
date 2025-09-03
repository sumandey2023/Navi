import React, { useState, useEffect, useRef } from "react";
import { Sidebar, Header, MessagesArea, InputArea } from "../components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useChatStore } from "../store";
import { io } from "socket.io-client";
import baseUrl from "../config/baseUrl";

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [socket, setSocket] = useState(null);

  // Zustand store state
  const {
    chatHistory,
    messages,
    isLoading,
    isCreatingChat,
    chatError,
    fetchAllChats,
    createNewChat,
    setMessages,
    addMessage,
    clearMessages,
    setLoading,
    clearChatError,
  } = useChatStore();

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const tempSocket = io(baseUrl, {
      withCredentials: true,
    });

    tempSocket.on("ai-response", (message) => {
      console.log(message);
    });

    setSocket(tempSocket);
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
    // Only fetch chats if chatHistory is empty (efficient approach)
    if (chatHistory.length === 0) {
      fetchAllChats();
    }
  }, [chatHistory.length, fetchAllChats]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

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

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "That's an interesting question! Let me help you with that.",
        "I understand what you're asking. Here's my perspective on that topic.",
        "Great question! Based on what you've shared, I think...",
        "I'd be happy to help you with that. Here's what I can suggest:",
        "That's a thoughtful inquiry. From my understanding...",
        "I appreciate you asking that. Let me break this down for you.",
        "Excellent point! Here's how I see it:",
        "That's definitely worth exploring. In my view...",
      ];

      const randomResponse =
        aiResponses[Math.floor(Math.random() * aiResponses.length)];
      const aiMessage = {
        id: Date.now() + 1,
        text: `${randomResponse} This is a demo response to: "${userMessage.text}". In a real application, this would be replaced with an actual AI service response providing helpful and detailed information.`,
        sender: "ai",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      addMessage(aiMessage);
      setLoading(false);
    }, 1500);
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
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={toggleSidebar} />

        <MessagesArea
          messages={messages}
          isLoading={isLoading}
          messagesEndRef={messagesEndRef}
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
