"use client"; // 이 파일이 클라이언트 측에서 실행됨을 나타냅니다.

import { useState } from "react"; // useState 훅을 임포트합니다.
import { useRouter } from "next/navigation"; // Next.js의 useRouter 훅을 임포트합니다.

export default function Login() {
  const router = useRouter(); // useRouter 훅을 사용하여 router 객체를 생성합니다.
  const [userId, setUserId] = useState(""); // userId 상태를 빈 문자열로 초기화합니다.

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // input 요소의 변경 이벤트를 처리하는 함수입니다.
    setUserId(e.target.value); // input 요소의 값을 userId 상태로 설정합니다.
  };

  const handleClick = () => {
    // 버튼 클릭 이벤트를 처리하는 함수입니다.
    if (userId.length === 0) {
      // userId가 빈 문자열인 경우
      alert("ID를 입력해주세요"); // 경고 메시지를 표시합니다.
      return; // 함수 실행을 종료합니다.
    } else {
      console.log(userId); // userId를 콘솔에 출력합니다.
      router.push(`/theme?userId=${userId}`); // userId를 쿼리 매개변수로 포함하여 '/theme' 경로로 이동합니다.
    }
  };

  const generateRandomId = () => {
    // 랜덤 ID를 생성하는 함수입니다.
    const randomId = Math.random().toString(36).substring(2, 10).toUpperCase(); // 랜덤한 문자열을 생성하여 대문자로 변환합니다.
    setUserId(randomId); // 생성한 랜덤 ID를 userId 상태로 설정합니다.
  };

  return (
    // JSX를 반환합니다.
    <>
      <div className="flex flex-col items-center justify-center">
        {/* flex 컨테이너로, 세로 방향으로 정렬하고, 가운데 정렬합니다. */}
        <p className="font-bold mb-3 text-xl">
          {/* 타이틀 텍스트 */}
          순위 기록을 위해 아이디를 입력해주세요.
        </p>
        <div>
          {/* input과 버튼을 포함하는 div입니다. */}
          <input
            type="text"
            // input 요소의 타입을 텍스트로 설정합니다.
            value={userId}
            // input 요소의 값을 userId 상태로 설정합니다.
            onChange={handleChange}
            // input 요소의 변경 이벤트를 handleChange 함수로 설정합니다.
            className="text-center p-2 border border-gray-300 rounded text-black w-80"
            // CSS 클래스를 설정하여 스타일을 지정합니다.
            placeholder="ID를 입력해주세요"
            // input 요소의 플레이스홀더를 설정합니다.
          />
          <button
            onClick={generateRandomId}
            // 버튼 클릭 이벤트를 generateRandomId 함수로 설정합니다.
            className="ml-5 w-30 text-white font-xl border-gray-300 rounded border p-2 hover:underline"
            // CSS 클래스를 설정하여 스타일을 지정합니다.
          >
            랜덤 ID 생성
            {/* 버튼의 텍스트입니다. */}
          </button>
        </div>
        <button className="mt-10 font-xl hover:underline" onClick={handleClick}>
          {/* 위쪽에 여백을 주고, 텍스트 크기를 크게 설정하며, 호버 시 밑줄이 생기도록 스타일을 지정한 버튼입니다. */}
          다음으로
          {/* 버튼의 텍스트입니다. */}
        </button>
      </div>
    </>
  );
}
