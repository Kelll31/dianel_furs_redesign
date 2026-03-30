import { useState, useEffect, ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { HelmetProvider } from "react-helmet-async";
import { AppProvider, useAppContext } from "./context/AppContext";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./components/Home";
import Collection from "./components/Collection";
import CollectionEco from "./components/CollectionEco";
import CollectionNutria from "./components/CollectionNutria";
import CollectionSheepskin from "./components/CollectionSheepskin";
import CollectionFur from "./components/CollectionFur";
import Catalog from "./components/Catalog";
import Boutique from "./components/Boutique";
import Service from "./components/Service";
import CompareModal from "./components/CompareModal";

function PageWrapper({ children }: { children: ReactNode }) {
  const location = useLocation();

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{ width: '100%' }}
    >
      {children}
    </motion.div>
  );
}

function AppContent() {
  const [loading, setLoading] = useState(true);
  const { isCompareModalOpen, setIsCompareModalOpen } = useAppContext();

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [loading]);

  return (
    <main className="relative min-h-screen">
      <Toaster 
        position="bottom-right" 
        toastOptions={{
          style: {
            background: '#141414',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)',
            fontFamily: 'serif',
            letterSpacing: '0.05em'
          }
        }}
      />
      <AnimatePresence mode="wait">
        {loading && (
          <Preloader onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <>
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/collection" element={<PageWrapper><Collection /></PageWrapper>} />
            <Route path="/collection/eco" element={<PageWrapper><CollectionEco /></PageWrapper>} />
            <Route path="/collection/nutria" element={<PageWrapper><CollectionNutria /></PageWrapper>} />
            <Route path="/collection/sheepskin" element={<PageWrapper><CollectionSheepskin /></PageWrapper>} />
            <Route path="/collection/fur" element={<PageWrapper><CollectionFur /></PageWrapper>} />
            <Route path="/collection/:category" element={<PageWrapper><Collection /></PageWrapper>} />
            <Route path="/catalog" element={<PageWrapper><Catalog /></PageWrapper>} />
            <Route path="/boutique" element={<PageWrapper><Boutique /></PageWrapper>} />
            <Route path="/service" element={<PageWrapper><Service /></PageWrapper>} />
          </Routes>
          <CompareModal isOpen={isCompareModalOpen} onClose={() => setIsCompareModalOpen(false)} />
        </>
      )}
    </main>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <AppProvider>
        <Router>
          <AppContent />
        </Router>
      </AppProvider>
    </HelmetProvider>
  );
}
