import {convertToCoreMessages, streamText} from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req: Request) {
  const { messages, data: { model } } = await req.json();

  const result = await streamText({
    model: openai(model),
    messages: convertToCoreMessages(messages),
  });

  return result.toAIStreamResponse();
}