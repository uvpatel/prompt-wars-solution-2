import { motion } from "framer-motion";
import AssistantPanel from "../components/AssistantPanel";
import ScenarioSimulator from "../components/ScenarioSimulator";

export default function DashboardPage() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <header className="page-header">
        <h2>Election Education Dashboard</h2>
        <p>
          Learn how elections work through AI guidance, timelines, and practical civic learning modules.
        </p>
      </header>
      <div className="two-column">
        <AssistantPanel />
        <ScenarioSimulator />
      </div>
    </motion.section>
  );
}
