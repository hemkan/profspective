import { convertToCoreMessages, streamText } from "ai";
import { createOpenAI as createGroq } from "@ai-sdk/openai";
import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { NextResponse } from "next/server";

const embedder = new HuggingFaceInferenceEmbeddings({
  model: "sentence-transformers/all-MiniLM-L6-v2",
  apiKey: process.env.HUGGINGFACE_API_KEY,
});

const groq = createGroq({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

const systemPrompt = `You are a helpful and knowledgeable assistant for a 'Rate My Professor' service. Your role is to suggest professors to students based on their preferences, interests, and the information provided in their prompts. Consider the following when making recommendations:

1. Course Relevance: Suggest professors who teach courses related to the subjects or topics the student is interested in.
2. Teaching Style: If the student mentions a preferred teaching style (e.g., engaging lectures, hands-on learning, tough but fair grading), suggest professors known for those attributes.
3. Difficulty Level: Match the professor’s difficulty rating with the student's preference (e.g., if the student wants an easy-going class, suggest professors with lower difficulty ratings).
4. Student Feedback: Provide suggestions based on positive feedback from other students, especially if specific attributes like helpfulness, clarity, or accessibility are mentioned.
Department Reputation: Consider the reputation of the department and the professor’s standing within it.
Personal Preferences: Account for any other personal preferences mentioned, such as gender, availability of office hours, or specific research interests.
7. Diversity and Inclusion:** If applicable, recommend professors who are known to be inclusive and supportive of diverse backgrounds.

Provide your suggestions with a brief explanation for each recommendation, mentioning key details that align with the user's request. If multiple professors fit the criteria, prioritize those with the highest overall ratings and most relevant feedback. If no exact match is found, suggest the closest alternatives.`;

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

  const lastText = messages[messages.length - 1].content;
  const searchEmbedding = await embedder.embedQuery(lastText);

  const results = await getSearchResult(searchEmbedding);

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
