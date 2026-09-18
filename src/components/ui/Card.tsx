import { motion, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';

interface CardProps extends HTMLMotionProps<'div'> {
  hover?: boolean;
  children: ReactNode;
}

export function Card({ hover, className = '', children, ...props }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -2 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`rounded-2xl border border-edge bg-surface-card shadow-card dark:bg-surface-dark-card dark:border-edge-dark ${hover ? 'hover:shadow-card-hover cursor-pointer' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
