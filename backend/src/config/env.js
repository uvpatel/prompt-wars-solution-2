import dotenv from "dotenv";

dotenv.config();

const required = ["PORT", "GEMINI_API_KEY", "FIREBASE_PROJECT_ID"];

for (const key of required) {
  if (!process.env[key]) {
    // Keep boot failures explicit for production deployment safety.
    console.warn(`[env] Missing required variable: ${key}`);
  }
}

export const env = {
  port: Number(process.env.PORT || 8080),
  nodeEnv: process.env.NODE_ENV || "development",
  geminiApiKey: process.env.GEMINI_API_KEY || "",
  firebaseProjectId: process.env.FIREBASE_PROJECT_ID || "",
  firebaseClientEmail: process.env.FIREBASE_CLIENT_EMAIL || "",
  firebasePrivateKey: (process.env.FIREBASE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
  corsOrigin: process.env.CORS_ORIGIN || "*",
  aiRateLimitMax: Number(process.env.AI_RATE_LIMIT_MAX || 30)
};