"use client"; // 이 파일이 클라이언트 측에서 실행됨을 나타냅니다.

import { useState, useEffect } from "react"; // useState와 useEffect 훅을 임포트합니다.
import { useRouter } from "next/router"; // Next.js의 useRouter 훅을 임포트합니다.

interface ChatMessage {
  // 채팅 메시지의 인터페이스를 정의합니다.
  sender: string; // 메시지 발신자 (사용자 또는 봇)
  message: string; // 메시지 내용
  timestamp: Date; // 메시지 타임스탬프
}

export default function Game() {
  // Game 컴포넌트를 기본으로 내보냅니다.

  const [messages, setMessages] = useState<ChatMessage[]>([]); // messages 상태를 빈 배열로 초기화합니다.
  const [input, setInput] = useState<string>(""); // input 상태를 빈 문자열로 초기화합니다.
  const [isLoading, setIsLoading] = useState<boolean>(false); // 로딩 상태를 추적하는 새로운 상태 변수
  const loadTime = Date.now(); // 페이지 로드 시간 기록
  const router = useRouter(); // useRouter 훅을 사용하여 router 객체를 생성합니다.

  useEffect(() => {
    // 컴포넌트가 마운트될 때 초기 메시지를 보내는 함수입니다.
    const sendInitialMessage = async () => {
      setIsLoading(true); // API 요청을 보내기 전에 로딩 상태를 true로 설정
      try {
        const response = await fetch("/api/chat", {
          // /api/chat 엔드포인트로 POST 요청을 보냅니다.
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [], // 초기에는 이전 메시지가 없으므로 빈 배열을 보냅니다.
          }),
        });

        const data = await response.json(); // 서버로부터 응답을 JSON 형태로 파싱합니다.
        const initialBotMessage: ChatMessage = {
          // 초기 봇 메시지를 생성합니다.
          sender: "bot", // 발신자는 봇입니다.
          message: data.message, // 서버로부터 받은 메시지를 설정합니다.
          timestamp: new Date(), // 현재 시간을 타임스탬프로 설정합니다.
        };

        setMessages([initialBotMessage]); // 초기 봇 메시지를 상태에 설정합니다.
      } catch (error) {
        console.error("Failed to send initial message", error); // 초기 메시지 전송에 실패한 경우 에러를 콘솔에 출력합니다.
      } finally {
        setIsLoading(false); // 응답을 받은 후에 로딩 상태를 false로 설정
      }
    };

    sendInitialMessage(); // 초기 메시지를 보내는 함수를 호출합니다.
  }, []); // 빈 배열을 두 번째 인수로 전달하여 컴포넌트가 마운트될 때만 실행되도록 합니다.

  const handleSendMessage = async () => {
    // 사용자가 메시지를 전송할 때 호출되는 함수입니다.
    if (!input.trim()) return; // 입력 값이 비어 있는 경우 함수를 종료합니다.

    const userMessage: ChatMessage = {
      // 사용자의 메시지를 생성합니다.
      sender: "user", // 발신자는 사용자입니다.
      message: input.trim(), // 입력 값을 설정합니다.
      timestamp: new Date(), // 현재 시간을 타임스탬프로 설정합니다.
    };

    setMessages((prev) => [...prev, userMessage]); // 이전 메시지 배열에 사용자의 메시지를 추가합니다.

    setIsLoading(true); // API 요청을 보내기 전에 로딩 상태를 true로 설정
    try {
      const response = await fetch("/api/chat", {
        // /api/chat 엔드포인트로 POST 요청을 보냅니다.
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [{ role: "user", content: input.trim() }], // 사용자의 메시지를 서버에 전송합니다.
        }),
      });

      const data = await response.json(); // 서버로부터 응답을 JSON 형태로 파싱합니다.
      const botMessage: ChatMessage = {
        // 봇의 응답 메시지를 생성합니다.
        sender: "bot", // 발신자는 봇입니다.
        message: data.message, // 서버로부터 받은 메시지를 설정합니다.
        timestamp: new Date(), // 현재 시간을 타임스탬프로 설정합니다.
      };

      setMessages((prev) => [...prev, botMessage]); // 이전 메시지 배열에 봇의 메시지를 추가합니다.

      // 게임이 끝났는지 확인합니다.
      if (data.gameFinished) {
        const unloadTime = Date.now(); // 페이지 언로드 시간을 기록합니다.
        const elapsedTime = unloadTime - loadTime; // 소요시간을 계산합니다.

        // 소시간을 다음 페이지에 전달하고 이동합니다.
        router.push(
          `/ending?userId=${router.query.userId}&time=${elapsedTime}`
        );
      }
    } catch (error) {
      console.error("Failed to send message", error); // 메시지 전송에 실패한 경우 에러를 콘솔에 출력합니다.
    } finally {
      setIsLoading(false); // 응답을 받은 후에 로딩 상태를 false로 설정
      setInput(""); // 입력 값을 초기화합니다.
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* 화면을 가득 채우는 flex 컨테이너 */}
      <div
        className="w-1/2 h-screen bg-center"
        style={{
          backgroundImage: "url('/image/testimage.png')",
          backgroundSize: "cover",
        }}
      ></div>
      <div className="w-1/2 h-full flex flex-col items-center justify-end bg-transparent text-white px-4">
        {/* 우측에 메시지를 주고 받는 창을 배치합니다. */}
        <div
          className="w-full mb-4 overflow-auto"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent:
                  message.sender === "bot" ? "flex-start" : "flex-end",
              }}
            >
              <div
                className={`mb-4 p-2 rounded-lg ${
                  message.sender === "bot"
                    ? "bg-white text-white bg-opacity-20"
                    : "bg-green-500 text-white bg-opacity-60 mr-10"
                }`}
                style={{
                  maxWidth: "80%",
                }}
              >
                {message.message}
              </div>
            </div>
          ))}
        </div>
        <div className="w-full flex items-center justify-between mb-4">
          <input
            type="text"
            className={`flex-grow h-10 p-4 bg-white text-black ${
              isLoading ? "opacity-50" : ""
            }`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading} // 로딩 중일 때 입력 필드를 비활성화합니다.
          />
          <button
            className={`w-40 h-10 bg-transparent hover:underline focus:outline-none ${
              isLoading ? "opacity-50" : ""
            }`}
            onClick={handleSendMessage}
            disabled={isLoading} // 로딩 중일 때 버튼을 비활성화합니다.
          >
            전송
          </button>
        </div>
      </div>
    </div>
  );
}
