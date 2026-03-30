import { motion } from "motion/react";

export default function Contact() {
  return (
    <section className="py-32 px-6 md:px-12 bg-bg">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-serif mb-8">
            Записаться на <span className="italic">примерку</span>
          </h2>
          <p className="text-muted mb-16 max-w-xl mx-auto font-light">
            Оставьте заявку, и наши персональные стилисты подготовят для вас 
            эксклюзивную подборку моделей к вашему визиту.
          </p>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-muted ml-1">Ваше имя</label>
              <input
                type="text"
                placeholder="Александра"
                className="w-full bg-transparent border-b border-white/10 py-4 focus:border-accent outline-none transition-colors placeholder:text-white/10"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-muted ml-1">Телефон</label>
              <input
                type="tel"
                placeholder="+7 (___) ___-__-__"
                className="w-full bg-transparent border-b border-white/10 py-4 focus:border-accent outline-none transition-colors placeholder:text-white/10"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-muted ml-1">Пожелания (необязательно)</label>
              <textarea
                placeholder="Интересует нутрия или экомех..."
                rows={1}
                className="w-full bg-transparent border-b border-white/10 py-4 focus:border-accent outline-none transition-colors placeholder:text-white/10 resize-none"
              />
            </div>
            <div className="md:col-span-2 mt-8">
              <button className="w-full py-6 bg-accent text-bg uppercase tracking-[0.3em] text-xs font-bold hover:bg-white transition-colors">
                Отправить заявку
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
