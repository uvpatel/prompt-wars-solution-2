import { Router } from "express";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "ElectionGuide AI backend is healthy"
  });
});

export default router;
