"use client";

import React, { useState } from 'react';
import { useRouter } from "next/navigation";

const Theme = () => {
  const router = useRouter();

  const [theme, setTheme] = useState({ value: '', selected: false });
  const [level, setLevel] = useState({ value: '', selected: false });

  const handleThemeSubmit = (event) => {
    event.preventDefault();
    setTheme({ ...theme, selected: true });
  };

  const handleLevelSelect = (selectedLevel) => {
    setLevel({ value: selectedLevel, selected: true });
  };

  switch (true) {
    case !theme.selected:
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white bg-center bg-cover" style={{backgroundImage: "url('background.png')"}}>
          <h1 className="text-center text-2xl font-bold mb-4">원하는 방탈출 컨셉을 설명해주세요</h1>
          <form onSubmit={handleThemeSubmit} className="w-3/4 flex justify-between">
            <input 
              className="w-full h-10 p-4 mb-4 bg-white text-black" 
              value={theme.value} 
              onChange={(e) => setTheme({ ...theme, value: e.target.value })} 
            />
            <button className={ 
              "w-40 py-2 px-4 bg-transparent hover:underline focus:outline-none"}
              type="submit">
              전송
            </button>
          </form>
        </div>
      );
    case !level.selected:
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white bg-center bg-cover" style={{backgroundImage: "url('background.png')"}}>
          <h1 className="text-center text-2xl font-bold mb-4">원하는 난이도를 선택해주세요</h1>
          <div className="w-3/4 flex justify-between">
            <button 
              className="w-40 py-2 px-4 bg-transparent hover:underline focus:outline-none"
              onClick={() => handleLevelSelect('쉬움')}>
              쉬움
            </button>
            <button 
              className="w-40 py-2 px-4 bg-transparent hover:underline focus:outline-none"
              onClick={() => handleLevelSelect('보통')}>
              보통
            </button>
            <button 
              className="w-40 py-2 px-4 bg-transparent hover:underline focus:outline-none"
              onClick={() => handleLevelSelect('어려움')}>
              어려움
            </button>
          </div>
        </div>
      );
    default:
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white bg-center bg-cover" style={{backgroundImage: "url('background.png')"}}>
          <h1 className="text-center text-2xl font-bold mb-4">지금부터 이야기 속에 숨겨진 문제를 풀어 차례대로 모든 방을 탈출하시면 성공입니다.</h1>
          <h1 className="text-center text-2xl font-bold mb-4">행운을 빕니다.</h1>
          <button className={ 
            "w-40 py-2 px-4 bg-transparent hover:underline focus:outline-none"}
            onClick={() => router.push('/')}>
            시작하기
          </button>
        </div>
      );
  }
};

export default Theme;