import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Plus, Sparkles, ShieldCheck, Zap, Star, Crown, Gem, MousePointer2, Scale } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import Footer from "./Footer";
import Marquee from "./Marquee";
import Gallery from "./Gallery";

const collectionCategories = [
  {
    id: "eco",
    title: "Экомех",
    subtitle: "Этичная роскошь",
    image: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?q=80&w=1000&auto=format&fit=crop",
    description: "Современные технологии и безупречный стиль. Наш экомех не отличим от натурального, но при этом полностью этичен и экологичен.",
    size: "large",
    stats: ["100% Vegan", "Premium Quality", "Eco-Friendly"],
    icon: <Sparkles size={20} />,
    color: "accent"
  },
  {
    id: "nutria",
    title: "Нутрия",
    subtitle: "Практичная элегантность",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
    description: "Мех, который не боится влаги и времени. Идеальный выбор для переменчивой погоды и активного городского ритма.",
    size: "small",
    stats: ["Water Resistant", "Durable"],
    icon: <ShieldCheck size={20} />,
    color: "white"
  },
  {
    id: "sheepskin",
    title: "Овчина",
    subtitle: "Уютное тепло",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop",
    description: "Классика, согревающая в самые сильные морозы. Натуральная овчина высшего качества с уникальной выделкой.",
    size: "small",
    stats: ["Natural Warmth", "Soft"],
    icon: <Zap size={20} />,
    color: "white"
  },
  {
    id: "fur",
    title: "Пушнина",
    subtitle: "Королевский выбор",
    image: "https://cdn.easyfur.com/thumbnail/34/e7/e5/1681481858/russian-sable-skins-tortora-5_1280x1280.jpg",
    description: "Норка, соболь, лиса — вершина мехового искусства. Эксклюзивные изделия для самых взыскательных клиентов.",
    size: "medium",
    stats: ["Elite Grade", "Exclusive"],
    icon: <Crown size={20} />,
    color: "accent"
  }
];

const featuredProducts = [
  {
    id: 1,
    name: "Black Diamond Mink",
    category: "Exclusive",
    image: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=1000&auto=format&fit=crop",
    price: "185 000 ₽"
  },
  {
    id: 2,
    name: "Arctic Fox Vest",
    category: "Premium",
    image: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=1000&auto=format&fit=crop",
    price: "145 000 ₽"
  },
  {
    id: 3,
    name: "Sable Royal Coat",
    category: "Limited",
    image: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?q=80&w=1000&auto=format&fit=crop",
    price: "250 000 ₽"
  }
];

export default function Collection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const { compareList, toggleCompare } = useAppContext();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="bg-bg min-h-screen relative">
      <Helmet>
        <title>Коллекция 2026 | Dianel Furs - Эксклюзивные Меха</title>
        <meta name="description" content="Исследуйте новую коллекцию Dianel Furs 2026. Экомех, нутрия, овчина и элитная пушнина. Высочайшее мастерство и современный дизайн." />
        <meta name="keywords" content="коллекция шуб 2026, экомех, шубы из нутрии, овчина, соболь, норка, Dianel Furs" />
      </Helmet>
      {/* Noise Overlay */}
      <div className="fixed inset-0 noise z-[100] opacity-[0.03]" />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <img
            src="https://images.unsplash.com/photo-1544967082-d9d25d867d66?q=80&w=2000&auto=format&fit=crop"
            alt="Hero"
            className="w-full h-full object-cover grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg/90 via-bg/40 to-bg" />
        </motion.div>

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              initial={{ letterSpacing: "1em", opacity: 0 }}
              animate={{ letterSpacing: "0.5em", opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="text-accent uppercase text-[10px] font-bold mb-8 block px-6"
            >
              The Art of Fur Mastery
            </motion.span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5vw] font-serif leading-[0.9] tracking-tighter mb-12 px-6">
              Коллекция <br /> <span className="italic text-accent break-words">Исключительности</span>
            </h1>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-[10px] uppercase tracking-[0.4em] text-muted">
              <span className="flex items-center gap-2"><Gem size={12} className="text-accent" /> Ethical Sourcing</span>
              <span className="hidden md:block text-accent/20">|</span>
              <span className="flex items-center gap-2"><Crown size={12} className="text-accent" /> Royal Heritage</span>
              <span className="hidden md:block text-accent/20">|</span>
              <span className="flex items-center gap-2"><Star size={12} className="text-accent" /> Master Craftsmanship</span>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <div className="w-[1px] h-24 bg-gradient-to-b from-accent to-transparent" />
          <span className="text-[8px] uppercase tracking-[0.5em] text-accent font-bold">Discover</span>
        </motion.div>
      </section>

      {/* Categories Grid - Bento Style */}
      <section className="py-40 px-6 md:px-12 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-12">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-6"
              >
                <div className="w-12 h-[1px] bg-accent" />
                <span className="text-accent uppercase tracking-[0.5em] text-[10px] font-bold">Chapters of Luxury</span>
              </motion.div>
              <h2 className="text-6xl md:text-8xl font-serif leading-none tracking-tighter">
                Главы нашей <br /> <span className="italic text-accent">Истории</span>
              </h2>
            </div>
            <p className="text-muted max-w-sm text-lg font-light leading-relaxed text-right md:text-right">
              Каждая категория — это отдельный мир, где форма встречается с содержанием, а традиции — с будущим.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {collectionCategories.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => {
                  if (item.id === "eco") navigate("/collection/eco");
                  else if (item.id === "nutria") navigate("/collection/nutria");
                  else if (item.id === "sheepskin") navigate("/collection/sheepskin");
                  else if (item.id === "fur") navigate("/collection/fur");
                  else navigate(`/collection/${item.id}`);
                }}
                className={`group relative overflow-hidden rounded-[3.5rem] bg-white/5 border border-white/10 cursor-pointer transition-all duration-1000 ${item.size === "large" ? "md:col-span-8 h-[750px]" :
                    "md:col-span-4 h-[550px]"
                  }`}
              >
                {/* Image Layer */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent opacity-95 group-hover:opacity-70 transition-opacity duration-700" />
                </div>

                {/* Content Layer */}
                <div className="absolute inset-0 z-10 p-12 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <motion.div
                      animate={{
                        y: hoveredId === item.id ? 0 : -20,
                        opacity: hoveredId === item.id ? 1 : 0
                      }}
                      className="flex flex-wrap gap-2"
                    >
                      {item.stats.map(stat => (
                        <span key={stat} className="px-5 py-2 bg-white/10 backdrop-blur-2xl border border-white/10 rounded-full text-[9px] uppercase tracking-widest text-white font-bold">
                          {stat}
                        </span>
                      ))}
                    </motion.div>
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-2xl border ${item.color === "accent" ? "bg-accent/20 border-accent/20 text-accent" : "bg-white/10 border-white/10 text-white"
                      }`}>
                      {item.icon}
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="overflow-hidden">
                      <motion.span
                        animate={{ y: hoveredId === item.id ? 0 : 20, opacity: hoveredId === item.id ? 1 : 0 }}
                        className="text-accent text-[11px] uppercase tracking-[0.6em] block font-bold"
                      >
                        {item.subtitle}
                      </motion.span>
                    </div>
                    <h3 className={`text-5xl md:text-7xl font-serif leading-none tracking-tighter ${hoveredId === item.id ? "text-accent italic" : "text-white"
                      } transition-all duration-700`}>
                      {item.title}
                    </h3>
                    <p className="text-muted text-base md:text-lg leading-relaxed max-w-md opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-6 group-hover:translate-y-0">
                      {item.description}
                    </p>

                    <div className="pt-10 flex items-center gap-10">
                      <span
                        className="flex items-center gap-5 text-[11px] uppercase tracking-[0.5em] font-bold text-white group-hover:text-accent transition-colors"
                      >
                        Исследовать
                        <ArrowRight size={18} className="group-hover:translate-x-4 transition-transform" />
                      </span>
                      <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-bg transition-all group/btn">
                        <Plus size={24} className="group-hover/btn:rotate-90 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Inner Border Decoration */}
                <div className="absolute inset-0 border border-transparent group-hover:border-white/10 rounded-[3.5rem] transition-all duration-1000 pointer-events-none overflow-hidden" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Featured Section */}
      <section className="py-40 bg-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-24">
            <span className="text-accent uppercase tracking-[0.6em] text-[10px] font-bold mb-6 block">Curated Selection</span>
            <h2 className="text-6xl md:text-8xl font-serif italic mb-8">Бестселлеры</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {featuredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: idx * 0.2 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[3/4] rounded-[3rem] overflow-hidden mb-10">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-bg/20 group-hover:bg-transparent transition-colors duration-700" />
                  <div className="absolute top-8 left-8">
                    <span className="px-4 py-1.5 bg-accent text-bg text-[9px] uppercase tracking-widest font-bold rounded-full">
                      {product.category}
                    </span>
                  </div>
                </div>
                <div className="text-center space-y-3">
                  <h3 className="text-3xl font-serif group-hover:text-accent transition-colors">{product.name}</h3>
                  <p className="text-accent font-serif text-xl italic">{product.price}</p>
                  <div className="flex items-center gap-4 pt-4">
                    <Link
                      to="/catalog"
                      className="inline-flex items-center gap-3 text-[10px] uppercase tracking-widest font-bold text-muted hover:text-white transition-colors"
                    >
                      Подробнее <ArrowRight size={12} />
                    </Link>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // @ts-ignore
                        toggleCompare({ ...product, title: product.name });
                      }}
                      className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ml-auto ${compareList.some(i => i.id === product.id)
                          ? "bg-white border-white text-bg"
                          : "border-white/10 hover:border-accent hover:text-accent"
                        }`}
                    >
                      <Scale size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Gallery Section */}
      <Gallery />

      {/* Material Showcase Section */}
      <section className="py-40 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mb-16 md:mb-24"
          >
            <span className="text-accent uppercase tracking-[0.5em] text-[10px] font-bold mb-6 block">Material Excellence</span>
            <h2 className="text-5xl sm:text-6xl md:text-8xl font-serif leading-tight">
              Прикоснитесь <br className="hidden md:block" /> <span className="italic text-accent">к совершенству.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
            >
              <p className="text-muted text-xl font-light leading-relaxed mb-16 max-w-xl">
                Мы отбираем только лучшие шкурки на мировых аукционах. Наше мастерство заключается в том, чтобы подчеркнуть природную красоту меха, превращая его в бессмертную классику.
              </p>

              <div className="space-y-12">
                <div className="flex items-start gap-8">
                  <div className="w-16 h-16 rounded-full border border-accent/30 flex items-center justify-center text-accent shrink-0">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-serif mb-2">Гарантия качества</h4>
                    <p className="text-muted text-sm leading-relaxed">Каждое изделие проходит 3-этапный контроль качества перед тем, как попасть в ваши руки.</p>
                  </div>
                </div>
                <div className="flex items-start gap-8">
                  <div className="w-16 h-16 rounded-full border border-accent/30 flex items-center justify-center text-accent shrink-0">
                    <MousePointer2 size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-serif mb-2">Индивидуальный пошив</h4>
                    <p className="text-muted text-sm leading-relaxed">Мы создаем изделия по вашим меркам, учитывая все пожелания и особенности фигуры.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-[5rem] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=1000&auto=format&fit=crop"
                  alt="Craftsmanship"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Floating Detail Card */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-10 -left-10 bg-bg/80 backdrop-blur-2xl border border-white/10 p-10 rounded-[3rem] max-w-xs shadow-2xl"
              >
                <span className="text-accent text-[9px] uppercase tracking-widest font-bold mb-4 block">Внимание к деталям</span>
                <p className="text-white text-sm font-light leading-relaxed">
                  "Истинная роскошь кроется в деталях, которые не видны на первый взгляд, но ощущаются при каждом прикосновении."
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="py-24">
        <Marquee text="Exclusive Designs • Handcrafted • Premium Fur • Ethical Luxury • Since 1998 • Piatigorsk Mastery" />
      </div>

      <Footer />
    </div>
  );
}
