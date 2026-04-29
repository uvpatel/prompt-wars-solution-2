import { motion } from "framer-motion";
import TimelineStepper from "../components/TimelineStepper";

export default function TimelinePage() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-10 pb-10"
    >
      <header className="space-y-3">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Election Timeline
        </h2>
        <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">
          Explore each stage of the electoral process from registration to the final results announcement.
        </p>
      </header>
      <TimelineStepper />
    </motion.section>
  );
}
