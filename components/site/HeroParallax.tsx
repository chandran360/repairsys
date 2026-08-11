'use client';

import { useEffect, useRef } from 'react';
import { Zap, ShieldCheck, Wrench } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   Particle positions — defined statically to prevent
   hydration mismatch from Math.random() during SSR
   ───────────────────────────────────────────────────────────── */
const PARTICLES = [
  { left: 10, top: 18, size: 3, delay: 0, dur: 6.5 },
  { left: 25, top: 60, size: 2, delay: 1.1, dur: 7.2 },
  { left: 42, top: 12, size: 3, delay: 0.3, dur: 5.8 },
  { left: 58, top: 42, size: 2, delay: 2.0, dur: 8.0 },
  { left: 75, top: 22, size: 3, delay: 0.7, dur: 6.0 },
  { left: 90, top: 68, size: 2, delay: 1.5, dur: 7.8 },
  { left: 33, top: 78, size: 2, delay: 2.3, dur: 5.2 },
  { left: 52, top: 52, size: 3, delay: 0.5, dur: 7.0 },
  { left: 18, top: 38, size: 2, delay: 1.8, dur: 6.4 },
  { left: 68, top: 82, size: 2, delay: 2.8, dur: 5.6 },
  { left: 82, top: 35, size: 3, delay: 0.9, dur: 7.5 },
  { left: 48, top: 88, size: 2, delay: 3.2, dur: 6.2 },
];

export default function HeroParallax() {
  /* ── Refs ── */
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* ── 3D parallax engine ── */
  useEffect(() => {
    /* Bail on reduced-motion */
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (reduced) return;

    /* ── Device capability detection ── */
    const hasMouse = window.matchMedia(
      '(hover: hover) and (pointer: fine)'
    ).matches;
    const w = window.innerWidth;
    const isMobile = w < 768;
    const isTablet = w >= 768 && w < 1024;

    // Desktop = full mouse intensity, tablet = 40%, mobile = 0 (scroll only)
    const mouseK = !hasMouse || isMobile ? 0 : isTablet ? 0.4 : 1;
    const scrollK = isMobile ? 0.5 : 1;

    /* ── Tracking state ── */
    const tgt = { x: 0, y: 0 }; // mouse target  (raw, −1…1)
    const cur = { x: 0, y: 0 }; // mouse current  (damped)
    const scr = { cur: 0, tgt: 0 }; // scroll progress

    /* ── Mouse listener ── */
    const onMove = (e: MouseEvent) => {
      if (!mouseK) return;
      tgt.x = (e.clientX / window.innerWidth - 0.5) * 2;
      tgt.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (mouseK) {
      window.addEventListener('mousemove', onMove, { passive: true });
    }

    /* ── Scroll listener ── */
    const onScroll = () => {
      if (!wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      // 0 → top of wrapper at viewport top, 1 → scrolled one viewport past
      scr.tgt = Math.max(
        0,
        Math.min(1.2, -rect.top / (window.innerHeight * 0.8))
      );  
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // seed initial value

    /* ── Animation loop ── */
    let raf: number;

    const tick = () => {
      /* Smooth damping for mouse */
      cur.x += (tgt.x - cur.x) * 0.06;
      cur.y += (tgt.y - cur.y) * 0.06;

      /* Smooth damping for scroll */
      scr.cur += (scr.tgt - scr.cur) * 0.08;

      const mx = cur.x * mouseK;
      const my = cur.y * mouseK;
      const sy = scr.cur * scrollK;

      /* ── Scene container: 3D tilt from mouse ── */
      if (sceneRef.current) {
        sceneRef.current.style.transform =
          `rotateY(${mx * 4}deg) rotateX(${-my * 3}deg)`;
      }

      /* ── Background layer: slowest, inverse movement, deeper ── */
      if (bgRef.current) {
        bgRef.current.style.transform =
          `translate3d(${-mx * 6}px, ${-my * 4 + sy * -12}px, -80px) scale(1.08)`;
      }

      /* ── Main image layer: moderate movement ── */
      if (mainRef.current) {
        mainRef.current.style.transform =
          `translate3d(${-mx * 3}px, ${-my * 2 + sy * -25}px, 0px) scale(${1 + sy * 0.015})`;
      }

      /* ── Floating cards: each at a different depth, stronger movement ── */
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const z = 50 + i * 25; // depth: 50, 75, 100
        const f = 1 + i * 0.35; // movement factor: 1, 1.35, 1.7
        el.style.transform =
          `translate3d(${mx * 10 * f}px, ${my * 7 * f + sy * -(35 + i * 12)}px, ${z}px)`;
      });

      /* ── Mouse-following light reflection ── */
      if (lightRef.current) {
        const lx = 50 + mx * 25;
        const ly = 50 + my * 25;
        lightRef.current.style.background =
          `radial-gradient(500px circle at ${lx}% ${ly}%, rgba(14,124,134,0.08), transparent 55%)`;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    /* ── Cleanup ── */
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  /* ── Card definitions ── */
  const cards = [
    {
      icon: <Zap size={14} />,
      label: 'Quick Repair',
      pos: { top: '5%', right: '0%' } as React.CSSProperties,
    },
    {
      icon: <ShieldCheck size={14} />,
      label: 'Certified',
      pos: { top: '42%', right: '-6%' } as React.CSSProperties,
    },
    {
      icon: <Wrench size={14} />,
      label: '100+ Parts',
      pos: { bottom: '18%', left: '-4%' } as React.CSSProperties,
    },
  ];

  /* ── Render ── */
  return (
    <div ref={wrapperRef} className="hero-parallax-wrapper">
      {/* Ambient glow behind everything */}
      <div className="hero-parallax-ambient" />

      {/* 3D scene container — rotates on mouse, holds all layers */}
      <div ref={sceneRef} className="hero-parallax-scene">

        {/* Layer 0: Background depth — blurred, scaled, behind */}
        <div
          ref={bgRef}
          className="hero-parallax-layer hero-parallax-layer--bg"
        >
          <img
            src="https://res.cloudinary.com/defqgygsf/image/upload/v1786439549/ChatGPT_Image_Aug_11_2026_02_41_59_PM_us16yn.png"
            alt=""
            draggable={false}
            className="hero-parallax-img"
            loading="lazy"
          />
        </div>

        {/* Layer 1: Main sharp image */}
        <div
          ref={mainRef}
          className="hero-parallax-layer hero-parallax-layer--main"
        >
          <img
            src="https://res.cloudinary.com/defqgygsf/image/upload/v1786439549/ChatGPT_Image_Aug_11_2026_02_41_59_PM_us16yn.png"
            alt="RepairSync repair technician at work"
            draggable={false}
            className="hero-parallax-img"
          />
        </div>

        {/* Mouse-following light reflection overlay */}
        <div
          ref={lightRef}
          className="hero-parallax-layer hero-parallax-reflection"
        />

        {/* Animated light sweep */}
        <div className="hero-parallax-layer hero-parallax-sweep" />

        {/* Floating glass cards at different 3D depths */}
        {cards.map((c, i) => (
          <div
            key={c.label}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="hero-parallax-card-wrap"
            style={c.pos}
            aria-hidden="true"
          >
            <div className={`hero-parallax-card hero-parallax-card--${i + 1}`}>
              <span className="hero-parallax-card-icon">{c.icon}</span>
              <span>{c.label}</span>
            </div>
          </div>
        ))}

        {/* Floating particles */}
        <div className="hero-parallax-dots" aria-hidden="true">
          {PARTICLES.map((p, i) => (
            <span
              key={i}
              className="hero-parallax-dot"
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: p.size,
                height: p.size,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.dur}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Depth shadow beneath the composition */}
      <div className="hero-parallax-shadow" />
    </div>
  );
}
