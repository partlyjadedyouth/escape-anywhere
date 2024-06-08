"use client"; // 이 파일이 클라이언트 측에서 실행됨을 나타냅니다.

import React, { useState, Suspense, useEffect } from "react"; // React와 필요한 훅들을 임포트합니다.
import { useRouter, useSearchParams } from "next/navigation"; // Next.js의 useRouter 훅을 임포트합니다.
import { systemPrompts } from "@/lib/utils/systemPrompts"; // 시스템 프롬프트를 임포트합니다.

function ThemeComponent() {
  const router = useRouter(); // useRouter 훅을 사용하여 router 객체를 생성합니다.
  const searchParams = useSearchParams(); // useSearchParmas 훅을 사용하여 searchParams 객체를 생성합니다.
  const userId = searchParams.get("userId"); // userId 쿼리 매개변수를 가져옵니다.

  const [selectedTheme, setSelectedTheme] = useState<string>(""); // theme 상태를 빈 문자열로 초기화합니다.
  const [isThemeSelected, setIsThemeSelected] = useState<boolean>(false); // isThemeSelected 상태를 false로 초기화합니다.
  const [isLoading, setIsLoading] = useState<boolean>(false); // 로딩 상태를 추적하는 새로운 상태 변수
  const [themes, setThemes] = useState<string[]>(); // 테마 목록을 상태로 관리합니다.

  useEffect(() => {
    // 컴포넌트가 마운트될 때 실행되는 useEffect입니다.
    const getResponse = async () => {
      setIsLoading(true); // API 요청을 보내기 전에 로딩 상태를 true로 설정
      try {
        const response = await fetch("/api/chat", {
          // /api/chat 엔드포인트로 POST 요청을 보냅니다.
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [...systemPrompts], // 시스템 프롬프트를 메시지로 포함하여 보냅니다.
          }),
        });

        const data = await response.json(); // 서버로부터 응답을 JSON 형태로 파싱합니다.
        console.log(data);
        setThemes(JSON.parse(data.message)); // 응답 메시지를 JSON 파싱하여 테마 목록으로 설정합니다.
      } catch (error) {
        console.error("Failed to send initial message", error); // 초기 메시지 전송에 실패한 경우 에러를 콘솔에 출력합니다.
      } finally {
        setIsLoading(false); // 응답을 받은 후에 로딩 상태를 false로 설정
      }
    };

    getResponse(); // 초기 메시지를 보내는 함수를 호출합니다.
  }, []); // 빈 배열을 두 번째 인수로 전달하여 컴포넌트가 마운트될 때만 실행되도록 합니다.

  useEffect(() => {
    console.log(state)
  }, [])

  return (
    // JSX를 반환합니다.
    <div
      className="flex flex-col items-center justify-center min-h-screen w-full bg-black text-white bg-center bg-cover"
      // flex 컨테이너로, 세로 방향으로 정렬하고, 가운데 정렬하며, 화면 높이를 가득 채우도록 설정합니다.
      style={{
        backgroundImage: "url('/image/background.png')",
        backgroundSize: "cover",
      }}
    // 배경 이미지를 설정합니다.
    >
      {isThemeSelected === false ? (
        // isThemeSelected가 false인 경우
        <div className="flex flex-col items-center justify-center h-screen bg-transparent text-white w-full px-4">
          <h1 className="text-2xl font-bold mb-8">
            {/* 글자 크기를 2xl로 설정하며, 볼드체로, 아래쪽 여백을 줍니다. */}
            원하는 방탈출 컨셉을 선택해주세요
          </h1>
          <div
            className="w-full h-64 p-4 mb-4 flex flex-col items-center justify-center"
            // 메시지 영역의 스타일을 설정합니다.
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          // 배경색을 반투명한 검은색으로 설정합니다.
          >
            {/* 입력 및 전송 버튼을 포함하는 컨테이너입니다. */}
            {/* 챗봇이 제시하는 테마 제시 */}
            {isLoading ? (
              <p>GPT가 컨셉을 생성하고 있습니다. 잠시만 기다려주세요...</p>
            ) : (
              // 로딩 중일 때 표시할 메시지입니다.
              <Suspense fallback={<p>Loading...</p>}>
                {/* Suspense 컴포넌트를 사용하여 비동기 렌더링을 처리합니다. */}
                {themes?.map((theme) => (
                  <div key={theme} className="mb-2">
                    {/* 각 테마를 표시할 div입니다. */}
                    <button
                      className="w-full h-10 text-lg bg-transparent hover:underline focus:outline-none"
                      // 버튼 스타일을 설정합니다.
                      onClick={() => {
                        setSelectedTheme(theme); // 선택한 테마를 상태로 설정합니다.
                        setIsThemeSelected(true); // isThemeSelected 상태를 true로 설정합니다.
                      }}
                    >
                      {theme}
                      {/* 버튼의 텍스트로 테마를 표시합니다. */}
                    </button>
                  </div>
                ))}
              </Suspense>
            )}
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
            onClick={() =>
              router.push(`/game?userId=${userId}&theme=${selectedTheme}`)
            }
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

export default function Theme() {
  return (
    // client-side에서 useSearchParams를 사용하기 위해 Suspense 컴포넌트로 ThemeComponent를 감싸줍니다.
    <Suspense>
      <ThemeComponent />
    </Suspense>
  );
}
