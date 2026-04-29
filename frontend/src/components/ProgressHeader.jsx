import { useUserProgress } from "../context/UserProgressContext";
import { Trophy, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function ProgressHeader() {
  const { xp, level, currentLevelXp } = useUserProgress();
  return (
    <div className="flex items-center justify-between bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 mb-6 transition-colors duration-300">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 rounded-lg">
          <Trophy className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Civic Level {level}</p>
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">{xp} Total XP</h3>
        </div>
      </div>
      <div className="flex-1 max-w-xs mx-4 hidden sm:block">
        <div className="flex justify-between text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
          <span>Lvl {level}</span>
          <span>{currentLevelXp} / 100 XP</span>
        </div>
        <Progress value={currentLevelXp} className="h-2 bg-slate-100 dark:bg-slate-700" indicatorColor="bg-amber-500" />
      </div>
      <div className="flex items-center gap-1 px-3 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-full text-xs font-bold border border-amber-200 dark:border-amber-800">
        <Star className="w-3 h-3" />
        {100 - currentLevelXp} XP to Lvl {level + 1}
      </div>
    </div>
  );
}
