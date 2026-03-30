import { motion, AnimatePresence } from "motion/react";
import { X, ShoppingBag, Trash2, Plus, Minus } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { cart, removeFromCart, updateCartQuantity, clearCart } = useAppContext();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => {
    const price = parseInt(item.price.replace(/\s/g, "").replace("₽", ""));
    return acc + price * item.quantity;
  }, 0);

  const handleRemove = (item: typeof cart[0]) => {
    removeFromCart(item.id, item.selectedSize, item.selectedColor);
  };

  const handleUpdateQuantity = (item: typeof cart[0], quantity: number) => {
    updateCartQuantity(item.id, quantity, item.selectedSize, item.selectedColor);
  };

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
                <ShoppingBag size={20} className="text-accent" />
                <h2 className="text-xl font-serif uppercase tracking-widest">Корзина</h2>
                <span className="text-[10px] bg-accent/20 text-accent px-2 py-0.5 rounded-full font-bold">
                  {totalItems}
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
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                  <ShoppingBag size={48} strokeWidth={1} />
                  <p className="text-sm uppercase tracking-widest">Ваша корзина пуста</p>
                  <Link
                    to="/catalog"
                    onClick={onClose}
                    className="text-accent text-[10px] uppercase tracking-widest font-bold hover:underline"
                  >
                    Перейти в каталог
                  </Link>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4 group">
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
                            onClick={() => handleRemove(item)}
                            className="text-white/40 hover:text-accent transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <p className="text-accent text-xs mt-1">{item.price}</p>
                        <div className="flex gap-2 mt-2">
                          {item.selectedSize && (
                            <span className="text-[8px] uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded-sm">
                              Размер: {item.selectedSize}
                            </span>
                          )}
                          {item.selectedColor && (
                            <div className="flex items-center gap-1">
                              <span className="text-[8px] uppercase tracking-widest text-white/40">Цвет:</span>
                              <div
                                className="w-2 h-2 rounded-full border border-white/20"
                                style={{ backgroundColor: item.selectedColor }}
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-white/10 rounded-full px-2 py-1">
                          <button
                            onClick={() => handleUpdateQuantity(item, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center hover:text-accent transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                          <button
                            onClick={() => handleUpdateQuantity(item, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center hover:text-accent transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <p className="text-xs font-bold">
                          {(parseInt(item.price.replace(/\s/g, "").replace("₽", "")) * item.quantity).toLocaleString()} ₽
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-white/10 space-y-6 bg-bg/80 backdrop-blur-md">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] uppercase tracking-widest text-white/40">Итого:</span>
                  <span className="text-2xl font-serif text-accent">{totalPrice.toLocaleString()} ₽</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={clearCart}
                    className="py-4 border border-white/10 text-[10px] uppercase tracking-widest font-bold hover:bg-white/5 transition-colors rounded-sm"
                  >
                    Очистить
                  </button>
                  <button className="py-4 bg-accent text-bg text-[10px] uppercase tracking-widest font-bold hover:bg-white transition-colors rounded-sm">
                    Оформить заказ
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
