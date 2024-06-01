"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [userId, setUserId] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  const handleClick = () => {
    if (userId.length === 0) {
      alert("ID를 입력해주세요");
      return;
    } else {
      console.log(userId);
      router.push(`/theme?userId=${userId}`);
    }
  };

  const generateRandomId = () => {
    const randomId = Math.random().toString(36).substring(2, 10).toUpperCase();
    setUserId(randomId);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div>
          <input
            type="text"
            value={userId}
            onChange={handleChange}
            className="text-center p-2 border border-gray-300 rounded text-black w-80"
            placeholder="ID를 입력해주세요"
          />
          <button
            onClick={generateRandomId}
            className="ml-5 w-30 text-white font-xl border-gray-300 rounded border p-2 hover:underline"
          >
            랜덤 ID 생성
          </button>
        </div>
        <button className="mt-10 font-xl hover:underline" onClick={handleClick}>
          다음으로
        </button>
      </div>
    </>
  );
}
