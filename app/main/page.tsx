"use client";

import React from 'react';
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Game from "../../components/game/page";

const Main = () => {
  const router = useRouter();
  const { data } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace(".//login");
    },
  });

  // if(!data && !isGuest) {
  //   router.replace(".//login");
  // }

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      {/* 저장된 테마 정보를 불러오기 */}
      <Game />
    </div>
  );
};

export default Main;
