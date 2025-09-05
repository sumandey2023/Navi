import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

const RenameChatModal = ({ isOpen, onClose, chat, onRename }) => {
  const [newTitle, setNewTitle] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && chat) {
      setNewTitle(chat.title);
      // Focus input after modal opens
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 100);
    }
  }, [isOpen, chat]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTitle.trim() && newTitle.trim() !== chat.title) {
      onRename(chat.id, newTitle.trim());
    }
    onClose();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-cente  bg-opacity-50">
      <div className="bg-[#212121] border border-gray-600 rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Rename Chat</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Chat Title
            </label>
            <input
              ref={inputRef}
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full px-3 py-2 bg-[#343541] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter chat title"
              maxLength={100}
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!newTitle.trim() || newTitle.trim() === chat.title}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Rename
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RenameChatModal;
