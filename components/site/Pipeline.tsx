'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type Stage = {
  n: string;
  title: React.ReactNode;
  desc: React.ReactNode;
  bullets: {
    icon: React.ReactNode;
    text: React.ReactNode;
  }[];
  bulletsGrid?: boolean;
  media: {
    type: 'image' | 'video';
    src: string;
  };
};

const STAGES: Stage[] = [
  {
    n: '01',
    title: 'Intake: Received & Logged',
    desc: 'The moment a device comes through the door, a comprehensive ticket is created to capture every detail.',
    bullets: [
      {
        icon: <Check className="w-5 h-5 text-orange-500" />,
        text: <><strong className="text-[#111111] font-semibold">Record instantly</strong> — model, condition, and reported issue.</>,
      },
      {
        icon: <Check className="w-5 h-5 text-orange-500" />,
        text: <><strong className="text-[#111111] font-semibold">Digital receipts</strong> sent straight to the customer&apos;s phone.</>,
      },
      {
        icon: <Check className="w-5 h-5 text-orange-500" />,
        text: <><strong className="text-[#111111] font-semibold">Bulletproof tracking</strong> so nothing gets lost before diagnosis.</>,
      },
    ],
    media: {
      type: 'image',
      src: 'https://res.cloudinary.com/defqgygsf/image/upload/v1787213134/091_ooxoiw.png',
    },
  },
  {
    n: '02',
    title: 'Precision Diagnosing',
    desc: 'A technician runs a full check to pin down exactly what is wrong. No guesswork, just absolute certainty.',
    bulletsGrid: true,
    bullets: [
      {
        icon: <Check className="w-5 h-5 text-purple-600" />,
        text: <><strong className="text-[#111111] font-semibold">Full diagnostic checks</strong> logged centrally.</>,
      },
      {
        icon: <Check className="w-5 h-5 text-purple-600" />,
        text: <><strong className="text-[#111111] font-semibold">Identify parts</strong> needed without delay.</>,
      },
      {
        icon: <Check className="w-5 h-5 text-purple-600" />,
        text: <><strong className="text-[#111111] font-semibold">Add tech notes</strong> hidden from the customer.</>,
      },
      {
        icon: <Check className="w-5 h-5 text-purple-600" />,
        text: <><strong className="text-[#111111] font-semibold">Attach photos</strong> of internal damage.</>,
      },
    ],
    media: {
      type: 'image',
      src: 'https://res.cloudinary.com/defqgygsf/image/upload/v1787213134/809_rbuvw3.png',
    },
  },
  {
    n: '03',
    title: 'Awaiting Approval',
    desc: 'A quote is shared and work only begins once the customer confirms. No surprise charges or assumptions.',
    bullets: [
      {
        icon: <Check className="w-5 h-5 text-emerald-600" />,
        text: <><strong className="text-[#111111] font-semibold">Send automated quotes</strong> directly via WhatsApp.</>,
      },
      {
        icon: <Check className="w-5 h-5 text-emerald-600" />,
        text: <><strong className="text-[#111111] font-semibold">One-tap approval</strong> for the customer on their phone.</>,
      },
      {
        icon: <Check className="w-5 h-5 text-emerald-600" />,
        text: <><strong className="text-[#111111] font-semibold">Locked-in pricing</strong> agreed upon before any part is touched.</>,
      },
    ],
    media: {
      type: 'image',
      src: 'https://res.cloudinary.com/defqgygsf/image/upload/v1787214064/8120_hqhqrd.png',
    },
  },
  {
    n: '04',
    title: 'Active Repairing',
    desc: 'The actual work happens here. Tracked step by step until the fix is completed to the highest standard.',
    bulletsGrid: true,
    bullets: [
      {
        icon: <Check className="w-5 h-5 text-blue-600" />,
        text: <><strong className="text-[#111111] font-semibold">Track repair time</strong> automatically.</>,
      },
      {
        icon: <Check className="w-5 h-5 text-blue-600" />,
        text: <><strong className="text-[#111111] font-semibold">Consume inventory</strong> parts dynamically.</>,
      },
      {
        icon: <Check className="w-5 h-5 text-blue-600" />,
        text: <><strong className="text-[#111111] font-semibold">Update internal status</strong> across the shop.</>,
      },
      {
        icon: <Check className="w-5 h-5 text-blue-600" />,
        text: <><strong className="text-[#111111] font-semibold">Assign technicians</strong> to specific jobs.</>,
      },
    ],
    media: {
      type: 'image',
      src: 'https://res.cloudinary.com/defqgygsf/image/upload/v1787214770/810_s6lqmp.png',
    },
  },
  {
    n: '05',
    title: 'Ready for Pickup',
    desc: 'Once repairs pass a final check, the customer is notified straight away on WhatsApp — no waiting around.',
    bullets: [
      {
        icon: <Check className="w-5 h-5 text-amber-500" />,
        text: <><strong className="text-[#111111] font-semibold">Automated WhatsApp ping</strong> sent the second it is marked ready.</>,
      },
      {
        icon: <Check className="w-5 h-5 text-amber-500" />,
        text: <><strong className="text-[#111111] font-semibold">Quality assurance</strong> checklist verification.</>,
      },
      {
        icon: <Check className="w-5 h-5 text-amber-500" />,
        text: <><strong className="text-[#111111] font-semibold">No customer chasing</strong> or endless phone calls.</>,
      },
    ],
    media: {
      type: 'image',
      src: 'https://res.cloudinary.com/defqgygsf/image/upload/v1787214064/7281_x4mfmg.png',
    },
  },
  {
    n: '06',
    title: 'Delivered & Settled',
    desc: 'The device is handed back, the ticket is closed, and billing is settled. Ready for the next device.',
    bulletsGrid: true,
    bullets: [
      {
        icon: <Check className="w-5 h-5 text-rose-600" />,
        text: <><strong className="text-[#111111] font-semibold">Generate final invoices</strong> instantly.</>,
      },
      {
        icon: <Check className="w-5 h-5 text-rose-600" />,
        text: <><strong className="text-[#111111] font-semibold">Multi-mode payments</strong> supported natively.</>,
      },
      {
        icon: <Check className="w-5 h-5 text-rose-600" />,
        text: <><strong className="text-[#111111] font-semibold">One-click ticket closure</strong> to keep the board clean.</>,
      },
      {
        icon: <Check className="w-5 h-5 text-rose-600" />,
        text: <><strong className="text-[#111111] font-semibold">Review requests</strong> sent out automatically.</>,
      },
    ],
    media: {
      type: 'image',
      src: 'https://res.cloudinary.com/defqgygsf/image/upload/v1787214064/671_rrjigy.png',
    },
  },
];

export default function Pipeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Add a cool 3D scale-down effect for cards as they get covered
      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        if (i < cardsRef.current.length - 1) {
          const nextCard = cardsRef.current[i + 1];
          if (!nextCard) return;

          gsap.to(card, {
            scale: 0.92,
            opacity: 0.4,
            transformOrigin: 'top center',
            ease: 'none',
            scrollTrigger: {
              trigger: nextCard,
              start: 'top bottom', // when the top of the NEXT card hits the bottom of the viewport
              end: 'top 15%',      // when the top of the NEXT card reaches near its sticky position
              scrub: true,
            }
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="features" className="relative py-24 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto">

      {/* Restored Main Heading */}
      <div className="mx-auto max-w-6xl px-5 sm:px-8 mb-14">
        <p className="reveal text-xs uppercase tracking-[0.3em] text-[var(--accent)] mb-4">
          How It Works
        </p>
        <h2 className="reveal display text-[clamp(2rem,4.5vw,3.4rem)] text-[var(--ink)]">
          One pipeline, from{' '}
          <span className="text-gradient">intake to pickup</span>
        </h2>
      </div>

      <div ref={containerRef} className="flex flex-col gap-12 sm:gap-24 relative pb-24">
        {STAGES.map((s, i) => (
          <div
            key={i}
            ref={(el) => {
              cardsRef.current[i] = el;
            }}
            // Removed the `+ i * 20` offset so cards stack perfectly on top of each other
            className="sticky w-full rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden border border-slate-200 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] flex flex-col lg:flex-row items-center will-change-transform bg-white"
            style={{
              top: '12vh',
              height: '75vh',
              zIndex: i,
            }}
          >
            {/* Left Content */}
            <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-20 flex flex-col justify-center h-full bg-white relative z-10">

              {/* Ghost Number Added Back */}
              <span className="pointer-events-none block font-display text-[7rem] sm:text-[9rem] font-bold leading-none text-slate-900/[0.04] select-none -mb-6 sm:-mb-8">
                {s.n}
              </span>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111111] tracking-tight mb-6 leading-[1.1]">
                {s.title}
              </h2>
              <p className="text-lg sm:text-xl text-[#6B7280] mb-10 lg:mb-12 max-w-md leading-relaxed">
                {s.desc}
              </p>

              <div className={`grid gap-6 ${s.bulletsGrid ? 'sm:grid-cols-2 gap-x-6 gap-y-6' : 'grid-cols-1 max-w-lg'}`}>
                {s.bullets.map((b, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="mt-1 shrink-0 bg-slate-50 rounded-md p-1 border border-slate-200 shadow-sm">
                      {b.icon}
                    </div>
                    <p className="text-[15px] sm:text-base text-[#6B7280] leading-snug">
                      {b.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Media */}
            <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex items-center justify-center relative z-0 min-h-[40vh] lg:min-h-full lg:self-stretch bg-slate-50/50">
              <div className="relative w-full max-w-lg aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-white transform transition-transform hover:scale-[1.02] duration-500">
                {s.media.type === 'image' ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={s.media.src}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    src={s.media.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}