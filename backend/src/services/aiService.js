import { GoogleGenAI } from "@google/genai";
import { env } from "../config/env.js";

const systemPrompt = `You are ElectionGuide AI, an educational election assistant.
Always answer in this exact structure:
1) Step-by-step explanation
2) Short summary
3) Bullet breakdown
4) Example (if relevant)
Use simple language, neutral tone, and focus on civic education.`;

let client = null;

function getClient() {
  if (!env.geminiApiKey) {
    return null;
  }

  if (!client) {
    client = new GoogleGenAI({ apiKey: env.geminiApiKey });
  }

  return client;
}

export async function generateElectionAnswer(question, mode = "guide") {
  const ai = getClient();

  const modePrefix =
    mode === "scenario"
      ? "Explain this election scenario with possible outcomes and fairness safeguards:"
      : "Answer this election education question:";

  if (!ai) {
    return `Step-by-step explanation:\n1. Understand your election authority rules.\n2. Verify voter eligibility and registration deadlines.\n3. Follow polling and counting procedures from official sources.\n\nShort summary:\nThis is an educational fallback response because AI key is not configured.\n\nBullet breakdown:\n- Check local election website\n- Track official election calendar\n- Use verified public announcements\n\nExample:\nIf no candidate gets a majority, many systems run a second round or form a coalition based on constitutional rules.`;
  }

  const prompt = `${systemPrompt}\n\n${modePrefix}\n${question}`;

  const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt
  });

  return result.text || "I could not generate an answer at this time.";
}
