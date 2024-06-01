import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Escape Anywhere",
  description: "Escape games using chatGPT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
