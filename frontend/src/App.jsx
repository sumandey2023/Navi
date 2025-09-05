import React from "react";
import AppRoutes from "./AppRoutes";
import { ChatProvider } from "./context/ChatContext.jsx";

const App = () => {
  return (
    <ChatProvider>
      <AppRoutes />
    </ChatProvider>
  );
};

export default App;
