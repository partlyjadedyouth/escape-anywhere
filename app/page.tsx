"use client";

import { SessionProvider } from "next-auth/react";
import Main from "./main/page";

export default function Home() {
  return (
    <SessionProvider>
      <div>
        <Main />
      </div>
    </SessionProvider>
  );
}
