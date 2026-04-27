import { z } from "zod";
import {
  evaluateQuizSubmission,
  quizQuestions
} from "../services/electionService.js";
import { saveInteraction } from "../services/firestoreService.js";

export const submitQuizSchema = z.object({
  answers: z.array(
    z.object({
      id: z.string(),
      selectedIndex: z.number().int().min(0).max(3)
    })
  )
});

export function getQuizQuestionsController(_req, res) {
  const safeQuestions = quizQuestions.map((q) => ({
    id: q.id,
    question: q.question,
    options: q.options
  }));

  res.json({ success: true, data: safeQuestions });
}

export async function submitQuizController(req, res, next) {
  try {
    const { answers } = req.validatedBody;
    const result = evaluateQuizSubmission(answers);
    const score = result.filter((item) => item.isCorrect).length;

    await saveInteraction({
      type: "quiz",
      score,
      total: result.length
    });

    res.json({
      success: true,
      data: {
        score,
        total: result.length,
        result
      }
    });
  } catch (err) {
    next(err);
  }
}
