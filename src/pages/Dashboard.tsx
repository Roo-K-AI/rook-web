// src/pages/Dashboard.tsx

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Package,
  CheckCircle2,
  Clock,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { productApi, type Product } from '@/services/productApi';
import { Hero } from '@/components/ui/Hero';

export function Dashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    productApi
      .getProducts()
      .then((data) => {
        if (cancelled) return;
        // Double sécurité : on garantit un tableau, quoi qu'il arrive.
        setProducts(Array.isArray(data) ? data : []);
        setError(null);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        console.error('Failed to load products', err);
        setProducts([]);
        setError(err instanceof Error ? err.message : 'Unknown error');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Sécurité supplémentaire : toujours un tableau pour les .filter/.map
  const safeProducts = Array.isArray(products) ? products : [];

  const today = new Date().toDateString();

  const stats = {
    total: safeProducts.length,
    today: safeProducts.filter((p) => {
      const d = p.created_at ?? p.dates?.created_at ?? null;
      return d ? new Date(d).toDateString() === today : false;
    }).length,
    completed: safeProducts.filter((p) => p.rook_status === 'completed').length,
    pending: safeProducts.filter(
      (p) => p.rook_status === 'accepted' || p.rook_status === 'processing'
    ).length,
  };

  const statCards = [
    { label: 'Total Products', value: stats.total, icon: Package, color: 'brand' },
    { label: 'Generated Today', value: stats.today, icon: TrendingUp, color: 'secondary' },
    { label: 'Completed', value: stats.completed, icon: CheckCircle2, color: 'success' },
    { label: 'Pending', value: stats.pending, icon: Clock, color: 'warning' },
  ];

  const colorMap: Record<string, string> = {
    brand:
      'bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400',
    secondary:
      'bg-secondary-50 text-secondary-600 dark:bg-secondary-500/10 dark:text-secondary-400',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
  };

  return (
    <div>
      <Hero onStart={() => navigate('/generator')} />

      <div className="px-6 sm:px-8 pb-12 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card hover className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${colorMap[s.color]}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-ink dark:text-ink-dark">
                    {s.value}
                  </p>
                  <p className="text-sm text-ink-muted dark:text-ink-dark-muted mt-0.5">
                    {s.label}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Recent generations */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-ink dark:text-ink-dark">
              Recent Generations
            </h2>
            <Button variant="ghost" size="sm" onClick={() => navigate('/history')}>
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[0, 1, 2].map((i) => (
                <div key={i} className="skeleton h-32 rounded-2xl" />
              ))}
            </div>
          ) : error ? (
            <Card className="p-12 text-center">
              <h3 className="text-base font-bold text-ink dark:text-ink-dark">
                Impossible de charger les produits
              </h3>
              <p className="text-sm text-ink-muted dark:text-ink-dark-muted mt-1">
                {error}
              </p>
              <Button className="mt-4" onClick={() => window.location.reload()}>
                Réessayer
              </Button>
            </Card>
          ) : safeProducts.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 dark:bg-brand-500/10">
                <Package className="h-7 w-7 text-brand-600 dark:text-brand-400" />
              </div>
              <h3 className="text-base font-bold text-ink dark:text-ink-dark">
                No products yet
              </h3>
              <p className="text-sm text-ink-muted dark:text-ink-dark-muted mt-1 mb-4">
                Generate your first SEO product sheet with AI.
              </p>
              <Button onClick={() => navigate('/generator')}>
                Generate Product Sheet
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {safeProducts.slice(0, 6).map((p, i) => {
                const created = p.created_at ?? p.dates?.created_at ?? null;
                return (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card
                      hover
                      className="p-5"
                      onClick={() => navigate(`/product/${p.id}`)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-secondary-50 dark:from-brand-500/10 dark:to-secondary-500/10">
                          <Package className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                        </div>
                        <StatusBadge status={p.rook_status} />
                      </div>
                      <h3 className="font-semibold text-ink dark:text-ink-dark truncate">
                        {p.name}
                      </h3>
                      <p className="text-xs text-ink-muted dark:text-ink-dark-muted mt-1">
                        {created
                          ? new Date(created).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : ''}
                      </p>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}