'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles, CheckCircle2, CheckCircle, Zap, ShieldCheck, UserCheck, Banknote, Wrench } from 'lucide-react';
import { scrollToId } from '@/hooks/use-lenis';
import Image from 'next/image';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  /* Heading words split for staggered reveal */
  const headingTokens = [
    { text: 'RepairSync', isGradient: false },
    { text: '—', isGradient: false },
    { text: 'run', isGradient: false },
    { text: 'your', isGradient: false },
    { text: 'repair', isGradient: true },
    { text: 'shop', isGradient: true },
    { text: 'without', isGradient: false },
    { text: 'the', isGradient: false },
    { text: 'chaos.', isGradient: false },
  ];

  const fullTextLength = headingTokens.reduce((acc, t) => acc + t.text.length + 1, 0) - 1;

  useEffect(() => {
    if (isTyping && currentIndex < fullTextLength) {
      const timeout = setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 60); // Typing speed
      return () => clearTimeout(timeout);
    } else if (currentIndex >= fullTextLength) {
      setIsTyping(false);
      const restartTimeout = setTimeout(() => {
        setCurrentIndex(0);
        setIsTyping(true);
      }, 10000); // Wait 10 seconds before restarting
      return () => clearTimeout(restartTimeout);
    }
  }, [currentIndex, fullTextLength, isTyping]);

  // Scroll effect removed so content stays visible when scrolling

  return (
    <section id="home" ref={sectionRef} className="hero-section">
      <div className="hero-bg-gradient" aria-hidden="true" />
      <div className="hero-bg-grid-overlay" aria-hidden="true" />
      <div className="hero-bg-fog" aria-hidden="true" />
      <div className="hero-bg-noise" aria-hidden="true" />

      <div className="hero-content-wrapper">
        <div ref={textRef} className="hero-text-column">

          {/* Eyebrow */}
          <div className="reveal hero-eyebrow">
            <Sparkles size={14} className="hero-eyebrow-icon mr-1" />
            THE SMARTER WAY TO RUN REPAIRS
          </div>

          {/* Typing Animation Heading */}
          <h1 className="display text-[clamp(2.6rem,6.5vw,4.75rem)] text-[var(--ink)] mb-6 flex flex-wrap gap-x-[0.3em] gap-y-1">
            {headingTokens.map((item, index) => {
              const previousTokensLength = headingTokens.slice(0, index).reduce((acc, t) => acc + t.text.length + 1, 0);

              return (
                <span
                  key={index}
                  className={`inline-block ${item.isGradient ? 'text-gradient' : ''}`}
                >
                  {item.text.split('').map((char, charIndex) => {
                    const globalCharIndex = previousTokensLength + charIndex;
                    const isVisible = globalCharIndex < currentIndex;
                    return (
                      <span key={charIndex} className={isVisible ? 'visible' : 'invisible'}>
                        {char}
                      </span>
                    );
                  })}
                </span>
              );
            })}
          </h1>

          <p className="reveal body-copy text-[clamp(1.05rem,1.8vw,1.25rem)] text-[var(--ink-soft)] max-w-xl mb-9">
            The all-in-one app for mobile phone repair shops — track every repair
            from intake to pickup, bill customers accurately, manage staff
            attendance and payroll, and keep spare-parts stock under control.
          </p>

          {/* CTAs */}
          <div className="reveal hero-cta-row">
            <button
              onClick={() => scrollToId('contact')}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-bold text-black dark:text-white shadow-xl shadow-[#0e7c86]/25 transition-transform hover:scale-[1.03]"
            >
              Book a Demo / Get Started
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>

            <button
              onClick={() => scrollToId('features')}
              className="hero-cta-secondary"
              id="hero-cta-secondary"
            >
              See Features
            </button>
          </div>

          {/* Trust text */}
          <div className="reveal hero-trust-row flex items-center gap-4 mt-8 text-[14px] text-muted-foreground font-medium flex-wrap">
            <div className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-green-500" /> No complex setup</div>
            <div className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-green-500" /> Built for repair shops</div>
            <div className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-green-500" /> Everything in one place</div>
          </div>
        </div>

        {/* Right: Product visual composition */}
        <div className="hero-visual-column reveal relative w-full flex justify-center mt-12 lg:mt-0 lg:w-[60%] pointer-events-none">
          <div className="absolute inset-0 bg-blue-500/10 dark:bg-blue-500/20 blur-[100px] rounded-full scale-75 -z-10" />



          <div className="absolute right-0 lg:right-4 -top-0 md:top-6 z-20 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
            <div className="flex items-center gap-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-black/5 dark:border-white/10 shadow-xl rounded-xl px-4 py-3 pointer-events-auto hover:-translate-y-1 transition-transform">
              <div className="w-8 h-8 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366]">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-900 dark:text-white leading-tight">WhatsApp Sent</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Status updated to &apos;Repairing&apos;</span>
              </div>
            </div>
          </div>

          <div className="absolute left-0 lg:left-4 bottom-20 md:bottom-28 z-20 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-700">
            <div className="flex items-center gap-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-black/5 dark:border-white/10 shadow-xl rounded-xl px-4 py-3 pointer-events-auto hover:-translate-y-1 transition-transform">
              <div className="w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center text-violet-600 dark:text-violet-400">
                <ShieldCheck size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                  Secure Warranty
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  90-Day Parts Covered
                </span>
              </div>
            </div>
          </div>

          {/* Floating Card 4 */}


          <div className="absolute left-0 lg:left-4 top-20 md:top-16 z-20 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
            <div className="flex items-center gap-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-black/5 dark:border-white/10 shadow-xl rounded-xl px-4 py-3 pointer-events-auto hover:-translate-y-1 transition-transform">
              <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center text-orange-600 dark:text-orange-400">
                <Zap size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-900 dark:text-white leading-tight">Priority Service</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Fast-Track Repair Activated</span>
              </div>
            </div>
          </div>

          <Image
            src="/hero-image.png"
            alt="RepairSync Dashboard Mockup"
            width={1200}
            height={800}
            className="w-full max-w-[1000px] h-auto object-contain z-10 transition-transform duration-700 ease-out hover:scale-[1.02]"
            priority
          />
        </div>
      </div>

      {/* Scroll hint */}
      <div className="hero-scroll-hint" aria-hidden="true">
        <span className="hero-scroll-line" />
      </div>
    </section>
  );
}