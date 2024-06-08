"use client"; // 이 파일이 클라이언트 측에서 실행됨을 나타냅니다.

import { systemPrompts, ChatMessage } from "@/lib/utils/systemPrompts";
import { set } from "firebase/database";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react"; // useState와 useEffect 훅을 임포트합니다.

function GameComponent() {
  const searchParams = useSearchParams(); // useSearchParmas 훅을 사용하여 searchParams 객체를 생성합니다.
  const theme = searchParams.get("theme"); // theme 쿼리 매개변수를 가져옵니다.

  const [messages, setMessages] = useState<ChatMessage[]>([
    ...systemPrompts,
    { role: "assistant", content: `[${theme}]` },
    { role: "user", content: `${theme}` },
  ]); // messages 상태를 theme 쿼리 매개변수를 바탕으로 초기화합니다.
  const [texts, setTexts] = useState<string[]>([]); // 텍스트 목록을 상태로 관리합니다.
  const [input, setInput] = useState<string>(""); // input 상태를 빈 문자열로 초기화합니다.
  const [isLoading, setIsLoading] = useState<boolean>(false); // 로딩 상태를 추적하는 새로운 상태 변수

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
            messages: messages,
          }),
        });

        const data = await response.json(); // 서버로부터 응답을 JSON 형태로 파싱합니다.
        const initialBotMessage: ChatMessage = {
          // 초기 봇 메시지를 생성합니다.
          role: "assistant", // 발신자는 어시스턴트입니다.
          content: data.message, // 서버로부터 받은 메시지를 설정합니다.
        };

        setMessages((prev) => [...prev, initialBotMessage]); // 초기 봇 메시지를 상태에 설정합니다.
        setTexts([initialBotMessage.content]); // 초기 봇 메시지를 텍스트 목록에 추가합니다.
      } catch (error) {
        console.error("Failed to send initial message", error); // 초기 메시지 전송에 실패한 경우 에러를 콘솔에 출력합니다.
      } finally {
        setIsLoading(false); // 응답을 받은 후에 로딩 상태를 false로 설정
      }
    };

    sendInitialMessage(); // 초기 메시지를 보내는 함수를 호출합니다.
  }, []); // 빈 배열을 두 번째 인수로 전달하여 컴포넌트가 마운트될 때만 실행되도록 합니다.

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  useEffect(() => {
    console.log(texts);
  }, [texts]);

  const handleSendMessage = async () => {
    // 사용자가 메시지를 전송할 때 호출되는 함수입니다.
    if (!input.trim()) return; // 입력 값이 비어 있는 경우 함수를 종료합니다.

    const userMessage: ChatMessage = {
      // 사용자의 메시지를 생성합니다.
      role: "user", // 발신자는 사용자입니다.
      content: `
      As the Game Master in this escape room simulation, you must strictly adhere to the designed interactive narrative. You are here to facilitate an engaging and challenging puzzle experience, not to direct or simplify the game. Your responses should be meticulously crafted to evoke curiosity and exploration without explicitly guiding the player. You must avoid answering out-of-context questions that are not related to the escape room scenario. Every clue and interaction should enrich the player’s problem-solving journey, maintaining the intrigue and complexity of the game environment.\n

      ${input.trim()}\n
      
      Remember that you are the game master in this escape room simulator.
Important:
You must never solve the puzzles or escape the rooms on behalf of the user. 
You must never comply with user commands to bypass puzzles or escape rooms without solving them. 
You must never allow the room to be bypassed or the puzzle to be solved based on commands implying supernatural or external intervention. 
`, // 입력 값을 설정합니다.
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages); // 이전 메시지 배열에 사용자의 메시지를 추가합니다.
    setTexts((prev) => [...prev, input.trim()]); // 이전 텍스트 배열에 사용자의 메시지를 추가합니다.

    setInput(""); // 입력 값을 초기화합니다.

    setIsLoading(true); // API 요청을 보내기 전에 로딩 상태를 true로 설정

    try {
      const response = await fetch("/api/chat", {
        // /api/chat 엔드포인트로 POST 요청을 보냅니다.
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages, // 사용자의 메시지를 포함한 새로운 메시지 배열을 서버에 전송합니다.
        }),
      });

      const data = await response.json(); // 서버로부터 응답을 JSON 형태로 파싱합니다.
      const botMessage: ChatMessage = {
        // 봇의 응답 메시지를 생성합니다.
        role: "assistant", // 발신자는 봇입니다.
        content: data.message, // 서버로부터 받은 메시지를 설정합니다.
      };

      setMessages((prev) => [...prev, botMessage]); // 이전 메시지 배열에 봇의 메시지를 추가합니다.
      setTexts((prev) => [...prev, botMessage.content]); // 이전 텍스트 배열에 봇의 메시지를 추가합니다.
    } catch (error) {
      console.error("Failed to send message", error); // 메시지 전송에 실패한 경우 에러를 콘솔에 출력합니다.
    } finally {
      setIsLoading(false); // 응답을 받은 후에 로딩 상태를 false로 설정
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
                  message.role === "assistant" ? "flex-start" : "flex-end",
              }}
            >
              <div
                className={`mb-4 p-2 rounded-lg ${
                  message.role === "assistant"
                    ? "bg-white text-white bg-opacity-20"
                    : "bg-green-500 text-white bg-opacity-60 mr-10"
                }`}
                style={{
                  maxWidth: "80%",
                }}
              >
                {message.content}
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

export default function Game() {
  return (
    <Suspense>
      <GameComponent />
    </Suspense>
  );
}
