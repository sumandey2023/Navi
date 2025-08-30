import React from "react";
import Message from "./Message";
import WelcomeScreen from "./WelcomeScreen";
import LoadingMessage from "./LoadingMessage";

const MessagesArea = ({ messages, isLoading, messagesEndRef }) => {
  return (
    <div className="flex-1 overflow-y-auto bg-[#212121] p-4 space-y-6">
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
