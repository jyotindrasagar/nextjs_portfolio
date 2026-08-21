"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export function Footer() {
  const [copiedToast, setCopiedToast] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToast(label);
    setTimeout(() => setCopiedToast(null), 2500);
  };

  return (
    <>
      {/* Toast Notification */}
      <AnimatePresence>
        {copiedToast && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-[9999] bg-accent text-black font-mono text-[11px] font-extrabold uppercase tracking-widest px-4 py-2.5 rounded shadow-[0_0_20px_rgba(255,184,198,0.6)] border border-white flex items-center gap-2 pointer-events-none"
          >
            <span className="w-2 h-2 rounded-full bg-black animate-ping" />
            <span>✓ {copiedToast} COPIED TO CLIPBOARD!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="mt-6 xl:mt-16 border-t border-foreground/10 px-4 md:px-8 lg:px-12 xl:px-16 pt-8 pb-10 flex flex-col lg:flex-row items-center justify-between gap-6 font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/50 select-none">
        {/* Left: Copyright */}
        <div className="shrink-0 text-center lg:text-left flex items-center gap-3">
          <span className="font-bold text-foreground/70">DIEABLO<span className="text-accent">FX</span></span>
          <span>//</span>
          <span>&copy; SINCE 2021 // ALL RIGHTS RESERVED</span>
        </div>

        {/* Middle: Legal & Utility Nav */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-foreground/60">
          <Link href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
          <span>•</span>
          <Link href="/terms" className="hover:text-accent transition-colors">Terms of Service</Link>
          <span>•</span>
          <Link href="/cookies" className="hover:text-accent transition-colors">Cookies</Link>
          <span>•</span>
          <Link href="/support" className="hover:text-accent transition-colors">Support</Link>
          <span>•</span>
          <Link href="/maintenance" className="hover:text-accent transition-colors flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Status
          </Link>
        </div>

        {/* Social Links */}
        <div className="flex flex-wrap items-center justify-center lg:justify-end gap-5 sm:gap-5 md:gap-6">
          <a aria-label="Instagram profile" href="https://instagram.com/dieablofx" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            <span className="hidden xl:inline">INSTAGRAM</span>
          </a>

          <a aria-label="Twitter profile" href="https://x.com/dieablofx" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
              <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
            </svg>
            <span className="hidden xl:inline">TWITTER</span>
          </a>

          <a aria-label="LinkedIn profile" href="https://www.linkedin.com/in/dieablofx" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
            <span className="hidden xl:inline">LINKEDIN</span>
          </a>

          <a aria-label="YouTube channel" href="https://youtube.com/@dieablofx" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
            </svg>
            <span className="hidden xl:inline">YOUTUBE</span>
          </a>

          <a aria-label="Behance profile" href="https://behance.net/dieablofx" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3 4.412-3h-7.996v3zm0 5.988h3.816c2.508 0 2.906-3 4.412-3h-8.228v3z" />
            </svg>
            <span className="hidden xl:inline">BEHANCE</span>
          </a>

          <button aria-label="Copy Discord ID" onClick={() => handleCopy('dieablo', 'DISCORD ID')} className="hover:text-foreground transition-colors flex items-center gap-2 relative">
            <svg width="14" height="14" viewBox="0 0 127.14 96.36" fill="currentColor">
              <path d="M107.7 8.07A105.15 105.15 0 0 0 81.47 0a72.06 72.06 0 0 0-3.36 6.83 97.68 97.68 0 0 0-29.08 0A72.37 72.37 0 0 0 45.67 0a105.14 105.14 0 0 0-26.22 8.09C2.79 32.65-1.73 56.6 .37 80.05a105.73 105.73 0 0 0 32.17 16.31 77.7 77.7 0 0 0 6.89-11.11 68.42 68.42 0 0 1-10.85-5.18c.91-.66 1.8-1.34 2.66-2a75.57 75.57 0 0 0 64.32 0c.87.71 1.76 1.39 2.66 2a68.68 68.68 0 0 1-10.87 5.19 77 77 0 0 0 6.89 11.1 105.25 105.25 0 0 0 32.19-16.31c2.26-26.4-3.32-50-19.13-71.98zM42.49 65.16c-5.36 0-9.8-4.93-9.8-11s4.38-11 9.8-11 9.88 4.93 9.8 11-4.43 11-9.8 11zm42.16 0c-5.36 0-9.8-4.93-9.8-11s4.38-11 9.8-11 9.88 4.93 9.8 11-4.43 11-9.8 11z" />
            </svg>
            <span className="hidden xl:inline">DISCORD</span>
          </button>

          <button aria-label="Copy Email address" onClick={() => handleCopy('hello@dieablo.com', 'EMAIL')} className="hover:text-foreground transition-colors flex items-center gap-2 relative">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span className="hidden xl:inline">EMAIL</span>
          </button>
        </div>
      </footer>
    </>
  );
}
