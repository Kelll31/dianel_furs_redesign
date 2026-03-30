import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowRight, Plus, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import LazyImage from "./LazyImage";

const collectionItems = [
  {
    id: 1,
    title: "Экомех",
    subtitle: "Этичная роскошь",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
    description: "Современные технологии и безупречный стиль. Наш экомех не отличим от натурального, но при этом полностью этичен и экологичен.",
    link: "/collection/eco",
    size: "large",
    stats: ["100% Vegan", "Premium Quality", "Eco-Friendly"],
    icon: <Sparkles size={16} />
  },
  {
    id: 2,
    title: "Нутрия",
    subtitle: "Практичная элегантность",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop",
    description: "Мех, который не боится влаги и времени. Идеальный выбор для переменчивой погоды и активного городского ритма.",
    link: "/collection/nutria",
    size: "small",
    stats: ["Water Resistant", "Durable"],
    icon: <ShieldCheck size={16} />
  },
  {
    id: 3,
    title: "Овчина",
    subtitle: "Уютное тепло",
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=1000&auto=format&fit=crop",
    description: "Классика, согревающая в самые сильные морозы. Натуральная овчина высшего качества с уникальной выделкой.",
    link: "/collection/sheepskin",
    size: "small",
    stats: ["Natural Warmth", "Soft"],
    icon: <Zap size={16} />
  },
  {
    id: 4,
    title: "Пушнина",
    subtitle: "Королевский выбор",
    image: "https://cdn.easyfur.com/thumbnail/34/e7/e5/1681481858/russian-sable-skins-tortora-5_1280x1280.jpg",
    description: "Норка, соболь, лиса — вершина мехового искусства. Эксклюзивные изделия для самых взыскательных клиентов.",
    link: "/collection/fur",
    size: "medium",
    stats: ["Elite Grade", "Exclusive"],
    icon: <Sparkles size={16} />
  }
];

interface CollectionCardProps {
  item: typeof collectionItems[0];
  idx: number;
  hoveredId: number | null;
  setHoveredId: (id: number | null) => void;
}

const CollectionCard: React.FC<CollectionCardProps> = ({ item, idx, hoveredId, setHoveredId }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  // Parallax for the image
  const imgX = useTransform(mouseXSpring, [-0.5, 0.5], ["2%", "-2%"]);
  const imgY = useTransform(mouseYSpring, [-0.5, 0.5], ["2%", "-2%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setHoveredId(null);
    // Пружины плавно вернут все значения в 0
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: idx * 0.15 }}
      onMouseEnter={() => setHoveredId(item.id)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        // Этот хак предотвращает сброс overflow:hidden в Safari/Chrome при 3D анимациях
        WebkitMaskImage: "-webkit-radial-gradient(white, black)",
      }}
      // transition-all заменен на transition-colors, чтобы CSS не конфликтовал с Framer Motion (из-за этого были углы)
      // добавлен класс isolate для создания локального контекста наложения
      className={`group relative overflow-hidden rounded-[2.5rem] bg-white/5 border border-white/10 cursor-pointer transition-colors duration-700 isolate ${item.size === "large" ? "md:col-span-7 h-[600px]" :
          item.size === "medium" ? "md:col-span-5 h-[600px]" :
            "md:col-span-6 lg:col-span-4 h-[500px]"
        }`}
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-[-10%] z-0"
        style={{
          x: imgX,
          y: imgY,
        }}
        animate={{
          scale: hoveredId === item.id ? 1.15 : 1.1,
        }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <LazyImage
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700" />
      </motion.div>

      {/* Content Overlay */}
      <div className="absolute inset-0 z-10 p-10 flex flex-col justify-between pointer-events-none">
        <div className="flex justify-between items-start">
          <motion.div
            animate={{
              y: hoveredId === item.id ? 0 : -20,
              opacity: hoveredId === item.id ? 1 : 0
            }}
            className="flex gap-2"
          >
            {item.stats.map(stat => (
              <span key={stat} className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-[8px] uppercase tracking-widest text-white">
                {stat}
              </span>
            ))}
          </motion.div>
          <div className="w-10 h-10 rounded-full bg-accent/20 backdrop-blur-md border border-accent/20 flex items-center justify-center text-accent pointer-events-auto">
            {item.icon}
          </div>
        </div>

        <div className="space-y-4">
          <div className="overflow-hidden">
            <motion.span
              animate={{ y: hoveredId === item.id ? 0 : 20, opacity: hoveredId === item.id ? 1 : 0 }}
              className="text-accent text-[10px] uppercase tracking-[0.4em] block font-bold"
            >
              {item.subtitle}
            </motion.span>
          </div>
          <h3 className="text-4xl md:text-5xl font-serif text-white group-hover:text-accent transition-colors leading-tight">
            {item.title}
          </h3>
          <p className="text-muted text-sm leading-relaxed max-w-sm opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
            {item.description}
          </p>

          <div className="pt-6 flex items-center gap-6 pointer-events-auto">
            <Link
              to={item.link}
              className="flex items-center gap-3 text-[10px] uppercase tracking-widest font-bold text-white group-hover:text-accent transition-colors"
            >
              Исследовать
              <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </Link>
            {/* <button className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-bg transition-all">
              <Plus size={16} />
            </button> */}
          </div>
        </div>
      </div>

      {/* Decorative Border on Hover */}
      <div className="absolute inset-0 border border-transparent group-hover:border-white/10 rounded-[2.5rem] transition-colors duration-700 pointer-events-none overflow-hidden" />
    </motion.div>
  );
}

export default function CollectionShowcase() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="py-32 bg-bg overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-8 h-[1px] bg-accent" />
              <span className="text-accent uppercase tracking-[0.4em] text-[10px] font-bold">Exclusivity Collection</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-[5vw] font-serif leading-[0.9] tracking-tighter px-6"
            >
              Коллекция <br /> <span className="italic text-accent break-words">Исключительности</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col items-end gap-6"
          >
            <p className="text-muted max-w-xs text-sm font-light leading-relaxed text-right">
              Каждое изделие — это манифест вашей индивидуальности. Откройте для себя мир, где роскошь не знает границ.
            </p>
            <Link
              to="/collection"
              className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] font-bold text-accent border-b border-accent/20 pb-2 hover:border-accent transition-all"
            >
              Смотреть все категории
              <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {collectionItems.map((item, idx) => (
            <CollectionCard
              key={item.id}
              item={item}
              idx={idx}
              hoveredId={hoveredId}
              setHoveredId={setHoveredId}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 flex flex-col items-center text-center"
        >
          <div className="w-[1px] h-20 bg-gradient-to-b from-accent to-transparent mb-8" />
          <p className="text-muted text-xs uppercase tracking-[0.5em] mb-4">Discover the Unseen</p>
          <Link to="/collection" className="text-2xl font-serif italic hover:text-accent transition-colors">
            Перейти к полному каталогу
          </Link>
        </motion.div>
      </div>
    </section>
  );
}