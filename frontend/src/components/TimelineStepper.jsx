import { useEffect, useState } from "react";
import { fetchTimeline } from "../services/api";

export default function TimelineStepper() {
  const [steps, setSteps] = useState([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    fetchTimeline().then(setSteps).catch(() => setSteps([]));
  }, []);

  return (
    <section className="panel" aria-label="Election timeline">
      <h2>Interactive Election Timeline</h2>
      <div className="timeline" role="tablist" aria-label="Election lifecycle steps">
        {steps.map((step, index) => (
          <button
            key={step.id}
            role="tab"
            aria-selected={active === index}
            className={`timeline-step ${active === index ? "active" : ""}`}
            onClick={() => setActive(index)}
          >
            <span className="step-index">{index + 1}</span>
            <span>{step.title}</span>
          </button>
        ))}
      </div>
      {steps[active] && (
        <div className="timeline-detail" role="tabpanel">
          <h3>{steps[active].title}</h3>
          <p>{steps[active].description}</p>
        </div>
      )}
    </section>
  );
}
