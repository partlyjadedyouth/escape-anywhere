"use client";

import React, { useState, useEffect } from "react";

interface ChatMessage {
  sender: string;
  message: string;
  timestamp: Date;
}

export function Game() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      sender: "user",
      message: input.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

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
    } catch (error) {
      console.error("Failed to send message", error);
    } finally {
      setInput("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-end h-screen bg-transparent text-white w-full px-4">
      <div
        className="w-full h-64 p-4 mb-4 overflow-auto"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
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
      <form onSubmit={sendMessage} className="w-full flex justify-between">
        <input
          className="w-full h-10 p-4 mb-4"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", color: "white" }}
        />
        <button
          className="w-40 py-2 px-4 bg-transparent hover:underline focus:outline-none"
          type="submit"
        >
          전송
        </button>
      </form>
    </div>
  );
}
