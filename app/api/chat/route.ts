import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { systemPrompts } from "@/lib/utils/systemPrompts";

export async function POST(request: NextRequest) {
  const { messages } = await request.json();
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [...systemPrompts, ...messages],
        max_tokens: 1000,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );

    const message = response.data.choices[0].message.content;
    return NextResponse.json({ message });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to generate message" },
      { status: 500 },
    );
  }
}
