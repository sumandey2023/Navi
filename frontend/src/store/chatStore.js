import { create } from "zustand";
import api from "../config/api";

const useChatStore = create((set, get) => ({
  // State
  chatHistory: [],
  currentChat: null,
  messages: [],
  isLoading: false,
  isCreatingChat: false,
  chatError: "",

  // Actions
  setChatHistory: (chats) => set({ chatHistory: chats }),

  setCurrentChat: (chat) => set({ currentChat: chat }),

  setMessages: (messages) => set({ messages }),

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  clearMessages: () => set({ messages: [] }),

  setLoading: (loading) => set({ isLoading: loading }),

  setCreatingChat: (creating) => set({ isCreatingChat: creating }),

  setChatError: (error) => set({ chatError: error }),

  clearChatError: () => set({ chatError: "" }),

  // API Actions
  fetchAllChats: async () => {
    try {
      set({ isLoading: true });
      const response = await api.get("/chat");

      const formattedChats = response.data.chats.map((chat) => ({
        id: chat._id,
        title: chat.title,
        timestamp: chat.lastActivity,
        userId: chat.user,
      }));

      set({ chatHistory: formattedChats, isLoading: false });
      return formattedChats;
    } catch (error) {
      console.error("Error fetching chats:", error);
      set({
        chatError: error.response?.data?.message || "Failed to fetch chats",
        isLoading: false,
      });
      throw error;
    }
  },

  fetchChatMessages: async (chatId) => {
    try {
      set({ isLoading: true });
      const response = await api.get(`/chat/${chatId}/messages`);

      const formattedMessages = response.data.messages.map((m) => ({
        id: m._id,
        text: m.content,
        sender: m.role === "model" ? "ai" : "user",
        timestamp: new Date(m.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));

      set({ messages: formattedMessages, isLoading: false });
      return formattedMessages;
    } catch (error) {
      console.error("Error fetching messages:", error);
      set({
        chatError: error.response?.data?.message || "Failed to fetch messages",
        isLoading: false,
      });
      throw error;
    }
  },

  createNewChat: async (title) => {
    try {
      set({ isCreatingChat: true, chatError: "" });

      const response = await api.post("/chat", { title });

      if (response.data.chat) {
        const newChat = {
          id: response.data.chat._id,
          title: response.data.chat.title,
          timestamp: "Just now",
          userId: response.data.chat.user,
        };

        // Add to chat history
        set((state) => ({
          chatHistory: [newChat, ...state.chatHistory],
          currentChat: newChat,
          messages: [],
          isCreatingChat: false,
        }));

        return newChat;
      }
    } catch (error) {
      console.error("Error creating chat:", error);
      set({
        chatError: error.response?.data?.message || "Failed to create chat",
        isCreatingChat: false,
      });
      throw error;
    }
  },

  // Utility Actions
  resetState: () =>
    set({
      chatHistory: [],
      currentChat: null,
      messages: [],
      isLoading: false,
      isCreatingChat: false,
      chatError: "",
    }),
}));

export default useChatStore;
