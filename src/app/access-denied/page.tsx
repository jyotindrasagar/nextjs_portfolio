"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldAlert, LogIn, Home, Mail, ArrowLeft, Key } from 'lucide-react';

export default function AccessDeniedPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-accent selection:text-white relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/10 dark:bg-accent/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-foreground/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ea879c_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.05]" />
      </div>

      {/* Top Header */}
      <header className="relative z-10 w-full px-6 md:px-12 py-6 flex items-center justify-between border-b border-foreground/10 bg-background/80 backdrop-blur-md">
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

        <div className="font-mono text-[10px] uppercase tracking-widest text-red-400 border border-red-500/30 bg-red-500/10 px-3 py-1 rounded-full flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
          HTTP 403 // FORBIDDEN
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-2xl mx-auto px-6 py-16 flex flex-col items-center text-center my-auto">
        {/* Shield Icon Graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative mb-6"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
            <ShieldAlert size={44} className="stroke-[1.5]" />
          </div>
        </motion.div>

        {/* Header Titles */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-3 mb-8"
        >
          <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-wider text-foreground">
            Access <span className="text-red-400 dark:text-accent">Denied</span>
          </h1>
          <p className="font-mono text-xs text-foreground/50 tracking-widest uppercase max-w-md mx-auto">
            Clearance Level Insufficient // Restricted Sector
          </p>
        </motion.div>

        {/* Diagnostics Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full bg-panels/80 backdrop-blur-md border border-foreground/10 rounded-xl p-6 mb-8 text-left font-mono text-xs shadow-xl space-y-3"
        >
          <div className="flex items-center justify-between pb-3 border-b border-foreground/10 text-[10px] text-foreground/40 uppercase">
            <span>SECURITY SYSTEM LOG</span>
            <span className="text-red-400">ERROR_CODE: 0x403_RESTRICTED</span>
          </div>
          <p className="font-sans text-xs text-foreground/80 leading-relaxed">
            You do not possess the required permissions or cryptographic role to access this administrative control portal. This event has been securely logged for policy compliance.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
        >
          <Link
            href="/login"
            className="flex-1 bg-accent text-black font-mono text-xs font-bold uppercase tracking-widest py-3.5 px-4 rounded-lg flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-lg shadow-accent/20"
          >
            <LogIn size={15} /> Switch / Sign In
          </Link>

          <Link
            href="/"
            className="flex-1 bg-foreground/10 hover:bg-foreground/15 text-foreground font-mono text-xs font-bold uppercase tracking-widest py-3.5 px-4 rounded-lg flex items-center justify-center gap-2 border border-foreground/15 transition-all"
          >
            <Home size={15} /> Return Home
          </Link>
        </motion.div>

        {/* Support Link */}
        <div className="mt-8">
          <a
            href="mailto:hello@dieablo.com?subject=Access%20Request%20Inquiry"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-foreground/50 hover:text-accent transition-colors"
          >
            <Mail size={13} /> Request Clearance: hello@dieablo.com
          </a>
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
