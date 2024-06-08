import { NextRequest, NextResponse } from "next/server"; // Next.js의 서버 측 요청 및 응답 객체를 임포트합니다.
import OpenAI from "openai"; // OpenAI 라이브러리를 임포트합니다.

const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY }); // OpenAI 객체를 생성하고 API 키를 설정합니다.

export async function POST(request: NextRequest) {
  // POST 요청을 처리하는 비동기 함수입니다.
  const { text } = await request.json(); // 요청 본문에서 text 값을 추출합니다.

  try {
    const response = await openai.images.generate({
      // OpenAI의 DALL-E 모델을 사용하여 이미지를 생성합니다.
      model: "dall-e-3", // 사용할 모델을 지정합니다.
      prompt: text, // 이미지 생성을 위한 프롬프트를 설정합니다.
      n: 1, // 생성할 이미지의 수를 설정합니다.
      size: "1024x1024", // 이미지의 크기를 설정합니다.
      quality: "standard", // 이미지의 퀄리티를 설정합니다. (Dall-E 3 전용)
      style: "vivid", // 이미지의 스타일을 설정합니다. (Dall-E 3 전용)
    });

    const imageUrl = response.data[0].url; // 응답에서 생성된 이미지의 URL을 추출합니다.
    return NextResponse.json({ imageUrl }); // 생성된 이미지 URL을 JSON 형식으로 반환합니다.
  } catch (error) {
    console.error(error); // 에러가 발생한 경우 콘솔에 출력합니다.
    return NextResponse.json(
      { imageUrl: "Failed to generate image" }, // 에러 메시지를 JSON 형식으로 반환합니다.
      { status: 500 }, // HTTP 상태 코드를 500으로 설정합니다.
    );
  }
}
