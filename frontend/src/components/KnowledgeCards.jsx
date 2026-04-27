import { useEffect, useState } from "react";
import { fetchKnowledgeCards } from "../services/api";

export default function KnowledgeCards() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetchKnowledgeCards().then(setCards).catch(() => setCards([]));
  }, []);

  return (
    <section className="panel" aria-label="Educational knowledge cards">
      <h2>Educational Knowledge Cards</h2>
      <div className="cards-grid">
        {cards.map((card) => (
          <details key={card.id} className="knowledge-card">
            <summary>{card.title}</summary>
            <p>{card.summary}</p>
            <p>{card.detail}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
