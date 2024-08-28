import { convertToCoreMessages, streamText } from "ai";
import { createOpenAI as createGroq } from "@ai-sdk/openai";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { NextResponse } from "next/server";

// Text Embedder Model
const embedder = new HuggingFaceInferenceEmbeddings({
  model: "sentence-transformers/all-MiniLM-L6-v2",
  apiKey: process.env.HUGGINGFACE_API_KEY,
});

// Create Groq Instance
const groq = createGroq({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

// Api SystemPrompt
const systemPrompt = `You are a helpful and knowledgeable chatbot on a RateMyProfessor-like page where users can select their universities, classes, and professors. 
You assist users by answering their questions and guiding them through the process of finding and understanding professor reviews. 
You have access to similar reviews from a vector database, provided as "Returned Results from vector database" in the user's message. 
Use this information only if it enhances your response, but it is not required. 
Your tone should be friendly, clear, and supportive, making the user feel comfortable and well-informed.`;

// Similarity Search in Vector Db
const getSearchResult = async (embeddings) => {
  const address =
    "https://in03-dff868ad19470e1.api.gcp-us-west1.zillizcloud.com/v2/vectordb/entities/search";
  const token = process.env.ZILLIZ_API_KEY;
  const searchInfo = {
    collectionName: "ProfReview",
    data: [embeddings],
    limit: 5,
    outputFields: ["*"],
  };

  try {
    const response = await fetch(address, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchInfo),
    });

    if (!response.ok) {
      throw new Error(`Error! Status: ${response.status}`);
    }

    const resJson = await response.json();
    return resJson.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export async function POST(req) {
  const { messages } = await req.json();

  // Get Embedding of user message
  const lastText = messages[messages.length - 1].content;
  const searchEmbedding = await embedder.embedQuery(lastText);

  // Get search result from vector db
  const results = await getSearchResult(searchEmbedding);

  // Add search result into string
  let searchString =
    "\n\nReturned Results from vector database (done automatically):";
  results.forEach((match) => {
    searchString += `\n
    Professor: ${match.professor}
    Review: ${match.review}
    Subject: ${match.subject}
    Stars: ${match.stars}
    \n\n`;
  });

  // Create new message aray with search results
  const lastMessageContent = lastText + searchString;
  const dataWithoutLastMessage = messages.slice(0, messages.length - 1);
  const updatedMessages = [
    ...dataWithoutLastMessage,
    { role: "user", content: lastMessageContent },
  ];

  const stream = await streamText({
    model: groq("llama-3.1-8b-instant"),
    system: systemPrompt,
    messages: convertToCoreMessages(updatedMessages),
  });

  return stream.toDataStreamResponse();
}
