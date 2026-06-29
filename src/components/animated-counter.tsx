import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { useEffect } from "react";

export function AnimatedCounter({ value, prefix = "", suffix = "", decimals = 0, duration = 1.2 }: { value: number; prefix?: string; suffix?: string; decimals?: number; duration?: number }) {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => {
    const n = decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString("en-IN");
    return `${prefix}${n}${suffix}`;
  });
  useEffect(() => {
    const ctrl = animate(mv, value, { duration, ease: "easeOut" });
    return ctrl.stop;
  }, [value, duration, mv]);
  return <motion.span>{rounded}</motion.span>;
}
