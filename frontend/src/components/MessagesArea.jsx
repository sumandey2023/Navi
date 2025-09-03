import React from "react";
import Message from "./Message";
import WelcomeScreen from "./WelcomeScreen";
import LoadingMessage from "./LoadingMessage";

const MessagesArea = ({ messages, isLoading, messagesEndRef, currentChat }) => {
  return (
    <div className="flex-1 overflow-y-auto bg-[#212121] p-4 space-y-6">
      {currentChat && (
        <div className="sticky top-0 z-10 bg-[#212121] py-1">
          <h2 className="text-center text-gray-300 text-sm font-medium">
            {currentChat.title}
          </h2>
        </div>
      )}
      {messages.length === 0 ? (
        <WelcomeScreen />
      ) : (
        messages.map((message) => (
          <Message key={message.id} message={message} />
        ))
      )}

      {isLoading && <LoadingMessage />}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessagesArea;
