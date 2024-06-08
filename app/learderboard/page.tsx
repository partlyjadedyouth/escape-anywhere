"use client";

import React, { useEffect, useState } from "react";
import { db } from "@/firebase"; // Firebase 설정 파일에서 Firestore 인스턴스를 가져옵니다
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

export default function Ending() {
  const [data, setData] = useState<Array<{
    userId: string;
    time: number;
  }> | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const leaderboardRef = collection(db, "leaderboard");
      const leaderboardQuery = query(
        leaderboardRef,
        orderBy("time", "asc"),
        limit(10)
      );
      const snapshot = await getDocs(leaderboardQuery);
      const leaderboardData = snapshot.docs.map((doc) => ({
        userId: doc.id,
        ...doc.data(),
      }));
      setData(leaderboardData);
    };

    fetchData();
  }, []);

  if (data === null) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="flex flex-row items-center justify-center min-h-screen w-full bg-black text-white bg-center bg-cover"
      style={{
        backgroundImage: "url('/image/background.png')",
        backgroundSize: "cover",
      }}
    >
      <div className="w-7/10 bg-white bg-opacity-50 rounded p-4">
        <h1>Leaderboard</h1>
        <ul>
          {data.map((entry, index) => (
            <li key={index}>
              <span>{entry.userId}: </span>
              <span>{entry.time} seconds</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-3/10 flex items-center justify-center">
        <button
          className={
            "w-40 py-2 px-4 bg-transparent hover:underline focus:outline-none"
          }
          // onClick={() => }
        >
          다시 시작하기
        </button>
      </div>
    </div>
  );
}
