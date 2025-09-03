import React from "react";
import { Mic, Send, Plus } from "lucide-react";

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
          <div className="flex items-center bg-[#40414f] rounded-xl px-4 py-3">
            {/* Plus icon on the left */}
            <button className="mr-3 text-gray-400 hover:text-gray-300 transition-colors">
              <Plus className="w-5 h-5" />
            </button>

            {/* Input field */}
            <textarea
              ref={inputRef}
              value={userInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              placeholder="Ask anything"
              className="flex-1 bg-transparent text-white placeholder-gray-400 resize-none focus:outline-none text-sm"
              rows="1"
              style={{ minHeight: "24px", maxHeight: "120px" }}
              disabled={isLoading}
            />

            {/* Right side buttons */}
            <div className="flex items-center gap-2 ml-3">
              <button className="p-2 text-gray-400 hover:text-gray-300 hover:bg-[#40414f] rounded-lg transition-colors">
                <Mic className="w-4 h-4" />
              </button>
              <button
                onClick={handleSendClick}
                disabled={isLoading || !userInput.trim()}
                className="p-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-3 text-center">
          <p className="text-xs text-gray-500">
            ChatGPT can make mistakes. Check{" "}
            <span className="underline cursor-pointer">important info.</span>{" "}
            See{" "}
            <span className="underline cursor-pointer">
              Cookie Preferences.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default InputArea;
