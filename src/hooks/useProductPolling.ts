import { useEffect, useState } from 'react';
import { productApi, type Product } from '@/services/productApi';

type PollingStage =
  | 'idle'
  | 'accepted'
  | 'processing'
  | 'completed'
  | 'failed';

export function useProductPolling(productId?: number) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState<PollingStage>('idle');

  useEffect(() => {
    if (!productId) {
      setProduct(null);
      setLoading(false);
      setStage('idle');
      return;
    }

    setLoading(true);

    const fetchProduct = async () => {
      try {
        const data = await productApi.getProduct(productId);

        setProduct(data);
        setStage(data.rook_status);

        if (
          data.rook_status === 'completed' ||
          data.rook_status === 'failed'
        ) {
          setLoading(false);
          return true;
        }

        return false;
      } catch (error) {
        console.error(error);
        setLoading(false);
        setStage('failed');
        return true;
      }
    };

    fetchProduct();

    const interval = setInterval(async () => {
      const finished = await fetchProduct();

      if (finished) {
        clearInterval(interval);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [productId]);

  return {
    product,
    loading,
    stage,
  };
}