import { Router } from "express";
import { askAiController, askAiSchema } from "../controllers/aiController.js";
import { validateBody } from "../middleware/validateRequest.js";
import { aiRateLimiter } from "../middleware/rateLimiter.js";

const router = Router();

router.post("/ask", aiRateLimiter, validateBody(askAiSchema), askAiController);

export default router;
