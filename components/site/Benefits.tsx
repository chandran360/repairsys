'use client';

import { Clock3, ShieldCheck, TrendingUp, PhoneOff } from 'lucide-react';

const BENEFITS = [
  {
    icon: Clock3,
    text: 'No training manuals, no complicated setup',
    bob: 'rs-bob',
    depth: 'z-30',
    delay: '0s',
  },
  {
    icon: TrendingUp,
    text: 'Create a ticket in under a minute',
    bob: 'rs-bob-2',
    depth: 'z-20',
    delay: '0.6s',
  },
  {
    icon: ShieldCheck,
    text: 'Real profit per ticket, visible only to admins',
    bob: 'rs-bob',
    depth: 'z-10',
    delay: '1.2s',
  },
  {
    icon: PhoneOff,
    text: 'Customers stop calling to ask if it’s ready',
    bob: 'rs-bob-2',
    depth: 'z-20',
    delay: '0.3s',
  },
];

export default function Benefits() {
  return (
    <section className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="reveal text-xs uppercase tracking-[0.3em] text-[var(--accent)] mb-4">
            Why shops choose RepairSync
          </p>
          <h2 className="reveal display text-[clamp(2rem,4.5vw,3.4rem)] text-[var(--ink)]">
            What shop owners{' '}
            <span className="text-gradient">get</span>
          </h2>
          <p className="reveal body-copy text-[var(--ink-soft)] mt-4">
            Real, day-to-day benefits — not promises.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {BENEFITS.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={i}
                className={`reveal relative ${b.bob}`}
                style={{ animationDelay: b.delay }}
              >
                <div className="glass rounded-3xl p-7 flex items-center gap-5">
                  <div className="shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                    <Icon size={22} />
                  </div>
                  <p className="font-display font-medium text-lg text-[var(--ink)] leading-snug">
                    {b.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <p className="reveal text-center text-xs text-[var(--ink-muted)] mt-10">
          Benefits of using RepairSync — not customer testimonials.
        </p>
      </div>
    </section>
  );
}
