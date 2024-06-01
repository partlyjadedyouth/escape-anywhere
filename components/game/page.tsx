"use client";

import React from 'react';
import { signOut } from "next-auth/react";

const Game = () => {

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
        <h1 className="text-center text-2xl font-bold">This is game page</h1>
        <button className="w-40 py-2 px-4 bg-transparent hover:underline focus:outline-none" onClick={() => signOut()}>로그아웃</button>
    </div>
  );
};

export default Game;
