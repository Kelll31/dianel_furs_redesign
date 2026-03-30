import { motion, useScroll, useTransform } from "motion/react";
import { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowRight, Sparkles, Leaf, Recycle, Heart, ShoppingBag, Scale } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import Footer from "./Footer";
import { products } from "../data/products";
import ProductModal from "./ProductModal";
import { Product } from "../types";

const ecoFeatures = [
  {
    icon: <Leaf size={24} />,
    title: "Экологичность",
    description: "100% перерабатываемые материалы, не вредящие окружающей среде"
  },
  {
    icon: <Heart size={24} />,
    title: "Этичность",
    description: "Ни одно животное не пострадало при создании наших изделий"
  },
  {
    icon: <Recycle size={24} />,
    title: "Устойчивость",
    description: "Производство с минимальным углеродным следом"
  },
  {
    icon: <Sparkles size={24} />,
    title: "Качество",
    description: "Премиальные материалы, неотличимые от натурального меха"
  }
];

export default function CollectionEco() {
  const containerRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toggleWishlist, toggleCompare, wishlist, compareList } = useAppContext();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.05]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Фильтруем товары категории "Эко-мех"
  const ecoProducts = products.filter(p => p.category === "Эко-мех");

  return (
    <div ref={containerRef} className="bg-bg min-h-screen relative">
      <Helmet>
        <title>Экомех | Dianel Furs - Этичная роскошь</title>
        <meta name="description" content="Коллекция из эко-меха Dianel Furs. Этичная роскошь, премиальное качество и забота об окружающей среде." />
        <meta name="keywords" content="экомех, эко-мех, искусственный мех, этичная мода, vegan fur" />
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
            alt="Eco Fur Hero"
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
              className="text-accent uppercase text-[10px] font-bold mb-8 block"
            >
              Ethical Luxury
            </motion.span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[6.5vw] font-serif leading-[0.9] tracking-tighter mb-12">
              Экомех <br /> <span className="italic text-accent">Будущего</span>
            </h1>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-[10px] uppercase tracking-[0.4em] text-muted">
              <span className="flex items-center gap-2"><Leaf size={12} className="text-accent" /> 100% Vegan</span>
              <span className="hidden md:block text-accent/20">|</span>
              <span className="flex items-center gap-2"><Heart size={12} className="text-accent" /> Cruelty Free</span>
              <span className="hidden md:block text-accent/20">|</span>
              <span className="flex items-center gap-2"><Recycle size={12} className="text-accent" /> Eco-Friendly</span>
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
          <span className="text-[8px] uppercase tracking-[0.5em] text-accent font-bold">Explore</span>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 md:px-12 relative bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-accent uppercase tracking-[0.5em] text-[10px] font-bold mb-6 block"
            >
              Почему Экомех?
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-serif italic"
            >
              Технологии <span className="text-accent">и</span> Забота
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ecoFeatures.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.8 }}
                className="text-center p-8 border border-white/5 rounded-2xl bg-bg/50 hover:border-accent/30 transition-all duration-500 group"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full border border-accent/30 flex items-center justify-center text-accent group-hover:bg-accent/10 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-serif mb-4">{feature.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-accent uppercase tracking-[0.5em] text-[10px] font-bold mb-6 block"
            >
              Коллекция
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-serif"
            >
              Изделия из <span className="italic text-accent">экомеха</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {ecoProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.8 }}
                className="group cursor-pointer"
                onClick={() => {
                  setSelectedProduct(product);
                  setIsModalOpen(true);
                }}
              >
                <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden mb-6 bg-white/5">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover grayscale-0 md:grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  {/* Quick Add Button */}
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="absolute bottom-6 left-6 right-6 py-4 bg-accent text-bg text-[10px] uppercase tracking-widest font-bold rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-white flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={16} />
                    В корзину
                  </motion.button>

                  {/* Tag */}
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 bg-accent/90 text-bg text-[9px] uppercase tracking-widest font-bold rounded-full">
                      Эко
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-serif group-hover:text-accent transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-muted text-sm">{product.description}</p>
                  <div className="flex items-center justify-between pt-4">
                    <span className="text-accent font-serif text-xl italic">{product.price}</span>
                    <Link
                      to="/catalog"
                      className="text-[10px] uppercase tracking-widest font-bold text-muted hover:text-white transition-colors flex items-center gap-2"
                    >
                      Подробнее <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>

                {/* Mobile Actions */}
                <div className="mt-4 flex gap-3 md:hidden">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product);
                    }}
                    className={`flex-1 py-3 rounded-full flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest font-bold transition-all ${
                      wishlist.includes(product.id)
                        ? "bg-accent border border-accent text-bg"
                        : "bg-white/5 border border-white/10 text-white hover:border-accent hover:text-accent"
                    }`}
                  >
                    <Heart size={14} fill={wishlist.includes(product.id) ? "currentColor" : "none"} />
                    {wishlist.includes(product.id) ? "В избранном" : "Избранное"}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCompare(product);
                    }}
                    className={`flex-1 py-3 rounded-full flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest font-bold transition-all ${
                      compareList.some(i => i.id === product.id)
                        ? "bg-accent border border-accent text-bg"
                        : "bg-white/5 border border-white/10 text-white hover:border-accent hover:text-accent"
                    }`}
                  >
                    <Scale size={14} />
                    {compareList.some(i => i.id === product.id) ? "В сравнении" : "Сравнить"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop"
            alt="CTA Background"
            className="w-full h-full object-cover grayscale opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/90 to-bg" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent uppercase tracking-[0.5em] text-[10px] font-bold mb-6 block"
          >
            Осознанный Выбор
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-serif mb-8"
          >
            Роскошь без <span className="italic text-accent">компромиссов</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted text-lg mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Выберите эко-мех — и получите премиальное качество, этичное производство 
            и безупречный стиль в каждой детали.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/catalog"
              className="inline-flex items-center gap-4 px-12 py-5 bg-accent text-bg text-[10px] uppercase tracking-widest font-bold rounded-full hover:bg-white transition-colors"
            >
              Смотреть весь каталог
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
      />

      <Footer />
    </div>
  );
}
