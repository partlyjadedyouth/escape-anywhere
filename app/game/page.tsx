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
    <div>
      <div className="text-white">
        {messages.length > 0 ? getLastBotMessage()!.message : ""}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="text-black"
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}
