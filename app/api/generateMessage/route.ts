// app/api/generateMessage/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest) {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          {
            role: "user",
            content: "Generate a welcome message for the login page.",
          },
        ],
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
