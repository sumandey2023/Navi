import React, { useState, useEffect, useRef } from "react";
import { Sidebar, Header, MessagesArea, InputArea } from "../components";

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { id: 1, title: "AI prompt creation", timestamp: "2 hours ago" },
    { id: 2, title: "Write prompt request", timestamp: "1 day ago" },
    { id: 3, title: "Change select color", timestamp: "3 days ago" },
    { id: 4, title: "React asset folder path", timestamp: "4 days ago" },
    { id: 5, title: "AI assistant names", timestamp: "5 days ago" },
    { id: 6, title: "Write email for user", timestamp: "6 days ago" },
    { id: 7, title: "Form code generator website", timestamp: "7 days ago" },
    { id: 8, title: "Form builder prompt", timestamp: "8 days ago" },
    { id: 9, title: "Quota exceeded error", timestamp: "9 days ago" },
    { id: 10, title: "शिव धनुष राम ने तोड़ा", timestamp: "10 days ago" },
    { id: 11, title: "Enable mouse pointer Spline", timestamp: "11 days ago" },
    { id: 12, title: "Video prompt generation", timestamp: "12 days ago" },

    {
      id: 13,
      title: "Power calculation and C++ code",
      timestamp: "13 days ago",
    },
    { id: 14, title: "Create a new chat", timestamp: "14 days ago" },
  ]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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

    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");
    setIsLoading(true);

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
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
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

  const startNewChat = () => {
    setMessages([]);
    setIsSidebarOpen(false);
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.style.height = "48px";
    }
  };

  return (
    <div className="flex h-screen bg-[#343541]">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        startNewChat={startNewChat}
        chatHistory={chatHistory}
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
    </div>
  );
};

export default Home;
