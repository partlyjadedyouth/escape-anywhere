"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex justify-center h-screen bg-black text-white">
      <div className="flex flex-col items-center justify-center gap-60">
        <div className="w-3/5">
          <Image
            src="/image/title.png"
            alt="Title"
            width={10000}
            height={10000}
          />
        </div>
        <div className="flex flex-col items-center">
          <button
            className={
              "w-40 py-2 px-4 bg-transparent hover:underline focus:outline-none"
            }
            onClick={() => router.push("/login")}
          >
            로그인 후 시작하기
          </button>
          <button
            className={
              "w-40 py-2 px-4 bg-transparent hover:underline focus:outline-none"
            }
            onClick={() => router.push("/theme?guest=true")}
          >
            바로 시작하기
          </button>
        </div>
      </div>
      {/* <div className="z-10 grid m-auto text-center">
        <Image
          src="/image/title.png"
          alt="Title"
          width={10000}
          height={10000}
          className="p-4"
        />
        <div className="flex flex-col items-center justify-center">
          <button
            className={
              "w-40 py-2 px-4 bg-transparent hover:underline focus:outline-none"
            }
            onClick={() => router.push("/login")}
          >
            로그인 후 시작하기
          </button>
          <button
            className={
              "w-40 py-2 px-4 bg-transparent hover:underline focus:outline-none"
            }
            onClick={() => router.push("/theme?guest=true")}
          >
            바로 시작하기
          </button>
        </div>
      </div> */}
    </div>
  );
}
