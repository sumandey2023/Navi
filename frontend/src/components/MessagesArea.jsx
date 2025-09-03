import React from "react";
import Message from "./Message";
import WelcomeScreen from "./WelcomeScreen";
import LoadingMessage from "./LoadingMessage";

const MessagesArea = ({
  messages,
  isLoading,
  messagesEndRef,
  currentChat,
  user,
}) => {
  return (
    <div className="flex-1 overflow-y-auto bg-[#212121]">
      {currentChat && (
        <div className="sticky top-0 z-10 bg-[#212121] px-4 py-2">
          <h2 className="text-center text-gray-300 text-sm font-medium">
            {currentChat.title}
          </h2>
        </div>
      )}
      <div className="py-4 space-y-4">
        {messages.length === 0 ? (
          <WelcomeScreen />
        ) : (
          messages.map((message) => (
            <Message key={message.id} message={message} user={user} />
          ))
        )}

        {isLoading && <LoadingMessage />}
      </div>

      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessagesArea;
