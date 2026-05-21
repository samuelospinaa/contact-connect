import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/supply-chain")({
  component: Pipeline,
  head: () => ({ meta: [{ title: "Pipeline & ROI — tapt." }, { name: "description", content: "AI implementation pipeline, tech stack, and ROI justification." }] }),
});

const pipeline = [
  { t: "Data collection", b: "Tap events, profile views, e-commerce funnel, support transcripts. Stored in Snowflake." },
  { t: "Model training", b: "Recommendation model on AWS SageMaker. Fine-tuned LLM (Llama 3) for the concierge." },
  { t: "Deployment", b: "Edge inference via Cloudflare Workers AI. p95 < 120ms globally." },
  { t: "Monitoring", b: "Drift detection (Evidently AI), human-in-loop review weekly, A/B via PostHog." },
];

const stack = [
  ["Cloud", "AWS + Cloudflare"],
  ["Languages", "TypeScript, Python"],
  ["ML", "PyTorch, Llama 3, OpenAI embeddings"],
  ["Data", "Snowflake, dbt, PostHog"],
  ["Vector DB", "Pinecone"],
  ["MLOps", "SageMaker, MLflow, Evidently"],
];

function Pipeline() {
  return (
    <div className="px-6 py-24 max-w-6xl mx-auto">
      <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Supply chain · AI implementation</div>
      <h1 className="text-5xl sm:text-6xl mb-6 max-w-3xl">From data to deployed model.</h1>
      <p className="text-muted-foreground max-w-2xl mb-16">
        End-to-end pipeline for rolling out the recommendation + concierge AI inside tapt.
      </p>

      {/* Pipeline diagram */}
      <div className="relative mb-24">
        <div className="grid md:grid-cols-4 gap-4">
          {pipeline.map((p, i) => (
            <motion.div key={p.t}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative border border-border rounded-xl p-6 bg-card"
            >
              <div className="text-xs text-accent mb-2">Step 0{i + 1}</div>
              <h3 className="text-lg mb-2">{p.t}</h3>
              <p className="text-sm text-muted-foreground">{p.b}</p>
              {i < pipeline.length - 1 && (
                <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-px bg-border" />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stack */}
      <div className="mb-24">
        <h2 className="text-3xl mb-8">Tech stack</h2>
        <div className="grid sm:grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden">
          {stack.map(([k, v]) => (
            <div key={k} className="bg-background p-5 flex justify-between items-baseline">
              <span className="text-sm text-muted-foreground">{k}</span>
              <span className="text-sm">{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ROI */}
      <div>
        <h2 className="text-3xl mb-8">ROI projection — Year 1</h2>
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {[
            { k: "Investment", v: "€240k", s: "Eng + cloud + data licensing" },
            { k: "Expected revenue lift", v: "€820k", s: "+18% conversion via recommender · +12% AOV" },
            { k: "Cost reduction", v: "€95k", s: "−40% support tickets handled by chatbot" },
          ].map((r) => (
            <div key={r.k} className="border border-border rounded-xl p-6 bg-card">
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{r.k}</div>
              <div className="font-display text-4xl mb-1">{r.v}</div>
              <div className="text-xs text-muted-foreground">{r.s}</div>
            </div>
          ))}
        </div>
        <div className="border border-accent/40 rounded-xl p-8 bg-card relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 iridescent opacity-10 blur-3xl rounded-full" />
          <div className="text-xs uppercase tracking-widest text-accent mb-2">Net ROI</div>
          <div className="font-display text-6xl mb-2">281%</div>
          <p className="text-sm text-muted-foreground max-w-lg">
            Payback period ~5 months. Key tracking metrics: tap-to-activation rate, recommender CTR,
            chatbot deflection rate, profile update frequency, NPS delta.
          </p>
        </div>
      </div>
    </div>
  );
}
