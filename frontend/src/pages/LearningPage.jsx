import { motion } from "framer-motion";
import KnowledgeCards from "../components/KnowledgeCards";
import VotingGuide from "../components/VotingGuide";

export default function LearningPage() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-10 pb-10"
    >
      <header className="space-y-3">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Learning Modules
        </h2>
        <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
          Study core election concepts through structured cards and a comprehensive, guided voting breakdown.
        </p>
      </header>
      <div className="space-y-12">
        <KnowledgeCards />
        <VotingGuide />
      </div>
    </motion.section>
  );
}
