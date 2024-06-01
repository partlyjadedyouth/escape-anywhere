"use client";

import React, { useState, useEffect } from 'react';
import { signOut } from "next-auth/react";

const Game = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState('');

  useEffect(() => {
    // WebSocket 연결을 설정하고, 메시지를 받으면 상태를 업데이트합니다.
    const socket = new WebSocket('ws://your-backend-url');

    socket.onmessage = (event) => {
      setChat(event.data);
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleInputSubmit = (event) => {
    event.preventDefault();
    // WebSocket을 통해 메시지를 백엔드로 전송합니다.
    socket.send(message);
    setMessage('');
  };

  return (
    <div className="flex flex-col items-center justify-end h-screen bg-transparent text-white w-full px-4">
      <div className="w-full h-64 p-4 mb-4 overflow-auto" style={{backgroundColor: "rgba(0, 0, 0, 0.5)"}}>
        {chat}
      </div>
      <form onSubmit={handleInputSubmit} className="w-full flex justify-between">
        <input 
          className="w-full h-10 p-4 mb-4" 
          value={message} 
          onChange={handleInputChange} 
          style={{backgroundColor: "rgba(0, 0, 0, 0.5)", color: "white"}}
        />
        <button className="w-40 py-2 px-4 bg-transparent hover:underline focus:outline-none" type="submit">
          전송
        </button>
      </form>
      <button className="w-40 py-2 px-4 bg-transparent hover:underline focus:outline-none" onClick={() => signOut()}>로그아웃</button>
    </div>
  );
};

export default Game;
