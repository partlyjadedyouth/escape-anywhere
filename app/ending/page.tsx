"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function EndingComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const time = searchParams.get("time");

  if (!time) {
    return <div>Invalid time parameter</div>;
  }

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}분 ${seconds}초`;
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen w-full bg-black text-white bg-center bg-cover"
      style={{
        backgroundImage: "url('/image/background.png')",
        backgroundSize: "cover",
      }}
    >
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">탈출에 성공했습니다.</h1>
        <p className="text-xl mb-4">나의 기록</p>
        <h2 className="text-6xl font-bold">{formatTime(Number(time))}</h2>
      </div>
      <div className="text-center mb-8">
        <p className="text-2xl">유저 ID: {userId}</p>
      </div>
      <button
        className={
          "w-40 py-2 px-4 bg-transparent hover:underline focus:outline-none text-xl"
        }
        onClick={() => router.push(`/leaderboard?userId=${userId}`)}
      >
        리더보드 확인
      </button>
    </div>
  );
}

export default function Ending() {
  return (
    <Suspense>
      <EndingComponent />
    </Suspense>
  );
}
