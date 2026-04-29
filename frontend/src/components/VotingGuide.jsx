import { useEffect, useState } from "react";
import { fetchVotingGuide } from "../services/api";
import { Check, CheckCircle2, Navigation } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function VotingGuide() {
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    fetchVotingGuide().then(setSteps).catch(() => setSteps([]));
  }, []);

  return (
    <Card className="shadow-xl shadow-slate-200/50 border-slate-200/60 bg-white hover:border-emerald-200 transition-colors duration-300">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-2 text-xl text-slate-800">
          <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
            <Navigation className="w-5 h-5" />
          </div>
          Step-by-Step Voting Guide
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8 relative pl-2 md:pl-0">
          <div className="absolute left-[3.25rem] hidden md:block top-4 bottom-4 w-0.5 bg-slate-100 z-0" />
          {steps.map((step) => (
            <div key={step.step} className="relative z-10 flex flex-col md:flex-row gap-4 md:gap-6 group">
              <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white border-2 border-emerald-100 flex items-center justify-center text-emerald-600 text-lg md:text-xl font-black shadow-sm group-hover:border-emerald-400 md:group-hover:scale-110 transition-all duration-300 self-start">
                {step.step}
              </div>
              <div className="flex-1 bg-slate-50/80 hover:bg-white p-6 rounded-2xl border border-slate-100 group-hover:shadow-xl group-hover:shadow-slate-200/40 transition-all duration-300">
                <h3 className="text-xl font-bold text-slate-800 mb-3 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {step.explanation}
                </p>
                
                {step.tips?.length > 0 && (
                  <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/50">
                    <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Tips
                    </h4>
                    <ul className="space-y-2">
                      {step.tips.map((tip) => (
                        <li key={tip} className="flex items-start gap-2 text-sm text-slate-700">
                          <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
