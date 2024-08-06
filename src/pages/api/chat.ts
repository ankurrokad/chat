import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { messages } = req.body;

  // Add a system message to provide context for the GPSC exam preparation helper
  const systemMessage = {
    role: "system",
    content:
      "You are an AI assistant helping users prepare for the GPSC exam. Provide detailed and helpful responses to their questions.",
  };

  const updatedMessages = [systemMessage, ...messages];

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-70b-versatile",
        temperature: 0.9,
        max_tokens: 2048,
        messages: updatedMessages,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const assistantMessage = response.data.choices[0].message.content;
    res.status(200).json({ message: assistantMessage });
  } catch (error: any) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "An error occurred while processing your request." });
  }
}
