import QuizEngine from "../components/QuizEngine";

export default function QuizPage() {
  return (
    <section>
      <header className="page-header">
        <h2>Election Quiz</h2>
        <p>Test your understanding and improve using instant feedback.</p>
      </header>
      <QuizEngine />
    </section>
  );
}
