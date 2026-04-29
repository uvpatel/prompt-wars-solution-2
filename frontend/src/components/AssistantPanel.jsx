import { useState } from "react";
import { askElectionAI } from "../services/api";
import { Sparkles, Send, Loader2, AlertCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function AssistantPanel({ title = "AI Election Assistant", description = "Ask any question about how elections work.", mode = "guide" }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    if (question.trim().length < 5) {
      setError("Please enter a clearer question (at least 5 characters).");
      return;
    }

    setError("");
    setLoading(true);
    setAnswer("");
    try {
      const data = await askElectionAI(question, mode);
      setAnswer(data.answer);
    } catch {
      setError("Unable to fetch AI response. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="shadow-xl shadow-slate-200/50 border-slate-200/60 bg-white h-full flex flex-col hover:border-emerald-200 transition-colors duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl text-slate-800">
          <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
            <Sparkles className="w-5 h-5" />
          </div>
          {title}
        </CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <form onSubmit={onSubmit} className="flex flex-col gap-4 flex-1">
          <Textarea
            aria-label="Election question input"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g. How does vote counting ensure transparency?"
            rows={4}
            className="resize-none focus-visible:ring-emerald-500 text-base"
          />
          <Button type="submit" disabled={loading} className="self-end bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all duration-200 w-full sm:w-auto px-6">
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Thinking...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" /> Ask AI
              </>
            )}
          </Button>
        </form>
        {error && (
          <div className="mt-4 flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-xl border border-red-100" role="alert">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}
        {answer && (
          <div className="mt-6 p-6 bg-slate-50 border border-slate-100 rounded-2xl animate-in fade-in slide-in-from-bottom-4 duration-500" aria-live="polite">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              AI Response
            </h3>
            <div className="text-slate-700 text-[15px] leading-relaxed space-y-3">
              {answer.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
