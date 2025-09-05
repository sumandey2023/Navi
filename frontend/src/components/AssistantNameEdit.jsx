import React, { useState, useRef, useEffect } from "react";
import { useUserStore } from "../store";
import { Bot } from "lucide-react";

const AssistantNameEdit = ({ onComplete }) => {
  const [editedName, setEditedName] = useState("Aria");
  const inputRef = useRef(null);
  const { user, fetchCurrentUser } = useUserStore();

  useEffect(() => {
    if (user?.aiAssistantName) {
      setEditedName(user.aiAssistantName);
    }
  }, [user]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editedName.trim()) {
      try {
        const response = await fetch("/api/auth/give-ai-assistant-name", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ aiAssistantName: editedName.trim() }),
          credentials: "include",
        });

        if (response.ok) {
          await fetchCurrentUser(); // Refresh user data
          if (onComplete) onComplete();
        } else {
          throw new Error("Failed to update assistant name");
        }
      } catch (error) {
        console.error("Error updating assistant name:", error);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onComplete();
      setEditedName(user?.aiAssistantName || "Aria");
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8 flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
          <Bot className="w-6 h-6 text-blue-500" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white mb-1">
            Change Assistant Name
          </h2>
          <p className="text-sm text-gray-400">
            Customize your AI assistant's identity
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="assistantName"
            className="block text-sm font-medium text-gray-300"
          >
            Assistant Name
          </label>
          <div className="relative">
            <input
              ref={inputRef}
              id="assistantName"
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-4 py-3 bg-[#40414f] rounded-xl border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none text-white placeholder-gray-400 transition-all text-lg"
              placeholder="Enter a name for your assistant"
              autoFocus
              maxLength={30}
            />
            <div className="absolute right-4 top-3.5 text-gray-400 text-sm">
              {editedName.length}/30
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            This name will be displayed in your conversations with the AI
            assistant
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t border-gray-700/50">
          <button
            type="button"
            onClick={onComplete}
            className="px-4 py-2.5 text-gray-300 hover:text-white hover:bg-[#40414f] rounded-lg transition-colors text-sm font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#2a2b32] disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
            disabled={
              !editedName.trim() || editedName.trim() === user?.aiAssistantName
            }
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssistantNameEdit;
