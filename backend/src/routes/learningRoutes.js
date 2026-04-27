import { Router } from "express";
import {
  getKnowledgeCardsController,
  getTimelineController,
  getVotingGuideController
} from "../controllers/learningController.js";

const router = Router();

router.get("/timeline", getTimelineController);
router.get("/voting-guide", getVotingGuideController);
router.get("/knowledge-cards", getKnowledgeCardsController);

export default router;
