"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Theme() {
  const router = useRouter();

  const [theme, setTheme] = useState<string>("");
  const [isThemeSelected, setIsThemeSelected] = useState<boolean>(false);

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // input 요소의 변경 이벤트를 처리하는 함수입니다.
    setTheme(e.target.value); // input 요소의 값을 userId 상태로 설정합니다.
  };

  const handleThemeClick = () => {
    // 버튼 클릭 이벤트를 처리하는 함수입니다.
    if (theme.length === 0) {
      // 테마 빈 문자열인 경우
      alert("테마를 입력해주세요"); // 경고 메시지를 표시합니다.
      return; // 함수 실행을 종료합니다.
    } else {
      console.log(theme); // theme을 콘솔에 출력합니다.
      setIsThemeSelected(true); // isThemeSelected 상태를 true로 설정합니다.
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-black text-white bg-center bg-cover"
      style={{ backgroundImage: "url('/image/background.png')" }}
    >
      {isThemeSelected === false ? (
        <>
          <h1 className="text-center text-2xl font-bold mb-4">
            원하는 방탈출 컨셉을 설명해주세요
          </h1>
          <input
            type="text"
            // input 요소의 타입을 텍스트로 설정합니다.
            value={theme}
            // input 요소의 값을 userId 상태로 설정합니다.
            onChange={handleThemeChange}
            // input 요소의 변경 이벤트를 handleChange 함수로 설정합니다.
            className="text-center p-2 border border-gray-300 rounded text-black w-80"
            // CSS 클래스를 설정하여 스타일을 지정합니다.
            placeholder="컨셉을 입력해주세요"
            // input 요소의 플레이스홀더를 설정합니다.
          />
          <button
            className="mt-10 font-xl hover:underline"
            onClick={handleThemeClick}
          >
            {/* 위쪽에 여백을 주고, 텍스트 크기를 크게 설정하며, 호버 시 밑줄이 생기도록 스타일을 지정한 버튼입니다. */}
            다음으로
            {/* 버튼의 텍스트입니다. */}
          </button>
        </>
      ) : (
        <>
          <h1 className="text-center text-2xl font-bold mb-4">
            지금부터 이야기 속에 숨겨진 문제를 풀어 차례대로 모든 방을
            탈출하시면 성공입니다.
          </h1>
          <h1 className="text-center text-2xl font-bold mb-4">
            행운을 빕니다.
          </h1>
          <button
            className={
              "w-40 py-2 px-4 bg-transparent hover:underline focus:outline-none"
            }
            onClick={() => router.push("/")}
          >
            시작하기
          </button>
        </>
      )}
    </div>
  );
}
