import { useEffect, useMemo, useState } from "react";
import { fetchQuizQuestions, submitQuiz } from "../services/api";

export default function QuizEngine() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchQuizQuestions().then(setQuestions).catch(() => setQuestions([]));
  }, []);

  const canSubmit = useMemo(
    () => questions.length > 0 && Object.keys(answers).length === questions.length,
    [answers, questions.length]
  );

  function setAnswer(questionId, selectedIndex) {
    setAnswers((prev) => ({ ...prev, [questionId]: selectedIndex }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    try {
      const payload = Object.entries(answers).map(([id, selectedIndex]) => ({
        id,
        selectedIndex
      }));
      const data = await submitQuiz(payload);
      setResult(data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="panel" aria-label="Election quiz">
      <h2>Election Quiz System</h2>
      <form onSubmit={onSubmit}>
        {questions.map((item) => (
          <fieldset key={item.id} className="quiz-question">
            <legend>{item.question}</legend>
            {item.options.map((option, index) => (
              <label key={option} className="quiz-option">
                <input
                  type="radio"
                  name={item.id}
                  value={index}
                  checked={answers[item.id] === index}
                  onChange={() => setAnswer(item.id, index)}
                />
                {option}
              </label>
            ))}
          </fieldset>
        ))}
        <button type="submit" disabled={!canSubmit || loading}>
          {loading ? "Checking..." : "Submit Quiz"}
        </button>
      </form>

      {result && (
        <article className="answer-card" aria-live="polite">
          <h3>
            Score: {result.score}/{result.total}
          </h3>
          {result.result.map((item) => (
            <div key={item.id} className="feedback-item">
              <p>
                <strong>{item.question}</strong>
              </p>
              <p>{item.isCorrect ? "Correct" : "Incorrect"}</p>
              <p>{item.explanation}</p>
              <p>{item.feedback}</p>
            </div>
          ))}
        </article>
      )}
    </section>
  );
}
