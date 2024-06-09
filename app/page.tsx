"use client"; // 이 파일이 클라이언트 측에서 실행됨을 나타냅니다.

import { useRouter } from "next/navigation"; // Next.js의 useRouter 훅을 임포트합니다.
import { useEffect } from "react";
import { NextResponse } from "next/server";
import { useAppContext } from "@/lib/utils/appContext";

export default function Home() {
  // Home 컴포넌트를 기본으로 내보냅니다.
  const router = useRouter(); // useRouter 훅을 사용하여 router 객체를 생성합니다.

  return (
    // JSX를 반환합니다.
    <div
      className="flex flex-col items-center justify-center gap-48 w-screen h-screen"
      style={{
        backgroundImage: `url('/image/titlewithdoor.png')`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <button
        className="text-xl sm:text-3xl p-3 rounded-lg mt-60 hover:bg-white hover:bg-opacity-15 transition-colors duration-200"
        // 작은 화면에서는 텍스트 크기가 3xl, 기본적으로는 xl로 설정되고, 호버 시 배경색이 흰색으로 텍스트가 검정색으로 바뀝니다.
        onClick={() => router.push("/login")}
        // 버튼 클릭 시 '/login' 경로로 이동하도록 설정합니다.
      >
        시작하기
        {/* 버튼의 텍스트입니다. */}
      </button>
    </div>
  );
}
