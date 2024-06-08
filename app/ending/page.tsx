"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";

interface QueryParams {
  userId?: string;
  time?: string;
}

export default function Ending() {
  const router = useRouter();
  const query = router.query as QueryParams;
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    if (query.time) {
      setTime(Number(query.time));
    }
  }, [query]);

  // 페이지가 로드될 때 Firebase에 데이터를 저장합니다.
  useEffect(() => {
    const saveData = async () => {
      if (query.userId && query.time) {
        try {
          const leaderboardRef = collection(db, "leaderboard");
          await addDoc(leaderboardRef, {
            userId: query.userId,
            time: Number(query.time),
          });
        } catch (error) {
          console.error("Error adding document: ", error);
        }
      }
    };

    saveData();
  }, [query]);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen w-full bg-black text-white bg-center bg-cover"
      style={{
        backgroundImage: "url('/image/background.png')",
        backgroundSize: "cover",
      }}
    >
      <h1 className="text-center text-2xl font-bold mb-4">
        축하합니다, {query.userId}! 게임을 클리어했습니다.
      </h1>
      <h1 className="text-center text-2xl font-bold mb-4">
        클리어 시간: {time}ms
      </h1>
      <button
        className={
          "w-40 py-2 px-4 bg-transparent hover:underline focus:outline-none"
        }
        onClick={() => router.push(`/leaderboard`)}
      >
        리더보드 확인하기
      </button>
    </div>
  );
}
