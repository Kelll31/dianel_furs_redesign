import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState, useMemo } from "react";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsFinished(true), 1000);
          setTimeout(onComplete, 2200);
          return 100;
        }
        // Sophisticated non-linear progress
        const remaining = 100 - prev;
        const increment = Math.max(0.5, Math.random() * (remaining / 20));
        return Math.min(prev + increment, 100);
      });
    }, 40);
    return () => clearInterval(interval);
  }, [onComplete]);

  const logoText = "DIANEL FURS";
  const letters = useMemo(() => logoText.split(""), []);

  // Subtle floating particles for depth removed as per user request
  const particles = useMemo(() => [], []);

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden bg-bg">
      {/* Noise Overlay */}
      <div className="absolute inset-0 noise z-10" />

      {/* Floating Particles */}
      <div className="absolute inset-0 z-0 opacity-20">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute bg-accent rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, 50, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Split Panels */}
      <motion.div
        initial={{ y: 0 }}
        animate={isFinished ? { y: "-100%" } : { y: 0 }}
        transition={{ duration: 1.4, ease: [0.85, 0, 0.15, 1] }}
        className="absolute top-0 left-0 w-full h-1/2 bg-bg border-b border-white/5 z-20"
      />
      <motion.div
        initial={{ y: 0 }}
        animate={isFinished ? { y: "100%" } : { y: 0 }}
        transition={{ duration: 1.4, ease: [0.85, 0, 0.15, 1] }}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-bg border-t border-white/5 z-20"
      />

      {/* Content */}
      <AnimatePresence>
        {!isFinished && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -40, transition: { duration: 1, ease: [0.43, 0.13, 0.23, 0.96] } }}
            className="absolute inset-0 flex flex-col items-center justify-center z-30"
          >
            <div className="text-center relative">
              {/* Staggered Letter Reveal */}
              <div className="flex justify-center mb-16 overflow-hidden">
                {letters.map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 1,
                      delay: 0.1 * i,
                      ease: [0.215, 0.61, 0.355, 1],
                    }}
                    className={`text-4xl md:text-7xl font-serif uppercase tracking-[0.2em] inline-block ${
                      char === " " ? "w-8" : ""
                    } ${progress > (i / letters.length) * 100 ? "text-accent" : "text-white/10"} transition-colors duration-500`}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
              
              {/* Complex Multi-layered Progress Bar */}
              <div className="relative w-96 h-[3px] mx-auto overflow-hidden">
                {/* Background Track */}
                <div className="absolute inset-0 bg-white/5 rounded-full" />
                
                {/* Main Progress Fill */}
                <motion.div
                  className="absolute inset-y-0 left-0 bg-accent rounded-full shadow-[0_0_15px_rgba(212,175,55,0.5)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
                
                {/* Traveling Light Beam */}
                <motion.div
                  className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white to-transparent opacity-40"
                  animate={{ left: ["-20%", "120%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Secondary Glow */}
                <motion.div
                  className="absolute inset-0 bg-accent/20 blur-md rounded-full"
                  animate={{ opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ width: `${progress}%` }}
                />
              </div>
              
              <div className="mt-10 flex flex-col items-center gap-4 px-6">
                <div className="flex justify-between w-full max-w-96 font-mono text-[10px] tracking-[0.3em] text-muted uppercase">
                  <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-[9px] md:text-[10px] whitespace-nowrap"
                  >
                    Создание Элегантности
                  </motion.span>
                  <span className="text-accent font-bold ml-4">{Math.round(progress)}%</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
