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
      <h1 className="text-4xl font-normal mb-16">탈출에 성공했습니다</h1>
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(6px)",
          width: "600px",
          padding: "54px",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          boxShadow: "0 0 50px rgba(219, 219, 219, 0.3)",
        }}
      >
        <div className="text-center mb-8">
          <p className="text-2xl text-gray-200 font-normal mb-12">
            <span className="font-bold text-3xl mr-2">{userId}</span>님의 기록
          </p>
          <h2 className="text-8xl font-bold my-8">{formatTime(Number(time))}</h2>
        </div>
        <button
          className={
            "w-50 py-3 px-4 bg-transparent border border-white border-opacity-40 hover:bg-white hover:bg-opacity-15 rounded-lg after:focus:outline-none text-xl"
          }
          onClick={() => router.push(`/leaderboard?userId=${userId}`)}
        >
          리더보드 확인하기
        </button>
      </div>
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
