"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center gap-48">
      <div className="w-5/6 max-w-7xl">
        <Image
          src="/image/title.png"
          alt="Title"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-full"
        />
      </div>
      <button
        className="hover:underline sm:text-3xl text-xl font-NanumMyeongjo"
        onClick={() => router.push("/login")}
      >
        바로 시작하기
      </button>
    </div>
  );
}
