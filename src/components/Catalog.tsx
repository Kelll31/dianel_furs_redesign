import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Scale, Plus, X, ArrowRight, Search, SlidersHorizontal, ChevronDown, Check, ShoppingBag } from "lucide-react";
import { useParams, useSearchParams, useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import LazyImage from "./LazyImage";
import Footer from "./Footer";
import { products } from "../data/products";
import { Product } from "../types";
import Fuse from "fuse.js";
const categories = ["Все", "Пушнина", "Эко-мех", "Нутрия", "Овчина"];
const categoryMap: Record<string, string> = {
  "eco": "Эко-мех",
  "nutria": "Нутрия",
  "sheepskin": "Овчина",
  "fur": "Пушнина"
};

const sortOptions = [
  { label: "По умолчанию", value: "default" },
  { label: "Сначала дешевле", value: "price-asc" },
  { label: "Сначала дороже", value: "price-desc" },
  { label: "По названию", value: "name" },
];

export default function Catalog() {
  const { category: urlCategory } = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const queryCategory = searchParams.get("category");
  const isCatalogPage = location.pathname === "/catalog";

  const initialCategory = useMemo(() => {
    if (urlCategory && categoryMap[urlCategory]) return categoryMap[urlCategory];
    if (queryCategory && categories.includes(queryCategory)) return queryCategory;
    return "Все";
  }, [urlCategory, queryCategory]);

  const [activeCategory, setActiveCategory] = useState(initialCategory);

  useEffect(() => {
    setActiveCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    const search = searchParams.get("search");
    if (search) {
      setSearchQuery(search);
    }
  }, [searchParams]);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { wishlist, toggleWishlist, compareList, toggleCompare, clearCompare, setIsCompareModalOpen, addToCart } = useAppContext();

  const fuse = useMemo(() => {
    return new Fuse(products, {
      keys: ["name", "description", "category", "tags"],
      threshold: 0.35,
      distance: 100,
      minMatchCharLength: 2,
    });
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let result: Product[] = [];

    if (searchQuery.trim() !== "") {
      result = fuse.search(searchQuery).map((res) => res.item);
    } else {
      result = [...products];
    }

    result = result.filter((p) => {
      const matchesCategory = activeCategory === "Все" || p.category === activeCategory;
      const matchesPrice = p.priceValue >= priceRange[0] && p.priceValue <= priceRange[1];
      return matchesCategory && matchesPrice;
    });

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.priceValue - b.priceValue);
        break;
      case "price-desc":
        result.sort((a, b) => b.priceValue - a.priceValue);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // If there's a search query, fuse.js already sorted by relevance.
        // If no search query, we might want to keep the original order or some default.
        break;
    }

    return result;
  }, [activeCategory, searchQuery, sortBy, priceRange, fuse]);

  return (
    <div className={isCatalogPage ? "pt-20" : ""}>
      <section id="catalog" className="py-32 px-6 md:px-12 relative overflow-hidden bg-bg">
      {/* Background Decorative Elements */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden lg:block">
        <span className="vertical-text text-[80px] font-serif font-bold text-white/[0.01] uppercase pointer-events-none select-none">
          Exclusive Collection
        </span>
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden lg:block">
        <span className="vertical-text text-[80px] font-serif font-bold text-white/[0.01] uppercase pointer-events-none select-none">
          Dianel Furs 2026
        </span>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-12 px-6">
          <div className="max-w-2xl">
            <span className="text-accent uppercase tracking-[0.4em] text-[10px] mb-4 block font-bold">Premium Selection</span>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif leading-none mb-8">
              Коллекция <br /> <span className="italic text-accent break-words">Исключительности</span>
            </h2>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-6 mt-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[10px] uppercase tracking-widest font-bold pb-2 transition-all relative ${
                    activeCategory === cat ? "text-accent" : "text-white/40 hover:text-white"
                  }`}
                >
                  {cat}
                  {activeCategory === cat && (
                    <motion.div 
                      layoutId="catUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[1px] bg-accent" 
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
          
          <div className="w-full lg:w-auto flex flex-col gap-6">
            {/* Search and Sort */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                <input
                  type="text"
                  placeholder="Поиск по коллекции..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-10 pr-4 text-xs focus:border-accent outline-none transition-colors"
                />
              </div>
              
              <div className="flex gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none">
                  <button
                    onClick={() => setIsSortOpen(!isSortOpen)}
                    className="w-full sm:w-auto flex items-center justify-between gap-4 bg-white/5 border border-white/10 rounded-full py-3 px-6 text-xs hover:border-white/30 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal size={14} className="text-accent" />
                      <span>{sortOptions.find(o => o.value === sortBy)?.label}</span>
                    </div>
                    <ChevronDown size={14} className={`transition-transform duration-300 ${isSortOpen ? "rotate-180" : ""}`} />
                  </button>
                  
                  <AnimatePresence>
                    {isSortOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full right-0 mt-2 w-full sm:w-48 bg-bg border border-white/10 rounded-xl overflow-hidden z-50 shadow-2xl"
                      >
                        {sortOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setSortBy(option.value);
                              setIsSortOpen(false);
                            }}
                            className={`w-full text-left px-6 py-4 text-xs hover:bg-white/5 transition-colors flex items-center justify-between ${
                              sortBy === option.value ? "text-accent" : "text-white/60"
                            }`}
                          >
                            {option.label}
                            {sortBy === option.value && <Check size={12} />}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all text-xs ${
                    isFilterOpen ? "bg-accent border-accent text-bg" : "bg-white/5 border-white/10 text-white hover:border-white/30"
                  }`}
                >
                  <SlidersHorizontal size={14} />
                  Фильтры
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Filter Panel */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-12"
            >
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 grid grid-cols-1 md:grid-cols-3 gap-12">
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-accent font-bold mb-6">Ценовой диапазон</h4>
                  <div className="space-y-6">
                    <div className="flex justify-between text-xs text-white/60">
                      <span>{priceRange[0].toLocaleString()} ₽</span>
                      <span>{priceRange[1].toLocaleString()} ₽</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="200000" 
                      step="5000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full accent-accent bg-white/10 h-1 rounded-full appearance-none cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-accent font-bold mb-6">Размер</h4>
                  <div className="flex flex-wrap gap-3">
                    {["40", "42", "44", "46", "48", "50", "52"].map(size => (
                      <button 
                        key={size}
                        className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[10px] hover:border-accent hover:text-accent transition-all"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-accent font-bold mb-6">Быстрый выбор</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Эксклюзив", "Новинка", "Тренд", "Эко", "Классика"].map(tag => (
                      <button 
                        key={tag}
                        className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] hover:border-accent hover:text-accent transition-all"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {filteredAndSortedProducts.length > 0 ? (
          <div className="space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
              <AnimatePresence mode="popLayout">
                {filteredAndSortedProducts.slice(0, visibleCount).map((product, idx) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6, delay: idx * 0.05 }}
                  className={`group relative ${
                    product.priceValue >= 120000 ? "md:col-span-7" : product.priceValue >= 70000 ? "md:col-span-5" : "md:col-span-4"
                  }`}
                >
                  <div className="overflow-hidden aspect-[4/5] relative bg-white/5">
                    <LazyImage
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover grayscale-0 md:grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Overlay Controls */}
                    <div className="absolute inset-0 bg-bg/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center gap-4">
                      <div className="flex items-center gap-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist({ ...product, title: product.name });
                          }}
                          className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md border transition-all ${
                            wishlist.includes(product.id)
                              ? "bg-accent border-accent text-bg"
                              : "bg-black/40 border-white/20 text-white hover:bg-white hover:text-bg"
                          }`}
                        >
                          <Heart size={18} fill={wishlist.includes(product.id) ? "currentColor" : "none"} />
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCompare({ ...product, title: product.name });
                          }}
                          className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md border transition-all ${
                            compareList.some(i => i.id === product.id)
                              ? "bg-white border-white text-bg"
                              : "bg-black/40 border-white/20 text-white hover:bg-white hover:text-bg"
                          }`}
                        >
                          <Scale size={18} />
                        </motion.button>
                      </div>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProduct(product);
                        }}
                        className="px-6 py-3 bg-accent text-bg rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-white transition-colors mt-2"
                      >
                        Быстрый просмотр
                      </motion.button>
                    </div>

                    <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-bg/60 backdrop-blur-md text-[8px] uppercase tracking-widest border border-white/10">
                        {product.category}
                      </span>
                      {product.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-accent/20 backdrop-blur-md text-[8px] uppercase tracking-widest border border-accent/20 text-accent">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                    <div className="mt-8 flex justify-between items-end">
                      <div className="space-y-2">
                        <h3 className="text-2xl font-serif leading-tight group-hover:text-accent transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-accent font-serif text-lg">
                          {product.price}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                          }}
                          className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-accent hover:text-accent transition-all group/btn"
                          title="Добавить в корзину"
                        >
                          <ShoppingBag size={16} className="group-hover/btn:scale-110 transition-transform" />
                        </button>
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-accent hover:text-accent transition-all group/btn"
                        >
                          <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>

                    {/* Mobile Actions */}
                    <div className="mt-4 flex gap-3 md:hidden">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist({ ...product, title: product.name });
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
                          toggleCompare({ ...product, title: product.name });
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
            </AnimatePresence>
          </div>

          {visibleCount < filteredAndSortedProducts.length && (
            <div className="flex justify-center pt-12">
              <button 
                onClick={() => setVisibleCount(prev => prev + 3)}
                className="group flex flex-col items-center gap-4"
              >
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent">Показать еще</span>
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-accent group-hover:text-bg transition-all duration-500">
                  <Plus size={20} />
                </div>
              </button>
            </div>
          )}
        </div>
        ) : (
          <div className="py-32 text-center border border-dashed border-white/10 rounded-3xl">
            <p className="text-white/30 font-serif italic text-2xl">Ничего не найдено по вашему запросу</p>
            <button 
              onClick={() => {
                setActiveCategory("Все");
                setSearchQuery("");
              }}
              className="mt-6 text-accent uppercase tracking-widest text-[10px] font-bold border-b border-accent pb-1"
            >
              Сбросить фильтры
            </button>
          </div>
        )}
      </div>

      {/* Floating Compare Bar */}
      <AnimatePresence>
        {compareList.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-2xl"
          >
            <div className="bg-bg/80 backdrop-blur-2xl border border-white/10 rounded-full p-2 pl-6 flex items-center justify-between shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {compareList.map((item) => (
                    <div key={item.id} className="w-10 h-10 rounded-full border-2 border-bg overflow-hidden">
                      <LazyImage src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <span className="text-[10px] uppercase tracking-widest font-bold">
                  {compareList.length} {compareList.length === 1 ? "товар" : "товара"} в сравнении
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsCompareModalOpen(true)}
                  className="px-8 py-3 bg-accent text-bg rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-white transition-colors"
                >
                  Сравнить
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick View Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12"
          >
            <div className="absolute inset-0 bg-bg/95 backdrop-blur-md" onClick={() => setSelectedProduct(null)} />
            
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-6 right-6 lg:top-12 lg:right-12 z-[110] text-white hover:text-accent transition-colors bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-full p-3"
            >
              <X size={32} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              className="relative w-full max-w-6xl bg-bg border border-white/10 grid grid-cols-1 lg:grid-cols-2 lg:h-[90vh] max-h-[90vh] overflow-y-auto lg:overflow-hidden custom-scrollbar"
            >
              <div className="aspect-[4/5] lg:aspect-auto h-full overflow-hidden">
                <LazyImage
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-8 lg:p-16 pb-0 lg:pb-0 flex flex-col bg-bg relative lg:h-full lg:overflow-y-auto custom-scrollbar">
                <div className="flex gap-2 mb-6">
                  {selectedProduct.tags.map(tag => (
                    <span key={tag} className="text-accent uppercase tracking-widest text-[8px] font-bold border border-accent/30 px-2 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h2 className="text-4xl lg:text-7xl font-serif mb-6 italic leading-tight">
                  {selectedProduct.name}
                </h2>
                <p className="text-muted leading-relaxed mb-10 font-light text-lg">
                  {selectedProduct.description}
                </p>
                
                <div className="grid grid-cols-2 gap-8 mb-12">
                  <div className="space-y-4">
                    <span className="text-white/30 text-[10px] uppercase tracking-widest block">Доступные размеры</span>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.availableSizes.map(size => (
                        <span key={size} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-xs hover:border-accent hover:text-accent cursor-pointer transition-colors">
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <span className="text-white/30 text-[10px] uppercase tracking-widest block">Цветовые решения</span>
                    <div className="flex gap-3">
                      {selectedProduct.colors.map(color => (
                        <div 
                          key={color} 
                          className="w-8 h-8 rounded-full border border-white/20 p-1 cursor-pointer hover:border-accent transition-colors"
                        >
                          <div className="w-full h-full rounded-full" style={{ backgroundColor: color }} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6 mb-12">
                  <div className="flex justify-between border-b border-white/5 pb-4">
                    <span className="text-muted text-sm uppercase tracking-widest">Стоимость</span>
                    <span className="text-accent font-serif text-2xl">{selectedProduct.price}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-4">
                    <span className="text-muted text-sm uppercase tracking-widest">Артикул</span>
                    <span className="text-sm font-mono">DF-EXCL-{selectedProduct.id}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 sticky bottom-0 bg-bg/95 backdrop-blur-md py-6 mt-auto -mx-8 px-8 lg:-mx-16 lg:px-16 border-t border-white/5 z-10 shadow-[0_-10px_20px_rgba(0,0,0,0.5)]">
                  <button 
                    onClick={() => addToCart(selectedProduct)}
                    className="flex-1 py-5 bg-accent text-bg uppercase tracking-widest text-[10px] font-bold hover:bg-white transition-colors flex items-center justify-center gap-3"
                  >
                    <ShoppingBag size={16} />
                    Добавить в корзину
                  </button>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => toggleWishlist({ ...selectedProduct, title: selectedProduct.name })}
                      className={`w-16 h-16 flex items-center justify-center border transition-all ${
                        wishlist.includes(selectedProduct.id)
                          ? "bg-accent border-accent text-bg"
                          : "border-white/10 hover:border-accent"
                      }`}
                    >
                      <Heart size={20} fill={wishlist.includes(selectedProduct.id) ? "currentColor" : "none"} />
                    </button>
                    <button 
                      onClick={() => toggleCompare({ ...selectedProduct, title: selectedProduct.name })}
                      className={`w-16 h-16 flex items-center justify-center border transition-all ${
                        compareList.some(i => i.id === selectedProduct.id)
                          ? "bg-white border-white text-bg"
                          : "border-white/10 hover:border-white"
                      }`}
                    >
                      <Scale size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
    
      {isCatalogPage && <Footer />}
    </div>
  );
}


