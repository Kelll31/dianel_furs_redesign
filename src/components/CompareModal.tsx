import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight, Plus, ShoppingBag } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export default function CompareModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { compareList, toggleCompare, clearCompare, addToCart } = useAppContext();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-6 md:p-12"
        >
          <div className="absolute inset-0 bg-bg/95 backdrop-blur-xl" onClick={onClose} />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            className="relative w-full max-w-7xl bg-bg border border-white/10 overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="p-8 border-b border-white/5 flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-serif italic">Сравнение моделей</h2>
                <p className="text-muted text-[10px] uppercase tracking-widest mt-2">{compareList.length} / 3 выбрано</p>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={clearCompare}
                  className="px-6 py-3 text-[10px] uppercase tracking-widest font-bold text-white/40 hover:text-white transition-colors"
                >
                  Очистить список
                </button>
                <button
                  onClick={onClose}
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-accent hover:text-accent transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-x-auto custom-scrollbar">
              <div className="flex min-w-full divide-x divide-white/5">
                {compareList.map((item) => (
                  <div key={item.id} className="min-w-[300px] flex-1 p-8 group flex flex-col">
                    <div className="aspect-[3/4] overflow-hidden mb-8 relative flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      <button 
                        onClick={() => toggleCompare(item)}
                        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-bg/80 backdrop-blur-md flex items-center justify-center text-white hover:text-accent transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <h3 className="text-xl font-serif mb-4 h-14 line-clamp-2 leading-tight">{item.name}</h3>
                    <div className="space-y-6 flex-1">
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-white/30 text-[10px] uppercase tracking-widest">Категория</span>
                        <span className="text-xs">{item.category || "Пушнина"}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-white/30 text-[10px] uppercase tracking-widest">Мех</span>
                        <span className="text-xs">Натуральный</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-white/30 text-[10px] uppercase tracking-widest">Длина</span>
                        <span className="text-xs">Миди</span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span className="text-white/30 text-[10px] uppercase tracking-widest">Цена</span>
                        <span className="text-accent font-serif">{item.price || "По запросу"}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-12 flex-shrink-0">
                      <button 
                        onClick={() => addToCart(item)}
                        className="flex-1 py-4 bg-accent text-bg text-[10px] uppercase tracking-widest font-bold hover:bg-white transition-all flex items-center justify-center gap-2"
                      >
                        <ShoppingBag size={14} /> В корзину
                      </button>
                      <button className="w-12 h-12 border border-white/10 flex items-center justify-center hover:border-accent hover:text-accent transition-all">
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                ))}
                {Array.from({ length: Math.max(0, 3 - compareList.length) }).map((_, i) => (
                  <div key={`empty-${i}`} className="min-w-[300px] flex-1 p-8 flex flex-col items-center justify-center border-dashed border-white/5 border-l">
                    <div className="w-20 h-20 rounded-full border border-dashed border-white/10 flex items-center justify-center text-white/10 mb-6">
                      <Plus size={32} />
                    </div>
                    <p className="text-white/20 text-[10px] uppercase tracking-widest">Добавьте товар для сравнения</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
