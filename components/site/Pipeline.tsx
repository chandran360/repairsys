'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const STAGES = [
  {
    n: '01',
    title: 'Received',
    desc: 'The device is logged and a ticket is created the moment it comes through the door. Every detail — model, condition, reported issue — is recorded so nothing gets lost between intake and diagnosis.',
  },
  {
    n: '02',
    title: 'Diagnosing',
    desc: 'A technician runs a full check to pin down exactly what is wrong. This step is about certainty: no guesswork, no unnecessary parts, just a clear read on what the device actually needs.',
  },
  {
    n: '03',
    title: 'Awaiting approval',
    desc: 'A quote is shared and work only begins once the customer confirms. No surprise charges, no assumptions — the price and the fix are agreed on before a single part is touched.',
  },
  {
    n: '04',
    title: 'Repairing',
    desc: 'The actual work happens here. Parts are replaced, boards are reworked, and every fix is done to the standard the ticket promised, tracked step by step until it is complete.',
  },
  {
    n: '05',
    title: 'Ready',
    desc: 'Once repairs pass a final check, the customer is notified straight away on WhatsApp — no waiting around, no chasing for updates on when to collect the device.',
  },
  {
    n: '06',
    title: 'Delivered',
    desc: 'The device is handed back, the ticket is closed, and billing is settled. The pipeline resets, ready for the next device that comes through the door.',
  },
];

const STAGE_H = '78vh';
const GAP = '2rem';

export default function Pipeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  // IntersectionObserver doesn't fire reliably inside a GSAP-pinned section,
  // so we manually add `is-in` to heading reveals as soon as the component mounts.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reveals = section.querySelectorAll<HTMLElement>('.reveal');
    // Short delay so the element is painted before the transition fires
    const t = setTimeout(() => {
      reveals.forEach((el) => el.classList.add('is-in'));
    }, 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const section = sectionRef.current;
      const stage = stageRef.current;
      if (!track || !section || !stage) return;

      // panel height + gap always equals stage.clientHeight by design, so each
      // panel's "top" sits at an exact multiple of stage.clientHeight. Deriving
      // distance from that (instead of track.scrollHeight - stage.clientHeight)
      // avoids the ~GAP drift that was pulling cards off center.
      const getDistance = () => (STAGES.length - 1) * stage.clientHeight;

      const tween = gsap.to(track, {
        y: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          scrub: true, // tied 1:1 to scroll position — no lag, no motion once you stop scrolling
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          // no `snap` here on purpose — snapping animates the track on its own
          // once you release the scroll, which read as the section "auto sliding".
          // Content now only ever moves while the user is actively scrolling.
          onUpdate: (self) => {
            if (lineRef.current) {
              lineRef.current.style.transform = `scaleY(${self.progress})`;
            }

            const idx = Math.round(self.progress * (STAGES.length - 1));
            setActive((prev) => (prev === idx ? prev : idx));

            const stageRect = stage.getBoundingClientRect();
            const stageCenter = stageRect.top + stageRect.height / 2;

            panelRefs.current.forEach((panel) => {
              if (!panel) return;
              const rect = panel.getBoundingClientRect();
              const center = rect.top + rect.height / 2;
              const dist = Math.abs(center - stageCenter);
              const t = Math.min(1, dist / (stageRect.height * 0.8));
              panel.style.opacity = `${1 - t * 0.9}`;
              panel.style.transform = `translateY(${t * 26}px)`;
            });
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="how"
      ref={sectionRef}
      className="relative py-16 sm:py-24 overflow-hidden"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8 mb-14">
        <p className="reveal text-xs uppercase tracking-[0.3em] text-[var(--accent)] mb-4">
          How It Works
        </p>
        <h2 className="reveal display text-[clamp(2rem,4.5vw,3.4rem)] text-[var(--ink)]">
          One pipeline, from{' '}
          <span className="text-gradient">intake to pickup</span>
        </h2>
      </div>

      <div
        ref={stageRef}
        className="relative w-full overflow-hidden"
        style={{ height: STAGE_H }}
      >
        {/* progress line down the left edge of the stage */}
        <div className="pointer-events-none absolute top-8 bottom-8 left-5 sm:left-8 w-px bg-[var(--ink)]/10 z-10">
          <div
            ref={lineRef}
            className="w-full ink-gradient origin-top scale-y-0"
          />
        </div>

        <div
          ref={trackRef}
          className="flex flex-col will-change-transform"
          style={{ gap: GAP }}
        >
          {STAGES.map((s, i) => (
            <div
              key={i}
              ref={(el) => {
                panelRefs.current[i] = el;
              }}
              className="w-full shrink-0 will-change-transform"
              style={{ height: `calc(${STAGE_H} - ${GAP})` }}
            >
              <div className="mx-auto grid h-full max-w-6xl grid-cols-1 items-center gap-x-16 gap-y-6 px-5 sm:px-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
                {/* left: ghost number + title, stacked like a stamp */}
                <div className="relative">
                  <span className="pointer-events-none block font-display text-[7rem] sm:text-[9rem] font-bold leading-none text-[var(--ink)]/[0.07] select-none">
                    {s.n}
                  </span>
                  <h3 className="font-display font-semibold text-3xl sm:text-4xl text-[var(--ink)] -mt-6 sm:-mt-8">
                    {s.title}
                  </h3>
                </div>

                {/* right: description */}
                <p className="body-copy text-base sm:text-lg leading-relaxed text-[var(--ink-soft)] max-w-xl">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* stage dots, stacked vertically on the right, synced to active panel */}
        <div className="absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-10">
          {STAGES.map((s, i) => (
            <span
              key={s.n}
              className="rounded-full transition-all duration-300"
              style={{
                height: i === active ? '28px' : '6px',
                width: '6px',
                background:
                  i === active
                    ? 'var(--accent)'
                    : 'color-mix(in srgb, var(--ink) 20%, transparent)',
              }}
            />
          ))}
        </div>
      </div>

      <p className="text-center text-xs text-[var(--ink-muted)] mt-8">
        Scroll to move through the pipeline
      </p>
    </section>
  );
}