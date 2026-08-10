'use client';

import { Play } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* 3D-depth layered heading */}
          <div className="relative">
            <p className="reveal text-xs uppercase tracking-[0.3em] text-[var(--accent)] mb-4">
              About
            </p>

            <div
              className="reveal relative"
              style={{ perspective: '800px' }}
            >
              {/* blurred back layer */}
              <h2
                aria-hidden
                className="display absolute inset-0 text-[clamp(2rem,4.2vw,3.2rem)] text-[var(--accent)] opacity-20 blur-[6px] select-none"
              >
                Built for shop owners, not IT departments
              </h2>
              {/* mid layer */}
              <h2
                aria-hidden
                className="display absolute inset-0 text-[clamp(2rem,4.2vw,3.2rem)] text-[var(--accent-2)] opacity-30 blur-[2px] select-none translate-x-[2px] translate-y-[2px]"
              >
                Built for shop owners, not IT departments
              </h2>
              {/* sharp front layer */}
              <h2 className="display relative text-[clamp(2rem,4.2vw,3.2rem)] text-[var(--ink)] translate-x-[4px] translate-y-[4px]">
                Built for shop owners,{' '}
                <span className="text-gradient">not IT departments</span>
              </h2>
            </div>

            <p className="reveal body-copy text-[clamp(1rem,1.6vw,1.15rem)] text-[var(--ink-soft)] mt-8 max-w-lg">
              No training manuals, no complicated setup. If your staff can use
              WhatsApp, they can use RepairSync — create a ticket in under a
              minute, and the app handles the rest.
            </p>
          </div>

          {/* placeholder for screen recording */}
          <div className="reveal relative">
            <div className="relative aspect-[4/3] rounded-3xl glass-strong overflow-hidden flex items-center justify-center">
              <div
                className="absolute inset-0 opacity-60"
                style={{
                  background:
                    'radial-gradient(80% 60% at 50% 40%, rgba(14,124,134,0.10), transparent 60%)',
                }}
              />
              <div className="relative flex flex-col items-center gap-4 text-center px-6">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full ink-gradient text-white shadow-xl shadow-[#0e7c86]/30">
                  <Play size={26} className="ml-1" />
                </div>
                <p className="text-sm font-medium text-[var(--ink)]">
                  Create a ticket in under a minute
                </p>
                <p className="text-xs text-[var(--ink-muted)] max-w-xs">
                  Looping screen recording placeholder — a short GIF of creating
                  a repair ticket goes here.
                </p>
              </div>
            </div>
            {/* floating accent tag */}
            <div className="rs-bob absolute -top-4 -right-2 glass-strong rounded-full px-4 py-2 text-xs font-medium text-[var(--ink)] shadow-lg">
              Under 60 seconds
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
