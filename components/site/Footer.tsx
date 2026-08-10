'use client';

import { Linkedin, Instagram, Facebook } from 'lucide-react';
import { scrollToId } from '@/hooks/use-lenis';
import { WHATSAPP_URL } from '@/lib/three-context';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'features', label: 'Features' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'contact', label: 'Contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/10 bg-black backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-14">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl ink-gradient text-white text-sm font-bold">
                R
              </span>
              <span className="font-display font-semibold text-lg text-white">
                RepairSync
              </span>
            </div>
            <p className="body-copy text-sm text-gray-400 max-w-sm mb-5">
              The all-in-one app for mobile phone repair shops — a product of VI
              WebSync Technologies.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-[var(--accent)] transition-colors"
            >
              <WhatsAppIcon width={16} height={16} className="text-white" />
              +91 88867 11810
            </a>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm text-white mb-4">
              Quick links
            </h4>
            <ul className="space-y-2.5">
              {LINKS.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => scrollToId(l.id)}
                    className="text-sm text-gray-400 hover:text-[var(--accent)] transition-colors"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm text-white mb-4">
              Company
            </h4>
            <a
              href="https://viwebsync.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-gray-400 hover:text-[var(--accent)] transition-colors mb-2.5"
            >
              VI WebSync Technologies
            </a>
            <div className="flex items-center gap-3 mt-4">
              {[Linkedin, Instagram, Facebook].map((Icon, i) => (
                <span
                  key={i}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-gray-300 hover:text-white transition-colors cursor-default"
                  aria-label="Social link placeholder"
                >
                  <Icon size={16} />
                </span>
              ))}
            </div>
            <div className="flex gap-4 mt-5 text-xs text-gray-500">
              <span className="cursor-default">Privacy Policy</span>
              <span className="cursor-default">Terms of Service</span>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 text-xs text-gray-500">
          © {year} VI WebSync Technologies. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
