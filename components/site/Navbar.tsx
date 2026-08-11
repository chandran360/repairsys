'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { scrollToId } from '@/hooks/use-lenis';
import ThemeToggle from '@/components/site/ThemeToggle';
import { LoginModal } from '@/components/site/LoginModal';

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'features', label: 'Features' },
  { id: 'how', label: 'How It Works' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const ids = LINKS.map((l) => l.id);
      let current = 'home';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-500',
        scrolled ? 'py-3' : 'py-5'
      )}
    >
      <nav
        className={cn(
          'mx-auto flex items-center justify-between px-5 sm:px-8 transition-all duration-500 rounded-full',
          scrolled
            ? 'max-w-5xl glass-strong py-2.5'
            : 'max-w-6xl bg-transparent py-2'
        )}
      >
        <button
          onClick={() => go('home')}
          className="flex items-center gap-2.5 font-display font-semibold tracking-tight text-[var(--ink)]"
        >
          <span className="text-lg">RepairSync</span>
        </button>

        <ul className="hidden md:flex items-center gap-8 text-sm text-[var(--ink-soft)]">
          {LINKS.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => go(l.id)}
                className={cn(
                  'nav-link transition-colors hover:text-[var(--ink)]',
                  active === l.id && 'is-active text-[var(--ink)]'
                )}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <LoginModal>
            <button className="text-sm font-medium text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors mr-2">
              Login
            </button>
          </LoginModal>
          <ThemeToggle />
          <button
            onClick={() => go('contact')}
            className="rounded-full ink-gradient px-5 py-2.5 text-sm font-medium text-black dark:text-white shadow-lg shadow-[#0e7c86]/25 transition-transform hover:scale-[1.03]"
          >
            Book a Demo
          </button>
        </div>

        <button
          className="md:hidden text-[var(--ink)] p-2"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden mx-4 mt-2 glass-strong rounded-2xl p-4">
          <ul className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => go(l.id)}
                  className={cn(
                    'w-full text-left py-3 px-4 rounded-xl text-[var(--ink-soft)] hover:bg-[var(--accent-soft)] hover:text-[var(--ink)] transition-colors',
                    active === l.id && 'bg-[var(--accent-soft)] text-[var(--ink)]'
                  )}
                >
                  {l.label}
                </button>
              </li>
            ))}
            <li>
              <div className="mt-2 flex items-center justify-between px-4 py-2">
                <span className="text-sm text-[var(--ink-soft)]">Dark Mode</span>
                <ThemeToggle />
              </div>
            </li>
            <li>
              <LoginModal>
                <button className="block w-full text-center rounded-xl bg-[var(--accent-soft)] px-4 py-3 text-sm font-medium text-[var(--ink)] transition-colors mb-2">
                  Login
                </button>
              </LoginModal>
              <button
                onClick={() => go('contact')}
                className="mt-1 w-full rounded-xl ink-gradient px-4 py-3 text-sm font-medium text-black dark:text-white"
              >
                Book a Demo
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
