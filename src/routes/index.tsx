import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { NFCCard } from "@/components/NFCCard";
import { useMarket } from "@/lib/market-context";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "tapt. — Contactless cards, remembered." },
      { name: "description", content: "Minimalist NFC cards for networking, gifting and remembering." },
    ],
  }),
});

function Index() {
  const { market } = useMarket();

  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-[110vh] px-6 pt-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="z-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border text-xs text-muted-foreground mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              NFC v2 · shipping worldwide
            </div>
            <h1 className="text-5xl sm:text-7xl text-balance leading-[0.95]">
              One tap.<br />
              <span className="italic text-muted-foreground">Everything </span>
              you are.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-md">
              Contactless cards that replace the paper, the apps, and the awkward
              "let me find your handle". Send one to someone you'd actually like to keep.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/ai-tools" className="px-5 py-3 rounded-full bg-foreground text-primary-foreground text-sm font-medium hover:opacity-90 transition">
                Order your tapt
              </Link>
              <Link to="/strategy" className="px-5 py-3 rounded-full border border-border text-sm hover:bg-secondary transition">
                See the strategy →
              </Link>
            </div>
            <div className="mt-12 text-xs text-muted-foreground">
              Currently viewing: <span className="text-foreground capitalize">{market} markets</span>
            </div>
          </motion.div>

          <div className="relative h-[500px] lg:h-[600px]">
            <NFCCard />
            {/* Ambient glows */}
            <div className="absolute -z-10 inset-0 blur-3xl opacity-40 iridescent rounded-full" />
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground uppercase tracking-[0.3em] flex flex-col items-center gap-2"
        >
          scroll
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }} className="w-px h-8 bg-border" />
        </motion.div>
      </section>

      {/* COMPANY */}
      <Section eyebrow="01 — The company" title="A small studio making cards that don't get thrown away.">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { h: "Built for people", b: "Personal cards, gift cards, founder cards. Each one programmable, each one yours." },
            { h: "NFC + dynamic QR", b: "Works on any phone, anywhere. No app required. Update what your card does, anytime." },
            { h: "Sustainable by default", b: "Recycled PETG and bamboo finishes. One card replaces a thousand paper ones." },
          ].map((f) => (
            <Reveal key={f.h}>
              <div className="border-t border-border pt-6">
                <h3 className="text-xl mb-2">{f.h}</h3>
                <p className="text-sm text-muted-foreground">{f.b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* WHY */}
      <Section eyebrow="02 — Use cases" title="More than a business card.">
        <div className="grid md:grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden">
          {[
            { h: "Networking", b: "Tap any phone, instantly share contact, socials and portfolio. No friction, no follow-up emails forgotten." },
            { h: "Gift to remember", b: "Send a tapt to someone you care about — a curated profile, a photo, a song, a private message." },
            { h: "Founder & creator", b: "Replace the linktree. Embed a payment link, a Calendly, a Spotify, a portfolio — all in one tap." },
            { h: "Events & teams", b: "Bulk cards with consistent branding for conferences, teams or limited drops." },
          ].map((u) => (
            <div key={u.h} className="bg-background p-8 md:p-10 hover:bg-secondary/50 transition-colors">
              <h3 className="text-2xl mb-3">{u.h}</h3>
              <p className="text-sm text-muted-foreground max-w-sm">{u.b}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section eyebrow="03 — Start" title="Built for the way you actually meet people.">
        <div className="flex flex-wrap gap-3">
          <Link to="/journey" className="px-5 py-3 rounded-full bg-foreground text-primary-foreground text-sm">See the journey</Link>
          <Link to="/supply-chain" className="px-5 py-3 rounded-full border border-border text-sm">Read the pipeline</Link>
        </div>
      </Section>
    </div>
  );
}

function Section({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section className="px-6 py-32">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">{eyebrow}</div>
          <h2 className="text-3xl sm:text-5xl max-w-3xl text-balance mb-16">{title}</h2>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

function Reveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
