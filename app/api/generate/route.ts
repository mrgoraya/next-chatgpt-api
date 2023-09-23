import { NextRequest, NextResponse } from "next/server";
import openai from "@/utils/openai";

interface Body {
  prompt: string;
}

export async function POST(request: NextRequest) {
  const { prompt }: Body = await request.json();

  if (!prompt || prompt === "") {
    return NextResponse.json("Please send your prompt", { status: 400 });
  }

  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.5,
  });

  const responseText = chatCompletion.choices[0].message?.content;

  return NextResponse.json({ text: responseText }, { status: 200 });
}
