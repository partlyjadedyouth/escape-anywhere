"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Game from "../../components/game/page";

const Main = () => {
  const router = useRouter();

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-black text-white bg-center bg-cover"
      style={{ backgroundImage: "url('image.png')" }}
    >
      {/* 저장된 테마 정보를 불러오기 */}
      <Game />
    </div>
  );
};

export default Main;
