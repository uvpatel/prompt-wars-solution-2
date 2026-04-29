import { useEffect, useMemo, useState } from "react";
import { fetchQuizQuestions, submitQuiz } from "../services/api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, BrainCircuit, Loader2, RefreshCcw, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useUserProgress } from "../context/UserProgressContext";

export default function QuizEngine() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const { addXp } = useUserProgress();

  useEffect(() => {
    fetchQuizQuestions().then(setQuestions).catch(() => setQuestions([]));
  }, []);

  const canSubmit = useMemo(
    () => questions.length > 0 && Object.keys(answers).length === questions.length,
    [answers, questions.length]
  );

  function setAnswer(questionId, selectedIndex) {
    if (result) return;
    setAnswers((prev) => ({ ...prev, [questionId]: selectedIndex }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    try {
      const payload = Object.entries(answers).map(([id, selectedIndex]) => ({
        id,
        selectedIndex
      }));
      const data = await submitQuiz(payload);
      setResult(data);
      if (data.score) addXp(data.score * 10);
    } finally {
      setLoading(false);
    }
  }

  function resetQuiz() {
    setAnswers({});
    setResult(null);
    setLoading(true);
    fetchQuizQuestions().then(setQuestions).catch(() => setQuestions([])).finally(() => setLoading(false));
  }

  if (questions.length === 0) {
    return (
      <Card className="shadow-lg border-slate-200/60 p-12 flex flex-col items-center justify-center text-slate-500 bg-white/50 backdrop-blur-sm min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin mb-4 text-emerald-500" />
        <p className="text-lg font-medium">Loading your quiz...</p>
      </Card>
    );
  }

  return (
    <Card className="shadow-xl shadow-slate-200/50 border-slate-200/60 bg-white hover:border-emerald-200 transition-colors duration-300 overflow-hidden">
      <CardHeader className="pb-6 bg-slate-50/50 border-b border-slate-100">
        <CardTitle className="flex items-center gap-2 text-xl text-slate-800">
          <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
            <BrainCircuit className="w-5 h-5" />
          </div>
          Knowledge Test
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-8">
        {!result ? (
          <form onSubmit={onSubmit} className="space-y-10">
            {questions.map((item, index) => (
              <div key={item.id} className="space-y-4">
                <h3 className="text-lg font-bold text-slate-800 flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm text-slate-600">
                    {index + 1}
                  </span>
                  <span className="mt-1">{item.question}</span>
                </h3>
                <div className="pl-0 md:pl-11 grid grid-cols-1 md:grid-cols-2 gap-3">
                  {item.options.map((option, optIdx) => {
                    const isSelected = answers[item.id] === optIdx;
                    return (
                      <label 
                        key={option} 
                        className={`relative flex items-center p-4 cursor-pointer rounded-xl border-2 transition-all duration-200 ${
                          isSelected 
                            ? "border-emerald-500 bg-emerald-50/50 shadow-sm ring-1 ring-emerald-500/20" 
                            : "border-slate-100 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name={item.id}
                          value={optIdx}
                          checked={isSelected}
                          onChange={() => setAnswer(item.id, optIdx)}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 flex-shrink-0 ${
                          isSelected ? "border-emerald-500" : "border-slate-300"
                        }`}>
                          {isSelected && <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />}
                        </div>
                        <span className={`text-[15px] font-medium leading-tight ${isSelected ? "text-emerald-900" : "text-slate-700"}`}>
                          {option}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
            
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-slate-500 font-medium">
                {Object.keys(answers).length} of {questions.length} answered
              </p>
              <Button type="submit" disabled={!canSubmit || loading} className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white shadow-md px-8 py-6 text-lg rounded-xl transition-all duration-200 disabled:opacity-50">
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-3 animate-spin" /> Checking Answers...
                  </>
                ) : (
                  "Submit Quiz"
                )}
              </Button>
            </div>
          </form>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-8"
          >
            <div className="text-center p-8 bg-slate-50 rounded-3xl border border-slate-100">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Final Score</h3>
              <div className="text-6xl font-black text-emerald-600 mb-2">
                {result.score}<span className="text-3xl text-slate-300">/{result.total}</span>
              </div>
              <p className="text-slate-600 font-medium">
                {result.score === result.total 
                  ? "Perfect! You're an election expert." 
                  : result.score > result.total / 2 
                    ? "Great job! You know your stuff." 
                    : "Good effort! Review the feedback below to learn more."}
              </p>
            </div>

            <div className="space-y-6">
              {result.result.map((item, index) => (
                <div key={item.id} className={`p-6 rounded-3xl border ${item.isCorrect ? "bg-emerald-50/30 border-emerald-100" : "bg-red-50/30 border-red-100"}`}>
                  <div className="flex items-start gap-3 mb-4">
                    {item.isCorrect ? (
                      <CheckCircle2 className="w-7 h-7 text-emerald-500 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-7 h-7 text-red-500 flex-shrink-0" />
                    )}
                    <div>
                      <h4 className="font-bold text-slate-800 text-lg">
                        <span className="text-slate-400 mr-2">{index + 1}.</span>
                        {item.question}
                      </h4>
                      <p className={`text-sm font-bold mt-1 uppercase tracking-wider ${item.isCorrect ? "text-emerald-600" : "text-red-600"}`}>
                        {item.isCorrect ? "Correct" : "Incorrect"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="pl-0 sm:pl-10 space-y-3">
                    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                      <p className="text-sm text-slate-700 leading-relaxed">
                        <span className="font-semibold text-slate-900 mr-2">Explanation:</span>
                        {item.explanation}
                      </p>
                    </div>
                    {item.feedback && (
                      <div className="flex items-start gap-3 text-sm text-slate-600 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                        <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <p className="leading-relaxed">{item.feedback}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center pt-8 border-t border-slate-100">
              <Button onClick={resetQuiz} variant="outline" className="gap-2 px-8 py-6 border-slate-200 text-slate-700 hover:bg-slate-50 text-lg rounded-xl font-medium shadow-sm transition-all duration-200 hover:shadow-md">
                <RefreshCcw className="w-5 h-5" />
                Retake Quiz
              </Button>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
