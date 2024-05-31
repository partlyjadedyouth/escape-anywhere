"use client";

import React, { useState } from 'react';
import { signOut } from "next-auth/react";

const Theme = () => {
  const [theme, setTheme] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // 여기서 챗봇에게 theme을 전달하는 코드를 추가합니다.
    console.log(theme);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white bg-center bg-cover" style={{backgroundImage: "url('background.png')"}}>
        <h1 className="text-center text-2xl font-bold mb-4">원하는 방탈출 컨셉을 설명해주세요</h1>
        <form onSubmit={handleSubmit} className="w-3/4 flex justify-between">
          <input 
            className="w-full h-10 p-4 mb-4 bg-white text-black" 
            value={theme} 
            onChange={(e) => setTheme(e.target.value)} 
          />
          <button className="w-40 py-2 px-4 bg-transparent hover:underline focus:outline-none" type="submit">전송</button>
        </form>
        { /* Main으로 라우팅 */ }
    </div>
  );
};

export default Theme;