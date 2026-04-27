import { describe, expect, it } from "vitest";
import { evaluateQuizSubmission } from "../src/services/electionService.js";

describe("evaluateQuizSubmission", () => {
  it("scores correct answers", () => {
    const result = evaluateQuizSubmission([
      { id: "q1", selectedIndex: 1 },
      { id: "q2", selectedIndex: 0 },
      { id: "q3", selectedIndex: 1 }
    ]);

    const correctCount = result.filter((item) => item.isCorrect).length;
    expect(correctCount).toBe(3);
  });

  it("marks incorrect selections with feedback", () => {
    const result = evaluateQuizSubmission([{ id: "q1", selectedIndex: 0 }]);
    const first = result.find((item) => item.id === "q1");

    expect(first.isCorrect).toBe(false);
    expect(first.feedback).toContain("Review");
  });
});
