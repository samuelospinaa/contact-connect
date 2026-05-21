import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";

export const Route = createFileRoute("/ai-tools")({
  component: AITools,
  head: () => ({ meta: [{ title: "AI Tools — tapt." }, { name: "description", content: "Interactive prototype of the tapt. platform with AI features." }] }),
});

function AITools() {
  return (
    <div className="px-6 py-24 max-w-6xl mx-auto">
      <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">AI-empowered platform</div>
      <h1 className="text-5xl sm:text-6xl mb-6 max-w-3xl">A clickable prototype, with AI under the hood.</h1>
      <p className="text-muted-foreground max-w-2xl mb-12">
        Two core AI features live below — try them. Full Figma prototype linked at the bottom.
      </p>

      <div className="grid lg:grid-cols-2 gap-8">
        <AIRecommender />
        <AIChatbot />
      </div>

      <div className="mt-20">
        <h2 className="text-3xl mb-6">User flow</h2>
        <div className="grid md:grid-cols-5 gap-4">
          {["Land on store", "Style quiz", "AI recommends 3 cards", "Customize profile", "Tap to share"].map((s, i) => (
            <motion.div key={s} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="border border-border rounded-xl p-5 bg-card relative">
              <div className="text-xs text-accent mb-2">0{i + 1}</div>
              <div className="text-sm">{s}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-20 border border-border rounded-2xl p-10 bg-card text-center">
        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Prototype</div>
        <h3 className="text-2xl mb-4">Full Figma prototype</h3>
        <a href="https://www.figma.com/" target="_blank" rel="noreferrer"
          className="inline-flex px-5 py-3 rounded-full bg-foreground text-primary-foreground text-sm">
          Open in Figma →
        </a>
      </div>
    </div>
  );
}

function AIRecommender() {
  const [vibe, setVibe] = useState<string | null>(null);
  const cards: Record<string, { name: string; desc: string; gradient: string }> = {
    minimal: { name: "Bone Edition", desc: "Matte bone PETG, debossed monogram.", gradient: "linear-gradient(135deg, #e8e4dc, #b8b0a0)" },
    bold: { name: "Iridescent", desc: "Holographic finish, color-shifting in light.", gradient: "var(--gradient-card)" },
    natural: { name: "Walnut", desc: "FSC walnut, laser-engraved profile link.", gradient: "linear-gradient(135deg, #6b4423, #3a2410)" },
  };
  return (
    <div className="border border-border rounded-2xl p-8 bg-card">
      <div className="text-xs uppercase tracking-widest text-accent mb-2">AI Feature · 01</div>
      <h3 className="text-2xl mb-2">Personalized recommendations</h3>
      <p className="text-sm text-muted-foreground mb-6">Tell us your vibe — our model picks a card.</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.keys(cards).map((v) => (
          <button key={v} onClick={() => setVibe(v)}
            className={`px-4 py-2 rounded-full text-sm border transition-all ${vibe === v ? "bg-foreground text-primary-foreground border-foreground" : "border-border hover:bg-secondary"}`}>
            {v}
          </button>
        ))}
      </div>
      {vibe && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4 items-center">
          <div className="w-32 h-20 rounded-lg shrink-0" style={{ background: cards[vibe].gradient }} />
          <div>
            <div className="font-display text-xl">{cards[vibe].name}</div>
            <div className="text-sm text-muted-foreground">{cards[vibe].desc}</div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function AIChatbot() {
  const [msgs, setMsgs] = useState<{ role: "u" | "b"; text: string }[]>([
    { role: "b", text: "Hi — I'm Tap, your AI concierge. Ask me anything about your card." },
  ]);
  const [input, setInput] = useState("");
  const send = () => {
    if (!input.trim()) return;
    const q = input.trim();
    setMsgs((m) => [...m, { role: "u", text: q }]);
    setInput("");
    setTimeout(() => {
      const r = q.toLowerCase().includes("ship") ? "We ship worldwide. 3–5 days developed markets, 7–14 emergent."
        : q.toLowerCase().includes("price") ? "Cards start at €29. Iridescent at €49. Walnut at €69."
        : "Great question — your profile is fully editable anytime, no app required. Want me to walk you through setup?";
      setMsgs((m) => [...m, { role: "b", text: r }]);
    }, 600);
  };
  return (
    <div className="border border-border rounded-2xl p-8 bg-card flex flex-col">
      <div className="text-xs uppercase tracking-widest text-accent mb-2">AI Feature · 02</div>
      <h3 className="text-2xl mb-2">Tap, the concierge</h3>
      <p className="text-sm text-muted-foreground mb-4">Trained on our products + support history.</p>
      <div className="flex-1 space-y-2 mb-4 max-h-64 overflow-y-auto">
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.role === "u" ? "justify-end" : "justify-start"}`}>
            <div className={`px-3 py-2 rounded-2xl text-sm max-w-[80%] ${m.role === "u" ? "bg-foreground text-primary-foreground" : "bg-secondary"}`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Ask Tap…" className="flex-1 px-4 py-2 rounded-full bg-input border border-border text-sm focus:outline-none focus:ring-1 focus:ring-accent" />
        <button onClick={send} className="px-4 py-2 rounded-full bg-foreground text-primary-foreground text-sm">Send</button>
      </div>
    </div>
  );
}
