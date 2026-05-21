import { Link } from "@tanstack/react-router";
import { useMarket } from "@/lib/market-context";
import { motion } from "framer-motion";

const links = [
  { to: "/", label: "Home" },
  { to: "/strategy", label: "Strategy" },
  { to: "/ai-tools", label: "AI Tools" },
  { to: "/journey", label: "Journey" },
  { to: "/supply-chain", label: "Pipeline" },
  { to: "/legal", label: "Legal" },
];

export function Header() {
  const { market, setMarket } = useMarket();
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-md iridescent grain" />
          <span className="font-display text-xl tracking-tight">tapt<span className="italic text-muted-foreground">.</span></span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md"
              activeProps={{ className: "px-3 py-1.5 text-sm text-foreground rounded-md bg-secondary" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 p-1 rounded-full bg-secondary border border-border text-xs">
          {(["developed", "emergent"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMarket(m)}
              className={`px-3 py-1 rounded-full transition-all ${
                market === m ? "bg-foreground text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {m === "developed" ? "Developed" : "Emergent"}
            </button>
          ))}
        </div>
      </div>
    </motion.header>
  );
}
