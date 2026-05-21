import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/journey")({
  component: Journey,
  head: () => ({ meta: [{ title: "Customer Journey — tapt." }, { name: "description", content: "AI-enhanced customer journey map with four AI touchpoints." }] }),
});

const stages = [
  {
    name: "Pre-purchase",
    steps: [
      { t: "Discovery", pain: "Overwhelmed by linktree-clone options.", ai: "AI-powered visual search — upload an aesthetic, find your card." },
      { t: "Consideration", pain: "Can't visualize the card with their info.", ai: "Generative preview: name + role + vibe → instant render." },
    ],
  },
  {
    name: "Purchase",
    steps: [
      { t: "Checkout", pain: "Forgetting to upload assets.", ai: "AI auto-extracts socials from a single LinkedIn URL." },
      { t: "Payment", pain: "Local payment friction (emergent markets).", ai: "Predictive checkout suggests preferred local method (PIX, OXXO, GoPay)." },
    ],
  },
  {
    name: "Post-purchase",
    steps: [
      { t: "Delivery", pain: "Unclear ETA.", ai: "Predictive delivery updates with weather + carrier signals." },
      { t: "Activation", pain: "First-tap confusion.", ai: "Concierge chatbot Tap. walks user through in <2min." },
      { t: "Long-term", pain: "Profile gets stale.", ai: "Quarterly AI nudges: 'your card hasn't been updated since…'" },
    ],
  },
];

function Journey() {
  return (
    <div className="px-6 py-24 max-w-7xl mx-auto">
      <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">International startup</div>
      <h1 className="text-5xl sm:text-6xl mb-6 max-w-3xl">AI-enhanced customer journey.</h1>
      <p className="text-muted-foreground max-w-2xl mb-16">
        End-to-end map across pre-purchase, purchase, post-purchase — with AI interventions at every stage.
      </p>

      <div className="space-y-16">
        {stages.map((s, si) => (
          <div key={s.name}>
            <div className="flex items-baseline gap-4 mb-6">
              <div className="font-display text-3xl text-muted-foreground">0{si + 1}</div>
              <h2 className="text-3xl">{s.name}</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {s.steps.map((step, i) => (
                <motion.div key={step.t}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="border border-border rounded-xl p-6 bg-card relative overflow-hidden group hover:border-accent/40 transition-colors"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 iridescent opacity-10 blur-2xl rounded-full" />
                  <div className="text-xs uppercase tracking-widest text-accent mb-3">Touchpoint</div>
                  <h3 className="text-xl mb-4">{step.t}</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="text-xs uppercase text-muted-foreground tracking-wider mb-1">Pain</div>
                      <div className="text-muted-foreground">{step.pain}</div>
                    </div>
                    <div>
                      <div className="text-xs uppercase text-accent tracking-wider mb-1">AI fix</div>
                      <div>{step.ai}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
