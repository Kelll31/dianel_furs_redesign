import { motion, AnimatePresence } from "motion/react";
import { X, Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import { products } from "../data/products";

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WishlistModal({ isOpen, onClose }: WishlistModalProps) {
  const { wishlist, toggleWishlist, addToCart } = useAppContext();

  const wishlistItems = products.filter(p => wishlist.includes(p.id));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
          />

          {/* Modal */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-bg border-l border-white/10 z-[201] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Heart size={20} className="text-accent" fill="currentColor" />
                <h2 className="text-xl font-serif uppercase tracking-widest">Избранное</h2>
                <span className="text-[10px] bg-accent/20 text-accent px-2 py-0.5 rounded-full font-bold">
                  {wishlist.length}
                </span>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              {wishlistItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                  <Heart size={48} strokeWidth={1} />
                  <p className="text-sm uppercase tracking-widest">Ваш список желаний пуст</p>
                  <Link
                    to="/catalog"
                    onClick={onClose}
                    className="text-accent text-[10px] uppercase tracking-widest font-bold hover:underline"
                  >
                    Перейти в каталог
                  </Link>
                </div>
              ) : (
                wishlistItems.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-24 aspect-[3/4] bg-white/5 overflow-hidden rounded-sm">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="text-sm font-serif leading-tight">{item.name}</h3>
                          <button
                            onClick={() => toggleWishlist(item)}
                            className="text-white/40 hover:text-accent transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <p className="text-accent text-xs mt-1">{item.price}</p>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <button
                          onClick={() => {
                            addToCart(item);
                          }}
                          className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold hover:text-accent transition-colors"
                        >
                          <ShoppingBag size={14} />
                          В корзину
                        </button>
                        <Link
                          to={`/catalog`} // Should ideally go to product detail
                          onClick={onClose}
                          className="text-[8px] uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                        >
                          Подробнее
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {wishlist.length > 0 && (
              <div className="p-6 border-t border-white/10 space-y-6 bg-bg/80 backdrop-blur-md">
                <button
                  onClick={onClose}
                  className="w-full py-4 bg-accent text-bg text-[10px] uppercase tracking-widest font-bold hover:bg-white transition-colors rounded-sm"
                >
                  Продолжить покупки
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
