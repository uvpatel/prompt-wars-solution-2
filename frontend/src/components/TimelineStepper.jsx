import { useEffect, useState } from "react";
import { fetchTimeline } from "../services/api";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, CheckCircle2, Circle } from "lucide-react";
import { motion } from "framer-motion";

export default function TimelineStepper() {
  const [steps, setSteps] = useState([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    fetchTimeline().then(setSteps).catch(() => setSteps([]));
  }, []);

  if (steps.length === 0) {
    return <div className="text-center p-8 text-slate-500 animate-pulse">Loading timeline...</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative">
      <div className="lg:col-span-5 relative" role="tablist" aria-label="Election lifecycle steps">
        <div className="absolute left-[1.3rem] top-6 bottom-6 w-[2px] bg-slate-200 z-0 hidden lg:block" />
        
        <div className="space-y-3">
          {steps.map((step, index) => {
            const isActive = active === index;
            const isPast = index < active;
            return (
              <button
                key={step.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(index)}
                className={`relative z-10 w-full flex items-center gap-5 p-4 rounded-2xl transition-all duration-300 text-left border ${
                  isActive 
                    ? "bg-white border-emerald-500/50 shadow-lg shadow-emerald-100/50 ring-1 ring-emerald-500/20" 
                    : "bg-transparent border-transparent hover:bg-slate-100/50"
                }`}
              >
                <div className={`flex-shrink-0 flex items-center justify-center transition-colors ${
                  isActive ? "text-emerald-500" : isPast ? "text-emerald-400" : "text-slate-300"
                }`}>
                  {isPast ? <CheckCircle2 className="w-7 h-7 bg-white rounded-full" /> : 
                   isActive ? <Circle className="w-7 h-7 fill-emerald-100 bg-white rounded-full" /> : 
                   <Circle className="w-7 h-7 bg-white rounded-full" />}
                </div>
                <div>
                  <h4 className={`font-semibold text-[15px] ${isActive ? "text-emerald-700" : "text-slate-700"}`}>
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 uppercase tracking-wider font-bold">Step {index + 1}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="lg:col-span-7">
        <motion.div
          key={active}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="h-full"
        >
          <Card className="h-full border-slate-200/60 shadow-2xl shadow-slate-200/50 bg-white overflow-hidden rounded-3xl">
            <CardContent className="p-8 sm:p-12 flex flex-col justify-center h-full min-h-[400px]">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500 mb-8 ring-1 ring-emerald-500/20">
                <CalendarDays className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-extrabold text-slate-800 mb-6 tracking-tight">
                {steps[active]?.title}
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                {steps[active]?.description}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
