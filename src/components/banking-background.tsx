import { motion } from "motion/react";

export function BankingBackground() {
  const nodes = Array.from({ length: 14 }, (_, i) => ({
    cx: 50 + ((i * 137) % 1100),
    cy: 50 + ((i * 211) % 700),
    r: 3 + (i % 3),
    d: 3 + (i % 5),
  }));
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
      <svg className="absolute inset-0 h-full w-full opacity-40" viewBox="0 0 1200 800" preserveAspectRatio="none">
        <defs>
          <linearGradient id="netg" x1="0" x2="1">
            <stop offset="0%" stopColor="oklch(0.55 0.18 255)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="oklch(0.62 0.16 155)" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        {nodes.map((n, i) =>
          nodes.slice(i + 1, i + 3).map((m, j) => (
            <motion.line
              key={`${i}-${j}`}
              x1={n.cx} y1={n.cy} x2={m.cx} y2={m.cy}
              stroke="url(#netg)" strokeWidth={1}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 3, delay: i * 0.15, repeat: Infinity, repeatType: "reverse" }}
            />
          ))
        )}
        {nodes.map((n, i) => (
          <motion.circle
            key={i} cx={n.cx} cy={n.cy} r={n.r}
            fill="oklch(0.55 0.18 255)"
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{ duration: n.d, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </svg>
      <svg className="absolute -right-20 -bottom-20 h-[600px] w-[600px] opacity-[0.06]" viewBox="0 0 200 200">
        <path d="M100 20 L160 50 V120 C160 160 130 180 100 185 C70 180 40 160 40 120 V50 Z" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M75 105 L92 122 L130 84" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-primary/40"
          style={{ left: `${(i * 53) % 100}%`, top: `${(i * 71) % 100}%` }}
          animate={{ y: [0, -30, 0], x: [0, 20, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 6 + (i % 5), repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
    </div>
  );
}
