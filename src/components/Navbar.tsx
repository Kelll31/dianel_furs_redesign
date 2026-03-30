import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Search, ShoppingBag, Heart, Scale, Sun, Moon, ArrowRight, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import CartModal from "./CartModal";
import WishlistModal from "./WishlistModal";
import { products } from "../data/products";
import { Product } from "../types";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchDropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { wishlist, compareList, setIsCompareModalOpen, cart, toggleTheme } = useAppContext();

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Фильтрация товаров по поисковому запросу
  const filteredProducts: Product[] = searchQuery.trim()
    ? products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  useEffect(() => {
    // Check initial theme preference
    if (document.documentElement.classList.contains('light')) {
      setIsLightMode(true);
    }
  }, []);

  // Sync with toggleTheme from context
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsLightMode(document.documentElement.classList.contains('light'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Закрытие dropdown при клике вне
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isSearchOpen &&
        searchDropdownRef.current &&
        !searchDropdownRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
      // Закрытие мобильного меню
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSearchOpen, isMobileMenuOpen]);

  // Отслеживание прокрутки для размытия фона
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const menuLinks = [
    { name: "Главная", path: "/" },
    { name: "Коллекция", path: "/collection" },
    { name: "Каталог", path: "/catalog" },
    { name: "Бутик", path: "/boutique" },
    { name: "Сервис", path: "/service" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
        className={`fixed top-0 left-0 w-full z-[100] px-4 md:px-10 py-6 md:py-8 grid grid-cols-3 items-center transition-all duration-500 ${
          isScrolled ? 'bg-bg/80 backdrop-blur-md' : ''
        }`}
      >
        <div className="flex items-center gap-4 md:gap-8 justify-start">
          <button 
            onClick={() => setIsOpen(true)}
            className="hover:text-accent transition-colors flex items-center gap-2 group text-white"
          >
            <Menu size={24} />
            <span className="hidden lg:block text-[10px] uppercase tracking-[0.2em] font-medium opacity-0 group-hover:opacity-100 transition-opacity">Menu</span>
          </button>
          
          <button
            onClick={toggleTheme}
            className="hover:text-accent transition-colors flex items-center gap-2 group text-white"
            title="Toggle Theme"
          >
            {isLightMode ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <div className="hidden xl:flex gap-6 text-[10px] uppercase tracking-[0.3em] font-medium text-white">
            <Link to="/collection" className="hover:text-accent transition-colors">Collection</Link>
            <Link to="/catalog" className="hover:text-accent transition-colors">Catalog</Link>
            <Link to="/boutique" className="hover:text-accent transition-colors">Boutique</Link>
            <Link to="/service" className="hover:text-accent transition-colors">Service</Link>
          </div>
        </div>

        <div className="flex justify-center text-white">
          <Link to="/">
            <h1 className="text-xl md:text-3xl font-serif tracking-[0.2em] md:tracking-[0.3em] uppercase whitespace-nowrap">Dianel</h1>
          </Link>
        </div>

        <div className="flex items-center gap-3 md:gap-6 justify-end">
          {/* Search Bar Animation */}
          <div className="relative flex items-center">
            <AnimatePresence>
              {isSearchOpen && (
                <>
                  <motion.form
                    onSubmit={handleSearch}
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 200, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="absolute right-full mr-4 overflow-hidden"
                  >
                    <div className="relative">
                      <input
                        ref={searchInputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Поиск..."
                        className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-[10px] uppercase tracking-widest focus:outline-none focus:border-accent transition-colors text-white"
                      />
                      <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-accent transition-colors">
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </motion.form>

                  {/* Выпадающий список с результатами поиска */}
                  {searchQuery.trim() && (
                    <motion.div
                      ref={searchDropdownRef}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-bg/95 backdrop-blur-md border border-white/10 rounded-lg shadow-2xl z-50"
                    >
                      {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                          <Link
                            key={product.id}
                            to={`/catalog?search=${encodeURIComponent(product.name)}`}
                            className="flex items-center gap-3 p-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-b-0"
                            onClick={() => {
                              setIsSearchOpen(false);
                              setSearchQuery("");
                            }}
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded-md"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="text-white text-xs uppercase tracking-widest truncate font-medium">
                                {product.name}
                              </h4>
                              <p className="text-muted text-[10px] mt-1">
                                {product.category}
                              </p>
                              <span className="text-accent text-xs font-semibold">
                                {product.price}
                              </span>
                            </div>
                          </Link>
                        ))
                      ) : (
                        <div className="p-4 text-center text-muted text-[10px] uppercase tracking-widest">
                          Ничего не найдено
                        </div>
                      )}
                    </motion.div>
                  )}
                </>
              )}
            </AnimatePresence>
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`hover:text-accent transition-colors hidden sm:block ${isSearchOpen ? 'text-accent' : 'text-white'}`}
            >
              {isSearchOpen ? <X size={20} /> : <Search size={20} />}
            </button>
          </div>

          <button
            onClick={() => setIsCompareModalOpen(true)}
            className="hover:text-accent transition-colors hidden sm:block relative group text-white"
          >
            <Scale size={20} />
            {compareList.length > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full text-[8px] flex items-center justify-center text-bg font-bold"
              >
                {compareList.length}
              </motion.span>
            )}
          </button>
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="hover:text-accent transition-colors hidden sm:block relative group text-white"
          >
            <Heart size={20} />
            {wishlist.length > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full text-[8px] flex items-center justify-center text-bg font-bold"
              >
                {wishlist.length}
              </motion.span>
            )}
          </button>

          {/* Mobile Menu Button with Dropdown */}
          <div className="relative sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="hover:text-accent transition-colors relative text-white flex items-center gap-2"
            >
              <ShoppingBag size={20} />
              {cartItemsCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full text-[8px] flex items-center justify-center text-bg font-bold"
                >
                  {cartItemsCount}
                </motion.span>
              )}
              <ChevronDown size={16} className={`transition-transform ${isMobileMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  ref={mobileMenuRef}
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-bg/95 backdrop-blur-md border border-white/10 rounded-lg shadow-2xl z-50 overflow-hidden"
                >
                  <button
                    onClick={() => {
                      setIsCompareModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 text-[10px] uppercase tracking-widest hover:bg-white/5 transition-colors border-b border-white/5"
                  >
                    <span className="text-white">Сравнение</span>
                    {compareList.length > 0 && (
                      <span className="text-accent font-bold">{compareList.length}</span>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setIsWishlistOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 text-[10px] uppercase tracking-widest hover:bg-white/5 transition-colors border-b border-white/5"
                  >
                    <span className="text-white">Избранное</span>
                    {wishlist.length > 0 && (
                      <span className="text-accent font-bold">{wishlist.length}</span>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setIsCartOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 text-[10px] uppercase tracking-widest hover:bg-white/5 transition-colors"
                  >
                    <span className="text-white">Корзина</span>
                    {cartItemsCount > 0 && (
                      <span className="text-accent font-bold">{cartItemsCount}</span>
                    )}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="hover:text-accent transition-colors relative text-white hidden sm:block"
          >
            <ShoppingBag size={20} />
            {cartItemsCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full text-[8px] flex items-center justify-center text-bg font-bold"
              >
                {cartItemsCount}
              </motion.span>
            )}
          </button>
        </div>
      </motion.nav>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <WishlistModal isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />

      {/* Full-screen Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[200] bg-bg flex flex-col overflow-y-auto"
          >
            {/* Menu Header */}
            <div className="px-6 md:px-12 py-8 flex justify-between items-center sticky top-0 bg-bg/80 backdrop-blur-md z-20">
              <div className="flex items-center gap-8">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-accent transition-colors flex items-center gap-2 group"
                >
                  <X size={24} />
                  <span className="text-[10px] uppercase tracking-[0.2em] font-medium">Close</span>
                </button>
              </div>
              <div className="absolute left-1/2 -translate-x-1/2">
                <h1 className="text-2xl md:text-3xl font-serif tracking-[0.3em] uppercase">Dianel</h1>
              </div>
              <div className="flex gap-4">
                <a href="https://t.me/dianel_furs" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent cursor-pointer transition-colors text-[10px] uppercase tracking-widest">Telegram</a>
                <a href="https://vk.ru/dianel_furs" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent cursor-pointer transition-colors text-[10px] uppercase tracking-widest">VK</a>
              </div>
            </div>

            {/* Menu Links */}
            <div className="flex-1 flex items-center justify-center py-12 md:py-20">
              <div className="flex flex-col items-center gap-2 md:gap-10">
                {menuLinks.map((link, idx) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx, duration: 0.5 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="text-3xl md:text-8xl font-serif hover:italic hover:text-accent transition-all duration-300 group relative"
                    >
                      <span className="relative z-10">{link.name}</span>
                      <motion.div 
                        className="absolute -inset-x-4 h-[1px] bg-accent bottom-2 -z-0"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Menu Footer */}
            <div className="px-6 md:px-12 py-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted">
                г. Пятигорск, Черкесское шоссе, 22с2
              </div>
              <a href="mailto:dianel888@mail.ru" className="text-[10px] uppercase tracking-[0.3em] text-muted hover:text-white transition-colors">
                dianel888@mail.ru
              </a>
              <a href="tel:+79280100208" className="text-[10px] uppercase tracking-[0.3em] text-muted hover:text-white transition-colors">
                +7 (928) 010-02-08
              </a>
              <a href="tel:+79880922888" className="text-[10px] uppercase tracking-[0.3em] text-muted hover:text-white transition-colors">
                +7 (988) 092-28-88
              </a>
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/20">
                © 2026 Dianel Furs
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
