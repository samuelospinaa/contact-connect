import { createFileRoute } from "@tanstack/react-router";
import { useMarket } from "@/lib/market-context";
import { motion } from "framer-motion";

export const Route = createFileRoute("/strategy")({
  component: StrategyPage,
  head: () => ({ meta: [{ title: "Strategy — tapt." }, { name: "description", content: "Digital strategy framework for developed and emergent markets." }] }),
});

const data = {
  developed: {
    objective: "Capture 0.5% of the urban professional gifting & networking market in NA + EU within 18 months.",
    seo: "Long-tail keywords: 'digital business card', 'NFC gift card', 'modern networking'. Editorial content on design blogs.",
    sem: "Google + LinkedIn ads targeting founders, designers, consultants. CPC budget $4–6.",
    sge: "Optimize for AI Overviews with clear comparison schema vs Linktree, Popl, HiHello.",
    cx: "Premium unboxing, white-glove onboarding, 24h chat support.",
    ux: "App-less. NFC tap → mobile web profile in <800ms.",
    bm: "DTC subscription tiers ($49 card + $5/mo analytics) + B2B team packs.",
    mix: "70% paid social, 20% influencer (LinkedIn, design Twitter), 10% events.",
    budget: "€180k seed marketing for year 1.",
    risks: "Apple Wallet native sharing; commoditization; privacy backlash.",
    ksf: "Repeat gifting rate, NPS > 60, organic referral coefficient > 1.2.",
    kpis: "CAC, LTV, activation rate (tap within 7d), monthly active profiles.",
  },
  emergent: {
    objective: "Build NFC-as-trust-infrastructure in LATAM + SEA — 50k cards in 24 months.",
    seo: "Local-language content (ES, PT, ID, VI). Voice search optimization for low-text queries.",
    sem: "Meta + TikTok-first. Google secondary. WhatsApp click-to-chat as primary conversion.",
    sge: "Local AI assistants (Perplexity, Gemini in regional langs).",
    cx: "WhatsApp-based onboarding & support. Free profile templates for SMBs.",
    ux: "Optimized for 3G + low-end Android. Profile pages < 60kb.",
    bm: "Pay-once card ($12–18 equivalent), no subscription. B2B for delivery couriers, sales reps, real estate.",
    mix: "60% Meta/TikTok, 25% local creator partnerships, 15% trade shows.",
    budget: "€60k marketing year 1, leveraging lower CPMs.",
    risks: "Cash-on-delivery returns, NFC literacy, fragmented payments.",
    ksf: "WhatsApp response time < 5min, local payment coverage, courier partnerships.",
    kpis: "Cards activated per region, WhatsApp conv rate, ARPU by country.",
  },
};

function StrategyPage() {
  const { market } = useMarket();
  const d = data[market];
  const rows = [
    ["Objective", d.objective], ["SEO", d.seo], ["SEM", d.sem], ["SGE", d.sge],
    ["CX", d.cx], ["UX", d.ux], ["Business model", d.bm], ["Marketing mix", d.mix],
    ["Budget", d.budget], ["Risks", d.risks], ["Key success factors", d.ksf], ["KPIs", d.kpis],
  ];

  return (
    <div className="px-6 py-24 max-w-6xl mx-auto">
      <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Strategy</div>
      <h1 className="text-5xl sm:text-6xl mb-4">Two markets. Two playbooks.</h1>
      <p className="text-muted-foreground max-w-2xl mb-12">
        Tap the toggle in the menu to switch. Currently showing{" "}
        <span className="text-accent capitalize">{market}</span> market strategy.
      </p>

      <div className="border-t border-border">
        {rows.map(([k, v], i) => (
          <motion.div
            key={k}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.03 }}
            className="grid md:grid-cols-[200px_1fr] gap-6 py-6 border-b border-border"
          >
            <div className="text-sm uppercase tracking-widest text-muted-foreground">{k}</div>
            <div className="text-base">{v}</div>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 grid md:grid-cols-2 gap-6">
        <Insight title="Digital transformation" body={market === "developed" ? "Cards as API endpoints — every tap fires analytics, CRM sync, calendar booking." : "Cards as cash-replacement trust marker — verified profile in markets with low formal ID coverage."} />
        <Insight title="Megatrends" body="Phygital identity, ambient computing, anti-app fatigue, sustainable luxury." />
        <Insight title="TAM model" body="Perceived usefulness (replaces 5 tools), ease of use (no install), trust (premium materials), social influence (status signal in network)." />
        <Insight title="Monetization" body={market === "developed" ? "SaaS tiers + premium materials (titanium, walnut)." : "One-time card + B2B fleet contracts. WhatsApp Business API integration."} />
      </div>
    </div>
  );
}

function Insight({ title, body }: { title: string; body: string }) {
  return (
    <div className="border border-border rounded-xl p-6 bg-card">
      <h3 className="text-xl mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{body}</p>
    </div>
  );
}
