"use client"; // 이 파일이 클라이언트 측에서 실행됨을 나타냅니다.

import { useRouter } from "next/navigation"; // Next.js의 useRouter 훅을 임포트합니다.
import Image from "next/image"; // Next.js의 Image 컴포넌트를 임포트합니다.

export default function Home() {
  // Home 컴포넌트를 기본으로 내보냅니다.
  const router = useRouter(); // useRouter 훅을 사용하여 router 객체를 생성합니다.

  return (
    // JSX를 반환합니다.
    <div className="flex flex-col items-center justify-center gap-48">
      {/* flex 컨테이너로, 세로 방향으로 정렬하고, 가운데 정렬하며, 큰 간격을 둡니다. */}
      <div className="w-5/6 max-w-7xl">
        {/* 너비가 5/6이고 최대 너비가 7xl인 div입니다. */}
        <Image
          src="/image/title.png"
          // 이미지를 불러올 경로를 지정합니다.
          alt="Title"
          // 이미지의 대체 텍스트입니다.
          width={0}
          height={0}
          // 너비와 높이를 0으로 설정합니다. 이는 'sizes' 속성으로 인해 비율이 자동 조정됩니다.
          sizes="100vw"
          // 이미지가 화면 너비 전체를 차지하도록 설정합니다.
          className="w-full h-full"
          // 이미지가 부모 요소의 너비와 높이를 가득 채우도록 CSS 클래스를 설정합니다.
        />
      </div>
      <button
        className="hover:underline sm:text-3xl text-xl"
        // 호버 시 밑줄이 생기며, 작은 화면에서는 텍스트 크기가 3xl, 기본적으로는 xl로 설정됩니다.
        onClick={() => router.push("/login")}
        // 버튼 클릭 시 '/login' 경로로 이동하도록 설정합니다.
      >
        바로 시작하기
        {/* 버튼의 텍스트입니다. */}
      </button>
    </div>
  );
}
