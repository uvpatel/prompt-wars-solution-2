import { useEffect, useState } from "react";
import { fetchKnowledgeCards } from "../services/api";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Lightbulb } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function KnowledgeCards() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetchKnowledgeCards().then(setCards).catch(() => setCards([]));
  }, []);

  return (
    <Card className="shadow-xl shadow-slate-200/50 border-slate-200/60 bg-white hover:border-emerald-200 transition-colors duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-xl text-slate-800">
          <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
            <Lightbulb className="w-5 h-5" />
          </div>
          Educational Knowledge Cards
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {cards.map((card) => (
            <AccordionItem key={card.id} value={card.id} className="border-b border-slate-100 px-2">
              <AccordionTrigger className="text-left font-semibold text-slate-700 hover:text-emerald-600 hover:no-underline transition-colors text-lg py-4">
                {card.title}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed space-y-4 pb-6 pt-2">
                <p className="font-medium text-emerald-800 bg-emerald-50 p-4 rounded-xl border border-emerald-100">{card.summary}</p>
                <p className="px-4">{card.detail}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
