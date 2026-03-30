import { useState, MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Plus, X, ChevronLeft, ChevronRight, Scale } from "lucide-react";
import { useAppContext } from "../context/AppContext";

interface LookbookItem {
  id: number;
  title: string;
  description: string;
  image: string;
  price: string;
  category: string;
}

const lookbookData: LookbookItem[] = [
  {
    id: 1,
    title: "Элегантная Нутрия",
    description: "Классический силуэт из натуральной нутрии. Идеальный баланс тепла и стиля для городской зимы.",
    image: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?q=80&w=1200&auto=format&fit=crop",
    price: "от 85 000 ₽",
    category: "Натуральный мех",
  },
  {
    id: 2,
    title: "Эко-Шик 2026",
    description: "Трендовая модель из высококачественного эко-меха. Этичный выбор без компромиссов в роскоши.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
    price: "от 45 000 ₽",
    category: "Эко-мех",
  },
  {
    id: 3,
    title: "Снежная Овчина",
    description: "Уютное пальто из натуральной овчины. Мягкость, которая обволакивает и согревает в самые сильные морозы.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop",
    price: "от 65 000 ₽",
    category: "Овчина",
  },
  {
    id: 4,
    title: "Пушной Эксклюзив",
    description: "Роскошная модель из отборной пушнины. Для тех, кто ценит исключительное качество и статус.",
    image: "https://images.unsplash.com/photo-1539109132314-34a9c655a8c0?q=80&w=1200&auto=format&fit=crop",
    price: "от 120 000 ₽",
    category: "Пушнина",
  },
];

export default function Lookbook() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState<LookbookItem | null>(null);
  const { wishlist, toggleWishlist, compareList, toggleCompare, clearCompare, setIsCompareModalOpen } = useAppContext();

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % lookbookData.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + lookbookData.length) % lookbookData.length);
  };

  const handleToggleWishlist = (item: LookbookItem, e: MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(item);
  };

  const handleToggleCompare = (item: LookbookItem, e: MouseEvent) => {
    e.stopPropagation();
    toggleCompare(item);
  };

  return (
    <section id="lookbook" className="py-32 bg-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <span className="text-accent uppercase tracking-[0.4em] text-xs mb-4 block font-medium">
              Digital Lookbook 2026
            </span>
            <h2 className="text-5xl md:text-8xl font-serif leading-none">
              Вдохновение <br />
              <span className="italic text-accent">в деталях</span>
            </h2>
          </div>
          <div className="flex gap-4">
            {compareList.length > 0 && (
              <button
                onClick={() => setIsCompareModalOpen(true)}
                className="px-6 rounded-full border border-accent text-accent flex items-center gap-3 hover:bg-accent hover:text-bg transition-all duration-500 text-[10px] uppercase tracking-widest font-bold"
              >
                <Scale size={18} />
                Сравнить ({compareList.length})
              </button>
            )}
            <button
              onClick={prevSlide}
              className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-bg transition-all duration-500"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-bg transition-all duration-500"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="relative h-[70vh] md:h-[80vh]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="absolute inset-0 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              {/* Image Container */}
              <div className="lg:col-span-7 h-full relative group cursor-pointer" onClick={() => setSelectedItem(lookbookData[currentIndex])}>
                <div className="absolute inset-0 bg-accent/5 z-10 group-hover:bg-transparent transition-colors duration-700" />
                <motion.img
                  src={lookbookData[currentIndex].image}
                  alt={lookbookData[currentIndex].title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
                
                {/* Interactive Hotspots */}
                <div className="absolute top-8 right-8 z-20 flex flex-col gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => handleToggleWishlist(lookbookData[currentIndex], e)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300 ${
                      wishlist.includes(lookbookData[currentIndex].id)
                        ? "bg-accent border-accent text-bg"
                        : "bg-black/20 border-white/20 text-white hover:bg-white hover:text-bg"
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={wishlist.includes(lookbookData[currentIndex].id) ? "active" : "inactive"}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Heart size={20} fill={wishlist.includes(lookbookData[currentIndex].id) ? "currentColor" : "none"} />
                      </motion.div>
                    </AnimatePresence>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => handleToggleCompare(lookbookData[currentIndex], e)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300 ${
                      compareList.some(i => i.id === lookbookData[currentIndex].id)
                        ? "bg-white border-white text-bg"
                        : "bg-black/20 border-white/20 text-white hover:bg-white hover:text-bg"
                    }`}
                  >
                    <Scale size={20} />
                  </motion.button>
                </div>

                <div className="absolute bottom-8 left-8 z-20">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="bg-bg/80 backdrop-blur-xl p-6 border border-white/10"
                  >
                    <span className="text-[10px] uppercase tracking-widest text-accent block mb-2">
                      {lookbookData[currentIndex].category}
                    </span>
                    <h3 className="text-2xl font-serif italic">{lookbookData[currentIndex].title}</h3>
                  </motion.div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                >
                  <div className="w-20 h-20 rounded-full bg-accent text-bg flex items-center justify-center shadow-2xl">
                    <Plus size={32} />
                  </div>
                </motion.div>
              </div>

              {/* Info Container */}
              <div className="lg:col-span-5 space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
                    {lookbookData[currentIndex].title}
                  </h3>
                  <p className="text-muted text-lg font-light leading-relaxed mb-8">
                    {lookbookData[currentIndex].description}
                  </p>
                  <div className="text-3xl font-serif text-accent mb-12">
                    {lookbookData[currentIndex].price}
                  </div>
                  
                  <button 
                    onClick={() => setSelectedItem(lookbookData[currentIndex])}
                    className="group flex items-center gap-4 text-xs uppercase tracking-[0.4em] font-bold"
                  >
                    <span className="w-12 h-[1px] bg-accent group-hover:w-20 transition-all duration-500" />
                    Подробнее об изделии
                  </button>
                </motion.div>

                <div className="grid grid-cols-2 gap-4 pt-12 border-t border-white/5">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-white/30 block mb-2">Материал</span>
                    <span className="text-sm">Премиальный мех</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-white/30 block mb-2">Производство</span>
                    <span className="text-sm">Пятигорск</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-6"
          >
            <div 
              className="absolute inset-0 bg-bg/95 backdrop-blur-xl"
              onClick={() => setSelectedItem(null)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden grid grid-cols-1 md:grid-cols-2"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-bg transition-all z-20"
              >
                <X size={24} />
              </button>

              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-12 md:p-20 flex flex-col justify-center">
                <span className="text-accent uppercase tracking-[0.4em] text-[10px] font-bold mb-6 block">Lookbook Item</span>
                <h3 className="text-5xl md:text-7xl font-serif mb-8 leading-tight">{selectedItem.title}</h3>
                <p className="text-muted text-lg font-light leading-relaxed mb-12">
                  {selectedItem.description}
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => {
                      toggleWishlist({ ...selectedItem, name: selectedItem.title });
                      setSelectedItem(null);
                    }}
                    className="flex-1 bg-accent text-bg py-5 px-8 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-white transition-all flex items-center justify-center gap-3"
                  >
                    <Heart size={16} fill={wishlist.includes(selectedItem.id) ? "currentColor" : "none"} />
                    В список желаний
                  </button>
                  <button 
                    onClick={() => {
                      toggleCompare({ ...selectedItem, name: selectedItem.title });
                      setSelectedItem(null);
                    }}
                    className="flex-1 border border-white/10 py-5 px-8 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-white hover:text-bg transition-all flex items-center justify-center gap-3"
                  >
                    <Scale size={16} />
                    Сравнить
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
