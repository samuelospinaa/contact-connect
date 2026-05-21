import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

export function NFCCard() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const rotateY = useTransform(scrollYProgress, [0, 1], [-15, 35]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [12, -10]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.95, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0.3]);

  return (
    <div ref={ref} className="relative">
      <motion.div
        style={{ scale, y, opacity, perspective: 1500 }}
        className="flex items-center justify-center"
      >
        <Card3D rotateX={rotateX} rotateY={rotateY} />
      </motion.div>
    </div>
  );
}

function Card3D({ rotateX, rotateY }: { rotateX: MotionValue<number>; rotateY: MotionValue<number> }) {
  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="relative w-[340px] h-[210px] sm:w-[420px] sm:h-[260px] rounded-2xl card-gradient shadow-card glow grain"
    >
      {/* Iridescent sheen */}
      <div className="absolute inset-0 rounded-2xl opacity-40 mix-blend-screen"
        style={{ background: "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)" }} />

      {/* Top: logo */}
      <div className="absolute top-6 left-6 flex items-center gap-2 z-10">
        <div className="w-5 h-5 rounded-sm bg-white/90" />
        <span className="font-display text-white text-lg">tapt.</span>
      </div>

      {/* NFC wave icon */}
      <div className="absolute top-6 right-6 z-10">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
          <path d="M5 8c4 0 7 3 7 7M5 12c2 0 4 2 4 4M5 16c.5 0 1 .5 1 1" opacity="0.9" />
          <path d="M9 5c6 0 11 5 11 11M13 5c4.5 0 8 3.5 8 8" opacity="0.7" />
        </svg>
      </div>

      {/* Embossed chip */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-9 rounded-md"
        style={{ background: "linear-gradient(135deg, #d4af6a 0%, #8b6f3a 50%, #d4af6a 100%)" }}>
        <div className="absolute inset-1 border border-amber-900/30 rounded-sm" />
      </div>

      {/* Name */}
      <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between z-10">
        <div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/50">Member</div>
          <div className="font-display text-white text-xl mt-1">Alex Rivera</div>
        </div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">tap to connect</div>
      </div>

      {/* Edge highlight */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 pointer-events-none" />
    </motion.div>
  );
}
