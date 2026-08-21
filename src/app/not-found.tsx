"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Film, BookOpen, LifeBuoy, ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-accent selection:text-white relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-foreground/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ea879c_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.07]" />
      </div>

      {/* Header bar */}
      <header className="relative z-10 w-full px-6 md:px-12 py-6 flex items-center justify-between border-b border-foreground/10">
        <Link href="/" className="flex items-center gap-2 group">
          <img
            src="/dieablofx.svg"
            alt="DieabloFX"
            className="h-5 w-auto logo-image invert dark:invert-0 group-hover:scale-105 transition-transform"
          />
          <span className="font-display font-bold text-xs uppercase tracking-[0.2em]">
            Dieablo<span className="text-accent">FX</span>
          </span>
        </Link>

        <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/50 border border-foreground/10 px-3 py-1 rounded-full">
          STATUS: 404 // NOT_FOUND
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-16 flex flex-col items-center text-center my-auto">
        {/* Error Code Graphic */}
        <div className="relative mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="font-display font-black text-8xl sm:text-9xl md:text-[11rem] leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground via-foreground/70 to-foreground/20 select-none relative"
          >
            404
            <span className="absolute inset-0 text-accent/20 blur-xl select-none -z-10">404</span>
          </motion.div>

          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-accent text-black font-mono text-[9px] font-extrabold uppercase tracking-[0.3em] px-3 py-0.5 rounded shadow-[0_0_15px_rgba(234,135,156,0.6)]">
            SECTOR UNRESOLVED
          </div>
        </div>

        {/* Diagnostics Box */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="w-full max-w-lg bg-panels/80 backdrop-blur-md border border-foreground/10 rounded-xl p-5 mb-8 shadow-xl text-left font-mono text-[11px]"
        >
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-foreground/10 text-foreground/40 text-[10px] tracking-wider">
            <span>DIAGNOSTIC TRACE</span>
            <span className="text-accent flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" /> SIGNAL LOST
            </span>
          </div>
          <p className="text-foreground/80 leading-relaxed">
            The timeline fragment or coordinates you requested cannot be located in the current matrix render. The link may have moved, expired, or never existed.
          </p>
        </motion.div>

        {/* Quick Navigation Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-2xl"
        >
          <Link
            href="/"
            className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg bg-foreground/5 hover:bg-accent/10 border border-foreground/10 hover:border-accent/40 text-foreground transition-all duration-300 group hover:-translate-y-1"
          >
            <Home size={18} className="text-accent group-hover:scale-110 transition-transform" />
            <span className="font-display font-bold text-xs uppercase tracking-wider">Return Home</span>
            <span className="font-mono text-[9px] text-foreground/40">Base Portal</span>
          </Link>

          <Link
            href="/#work"
            className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg bg-foreground/5 hover:bg-accent/10 border border-foreground/10 hover:border-accent/40 text-foreground transition-all duration-300 group hover:-translate-y-1"
          >
            <Film size={18} className="text-accent group-hover:scale-110 transition-transform" />
            <span className="font-display font-bold text-xs uppercase tracking-wider">Showreel</span>
            <span className="font-mono text-[9px] text-foreground/40">Featured VFX</span>
          </Link>

          <Link
            href="/blogs"
            className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg bg-foreground/5 hover:bg-accent/10 border border-foreground/10 hover:border-accent/40 text-foreground transition-all duration-300 group hover:-translate-y-1"
          >
            <BookOpen size={18} className="text-accent group-hover:scale-110 transition-transform" />
            <span className="font-display font-bold text-xs uppercase tracking-wider">Case Studies</span>
            <span className="font-mono text-[9px] text-foreground/40">Breakdown Archive</span>
          </Link>

          <Link
            href="/support"
            className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg bg-foreground/5 hover:bg-accent/10 border border-foreground/10 hover:border-accent/40 text-foreground transition-all duration-300 group hover:-translate-y-1"
          >
            <LifeBuoy size={18} className="text-accent group-hover:scale-110 transition-transform" />
            <span className="font-display font-bold text-xs uppercase tracking-wider">Support</span>
            <span className="font-mono text-[9px] text-foreground/40">Get Assistance</span>
          </Link>
        </motion.div>

        {/* Back button */}
        <div className="mt-8">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-foreground/50 hover:text-foreground transition-colors"
          >
            <ArrowLeft size={12} /> Return to previous page
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full px-6 md:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-foreground/10 font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/40">
        <div>&copy; DIEABLOFX // ALL RIGHTS RESERVED</div>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
          <Link href="/support" className="hover:text-foreground transition-colors">Support</Link>
        </div>
      </footer>
    </div>
  );
}
