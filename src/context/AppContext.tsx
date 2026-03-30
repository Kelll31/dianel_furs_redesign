import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { toast } from "sonner";
import { Product, CartItem, LookbookItem } from "../types";

interface AppContextType {
  wishlist: number[];
  toggleWishlist: (item: Product | LookbookItem) => void;
  cart: CartItem[];
  addToCart: (product: Product, size?: string, color?: string) => void;
  removeFromCart: (productId: number, size?: string, color?: string) => void;
  updateCartQuantity: (productId: number, quantity: number, size?: string, color?: string) => void;
  clearCart: () => void;
  compareList: Product[];
  toggleCompare: (item: Product) => void;
  clearCompare: () => void;
  isCompareModalOpen: boolean;
  setIsCompareModalOpen: (isOpen: boolean) => void;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem("dianel_wishlist");
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedCart = localStorage.getItem("dianel_cart");
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedCompare = localStorage.getItem("dianel_compare");
      if (savedCompare) setCompareList(JSON.parse(savedCompare));

      const savedTheme = localStorage.getItem("dianel_theme");
      if (savedTheme === "light") {
        document.documentElement.classList.add("light");
      }
    } catch (e) {
      console.error("Error loading from localStorage:", e);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("dianel_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.error("Error saving wishlist:", e);
    }
  }, [wishlist, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("dianel_cart", JSON.stringify(cart));
    } catch (e) {
      console.error("Error saving cart:", e);
    }
  }, [cart, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("dianel_compare", JSON.stringify(compareList));
    } catch (e) {
      console.error("Error saving compare:", e);
    }
  }, [compareList, isLoaded]);

  const toggleWishlist = (item: Product | LookbookItem) => {
    const isIncluded = wishlist.includes(item.id);
    const title = 'name' in item ? item.name : item.title;
    
    if (isIncluded) {
      toast.info(`Удалено из избранного: ${title}`);
      setWishlist((prev) => prev.filter((id) => id !== item.id));
    } else {
      toast.success(`Добавлено в избранное: ${title}`, {
        icon: "❤️",
      });
      setWishlist((prev) => [...prev, item.id]);
    }
  };

  const addToCart = (product: Product, size?: string, color?: string) => {
    const existingItem = cart.find((item) => item.id === product.id);
    
    if (existingItem) {
      toast.success(`Увеличено количество: ${product.name}`);
    } else {
      toast.success(`Добавлено в корзину: ${product.name}`);
    }

    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedSize: size, selectedColor: color }];
    });
  };

  const removeFromCart = (productId: number, size?: string, color?: string) => {
    setCart((prev) => {
      if (size && color) {
        // Удаляем конкретный вариант с размером и цветом
        const filtered = prev.filter(
          (item) => !(item.id === productId && item.selectedSize === size && item.selectedColor === color)
        );
        if (filtered.length === prev.length) {
          toast.info("Товар не найден в корзине");
        } else {
          toast.info("Удалено из корзины");
        }
        return filtered;
      } else {
        // Удаляем все варианты товара
        toast.info("Удалено из корзины");
        return prev.filter((item) => item.id !== productId);
      }
    });
  };

  const updateCartQuantity = (productId: number, quantity: number, size?: string, color?: string) => {
    if (quantity < 1) {
      removeFromCart(productId, size, color);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (size && color) {
          // Обновляем конкретный вариант
          if (item.id === productId && item.selectedSize === size && item.selectedColor === color) {
            return { ...item, quantity };
          }
        } else {
          // Обновляем первый найденный товар с таким ID
          if (item.id === productId) {
            return { ...item, quantity };
          }
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    toast.info("Корзина очищена");
  };

  const toggleTheme = () => {
    const isLight = document.documentElement.classList.toggle("light");
    localStorage.setItem("dianel_theme", isLight ? "light" : "dark");
  };

  const toggleCompare = (item: Product) => {
    const isIncluded = compareList.some((i) => i.id === item.id);
    
    if (isIncluded) {
      toast.info(`Удалено из сравнения: ${item.name}`);
      setCompareList((prev) => prev.filter((i) => i.id !== item.id));
    } else {
      if (compareList.length >= 3) {
        toast.error("Можно сравнивать не более 3-х товаров одновременно");
        return;
      }
      toast.success(`Добавлено к сравнению: ${item.name}`);
      setCompareList((prev) => [...prev, item]);
    }
  };

  const clearCompare = () => {
    setCompareList([]);
    setIsCompareModalOpen(false);
    toast.info("Список сравнения очищен");
  };

  return (
    <AppContext.Provider value={{
      wishlist,
      toggleWishlist,
      cart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      compareList,
      toggleCompare,
      clearCompare,
      isCompareModalOpen,
      setIsCompareModalOpen,
      toggleTheme
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
