import { convertToCoreMessages, steramText, streamText } from "ai";
import { createOpenAI as createGroq } from "@ai-sdk/openai";

const groq = createGroq({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

async function embedText(data) {
  const response = await fetch("https://api-atlas.nomic.ai/v1/embedding/text", {
    headers: {
      Authorization: `Bearer ${process.env.NOMIC_API_KEY}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      model: "nomic-embed-text-v1.5",
      texts: [data],
    }),
  });
  const result = await response.json();

  return result.embeddings[0];
}

export async function POST(req) {
  const { messages } = await req.json();

  const lastText = messages[messages.length - 1].content;
  const searchEmbedding = await embedText(lastText);

  console.log(searchEmbedding);

  const lastMessageContent = messages[messages.length - 1];

  const stream = await streamText({
    model: groq("llama-3.1-8b-instant"),
    system: "Current System Prompt",
    messages: convertToCoreMessages(messages),
  });

  return stream.toDataStreamResponse();
}
