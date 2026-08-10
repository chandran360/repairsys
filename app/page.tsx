'use client';

import dynamic from 'next/dynamic';
import { ThreeProvider } from '@/lib/three-context';
import { useLenis } from '@/hooks/use-lenis';
import Navbar from '@/components/site/Navbar';
import Hero from '@/components/site/Hero';
import Features from '@/components/site/Features';
import About from '@/components/site/About';
import Pipeline from '@/components/site/Pipeline';
import Pricing from '@/components/site/Pricing';
import Benefits from '@/components/site/Benefits';
import Contact from '@/components/site/Contact';
import Footer from '@/components/site/Footer';

const AmbientBackground = dynamic(
  () => import('@/components/three/AmbientBackground'),
  { ssr: false }
);
const MagneticCursor = dynamic(
  () => import('@/components/three/MagneticCursor'),
  { ssr: false }
);
const ScrollReveal = dynamic(
  () => import('@/components/three/ScrollReveal'),
  { ssr: false }
);

function LenisBridge() {
  useLenis();
  return null;
}

export default function Home() {
  return (
    <ThreeProvider>
      <LenisBridge />
      <AmbientBackground />
      <MagneticCursor />
      <ScrollReveal />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <About />
        <Pipeline />
        <Pricing />
        <Benefits />
        <Contact />
      </main>
      <Footer />
    </ThreeProvider>
  );
}
