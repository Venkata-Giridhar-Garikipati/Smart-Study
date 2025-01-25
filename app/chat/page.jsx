// app/chat/page.jsx
"use client";
import ChatBox from "@/components/ChatBox";
import React from "react";

const ChatPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <ChatBox />
    </div>
  );
};

export default ChatPage;