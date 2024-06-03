"use client";

import { useState, useEffect } from "react";

interface ChatMessage {
  sender: string;
  message: string;
  timestamp: Date;
}

export default function Game() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>("");
  const [activateInput, setActivateInput] = useState<boolean>(false);

  useEffect(() => {
    // Function to send the initial message
    const sendInitialMessage = async () => {
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [], // No previous messages, just the system prompt
          }),
        });

        const data = await response.json();
        const initialBotMessage: ChatMessage = {
          sender: "bot",
          message: data.message,
          timestamp: new Date(),
        };

        setMessages([initialBotMessage]);

        console.log(messages);
      } catch (error) {
        console.error("Failed to send initial message", error);
      }
    };

    sendInitialMessage();
  }, []);

  const handleSendMessage = async () => {
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

      console.log(messages);
    } catch (error) {
      console.error("Failed to send message", error);
    } finally {
      setInput("");
    }
  };

  const getLastBotMessage = () => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].sender === "bot") {
        return messages[i];
      }
    }
    return null;
  };

  return (
    <div className="flex flex-col items-center justify-end h-screen bg-transparent text-white w-full px-4">
      <div
        className="w-full h-64 p-4 mb-4 overflow-auto"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        {messages.length > 0 ? getLastBotMessage()!.message : ""}
      </div>

      <div className="w-full flex items-center justify-between mb-4">
        <input
          type="text"
          className="flex-grow h-10 p-4 bg-white text-black"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="w-40 h-10 bg-transparent hover:underline focus:outline-none"
          onClick={handleSendMessage}
        >
          전송
        </button>
      </div>
    </div>
  );
}
