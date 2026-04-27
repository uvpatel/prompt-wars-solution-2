import { describe, expect, it } from "vitest";
import { askAiSchema } from "../src/controllers/aiController.js";

describe("askAiSchema validation", () => {
  it("accepts valid input", () => {
    const parsed = askAiSchema.parse({ question: "How are votes counted?", mode: "guide" });
    expect(parsed.mode).toBe("guide");
  });

  it("rejects very short question", () => {
    expect(() => askAiSchema.parse({ question: "Hi", mode: "guide" })).toThrow();
  });
});
