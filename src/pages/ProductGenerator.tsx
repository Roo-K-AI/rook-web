import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { GeneratorForm } from '@/components/product/GeneratorForm';
import { LoadingState } from '@/components/product/LoadingState';
import { ProductSheet } from '@/components/product/ProductSheet';
import { useProductPolling } from '@/hooks/useProductPolling';
import { Hero } from '@/components/ui/Hero';

export function ProductGenerator() {
  const navigate = useNavigate();
  const [productId, setProductId] = useState<number | null>(null);
  const { product, loading, stage } = useProductPolling(productId);

  const handleCreated = (id: number) => {
    setProductId(id);
  };

  const handleNew = () => {
    setProductId(null);
  };

  return (
    <div className="px-6 sm:px-8 py-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <AnimatePresence mode="wait">
          {/* Form state */}
          {!productId && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
            >
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-ink dark:text-ink-dark">Product Generator</h1>
                <p className="text-sm text-ink-muted dark:text-ink-dark-muted mt-1">
                  Enter your product details and let AI generate a complete SEO-optimized sheet.
                </p>
              </div>
              <GeneratorForm onCreated={handleCreated} />
            </motion.div>
          )}

          {/* Loading state */}
          {productId && loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
            >
              <LoadingState stage={stage} />
            </motion.div>
          )}

          {/* Result state */}
          {productId && product && !loading && product.rook_status === 'completed' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
            >
              <ProductSheet product={product} onNew={handleNew} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
