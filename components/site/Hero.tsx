'use client';

import { ArrowRight, Sparkles } from 'lucide-react';
import { scrollToId } from '@/hooks/use-lenis';
import HeroParallax from '@/components/site/HeroParallax';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-center pt-20 pb-12 overflow-hidden"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
        {/* Left: Text content */}
        <div className="max-w-2xl lg:w-1/2">
          <div className="reveal inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium tracking-wide text-[var(--ink-soft)] mb-7">
            <Sparkles size={13} className="text-[var(--accent)]" />
            Product of VI WebSync
          </div>

          <h1 className="reveal display text-[clamp(2.6rem,6.5vw,4.75rem)] text-[var(--ink)] mb-6">
            RepairSync — run your{' '}
            <span className="text-gradient">repair shop</span> without the chaos.
          </h1>

          <p className="reveal body-copy text-[clamp(1.05rem,1.8vw,1.25rem)] text-[var(--ink-soft)] max-w-xl mb-9">
            The all-in-one app for mobile phone repair shops — track every repair
            from intake to pickup, bill customers accurately, manage staff
            attendance and payroll, and keep spare-parts stock under control.
          </p>

          <div className="reveal flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => scrollToId('contact')}
              className="group inline-flex items-center justify-center gap-2 rounded-full ink-gradient px-7 py-3.5 text-sm font-medium text-black dark:text-white shadow-xl shadow-[#0e7c86]/25 transition-transform hover:scale-[1.03]"
            >
              Book a Demo / Get Started
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
            <button
              onClick={() => scrollToId('features')}
              className="inline-flex items-center justify-center rounded-full glass px-7 py-3.5 text-sm font-medium text-[var(--ink)] transition-transform hover:scale-[1.03]"
            >
              See Features
            </button>
          </div>

          <p className="reveal mt-10 text-xs tracking-wide text-[var(--ink-muted)]">
            Built by VI WebSync Technologies
          </p>
        </div>

        {/* Right: 3D Parallax visual */}
        <div className="lg:w-1/2 w-full reveal relative" style={{ height: '520px' }}>
          <HeroParallax />
        </div>
      </div>

      {/* scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[var(--ink-muted)]">
        <span className="block h-9 w-px bg-gradient-to-b from-[var(--accent)] to-transparent" />
      </div>
    </section>
  );
}
