import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { getCardRecommendation, createChatSession } from "../lib/gemini";
import { Loader2 } from "lucide-react";
import { CheckoutModal } from "../components/CheckoutModal";

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
  const [vibeInput, setVibeInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [card, setCard] = useState<{ name: string; desc: string; gradient: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const generateCard = async () => {
    if (!vibeInput.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const generated = await getCardRecommendation(vibeInput);
      setCard(generated);
    } catch (err: any) {
      setError(`Error de IA: ${err?.message || "Algo salió mal"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-border rounded-2xl p-8 bg-card flex flex-col">
      <div className="text-xs uppercase tracking-widest text-accent mb-2">AI Feature · 01</div>
      <h3 className="text-2xl mb-2">Custom AI Card Designer</h3>
      <p className="text-sm text-muted-foreground mb-6">Describe your aesthetic and our AI will generate a unique card design instantly.</p>
      
      <div className="flex gap-2 mb-6">
        <input 
          value={vibeInput} 
          onChange={(e) => setVibeInput(e.target.value)} 
          onKeyDown={(e) => e.key === "Enter" && generateCard()}
          placeholder="e.g. Cyberpunk neon city, minimal matte black..." 
          className="flex-1 px-4 py-2 rounded-full bg-input border border-border text-sm focus:outline-none focus:ring-1 focus:ring-accent" 
        />
        <button 
          onClick={generateCard} 
          disabled={loading}
          className="px-4 py-2 rounded-full bg-foreground text-primary-foreground text-sm flex items-center justify-center min-w-[90px]">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Generate"}
        </button>
      </div>

      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

      {card && !loading && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mt-4">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4 items-center flex-1">
            <div className="w-32 h-20 rounded-lg shrink-0 shadow-lg" style={{ background: card.gradient }} />
            <div>
              <div className="font-display text-xl">{card.name}</div>
              <div className="text-sm text-muted-foreground">{card.desc}</div>
            </div>
          </motion.div>
          
          <motion.button 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            onClick={() => setCheckoutOpen(true)}
            className="px-6 py-3 rounded-full bg-accent text-accent-foreground text-sm font-medium hover:opacity-90 shrink-0 w-full sm:w-auto"
          >
            Buy this design
          </motion.button>
        </div>
      )}
      
      <CheckoutModal open={checkoutOpen} onOpenChange={setCheckoutOpen} card={card} />
    </div>
  );
}

function AIChatbot() {
  const [msgs, setMsgs] = useState<{ role: "u" | "b"; text: string }[]>([
    { role: "b", text: "Hi — I'm Tap, your AI concierge. Ask me anything about your card." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  
  // We keep the chat session in a ref so it persists across renders
  const chatSessionRef = useRef<any>(null);

  const initChat = () => {
    try {
      if (!chatSessionRef.current) {
        chatSessionRef.current = createChatSession();
      }
      return true;
    } catch (e: any) {
      setMsgs((m) => [...m, { role: "b", text: `Error de inicialización: ${e?.message || "Error desconocido"}` }]);
      return false;
    }
  };

  const send = async () => {
    if (!input.trim() || loading) return;
    const q = input.trim();
    setMsgs((m) => [...m, { role: "u", text: q }]);
    setInput("");
    
    if (!initChat()) return;

    setLoading(true);
    try {
      const result = await chatSessionRef.current.sendMessage(q);
      const text = result.response.text();
      setMsgs((m) => [...m, { role: "b", text }]);
    } catch (error: any) {
      console.error(error);
      setMsgs((m) => [...m, { role: "b", text: `Error del modelo: ${error?.message || "Hubo un problema de conexión."}` }]);
    } finally {
      setLoading(false);
    }
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  return (
    <div className="border border-border rounded-2xl p-8 bg-card flex flex-col">
      <div className="text-xs uppercase tracking-widest text-accent mb-2">AI Feature · 02</div>
      <h3 className="text-2xl mb-2">Tap, the concierge</h3>
      <p className="text-sm text-muted-foreground mb-4">Powered by Gemini. Ask about pricing, shipping, or materials.</p>
      <div className="flex-1 space-y-2 mb-4 max-h-64 overflow-y-auto pr-2">
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.role === "u" ? "justify-end" : "justify-start"}`}>
            <div className={`px-3 py-2 rounded-2xl text-sm max-w-[80%] ${m.role === "u" ? "bg-foreground text-primary-foreground" : "bg-secondary"}`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="px-3 py-2 rounded-2xl text-sm bg-secondary flex items-center gap-2">
              <Loader2 className="w-3 h-3 animate-spin" /> Escribiendo...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()}
          disabled={loading}
          placeholder="Ask Tap…" className="flex-1 px-4 py-2 rounded-full bg-input border border-border text-sm focus:outline-none focus:ring-1 focus:ring-accent" />
        <button onClick={send} disabled={loading} className="px-4 py-2 rounded-full bg-foreground text-primary-foreground text-sm">Send</button>
      </div>
    </div>
  );
}
