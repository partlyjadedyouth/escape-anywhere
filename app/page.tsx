"use client"; // 이 파일이 클라이언트 측에서 실행됨을 나타냅니다.

import { useRouter } from "next/navigation"; // Next.js의 useRouter 훅을 임포트합니다.
import Image from "next/image"; // Next.js의 Image 컴포넌트를 임포트합니다.
import { systemPrompts } from "./api/chat/route";
import axios from "axios";
import { useEffect, useState } from "react";
import { NextResponse } from "next/server";
import { useAppContext } from "@/lib/utils/appContext";

export default function Home() {
  // Home 컴포넌트를 기본으로 내보냅니다.
  const router = useRouter(); // useRouter 훅을 사용하여 router 객체를 생성합니다.
  const { state, setState } = useAppContext()

  useEffect(() => {
    const initGPT = async () => {
      const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

      try {
        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo",
            messages: systemPrompts,
            max_tokens: 1000,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
          },
        );
        const message = response.data.choices[0].message;

        setState({ theme: message.content })
        return

      } catch (error) {
        console.error(error);
        return NextResponse.json(
          { message: "Failed to generate message" },
          { status: 500 },
        );
      }
    }

    initGPT()

  }, [])

  return (
    // JSX를 반환합니다.
    <div
      className="flex flex-col items-center justify-center gap-48 w-screen h-screen"
      style={{
        backgroundImage: `url('/image/titlewithdoor.png')`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <button
        className="hover:underline sm:text-3xl text-xl"
        // 호버 시 밑줄이 생기며, 작은 화면에서는 텍스트 크기가 3xl, 기본적으로는 xl로 설정됩니다.
        onClick={() => router.push('/login')}
      // 버튼 클릭 시 '/login' 경로로 이동하도록 설정합니다.
      >
        바로 시작하기
        {/* 버튼의 텍스트입니다. */}
      </button>
    </div>
  );
}
