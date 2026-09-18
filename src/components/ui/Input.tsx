import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  optional?: boolean;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, icon, className = '', ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-sm font-semibold text-ink dark:text-ink-dark">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted dark:text-ink-dark-muted">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`w-full rounded-xl border border-edge bg-white px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted/60 transition-all duration-200 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/10 dark:bg-surface-dark-card dark:text-ink-dark dark:border-edge-dark dark:placeholder:text-ink-dark-muted/60 ${icon ? 'pl-10' : ''} ${className}`}
            {...props}
          />
        </div>
        {hint && <p className="text-xs text-ink-muted dark:text-ink-dark-muted">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  optional?: boolean;
  icon?: React.ReactNode;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, hint, icon, className = '', ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-sm font-semibold text-ink dark:text-ink-dark">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-3 text-ink-muted dark:text-ink-dark-muted pointer-events-none">
              {icon}
            </div>
          )}
          <textarea
            ref={ref}
            className={`w-full rounded-xl border border-edge bg-white px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted/60 transition-all duration-200 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/10 dark:bg-surface-dark-card dark:text-ink-dark dark:border-edge-dark dark:placeholder:text-ink-dark-muted/60 resize-none ${icon ? 'pl-10' : ''} ${className}`}
            {...props}
          />
        </div>
        {hint && <p className="text-xs text-ink-muted dark:text-ink-dark-muted">{hint}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
