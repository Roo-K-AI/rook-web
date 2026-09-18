import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Copy, Trash2, Plus, Search, Package } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { useToast } from '@/hooks/useToast';
import { productApi, type Product } from '@/services/productApi';

export function History() {
  const navigate = useNavigate();
  const { show } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const load = () => {
    setLoading(true);
    productApi.getAllProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: number) => {
    await productApi.deleteProduct(id);
    setProducts((p) => p.filter((x) => x.id !== id));
    setDeleteId(null);
    show('Product deleted', 'success');
  };

  const handleCopy = async (p: Product) => {
    const text = [
      `# ${p.name}`,
      p.seo_title ? `## SEO Title\n${p.seo_title}` : '',
      p.meta_description ? `## Meta Description\n${p.meta_description}` : '',
    ].filter(Boolean).join('\n\n');
    await navigator.clipboard.writeText(text);
    show('Product info copied', 'success');
  };

  return (
    <div className="px-6 sm:px-8 py-8">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-ink dark:text-ink-dark">History</h1>
            <p className="text-sm text-ink-muted dark:text-ink-dark-muted mt-1">
              All your AI-generated product sheets in one place.
            </p>
          </div>
          <Button onClick={() => navigate('/generator')}>
            <Plus className="h-4 w-4" /> New Product
          </Button>
        </div>

        {/* Search */}
        <Input
          placeholder="Search products..."
          icon={<Search className="h-4 w-4" />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Table */}
        <Card className="overflow-hidden">
          {loading ? (
            <div className="p-6 space-y-3">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="skeleton h-14 rounded-xl" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 dark:bg-brand-500/10">
                <Package className="h-7 w-7 text-brand-600 dark:text-brand-400" />
              </div>
              <h3 className="text-base font-bold text-ink dark:text-ink-dark">
                {search ? 'No products match your search' : 'No products yet'}
              </h3>
              <p className="text-sm text-ink-muted dark:text-ink-dark-muted mt-1 mb-4">
                {search ? 'Try a different search term.' : 'Generate your first product sheet.'}
              </p>
              {!search && (
                <Button onClick={() => navigate('/generator')}>Generate Product Sheet</Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto scrollbar-thin">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-edge dark:border-edge-dark bg-slate-50/50 dark:bg-surface-dark-hover/30">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-ink-muted dark:text-ink-dark-muted uppercase tracking-wider">Product Name</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-ink-muted dark:text-ink-dark-muted uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-ink-muted dark:text-ink-dark-muted uppercase tracking-wider">Created At</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-ink-muted dark:text-ink-dark-muted uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-edge dark:divide-edge-dark">
                  {filtered.map((p, i) => (
                    <motion.tr
                      key={p.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="hover:bg-slate-50/50 dark:hover:bg-surface-dark-hover/20 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-secondary-50 dark:from-brand-500/10 dark:to-secondary-500/10">
                            <Package className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                          </div>
                          <span className="text-sm font-semibold text-ink dark:text-ink-dark">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={p.rook_status} />
                      </td>
                      <td className="px-6 py-4 text-sm text-ink-muted dark:text-ink-dark-muted">
                        {p.created_at ? new Date(p.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => navigate(`/product/${p.id}`)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted hover:text-brand-600 hover:bg-brand-50 dark:text-ink-dark-muted dark:hover:text-brand-400 dark:hover:bg-brand-500/10 transition-colors"
                            title="View"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleCopy(p)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted hover:text-secondary-600 hover:bg-secondary-50 dark:text-ink-dark-muted dark:hover:text-secondary-400 dark:hover:bg-secondary-500/10 transition-colors"
                            title="Copy"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setDeleteId(p.id)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted hover:text-danger hover:bg-danger/10 dark:text-ink-dark-muted transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>

      {/* Delete confirmation */}
      <AnimatePresence>
        {deleteId !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            onClick={() => setDeleteId(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-2xl border border-edge bg-surface-card p-6 shadow-card-hover dark:bg-surface-dark-card dark:border-edge-dark"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-danger/10">
                <Trash2 className="h-6 w-6 text-danger" />
              </div>
              <h3 className="text-lg font-bold text-ink dark:text-ink-dark text-center">Delete product?</h3>
              <p className="text-sm text-ink-muted dark:text-ink-dark-muted text-center mt-1 mb-6">
                This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setDeleteId(null)}>
                  Cancel
                </Button>
                <Button variant="danger" className="flex-1" onClick={() => handleDelete(deleteId)}>
                  Delete
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
