import { motion } from "framer-motion";
import AssistantPanel from "../components/AssistantPanel";
import ScenarioSimulator from "../components/ScenarioSimulator";

export default function DashboardPage() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-8 pb-10"
    >
      <header className="space-y-3">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          Election Education Dashboard
        </h2>
        <p className="text-lg text-slate-500 max-w-3xl leading-relaxed">
          Learn how elections work through AI guidance, interactive timelines, and practical civic learning modules.
        </p>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
        <div className="h-full">
          <AssistantPanel />
        </div>
        <div className="h-full">
          <ScenarioSimulator />
        </div>
      </div>
    </motion.section>
  );
}
