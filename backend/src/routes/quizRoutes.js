import { Router } from "express";
import {
  getQuizQuestionsController,
  submitQuizController,
  submitQuizSchema
} from "../controllers/quizController.js";
import { validateBody } from "../middleware/validateRequest.js";

const router = Router();

router.get("/questions", getQuizQuestionsController);
router.post("/submit", validateBody(submitQuizSchema), submitQuizController);

export default router;
