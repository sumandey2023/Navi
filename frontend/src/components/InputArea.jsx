import React from "react";
import { Mic, BarChart3 } from "lucide-react";

const InputArea = ({
  userInput,
  handleInputChange,
  handleKeyPress,
  handleSendClick,
  isLoading,
  inputRef,
}) => {
  return (
    <div className="bg-[#212121] p-4">
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          <textarea
            ref={inputRef}
            value={userInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            placeholder="+ Ask anything"
            className="w-full px-4 py-3 pr-20 bg-[#40414f] text-white placeholder-gray-400 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-sm"
            rows="1"
            style={{ minHeight: "48px", maxHeight: "120px" }}
            disabled={isLoading}
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-gray-300 hover:bg-[#40414f] rounded-lg transition-colors">
              <Mic className="w-4 h-4" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-300 hover:bg-[#40414f] rounded-lg transition-colors">
              <BarChart3 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-3 text-center">
          <p className="text-xs text-gray-500">
            ChatGPT can make mistakes. Check important info. See Cookie
            Preferences.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InputArea;
