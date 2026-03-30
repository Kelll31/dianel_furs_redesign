import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Helmet } from "react-helmet-async";

export default function About() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <section ref={sectionRef} className="py-32 bg-bg relative overflow-hidden">
      <Helmet>
        <title>О нас | Dianel Furs - История и Традиции</title>
        <meta name="description" content="Узнайте историю мехового дома Dianel Furs. Собственное производство в Пятигорске, 15 лет опыта и только лучший аукционный мех." />
        <meta name="keywords" content="о Dianel Furs, меховой дом Пятигорск, производство шуб, история бренда" />
      </Helmet>
      {/* Vertical Background Text */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden lg:block z-0">
        <span 
          className="vertical-text text-[100px] font-serif font-bold text-transparent uppercase pointer-events-none select-none"
          style={{ WebkitTextStroke: '1px var(--theme-ink)', opacity: 0.05 }}
        >
          ПРЕМИУМ-КАЧЕСТВА
        </span>
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden lg:block z-0">
        <span 
          className="vertical-text text-[100px] font-serif font-bold text-transparent uppercase pointer-events-none select-none"
          style={{ WebkitTextStroke: '1px var(--theme-ink)', opacity: 0.05 }}
        >
          ПРЕМИУМ-КАЧЕСТВА
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="relative z-20"
        >
          <div className="aspect-[4/5] relative z-10 shadow-2xl overflow-hidden">
            <motion.img
              style={{ y: imgY, scale: 1.1 }}
              src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=1000&auto=format&fit=crop"
              alt="Boutique Interior"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
          </div>
          <motion.div 
            style={{ y: bgY }}
            className="absolute -bottom-10 -right-10 w-2/3 aspect-square bg-accent/10 -z-10" 
          />
        </motion.div>

        <div className="relative z-20">
          <motion.span 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-accent uppercase tracking-widest text-xs mb-6 block"
          >
            Традиции и душевное тепло
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-serif leading-tight mb-8"
          >
            Меховой дом <span className="italic">Dianel</span> — <br />
            из самого сердца Кавказа
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6 text-muted leading-relaxed font-light"
          >
            <p>
              Собственное производство, уникальный дизайн и строгий контроль качества. Мы создаем изделия, которые согревают не только тело, но и душу.
            </p>
            <p>
              Каждая модель в нашем меховом доме — это результат кропотливой работы мастеров, 
              сочетание традиционных техник и современного стиля. Мы верим, что шуба 
              должна подчеркивать вашу индивидуальность и дарить тепло в любой мороз.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 grid grid-cols-2 gap-8 border-t border-white/5 pt-12"
          >
            <div>
              <div className="text-3xl font-serif text-accent mb-2">15+</div>
              <div className="text-[10px] uppercase tracking-widest text-muted">Лет опыта</div>
            </div>
            <div>
              <div className="text-3xl font-serif text-accent mb-2">100%</div>
              <div className="text-[10px] uppercase tracking-widest text-muted">Аукционный мех</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
