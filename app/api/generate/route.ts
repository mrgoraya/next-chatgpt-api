import { NextRequest, NextResponse } from "next/server";
import openai from "@/utils/openai";
import { ChatCompletionMessageParam } from "openai/resources/chat/index.mjs";

interface Body {
  prompt: string;
}

const messagesArray: ChatCompletionMessageParam[] = [];

export async function POST(request: NextRequest) {
  const { prompt }: Body = await request.json();

  if (!prompt || prompt === "") {
    return NextResponse.json("Please send your prompt", { status: 400 });
  }

  messagesArray.push({
    role: "user",
    content: prompt,
  } as ChatCompletionMessageParam);

  const chatCompletion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: messagesArray,
    temperature: 0.5,
  });

  const responseText = chatCompletion.choices[0].message?.content;
  messagesArray.push({
    role: "system",
    content: responseText!,
  } as ChatCompletionMessageParam);

  return NextResponse.json({ text: responseText }, { status: 200 });
}
