import { z } from "zod";
import { generateElectionAnswer } from "../services/aiService.js";
import { saveInteraction } from "../services/firestoreService.js";

export const askAiSchema = z.object({
  question: z.string().min(5).max(1000),
  mode: z.enum(["guide", "scenario"]).default("guide")
});

export async function askAiController(req, res, next) {
  try {
    const { question, mode } = req.validatedBody;
    const answer = await generateElectionAnswer(question, mode);

    await saveInteraction({ type: "ai", mode, question, answerPreview: answer.slice(0, 500) });

    res.json({ success: true, data: { answer } });
  } catch (err) {
    next(err);
  }
}
