import { motion } from "motion/react";

export default function Marquee({ text }: { text: string }) {
  return (
    <div className="py-12 border-y border-white/5 overflow-hidden bg-bg relative">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...Array(10)].map((_, i) => (
          <span
            key={i}
            className="text-4xl md:text-6xl font-serif italic text-white/10 mx-8 uppercase tracking-tighter"
          >
            {text} •
          </span>
        ))}
      </div>
    </div>
  );
}
