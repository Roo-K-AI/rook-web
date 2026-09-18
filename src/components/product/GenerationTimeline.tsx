import { motion } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';

interface GenerationTimelineProps {
  stage: number;
}

const steps = [
  { label: 'Product Created', icon: Check },
  { label: 'AI Analysis', icon: Check },
  { label: 'SEO Generation', icon: Check },
  { label: 'Saving Content', icon: Check },
];

export function GenerationTimeline({ stage }: GenerationTimelineProps) {
  return (
    <div className="space-y-1">
      {steps.map((step, i) => {
        const isDone = i < stage;
        const isActive = i === stage;
        const isPending = i > stage;

        return (
          <div key={step.label} className="flex items-center gap-4">
            {/* Status circle */}
            <div className="relative flex h-9 w-9 shrink-0 items-center justify-center">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div
                  className={`absolute top-9 left-1/2 h-[28px] w-0.5 -translate-x-1/2 ${
                    isDone ? 'bg-brand-500' : 'bg-edge dark:bg-edge-dark'
                  }`}
                />
              )}

              {isDone && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-white shadow-glow"
                >
                  <step.icon className="h-4 w-4" />
                </motion.div>
              )}

              {isActive && (
                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-brand-500 bg-brand-50 dark:bg-brand-500/10">
                  <Loader2 className="h-4 w-4 animate-spin text-brand-600 dark:text-brand-400" />
                </div>
              )}

              {isPending && (
                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-edge bg-slate-50 dark:bg-surface-dark-hover dark:border-edge-dark">
                  <div className="h-2 w-2 rounded-full bg-edge dark:bg-edge-dark" />
                </div>
              )}
            </div>

            <span
              className={`text-sm font-medium transition-colors ${
                isDone
                  ? 'text-ink dark:text-ink-dark'
                  : isActive
                  ? 'text-brand-600 dark:text-brand-400'
                  : 'text-ink-muted dark:text-ink-dark-muted'
              }`}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
