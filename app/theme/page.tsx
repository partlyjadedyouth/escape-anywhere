"use client"; // 이 파일이 클라이언트 측에서 실행됨을 나타냅니다.

import React, { useState, Suspense, useEffect } from "react"; // React와 useState 훅을 임포트합니다.
import { useRouter } from "next/navigation"; // Next.js의 useRouter 훅을 임포트합니다.
import axios from "axios";
import { systemPrompts } from "../api/chat/route";
import { NextResponse } from "next/server";
import { useAppContext } from "@/lib/utils/appContext";

export default function Theme() {
  const router = useRouter(); // useRouter 훅을 사용하여 router 객체를 생성합니다.

  const { state, setState } = useAppContext()

  const [theme, setTheme] = useState<string>(""); // theme 상태를 빈 문자열로 초기화합니다.
  const [isThemeSelected, setIsThemeSelected] = useState<boolean>(false); // isThemeSelected 상태를 false로 초기화합니다.

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // input 요소의 변경 이벤트를 처리하는 함수입니다.
    setTheme(e.target.value); // input 요소의 값을 theme 상태로 설정합니다.
  };

  const handleThemeClick = () => {
    // 버튼 클릭 이벤트를 처리하는 함수입니다.
    if (theme.length === 0) {
      // theme이 빈 문자열인 경우
      alert("컨셉을 선택해주세요"); // 경고 메시지를 표시합니다.
      return; // 함수 실행을 종료합니다.
    } else {
      // console.log(theme); // theme을 콘솔에 출력합니다.
      setIsThemeSelected(true); // isThemeSelected 상태를 true로 설정합니다.
    }
  };

  useEffect(() => {
    console.log(state)
  }, [])

  return (
    // JSX를 반환합니다.
    <div
      className="flex flex-col items-center justify-center min-h-screen w-full bg-black text-white bg-center bg-cover"
      // flex 컨테이너로, 세로 방향으로 정렬하고, 가운데 정렬하며, 화면 높이를 가득 채우도록 설정합니다.
      style={{ backgroundImage: "url('/image/background.png')", backgroundSize: 'cover' }}
    // 배경 이미지를 설정합니다.
    >
      {isThemeSelected === false ? (
        // isThemeSelected가 false인 경우
        <div className="flex flex-col items-center justify-center h-screen bg-transparent text-white w-full px-4">
          <h1 className="text-2xl font-bold mb-4">
            {/* 글자 크기를 2xl로 설정하며, 볼드체로, 아래쪽 여백을 줍니다. */}
            원하는 방탈출 컨셉을 선택해주세요
          </h1>
          <div
            className="w-full h-64 p-4 mb-4 overflow-auto"
            // 메시지 영역의 스타일을 설정합니다.
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          // 배경색을 반투명한 검은색으로 설정합니다.
          >
            {/* 입력 및 전송 버튼을 포함하는 컨테이너입니다. */}
            {/* 챗봇이 제시하는 테마 제시 */}
          </div>
          <div className="w-full flex items-center justify-between mb-4">
            {/* 입력 및 전송 버튼을 포함하는 컨테이너입니다. */}
            <input
              type="text"
              // input 요소의 타입을 텍스트로 설정합니다.
              className="flex-grow h-10 p-4 bg-white text-black"
              // CSS 클래스를 설정하여 스타일을 지정합니다.
              placeholder="컨셉을 선택해주세요"
              // input 요소의 플레이스홀더를 설정합니다.
              value={theme}
              // input 요소의 값을 theme 상태로 설정합니다.
              onChange={handleThemeChange}
            // input 요소의 변경 이벤트를 handleThemeChange 함수로 설정합니다.
            />
            <button
              className="w-40 h-10 bg-transparent hover:underline focus:outline-none"
              // 버튼의 스타일을 설정합니다.
              onClick={handleThemeClick}
            // 버튼 클릭 이벤트를 처리하는 함수를 설정합니다.
            >
              다음으로
              {/* 버튼의 텍스트입니다. */}
            </button>
          </div>
        </div>
      ) : (
        // isThemeSelected가 true인 경우
        <>
          <h1 className="text-center text-2xl font-bold mb-4">
            {/* 텍스트를 가운데 정렬하고, 글자 크기를 2xl로 설정하며, 볼드체로, 아래쪽 여백을 줍니다. */}
            이야기 속에 숨겨진 문제를 풀어 모든 방을 탈출하시면 성공입니다.
          </h1>
          <h1 className="text-2xl font-bold mb-4">
            {/* 글자 크기를 2xl로 설정하며, 볼드체로, 아래쪽 여백을 줍니다. */}
            행운을 빕니다.
          </h1>
          <button
            className={
              "w-40 py-2 px-4 bg-transparent hover:underline focus:outline-none"
            }
            // 버튼 스타일을 설정합니다.
            onClick={() => router.push(`/game`)}
          // 버튼 클릭 시 game 경로로 이동하도록 설정합니다. userId를 쿼리 매개변수로 포함합니다.
          >
            시작하기
            {/* 버튼의 텍스트입니다. */}
          </button>
        </>
      )}
    </div>
  );
}
