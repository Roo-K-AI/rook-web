// ProductDetails.tsx

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, AlertCircle } from 'lucide-react';

import {
  productApi,
  type Product,
} from '../services/productApi';

import { LoadingState } from '@/components/product/LoadingState';
import { ProductSheet } from '@/components/product/ProductSheet';
import { Button } from '@/components/ui/Button';
import { useProductPolling } from '@/hooks/useProductPolling';

export function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] =
    useState<Product | null>(null);

  const [notFound, setNotFound] =
    useState(false);

  const productId = product?.id
    ? Number(product.id)
    : undefined;

  const {
    product: polled,
    loading,
    stage,
  } = useProductPolling(productId);

  useEffect(() => {
    if (!id) return;

    productApi
      .getProduct(Number(id))
      .then((p) => {
        setProduct(p);
      })
      .catch(() => {
        setNotFound(true);
      });
  }, [id]);

  const current = polled || product;

  if (notFound) {
    return (
      <div className="px-6 py-16">
        <Button
          onClick={() => navigate('/history')}
        >
          Retour
        </Button>
      </div>
    );
  }

  return (
    <div className="px-6 py-8">
      <div className="mx-auto max-w-3xl space-y-6">

        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Button
            onClick={() => navigate('/history')}
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Button>
        </motion.div>

        {current &&
          loading && (
            <LoadingState stage={stage} />
          )}

        {current &&
          !loading &&
          current.rook_status ===
            'completed' && (
            <ProductSheet
              product={current}
              onNew={() =>
                navigate('/generator')
              }
            />
          )}

        {current &&
          !loading &&
          current.rook_status !==
            'completed' && (
            <LoadingState stage={stage} />
          )}
      </div>
    </div>
  );
}