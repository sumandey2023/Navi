import React, { useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import { useChatStore } from "../store";

const NewChatPopup = ({ isOpen, onClose, onSubmit, isLoading, error }) => {
  const [chatTitle, setChatTitle] = useState("");
  const { createNewChat } = useChatStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (chatTitle.trim()) {
      try {
        await onSubmit(chatTitle.trim());
        setChatTitle("");
        handleClose();
      } catch (error) {
        console.error("Error creating chat:", error);
        // Error is already handled by the parent component
      }
    }
  };

  const handleClose = () => {
    setChatTitle("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 
    bg-white/10 backdrop-blur-md border-white/20 shadow-lg"
    >
      <div className="bg-[#181818] border-gray-600 rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Create New Chat</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="chatTitle"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Chat Title
            </label>
            <input
              type="text"
              id="chatTitle"
              value={chatTitle}
              onChange={(e) => setChatTitle(e.target.value)}
              placeholder="Enter chat title..."
              className="w-full px-3 py-2 bg-[#40414f] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              autoFocus
              required
            />
            {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="p-2 flex-1 text-gray-300 border bg-red-500 border-gray-600 rounded-lg hover:bg-red-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!chatTitle.trim() || isLoading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewChatPopup;
