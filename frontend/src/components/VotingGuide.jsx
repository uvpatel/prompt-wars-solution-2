import { useEffect, useState } from "react";
import { fetchVotingGuide } from "../services/api";

export default function VotingGuide() {
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    fetchVotingGuide().then(setSteps).catch(() => setSteps([]));
  }, []);

  return (
    <section className="panel" aria-label="Step by step voting guide">
      <h2>Step-by-Step Voting Guide</h2>
      <ol className="guide-list">
        {steps.map((step) => (
          <li key={step.step} className="guide-item">
            <h3>
              Step {step.step}: {step.title}
            </h3>
            <p>{step.explanation}</p>
            <h4>Tips</h4>
            <ul>
              {step.tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
