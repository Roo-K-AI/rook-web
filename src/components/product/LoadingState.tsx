import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { GenerationTimeline } from './GenerationTimeline';

interface LoadingStateProps {
  stage: number;
}

export function LoadingState({ stage }: LoadingStateProps) {
  const progress = Math.min((stage / 4) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-edge bg-surface-card p-8 dark:bg-surface-dark-card dark:border-edge-dark"
    >
      <div className="flex flex-col items-center text-center mb-8">
        <div className="relative mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-secondary-600 shadow-glow">
            <Loader2 className="h-7 w-7 animate-spin text-white" />
          </div>
          <motion.div
            className="absolute inset-0 rounded-2xl bg-brand-500/30"
            animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
        <h3 className="text-lg font-bold text-ink dark:text-ink-dark">
          Generating your SEO product sheet...
        </h3>
        <p className="text-sm text-ink-muted dark:text-ink-dark-muted mt-1">
          Our AI is crafting optimized content for your product
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-ink-muted dark:text-ink-dark-muted">Progress</span>
          <span className="text-xs font-bold text-brand-600 dark:text-brand-400">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-surface-dark-hover">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-brand-600 to-secondary-600"
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          />
        </div>
      </div>

      {/* Timeline */}
      <div className="rounded-xl border border-edge bg-slate-50/50 p-6 dark:bg-surface-dark-hover/30 dark:border-edge-dark">
        <GenerationTimeline stage={stage} />
      </div>
    </motion.div>
  );
}
