import React from "react";
import { Plus, MessageSquare } from "lucide-react";

const NewChatButton = ({ isSidebarOpen, startNewChat }) => {
  return (
    <div
      className={`px-3 py-2 transition-all duration-500 delay-200 ${
        isSidebarOpen
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-2 lg:opacity-100 lg:translate-y-0"
      }`}
    >
      <button
        onClick={startNewChat}
        className="w-full flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-[#343541] rounded-lg transition-colors text-sm"
      >
        <Plus className="w-4 h-4" />
        <span>New chat</span>
      </button>
    </div>
  );
};

export default NewChatButton;
