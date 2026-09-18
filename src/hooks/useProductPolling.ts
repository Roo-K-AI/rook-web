import { useEffect, useRef, useState, useCallback } from 'react';
import { productApi, type Product } from '@/services/productApi';

const POLL_INTERVAL = 3000;

export function useProductPolling(productId: number | null) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stage, setStage] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stopPolling = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!productId) return;
    setLoading(true);
    setError(null);
    setStage(0);

    let cancelled = false;

    const poll = async () => {
      try {
        const data = await productApi.getProduct(productId);
        if (cancelled) return;

        setProduct(data);

        if (data.rook_status === 'accepted') setStage(1);
        else if (data.rook_status === 'processing') {
          setStage((s) => Math.max(s, 2));
        }

        if (data.rook_status === 'completed') {
          setStage(4);
          setLoading(false);
          return;
        }
        if (data.rook_status === 'failed') {
          setError('Generation failed. Please try again.');
          setLoading(false);
          return;
        }

        timerRef.current = setTimeout(poll, POLL_INTERVAL);
      } catch (e: any) {
        if (cancelled) return;
        setError(e?.message || 'Failed to fetch product');
        setLoading(false);
      }
    };

    poll();

    return () => {
      cancelled = true;
      stopPolling();
    };
  }, [productId, stopPolling]);

  return { product, loading, error, stage };
}
