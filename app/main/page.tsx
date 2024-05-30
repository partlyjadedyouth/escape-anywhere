"use client";

import React from 'react';
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Theme from "../../components/theme";
import Game from "../../components/game";

const Main = () => {
  const router = useRouter();
  const { data } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace(".//login");
    },
  });

  return (
    <div className="flex justify-center h-screen bg-black text-white">
        <button className="w-40 py-2 px-4 bg-transparent hover:underline focus:outline-none" onClick={() => signOut()}>로그아웃</button>
    </div>
  );
};

export default Main;
