"use client"; // 이 파일이 클라이언트 측에서 실행됨을 나타냅니다.

import { useState, useEffect, Suspense } from "react"; // useState와 useEffect 훅을 임포트합니다.
import { useSearchParams } from "next/navigation"; // Next.js의 useSearchParams 훅을 임포트합니다.

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
  const [activateInput, setActivateInput] = useState<boolean>(false); // activateInput 상태를 false로 초기화합니다.

  useEffect(() => {
    // 컴포넌트가 마운트될 때 초기 메시지를 보내는 함수입니다.
    const sendInitialMessage = async () => {
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
    } catch (error) {
      console.error("Failed to send message", error); // 메시지 전송에 실패한 경우 에러를 콘솔에 출력합니다.
    } finally {
      setInput(""); // 입력 값을 초기화합니다.
    }
  };

  const getLastBotMessage = () => {
    // 마지막 봇 메시지를 반환하는 함수입니다.
    for (let i = messages.length - 1; i >= 0; i--) {
      // 메시지 배열을 뒤에서부터 순회합니다.
      if (messages[i].sender === "bot") {
        // 발신자가 봇인 메시지를 찾습니다.
        return messages[i]; // 마지막 봇 메시지를 반환합니다.
      }
    }
    return null; // 봇 메시지가 없는 경우 null을 반환합니다.
  };

  return (
    <Suspense>
      <div className="flex flex-col items-center justify-end h-screen bg-transparent text-white w-full px-4">
        {/* 화면을 가득 채우는 flex 컨테이너로, 세로 방향으로 정렬하고, 아래쪽에 배치합니다. */}
        <div
          className="w-full h-64 p-4 mb-4 overflow-auto"
          // 메시지 영역의 스타일을 설정합니다.
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          // 배경색을 반투명한 검은색으로 설정합니다.
        >
          {messages.length > 0 ? getLastBotMessage()!.message : ""}
          {/* 메시지가 있는 경우 마지막 봇 메시지를 표시합니다. */}
        </div>
        <div className="w-full flex items-center justify-between mb-4">
          {/* 입력 및 전송 버튼을 포함하는 컨테이너입니다. */}
          <input
            type="text"
            // input 요소의 타입을 텍스트로 설정합니다.
            className="flex-grow h-10 p-4 bg-white text-black"
            // CSS 클래스를 설정하여 스타일을 지정합니다.
            value={input}
            // input 요소의 값을 input 상태로 설정합니다.
            onChange={(e) => setInput(e.target.value)}
            // input 요소의 변경 이벤트를 처리하는 함수를 설정합니다.
          />
          <button
            className="w-40 h-10 bg-transparent hover:underline focus:outline-none"
            // 버튼의 스타일을 설정합니다.
            onClick={handleSendMessage}
            // 버튼 클릭 이벤트를 처리하는 함수를 설정합니다.
          >
            전송
            {/* 버튼의 텍스트입니다. */}
          </button>
        </div>
      </div>
    </Suspense>
  );
}
