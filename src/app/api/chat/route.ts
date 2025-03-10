import {convertToCoreMessages, streamText} from 'ai';
import { openai } from '@ai-sdk/openai';
import { MODEL_TO_FRIENDLY_NAME } from '../../model-helpers';

export async function POST(req: Request) {
  const { messages, data: { model } } = await req.json();

  let modelToUse = model;
  if (!(model in MODEL_TO_FRIENDLY_NAME)) {
    modelToUse = "gpt-4o-mini";
  }

  const result = await streamText({
    model: openai(modelToUse),
    messages: convertToCoreMessages(messages),
  });

  return result.toAIStreamResponse();
}