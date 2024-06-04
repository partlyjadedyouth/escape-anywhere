"use client"; // 이 파일이 클라이언트 측에서 실행됨을 나타냅니다.

import React, { useState } from "react"; // React와 useState 훅을 임포트합니다.
import { useRouter, useSearchParams } from "next/navigation"; // Next.js의 useRouter 훅을 임포트합니다.

export default function Theme() {
  const router = useRouter(); // useRouter 훅을 사용하여 router 객체를 생성합니다.
  const searchParams = useSearchParams(); // useSearchParams 훅을 사용하여 searchParams 객체를 생성합니다.
  const userId = searchParams.get("userId"); // userId를 쿼리 매개변수로부터 가져옵니다.

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
      alert("컨셉을 입력해주세요"); // 경고 메시지를 표시합니다.
      return; // 함수 실행을 종료합니다.
    } else {
      console.log(theme); // theme을 콘솔에 출력합니다.
      setIsThemeSelected(true); // isThemeSelected 상태를 true로 설정합니다.
    }
  };

  return (
    // JSX를 반환합니다.
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-black text-white bg-center bg-cover"
      // flex 컨테이너로, 세로 방향으로 정렬하고, 가운데 정렬하며, 화면 높이를 가득 채우도록 설정합니다.
      style={{ backgroundImage: "url('/image/background.png')" }}
      // 배경 이미지를 설정합니다.
    >
      {isThemeSelected === false ? (
        // isThemeSelected가 false인 경우
        <>
          <h1 className="text-2xl font-bold mb-4">
            {/* 글자 크기를 2xl로 설정하며, 볼드체로, 아래쪽 여백을 줍니다. */}
            원하는 방탈출 컨셉을 설명해주세요
          </h1>
          <input
            type="text"
            // input 요소의 타입을 텍스트로 설정합니다.
            value={theme}
            // input 요소의 값을 theme 상태로 설정합니다.
            onChange={handleThemeChange}
            // input 요소의 변경 이벤트를 handleThemeChange 함수로 설정합니다.
            className="text-center p-2 border border-gray-300 rounded text-black w-80"
            // CSS 클래스를 설정하여 스타일을 지정합니다.
            placeholder="컨셉을 입력해주세요"
            // input 요소의 플레이스홀더를 설정합니다.
          />
          <button
            className="mt-10 font-xl hover:underline"
            // 위쪽에 여백을 주고, 텍스트 크기를 크게 설정하며, 호버 시 밑줄이 생기도록 스타일을 지정한 버튼입니다.
            onClick={handleThemeClick}
            // 버튼 클릭 이벤트를 handleThemeClick 함수로 설정합니다.
          >
            다음으로
            {/* 버튼의 텍스트입니다. */}
          </button>
        </>
      ) : (
        // isThemeSelected가 true인 경우
        <>
          <h1 className="text-center text-2xl font-bold mb-4">
            {/* 텍스트를 가운데 정렬하고, 글자 크기를 2xl로 설정하며, 볼드체로, 아래쪽 여백을 줍니다. */}
            지금부터 이야기 속에 숨겨진 문제를 풀어 차례대로 모든 방을
            탈출하시면 성공입니다.
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
            onClick={() => router.push(`/game?userId=${userId}`)}
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
