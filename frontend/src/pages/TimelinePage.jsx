import TimelineStepper from "../components/TimelineStepper";

export default function TimelinePage() {
  return (
    <section>
      <header className="page-header">
        <h2>Election Timeline</h2>
        <p>Explore each stage from registration to final results announcement.</p>
      </header>
      <TimelineStepper />
    </section>
  );
}
