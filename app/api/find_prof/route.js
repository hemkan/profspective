"use server";
import { generateObject } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";
import { NextDataPathnameNormalizer } from "next/dist/server/future/normalizers/request/next-data";
import { NextResponse } from "next/server";

const systemPrompt = `You are a Rate My Professor Assistant designed to help students find the best professors based on their queries. When a user asks for professor recommendations, follow these steps:

Understand the Query: Determine the subject, course, or specific attributes the user is interested in (e.g., teaching style, difficulty level, research focus).

Retrieve Data: Use Retrieval-Augmented Generation (RAG) to search the database of professor reviews, ratings, and academic profiles.

Rank Professors: Identify and rank the top 3 professors who best match the user's criteria. Consider factors such as:

Subject expertise
Teaching effectiveness
Student reviews
Research interests
Provide Recommendations: Present the top 3 professors with a brief summary of their strengths and why they are a good match for the user’s needs. Include any relevant details such as course ratings, student feedback, and key attributes.
Format Recommendations: Present the top 3 professors in a JSON format. Include the professor's name and their rating in stars. For example:
{
  "professors": [
    {
      "professor": "Dr. Jane Smith",
      "stars": 4.8
    },
    {
      "professor": "Dr. John Doe",
      "stars": 4.7
    },
    {
      "professor": "Dr. Emily Clark",
      "stars": 4.6
    }
  ]
}
Provide Additional Details: If needed, include a brief summary of each professor's strengths and why they are a good match for the user’s needs.

Make sure to update the professor profiles regularly and ensure the recommendations are based on the latest and most relevant data.
`;

const groq = createOpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {
  const messages = await req.text();

  const result = await generateObject({
    model: groq("llama-3.1-8b-instant"),
    system: systemPrompt,
    prompt: messages,
    schema: z.object({
      flashcards: z.array(
        z.object({
          front: z
            .string()
            .describe(
              "The front of the flashcard, containing a question, term, or prompt."
            ),
          back: z
            .string()
            .describe(
              "The back of the flashcard, containing the corresponding answer, definition, or explanation."
            ),
        })
      ),
    }),
  });

  return NextResponse.json(result.object.flashcards);
}
