import React from "react";
import { MoreVertical } from "lucide-react";

const ChatHistory = ({ isSidebarOpen, chatHistory }) => {
  return (
    <div
      className={`flex-1 overflow-y-auto transition-all duration-500 delay-300 ${
        isSidebarOpen
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-2 lg:opacity-100 lg:translate-y-0"
      }`}
    >
      <div className="px-3 py-2">
        <div className="mb-2 px-3 py-2">
          <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider">
            Chats
          </h3>
        </div>
        <div className="space-y-1">
          {chatHistory.map((chat) => (
            <div
              key={chat.id}
              className="group flex items-center justify-between px-3 py-2 text-gray-300 hover:bg-[#343541] cursor-pointer rounded-lg transition-colors"
              onClick={() => {
                console.log(chat);
              }}
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm truncate">{chat.title}</p>
              </div>
              <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-[#40414f] rounded transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatHistory;
