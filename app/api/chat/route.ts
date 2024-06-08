import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY }); // OpenAI 객체를 생성하고 API 키를 설정합니다.})

export async function POST(request: NextRequest) {
  const { messages } = await request.json();

  try {
    const response = await openai.chat.completions.create({
      messages: [...messages],
      model: "gpt-4o",
    });

    const message = response.choices[0].message.content;

    return NextResponse.json({ message });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to generate message" },
      { status: 500 },
    );
  }
}
