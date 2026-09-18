import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from '@/hooks/useTheme';
import { ToastProvider } from '@/hooks/useToast';
import { Layout } from '@/components/layout/Layout';
import { Dashboard } from '@/pages/Dashboard';
import { ProductGenerator } from '@/pages/ProductGenerator';
import { ProductDetails } from '@/pages/ProductDetails';
import { History } from '@/pages/History';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <Routes location={location}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/generator" element={<ProductGenerator />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <HashRouter>
          <Layout>
            <AnimatedRoutes />
          </Layout>
        </HashRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
