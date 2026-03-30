import { motion, AnimatePresence } from "motion/react";
import { X, ShoppingBag, Heart, Scale } from "lucide-react";
import { Product } from "../types";
import { useAppContext } from "../context/AppContext";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const { toggleWishlist, toggleCompare, addToCart, wishlist, compareList } = useAppContext();

  if (!product) return null;

  const isInWishlist = wishlist.some(item => item.id === product.id);
  const isInCompare = compareList.some(item => item.id === product.id);

  return (
    <AnimatePresence>
      {isOpen && product && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[300]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-bg border border-white/10 z-[301] shadow-2xl rounded-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-bg/80 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative aspect-[3/4] md:aspect-auto md:h-full bg-white/5">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-2 bg-accent/90 text-bg text-[9px] uppercase tracking-widest font-bold rounded-full">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 md:p-10 flex flex-col">
                <h2 className="text-3xl md:text-4xl font-serif mb-4">{product.name}</h2>
                <p className="text-accent font-serif text-2xl italic mb-6">{product.price}</p>
                
                <p className="text-muted text-sm leading-relaxed mb-8">
                  {product.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {product.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[8px] uppercase tracking-widest text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Sizes */}
                {product.availableSizes && product.availableSizes.length > 0 && (
                  <div className="mb-8">
                    <span className="text-[10px] uppercase tracking-widest text-muted mb-3 block">Доступные размеры</span>
                    <div className="flex flex-wrap gap-2">
                      {product.availableSizes.map(size => (
                        <span
                          key={size}
                          className="w-12 h-12 flex items-center justify-center border border-white/10 rounded-sm text-xs hover:border-accent hover:text-accent transition-colors cursor-pointer"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Colors */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mb-8">
                    <span className="text-[10px] uppercase tracking-widest text-muted mb-3 block">Цвета</span>
                    <div className="flex gap-3">
                      {product.colors.map((color, idx) => (
                        <div
                          key={idx}
                          className="w-8 h-8 rounded-full border border-white/20 cursor-pointer hover:scale-110 transition-transform"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="mt-auto space-y-4">
                  <button
                    onClick={() => {
                      addToCart({
                        ...product,
                        quantity: 1,
                        selectedSize: product.availableSizes?.[0],
                        selectedColor: product.colors?.[0]
                      });
                      onClose();
                    }}
                    className="w-full py-4 bg-accent text-bg text-[10px] uppercase tracking-widest font-bold hover:bg-white transition-colors rounded-sm flex items-center justify-center gap-3"
                  >
                    <ShoppingBag size={18} />
                    Добавить в корзину
                  </button>

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => toggleWishlist(product)}
                      className={`py-3 border text-[10px] uppercase tracking-widest font-bold transition-colors rounded-sm flex items-center justify-center gap-2 ${
                        isInWishlist
                          ? "bg-accent border-accent text-bg"
                          : "border-white/10 hover:border-accent hover:text-accent"
                      }`}
                    >
                      <Heart size={16} fill={isInWishlist ? "currentColor" : "none"} />
                      {isInWishlist ? "В избранном" : "В избранное"}
                    </button>
                    <button
                      onClick={() => toggleCompare(product)}
                      className={`py-3 border text-[10px] uppercase tracking-widest font-bold transition-colors rounded-sm flex items-center justify-center gap-2 ${
                        isInCompare
                          ? "bg-accent border-accent text-bg"
                          : "border-white/10 hover:border-accent hover:text-accent"
                      }`}
                    >
                      <Scale size={16} />
                      {isInCompare ? "В сравнении" : "Сравнить"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
