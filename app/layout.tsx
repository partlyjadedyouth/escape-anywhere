import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Escape Anywhere",
  description: "Escape games using chatGPT",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex justify-center h-screen bg-black text-white font-NanumMyeongjo">
        {children}
      </body>
    </html>
  );
}
