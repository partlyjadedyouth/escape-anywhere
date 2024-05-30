// app/chat/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  saveMessageToFirestore,
  loadMessagesFromFirestore,
} from "@/lib/utils/firestoreUtils";

interface ChatMessage {
  sender: string;
  message: string;
  timestamp: Date;
}

const ChatPage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      const messagesFromFirestore = await loadMessagesFromFirestore();
      setMessages(messagesFromFirestore);
    };

    fetchMessages();
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      sender: "user",
      message: input.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    await saveMessageToFirestore(userMessage.message, userMessage.sender);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: input.trim() }],
        }),
      });
      const data = await response.json();
      const botMessage: ChatMessage = {
        sender: "bot",
        message: data.message,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      await saveMessageToFirestore(botMessage.message, botMessage.sender);
    } catch (error) {
      console.error("Failed to send message", error);
    } finally {
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-screen p-4">
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded my-2 ${
              msg.sender === "user"
                ? "bg-blue-200 self-end"
                : "bg-gray-200 self-start"
            }`}
          >
            {msg.message}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded"
        />
        <button
          onClick={sendMessage}
          className="p-2 ml-2 bg-blue-500 text-white rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
