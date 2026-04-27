import rateLimit from "express-rate-limit";
import { env } from "../config/env.js";

export const aiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: env.aiRateLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: { message: "Too many AI requests. Please try again later." }
  }
});