import { useState } from "react";
import { askElectionAI } from "../services/api";

export default function AssistantPanel({ title = "AI Election Assistant", mode = "guide" }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    if (question.trim().length < 5) {
      setError("Please enter a clearer question (at least 5 characters).");
      return;
    }

    setError("");
    setLoading(true);
    try {
      const data = await askElectionAI(question, mode);
      setAnswer(data.answer);
    } catch {
      setError("Unable to fetch AI response. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="panel" aria-label={title}>
      <h2>{title}</h2>
      <form onSubmit={onSubmit} className="assistant-form">
        <label htmlFor="ai-question">Ask your question</label>
        <textarea
          id="ai-question"
          aria-label="Election question input"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Example: How does vote counting ensure transparency?"
          rows={4}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Thinking..." : "Ask AI"}
        </button>
      </form>
      {error && (
        <p className="error-text" role="alert">
          {error}
        </p>
      )}
      {answer && (
        <article className="answer-card" aria-live="polite">
          <h3>AI Response</h3>
          <pre>{answer}</pre>
        </article>
      )}
    </section>
  );
}
