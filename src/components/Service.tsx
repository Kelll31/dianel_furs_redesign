import { motion } from "motion/react";
import Footer from "./Footer";
import { Scissors, Ruler, Sparkles, ShieldCheck } from "lucide-react";

const services = [
  {
    icon: Scissors,
    title: "Индивидуальный пошив",
    desc: "Создание уникального изделия по вашим меркам с учетом всех пожеланий.",
  },
  {
    icon: Ruler,
    title: "Подгонка по фигуре",
    desc: "Профессиональная коррекция готовых изделий для идеальной посадки.",
  },
  {
    icon: Sparkles,
    title: "Реставрация",
    desc: "Восстановление первоначального вида ваших любимых меховых изделий.",
  },
  {
    icon: ShieldCheck,
    title: "Хранение",
    desc: "Специализированный меховой холодильник с оптимальным климатом.",
  },
];

export default function Service() {
  return (
    <div className="pt-32">
      <section className="px-6 md:px-12 mb-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h1 className="text-6xl md:text-8xl font-serif mb-8 italic">Сервис</h1>
            <p className="text-muted max-w-2xl mx-auto font-light">
              Мы предлагаем полный спектр услуг по уходу за мехом и созданию 
              эксклюзивных изделий, гарантируя высочайшее качество исполнения.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {services.map((s, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 border border-white/5 hover:border-accent/30 transition-colors group"
              >
                <s.icon className="text-accent mb-6 group-hover:scale-110 transition-transform" size={32} />
                <h3 className="text-xl font-serif mb-4">{s.title}</h3>
                <p className="text-sm text-muted leading-relaxed font-light">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
