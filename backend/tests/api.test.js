import request from "supertest";
import { describe, expect, it } from "vitest";
import app from "../src/app.js";

describe("API health", () => {
  it("returns backend health status", async () => {
    const response = await request(app).get("/api/health");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});

describe("learning endpoints", () => {
  it("returns timeline data", async () => {
    const response = await request(app).get("/api/learning/timeline");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);
  });
});
