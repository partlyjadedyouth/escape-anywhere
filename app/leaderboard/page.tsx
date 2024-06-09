"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

export default function Leaderboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const [data, setData] = useState<Array<{
    userId: string;
    time: number;
  }> | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const leaderboardRef = collection(db, "leaderboard");
        const leaderboardQuery = query(
          leaderboardRef,
          orderBy("time", "asc"),
          limit(10)
        );
        const snapshot = await getDocs(leaderboardQuery);
        const leaderboardData = snapshot.docs.map((doc) => ({
          userId: doc.data().userId,
          time: doc.data().time,
        }));
        setData(leaderboardData);
      } catch (error) {
        console.error("Error fetching leaderboard data: ", error);
      }
    };

    fetchData();
  }, []);

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}분 ${seconds}초`;
  };

  if (data === null) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen w-full bg-black text-black bg-center bg-cover"
      style={{
        backgroundImage: "url('/image/background.png')",
        backgroundSize: "cover",
      }}
    >
      <div className="bg-white bg-opacity-50 rounded-lg p-6 w-full max-w-3xl mx-4">
        <h1 className="text-center text-4xl font-bold mb-6">LEADERBOARD</h1>
        <table className="min-w-full bg-white bg-opacity-75 rounded-lg shadow-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">TIME</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <tr key={index} className="hover:bg-gray-200">
                <td className="py-2 px-4 border-b text-center">
                  {entry.userId}
                </td>
                <td className="py-2 px-4 border-b text-center">
                  {formatTime(entry.time)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex mt-6 space-x-4">
        <button
          className="w-40 py-2 px-4 bg-transparent text-white border border-white rounded hover:bg-white hover:text-black focus:outline-none"
          onClick={() => router.push(`/theme?userId=${userId}`)}
        >
          다시 시작하기
        </button>
        <button
          className="w-40 py-2 px-4 bg-transparent text-white border border-white rounded hover:bg-white hover:text-black focus:outline-none"
          onClick={() => router.push(`/`)}
        >
          종료하기
        </button>
      </div>
    </div>
  );
}
