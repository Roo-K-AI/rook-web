import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { productApi, type Product } from '@/services/productApi';
import { LoadingState } from '@/components/product/LoadingState';
import { ProductSheet } from '@/components/product/ProductSheet';
import { Button } from '@/components/ui/Button';
import { useProductPolling } from '@/hooks/useProductPolling';

export function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [notFound, setNotFound] = useState(false);

  const productId = product?.id ? Number(product.id) : null;
  const { product: polled, loading, stage } = useProductPolling(productId);

  useEffect(() => {
    if (!id) return;
    productApi.getProduct(Number(id)).then((p) => {
      if (!p) setNotFound(true);
      else setProduct(p);
    }).catch(() => setNotFound(true));
  }, [id]);

  const current = polled || product;

  if (notFound) {
    return (
      <div className="px-6 sm:px-8 py-16">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-danger/10">
            <AlertCircle className="h-7 w-7 text-danger" />
          </div>
          <h2 className="text-lg font-bold text-ink dark:text-ink-dark">Product not found</h2>
          <p className="text-sm text-ink-muted dark:text-ink-dark-muted mt-1 mb-4">
            This product may have been deleted.
          </p>
          <Button onClick={() => navigate('/history')}>Back to History</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 sm:px-8 py-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
          <Button variant="ghost" size="sm" onClick={() => navigate('/history')}>
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
        </motion.div>

        {current && loading && <LoadingState stage={stage} />}
        {current && !loading && current.rook_status === 'completed' && (
          <ProductSheet product={current} onNew={() => navigate('/generator')} />
        )}
        {current && !loading && current.rook_status !== 'completed' && (
          <LoadingState stage={stage} />
        )}
      </div>
    </div>
  );
}
