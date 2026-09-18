import { useState, type ReactNode } from 'react';
import { Menu } from 'lucide-react';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface dark:bg-surface-dark">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-72">
        {/* Mobile header */}
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-edge bg-white/80 backdrop-blur-xl px-4 py-3 dark:bg-surface-dark/80 dark:border-edge-dark lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex items-center gap-2 text-ink dark:text-ink-dark"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-secondary-600">
              <span className="text-xs font-bold text-white">R</span>
            </div>
            <span className="text-sm font-bold text-ink dark:text-ink-dark">ROOK AI</span>
          </div>
        </header>

        <main className="min-h-screen">{children}</main>
      </div>
    </div>
  );
}
