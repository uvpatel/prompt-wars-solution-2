import app from "./app.js";
import { env } from "./config/env.js";

/* ───── Graceful shutdown helpers ───── */

let server;
let isShuttingDown = false;

function shutdown(signal) {
  if (isShuttingDown) return;
  isShuttingDown = true;

  console.log(`\n[server] ${signal} received — shutting down gracefully…`);

  // Stop accepting new connections, then exit.
  server.close(() => {
    console.log("[server] All connections closed. Exiting.");
    process.exit(0);
  });

  // Force-exit if connections hang beyond 10 s (Cloud Run sends SIGTERM + 10 s).
  setTimeout(() => {
    console.error("[server] Forced exit — connections did not close in time.");
    process.exit(1);
  }, 10_000);
}

/* ───── Unhandled error safety nets ───── */

process.on("unhandledRejection", (reason) => {
  console.error("[server] Unhandled promise rejection:", reason);
  // Don't crash in production — Cloud Run will restart the instance anyway.
});

process.on("uncaughtException", (err) => {
  console.error("[server] Uncaught exception:", err);
  // Exit so Cloud Run replaces the instance with a healthy one.
  process.exit(1);
});

/* ───── Start listening ───── */

server = app.listen(env.port, "0.0.0.0", () => {
  console.log(
    `[server] ElectionGuide AI backend listening on port ${env.port} (${env.nodeEnv})`
  );
  console.log(`[server] CORS origin: ${env.corsOrigin}`);
  console.log(
    `[server] Gemini API key: ${env.geminiApiKey ? "configured ✓" : "MISSING ✗"}`
  );
  console.log(
    `[server] Firebase project: ${env.firebaseProjectId || "not set"}`
  );
});

// Keep-alive defaults are fine for most cases, but Cloud Run proxies have a
// 60-second idle timeout.  Setting these slightly higher avoids 502 errors
// caused by the proxy closing the connection before Express does.
server.keepAliveTimeout = 65_000; // ms — slightly above LB's 60 s
server.headersTimeout = 66_000; // must be > keepAliveTimeout

/* ───── Signal handlers for graceful shutdown ───── */

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
