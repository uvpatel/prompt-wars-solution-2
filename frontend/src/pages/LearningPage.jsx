import KnowledgeCards from "../components/KnowledgeCards";
import VotingGuide from "../components/VotingGuide";

export default function LearningPage() {
  return (
    <section>
      <header className="page-header">
        <h2>Learning Modules</h2>
        <p>Study election concepts through structured cards and guided voting steps.</p>
      </header>
      <div className="stacked-layout">
        <KnowledgeCards />
        <VotingGuide />
      </div>
    </section>
  );
}
