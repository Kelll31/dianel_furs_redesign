import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-0 z-0"
      >
        <img
          src="https://images.unsplash.com/photo-1544967082-d9d25d867d66?q=80&w=2000&auto=format&fit=crop"
          alt="Fur texture"
          className="w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/80 via-transparent to-bg" />
      </motion.div>

      <motion.div 
        style={{ opacity }}
        className="relative z-10 text-center px-4 max-w-5xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <span className="text-accent uppercase tracking-[0.4em] text-xs md:text-sm mb-6 block font-medium">
            Меховой дом из самого сердца Кавказа
          </span>
          <h1 className="text-6xl md:text-9xl font-serif leading-[0.9] mb-8 tracking-tighter">
            Искусство быть <br />
            <span className="italic text-accent">неповторимой</span>
          </h1>
          <p className="text-muted max-w-xl mx-auto text-sm md:text-base leading-relaxed font-light tracking-wide">
            Готовые изделия и индивидуальный пошив шуб на заказ. Эко-мех — тренд 2026 года. Шубы из нутрии — вечная классика.
          </p>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="vertical-text text-[10px] uppercase tracking-widest text-muted">Прокрутите</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-accent to-transparent" />
      </motion.div>
    </section>
  );
}
