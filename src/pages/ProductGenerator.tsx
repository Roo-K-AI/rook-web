import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GeneratorForm } from '@/components/product/GeneratorForm';
import { LoadingState } from '@/components/product/LoadingState';
import { ProductSheet } from '@/components/product/ProductSheet';
import { useProductPolling } from '@/hooks/useProductPolling';

export function ProductGenerator() {
  const [productId, setProductId] = useState<number | undefined>(
    undefined
  );

  const {
    product,
    loading,
    stage,
  } = useProductPolling(productId);

  const handleCreated = (id: number) => {
    setProductId(id);
  };

  const handleNew = () => {
    setProductId(undefined);
  };

  return (
    <div className="px-6 sm:px-8 py-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <AnimatePresence mode="wait">

          {!productId && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
            >
              <div className="mb-6">
                <h1 className="text-2xl font-bold">
                  Product Generator
                </h1>

                <p className="mt-1 text-sm">
                  Enter your product details and
                  generate an SEO product sheet.
                </p>
              </div>

              <GeneratorForm
                onCreated={handleCreated}
              />
            </motion.div>
          )}

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

          {productId &&
            product &&
            !loading &&
            product.rook_status ===
              'completed' && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
              >
                <ProductSheet
                  product={product}
                  onNew={handleNew}
                />
              </motion.div>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
}