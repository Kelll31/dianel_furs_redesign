import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2, Move } from "lucide-react";

interface GalleryImage {
  id: number;
  url: string;
  title: string;
  category: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=2000&auto=format&fit=crop",
    title: "Black Diamond Detail",
    category: "Mink"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1539109132314-34a9c655a8c0?q=80&w=2000&auto=format&fit=crop",
    title: "Arctic Fox Texture",
    category: "Fox"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?q=80&w=2000&auto=format&fit=crop",
    title: "Sable Royal Finish",
    category: "Sable"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop",
    title: "Eco-Fur Softness",
    category: "Eco"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop",
    title: "Sheepskin Lining",
    category: "Sheepskin"
  }
];

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const nextSlide = () => {
    if (isZoomed) resetZoom();
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    if (isZoomed) resetZoom();
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const toggleZoom = () => {
    if (isZoomed) {
      resetZoom();
    } else {
      setIsZoomed(true);
      setScale(2.5);
    }
  };

  const resetZoom = () => {
    setIsZoomed(false);
    setScale(1);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "Escape") resetZoom();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isZoomed]);

  return (
    <section className="py-40 bg-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div>
            <span className="text-accent uppercase tracking-[0.5em] text-[10px] font-bold mb-6 block">Visual Inspection</span>
            <h2 className="text-6xl md:text-8xl font-serif leading-none tracking-tighter">
              Детали <br /> <span className="italic text-accent">Крупным планом</span>
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted">
              <span className="text-accent font-bold">{currentIndex + 1}</span>
              <span>/</span>
              <span>{galleryImages.length}</span>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={prevSlide}
                className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-bg transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={nextSlide}
                className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-bg transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div 
          ref={containerRef}
          className="relative aspect-[16/9] md:aspect-[21/9] rounded-[4rem] overflow-hidden bg-white/5 border border-white/10 group/gallery"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 cursor-crosshair"
            >
              <motion.div
                drag={isZoomed}
                dragConstraints={{ top: -400, left: -400, right: 400, bottom: 400 }}
                dragElastic={0.2}
                animate={{ scale: scale }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="w-full h-full relative"
              >
                <img
                  src={galleryImages[currentIndex].url}
                  alt={galleryImages[currentIndex].title}
                  className="w-full h-full object-cover grayscale group-hover/gallery:grayscale-0 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Controls Overlay */}
          <div className="absolute inset-0 z-20 pointer-events-none p-12 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                key={`meta-${currentIndex}`}
                className="bg-bg/40 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem]"
              >
                <span className="text-accent text-[9px] uppercase tracking-widest font-bold mb-2 block">
                  {galleryImages[currentIndex].category}
                </span>
                <h3 className="text-2xl font-serif text-white">{galleryImages[currentIndex].title}</h3>
              </motion.div>

              <div className="flex gap-3 pointer-events-auto">
                <button 
                  onClick={toggleZoom}
                  className={`w-14 h-14 rounded-full backdrop-blur-xl border flex items-center justify-center transition-all ${
                    isZoomed ? "bg-accent border-accent text-bg" : "bg-white/5 border-white/10 text-white hover:bg-white hover:text-bg"
                  }`}
                  title={isZoomed ? "Reset Zoom" : "Zoom In"}
                >
                  {isZoomed ? <ZoomOut size={20} /> : <ZoomIn size={20} />}
                </button>
                <button 
                  className="w-14 h-14 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white flex items-center justify-center hover:bg-white hover:text-bg transition-all"
                  title="Fullscreen"
                >
                  <Maximize2 size={20} />
                </button>
              </div>
            </div>

            <div className="flex justify-center">
              <AnimatePresence>
                {isZoomed && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    className="bg-accent text-bg px-6 py-3 rounded-full flex items-center gap-3 text-[10px] uppercase tracking-widest font-bold shadow-2xl"
                  >
                    <Move size={14} />
                    Тяните, чтобы рассмотреть детали
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="absolute bottom-12 right-12 flex gap-2 z-20">
            {galleryImages.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  if (isZoomed) resetZoom();
                  setCurrentIndex(i);
                }}
                className={`h-1 transition-all duration-500 rounded-full ${
                  currentIndex === i ? "w-12 bg-accent" : "w-4 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
