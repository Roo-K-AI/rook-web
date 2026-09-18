import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Zap, Search, FileText } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface HeroProps {
  onStart: () => void;
}

export function Hero({ onStart }: HeroProps) {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-surface to-secondary-50 dark:from-brand-500/5 dark:via-surface-dark dark:to-secondary-500/5" />
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-500/10 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-secondary-500/10 blur-3xl" />

      <div className="relative px-6 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left: text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/60 px-3 py-1.5 text-xs font-semibold text-brand-700 dark:bg-surface-dark-card/60 dark:border-brand-500/20 dark:text-brand-300 mb-4">
                <Sparkles className="h-3.5 w-3.5" />
                AI-Powered SEO Generation
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-ink dark:text-ink-dark leading-tight">
                ROOK AI Product Generator
              </h1>
              <p className="mt-3 text-base text-ink-muted dark:text-ink-dark-muted leading-relaxed max-w-md">
                Transform a simple product name into a complete SEO product sheet using Artificial Intelligence.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button size="lg" onClick={onStart}>
                  <Sparkles className="h-5 w-5" />
                  Generate Now
                </Button>
              </div>

              {/* Feature pills */}
              <div className="mt-8 flex flex-wrap gap-4">
                {[
                  { icon: Zap, label: 'Instant Generation' },
                  { icon: Search, label: 'SEO Optimized' },
                  { icon: FileText, label: 'Complete Sheets' },
                ].map((f) => (
                  <div key={f.label} className="flex items-center gap-2 text-sm text-ink-muted dark:text-ink-dark-muted">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white shadow-soft dark:bg-surface-dark-card">
                      <f.icon className="h-3.5 w-3.5 text-brand-600 dark:text-brand-400" />
                    </div>
                    {f.label}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative hidden lg:block"
            >
              <div className="relative rounded-3xl border border-edge bg-white/60 backdrop-blur-xl p-8 shadow-card-hover dark:bg-surface-dark-card/60 dark:border-edge-dark">
                {/* Mock product card */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-secondary-600 shadow-glow">
                      <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="h-3 w-32 rounded-full bg-ink/10 dark:bg-ink-dark/10" />
                      <div className="mt-2 h-2 w-20 rounded-full bg-ink-muted/20 dark:bg-ink-dark-muted/20" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    {[100, 80, 90, 70].map((w, i) => (
                      <motion.div
                        key={i}
                        initial={{ width: 0 }}
                        animate={{ width: `${w}%` }}
                        transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                        className="h-2 rounded-full bg-gradient-to-r from-brand-300 to-secondary-300 dark:from-brand-500/30 dark:to-secondary-500/30"
                      />
                    ))}
                  </div>

                  <div className="flex gap-2 pt-2">
                    {['SEO', 'AI', 'E-commerce'].map((tag) => (
                      <span key={tag} className="rounded-lg border border-edge bg-slate-50 px-2.5 py-1 text-xs font-medium text-ink-muted dark:bg-surface-dark-hover dark:border-edge-dark dark:text-ink-dark-muted">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Floating badge */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-4 -right-4 flex items-center gap-1.5 rounded-xl border border-success/20 bg-success/10 px-3 py-2 text-xs font-bold text-success shadow-card"
                >
                  <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                  AI Active
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
