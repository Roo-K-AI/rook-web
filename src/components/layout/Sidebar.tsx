import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Sparkles, History, Sun, Moon, X } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/generator', label: 'Product Generator', icon: Sparkles },
  { to: '/history', label: 'History', icon: History },
];

export function Sidebar({ open, onClose }: SidebarProps) {
  const { theme, toggle } = useTheme();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed z-40 h-screen w-72 shrink-0 border-r border-edge bg-surface-card dark:bg-surface-dark-card dark:border-edge-dark flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-secondary-600 shadow-glow">
              <span className="text-lg font-bold text-white">R</span>
            </div>
            <div>
              <p className="text-base font-bold tracking-tight text-ink dark:text-ink-dark">ROOK AI</p>
              <p className="text-xs text-ink-muted dark:text-ink-dark-muted">Product Generator</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-ink-muted hover:text-ink dark:text-ink-dark-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 px-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={onClose}
                className={({ isActive }) =>
                  `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300'
                      : 'text-ink-muted hover:text-ink hover:bg-slate-50 dark:text-ink-dark-muted dark:hover:text-ink-dark dark:hover:bg-surface-dark-hover'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div
                        layoutId="active-nav"
                        className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-brand-600"
                      />
                    )}
                    <Icon className="h-[18px] w-[18px]" />
                    {item.label}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Theme toggle + footer */}
        <div className="border-t border-edge dark:border-edge-dark p-4 space-y-3">
          <button
            onClick={toggle}
            className="flex w-full items-center justify-between rounded-xl border border-edge px-3 py-2.5 text-sm font-medium text-ink-muted hover:bg-slate-50 dark:text-ink-dark-muted dark:border-edge-dark dark:hover:bg-surface-dark-hover transition-colors"
          >
            <span className="flex items-center gap-2">
              {theme === 'light' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
            </span>
            <div className={`relative h-5 w-9 rounded-full transition-colors ${theme === 'dark' ? 'bg-brand-600' : 'bg-slate-300'}`}>
              <motion.div
                layout
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow ${theme === 'dark' ? 'left-[18px]' : 'left-0.5'}`}
              />
            </div>
          </button>

          <div className="flex items-center gap-3 rounded-xl bg-gradient-to-br from-brand-50 to-secondary-50 dark:from-brand-500/5 dark:to-secondary-500/5 px-3 py-3 border border-brand-100/50 dark:border-brand-500/10">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-ink dark:text-ink-dark">AI-Powered SEO</p>
              <p className="text-[11px] text-ink-muted dark:text-ink-dark-muted">Generate in seconds</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
