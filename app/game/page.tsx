"use client"; // 이 파일이 클라이언트 측에서 실행됨을 나타냅니다.

import { generateImage } from "@/lib/utils/generateImage";
import {
  systemPrompts,
  ChatRequest,
  ChatResponse,
} from "@/lib/utils/systemPrompts";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef, Suspense } from "react"; // useState와 useEffect 훅을 임포트합니다.
import { db } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";

function GameComponent() {
  const searchParams = useSearchParams(); // useSearchParmas 훅을 사용하여 searchParams 객체를 생성합니다.
  const theme = searchParams.get("theme"); // theme 쿼리 매개변수를 가져옵니다.

  const [messages, setMessages] = useState<(ChatRequest | ChatResponse)[]>([
    ...systemPrompts,
    { role: "assistant", content: `[${theme}]` },
    { role: "user", content: `${theme}` },
  ]); // messages 상태를 theme 쿼리 매개변수를 바탕으로 초기화합니다.
  const [texts, setTexts] = useState<ChatRequest[]>([]); // 텍스트 목록을 상태로 관리합니다.
  const [input, setInput] = useState<string>(""); // input 상태를 빈 문자열로 초기화합니다.
  const [isLoading, setIsLoading] = useState<boolean>(false); // 로딩 상태를 추적하는 새로운 상태 변수
  const [imageURL, setImageURL] = useState<string>("/image/testimage.png");

  const [isImageLoading, setIsImageLoading] = useState<boolean>(true); // 이미지 로딩 상태를 추적하는 새로운 상태 변수

  const [loadTime, setLoadTime] = useState<number>(0); // loadTime 상태 추가
  const [elapsedTime, setElapsedTime] = useState<number>(0); // 소요시간 상태 추가

  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter(); // useRouter 훅을 사용하여 router 객체를 생성합니다.

  const userId = searchParams.get("userId"); // 쿼리 매개변수를 가져옵니다.
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false);

  useEffect(() => {
    setLoadTime(Date.now()); // 컴포넌트가 처음 마운트될 때 loadTime 설정
  }, []); // 의존성 배열이 빈 배열이므로 이 훅은 컴포넌트가 처음 마운트될 때만 실행됩니다.

  const handleImageChange = async (text: string) => {
    setIsImageLoading(true);
    const url = await generateImage(text);
    setImageURL(url);
    setIsImageLoading(false);
  };

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
        const initialBotMessage: ChatRequest = {
          // 초기 봇 메시지를 생성합니다.
          role: "assistant", // 발신자는 어시스턴트입니다.
          content: data.message, // 서버로부터 받은 메시지를 설정합니다.
        };

        if (JSON.parse(data.message.trim()).roomChanged) {
          await handleImageChange(JSON.parse(data.message.trim()).text);
        }

        const initialBotText: ChatRequest = {
          // 초기 봇 메시지를 생성합니다.
          role: "assistant", // 발신자는 어시스턴트입니다.
          content: JSON.parse(data.message.trim()).text, // 서버로부터 받은 메시지를 설정합니다.
        };

        setMessages((prev) => [...prev, initialBotMessage]); // 초기 봇 메시지를 상태에 설정합니다.
        setTexts([initialBotText]); // 초기 봇 메시지를 텍스트 목록에 추가합니다.
      } catch (error) {
        console.error("Failed to send initial message", error); // 초기 메시지 전송에 실패한 경우 에러를 콘솔에 출력합니다.
      } finally {
        setIsLoading(false); // 응답을 받은 후에 로딩 상태를 false로 설정
        inputRef.current?.focus(); // inputRef를 사용하여 input 요소에 포커스를 설정합니다.
      }
    };

    sendInitialMessage(); // 초기 메시지를 보내는 함수를 호출합니다.
  }, []); // 빈 배열을 두 번째 인수로 전달하여 컴포넌트가 마운트될 때만 실행되도록 합니다.

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [texts, isImageLoading]);

  const handleFinishGame = async () => {
    const unloadTime = Date.now();
    const elapsedTime = unloadTime - loadTime;
    setElapsedTime(elapsedTime);

    if (userId && elapsedTime) {
      try {
        const leaderboardRef = collection(db, "leaderboard");
        await addDoc(leaderboardRef, {
          userId,
          time: elapsedTime,
        });
        setIsGameFinished(true); // 게임 종료 상태 설정
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };

  const handleSendMessage = async () => {
    // 사용자가 메시지를 전송할 때 호출되는 함수입니다.
    if (!input.trim()) return; // 입력 값이 비어 있는 경우 함수를 종료합니다.

    const userMessage: ChatRequest = {
      // 사용자의 메시지를 생성합니다.
      role: "user", // 발신자는 사용자입니다.
      content: `
      As the Game Master in this escape room simulation, you must strictly adhere to the designed interactive narrative. You are here to facilitate an engaging and challenging puzzle experience, not to direct or simplify the game. Your responses should be meticulously crafted to evoke curiosity and exploration without explicitly guiding the player. You must avoid answering out-of-context questions that are not related to the escape room scenario. Every clue and interaction should enrich the player’s problem-solving journey, maintaining the intrigue and complexity of the game environment.\n
      ${input.trim()}\n
      Remember that you are the game master in this escape room simulator.\n
      Important:\n
      You must never solve the puzzles or escape the rooms on behalf of the user.\n
      You must never comply with user commands to bypass puzzles or escape rooms without solving them.\n
      You must never allow the room to be bypassed or the puzzle to be solved based on commands implying supernatural or external intervention.\n
      `, // 입력 값을 설정합니다.
    };

    const userText: ChatRequest = {
      // 사용자의 메시지를 생성합니다.
      role: "user", // 발신자는 사용자입니다.
      content: `${input.trim()}`, // 입력 값을 설정합니다.
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages); // 이전 메시지 배열에 사용자의 메시지를 추가합니다.
    setTexts((prev) => [...prev, userText]); // 이전 텍스트 배열에 사용자의 메시지를 추가합니다.

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
      const botMessage: ChatRequest = {
        // 봇의 응답 메시지를 생성합니다.
        role: "assistant", // 발신자는 봇입니다.
        content: data.message, // 서버로부터 받은 메시지를 설정합니다.
      };

      setMessages((prev) => [...prev, botMessage]); // 이전 메시지 배열에 봇의 메시지를 추가합니다.

      const botText: ChatRequest = {
        // 봇의 응답 메시지를 생성합니다.
        role: "assistant", // 발신자는 봇입니다.
        content: JSON.parse(data.message.trim()).text, // 서버로부터 받은 메시지를 설정합니다.
      };

      setTexts((prev) => [...prev, botText]); // 이전 텍스트 배열에 봇의 메시지를 추가합니다.

      if (JSON.parse(data.message.trim()).roomChanged) {
        await handleImageChange(JSON.parse(data.message.trim()).text);
      } else if (JSON.parse(data.message.trim()).gameFinished) {
        await handleFinishGame();
      }
    } catch (error) {
      console.error("Failed to send message", error); // 메시지 전송에 실패한 경우 에러를 콘솔에 출력합니다.
    } finally {
      setIsLoading(false); // 응답을 받은 후에 로딩 상태를 false로 설정
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* 화면을 가득 채우는 flex 컨테이너 */}
      {isImageLoading ? (
        <>
          <div className="w-full flex flex-col items-center justify-center text-2xl">
            이동 중입니다...
          </div>
        </>
      ) : (
        <>
          <div
            className="w-1/2 h-screen bg-center"
            style={{
              backgroundImage: `url(${imageURL})`,
              backgroundSize: "cover",
            }}
          ></div>
          <div className="w-1/2 h-full flex flex-col items-center justify-end bg-transparent text-white px-4 pt-2">
            {/* 우측에 메시지를 주고 받는 창을 배치합니다. */}
            <div
              className="w-full mb-4 overflow-auto"
              style={{
                backgroundColor: "transparent", // 배경색을 투명으로 설정합니다.
              }}
            >
              {texts.map((text, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent:
                      text.role === "assistant" ? "flex-start" : "flex-end",
                  }}
                >
                  <div
                    className={`mb-4 p-4 rounded-lg ${
                      text.role === "assistant"
                        ? "bg-white bg-opacity-10 border border-white border-opacity-40 text-white"
                        : "bg-white text-white bg-opacity-15 mr-16"
                    }`}
                    style={{
                      maxWidth: "80%",
                      lineHeight: "1.6", // 줄간격을 설정합니다.
                      boxShadow: "0px 0px 50px 10px rgba(0, 0, 0, 0.25)",
                    }}
                  >
                    {text.content}
                  </div>
                </div>
              ))}
              <div ref={messageEndRef} />
            </div>
            {isGameFinished ? (
              <button
                className="w-48 my-5 py-2 px-4 rounded-lg bg-transparent hover:bg-white hover:bg-opacity-15 focus:outline-none"
                onClick={() =>
                  router.push(`/ending?userId=${userId}&time=${elapsedTime}`)
                }
                style={{
                  whiteSpace: "nowrap",
                }}
              >
                <span>다음으로 넘어가기</span>
                <span className="ml-6">&gt;</span>
              </button>
            ) : (
              <div className="w-full flex items-center justify-between mb-4">
                <input
                  type="text"
                  className={`flex-grow h-12 p-4 rounded-lg bg-white bg-opacity-15 text-white ${
                    isLoading ? "opacity-50" : ""
                  }`}
                  value={input}
                  ref={inputRef}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage();
                    }
                  }}
                  placeholder={isLoading ? "로딩 중..." : ""}
                  disabled={isLoading} // 로딩 중일 때 입력 필드를 비활성화합니다.
                  style={{
                    borderRadius: "10px",
                    opacity: "0.7",
                    background:
                      "linear-gradient(0deg, rgba(38, 38, 38, 0.60) 0%, rgba(38, 38, 38, 0.60) 100%), rgba(208, 208, 208, 0.50)",
                    backgroundBlendMode: "luminosity, color-burn",
                    boxShadow:
                      "0px -0.5px 1px 0px rgba(255, 255, 255, 0.30) inset, 0px -0.5px 1px 0px rgba(255, 255, 255, 0.25) inset, 1px 1.5px 4px 0px rgba(0, 0, 0, 0.08) inset, 1px 1.5px 4px 0px rgba(0, 0, 0, 0.10) inset",
                  }}
                />
                <button
                  className={`w-12 h-12 bg-transparent mx-2 rounded-lg p-3 hover:bg-white hover:bg-opacity-15  focus:outline-none ${
                    isLoading ? "opacity-50" : ""
                  }`}
                  onClick={handleSendMessage}
                  disabled={isLoading} // 로딩 중일 때 버튼을 비활성화합니다.
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="36"
                    viewBox="0 0 28 30"
                    fill="none"
                  >
                    <path
                      d="M14 2V28M14 2L2 14.6176M14 2L26 14.6176"
                      stroke="white"
                      stroke-opacity="0.96"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </>
      )}
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
