import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY });

export async function POST(request: NextRequest) {
  const { text } = await request.json();

  try {
    const response = await openai.images.generate({
      model: "dall-e-2",
      prompt: text,
      n: 1,
      size: "256x256",
    });

    const imageUrl = response.data[0].url;
    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { imageUrl: "Failed to generate image" },
      { status: 500 },
    );
  }
}
