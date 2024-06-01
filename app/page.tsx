"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex justify-center h-screen bg-black text-white">
      <div className="flex flex-col items-center justify-center gap-48">
        <div className="w-3/5">
          <Image
            src="/image/title.png"
            alt="Title"
            width={10000}
            height={10000}
          />
        </div>
        <button
          className="hover:underline sm:text-3xl text-xl font-NanumMyeongjo"
          onClick={() => router.push("/login")}
        >
          바로 시작하기
        </button>
      </div>
    </div>
  );
}
