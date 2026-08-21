"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Wrench, Radio, CheckCircle, Server, RefreshCw, Mail, ArrowLeft, LifeBuoy } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function MaintenancePage() {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => (p + 1) % 100);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-accent selection:text-white relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-accent/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-foreground/5 rounded-full blur-[120px]" />
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

        <div className="font-mono text-[10px] uppercase tracking-widest text-amber-400 border border-amber-500/30 bg-amber-500/10 px-3 py-1 rounded-full flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
          SYSTEM STATUS: MAINTENANCE
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-3xl mx-auto px-6 py-16 flex flex-col items-center text-center my-auto">
        {/* Animated Icon Graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative mb-6"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent shadow-[0_0_30px_rgba(234,135,156,0.25)]">
            <RefreshCw size={40} className="stroke-[1.75] animate-[spin_8s_linear_infinite]" />
          </div>
        </motion.div>

        {/* Title Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-3 mb-8"
        >
          <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-wider text-foreground">
            System <span className="text-accent">Upgrade</span>
          </h1>
          <p className="font-mono text-xs text-foreground/60 tracking-widest uppercase max-w-lg mx-auto">
            Scheduled Render Engine Upgrades & Infrastructure Maintenance
          </p>
        </motion.div>

        {/* Live System Diagnostics Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full bg-panels/80 backdrop-blur-md border border-foreground/10 rounded-2xl p-6 mb-8 text-left shadow-xl"
        >
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-foreground/10 font-mono text-[10px] text-foreground/40 uppercase">
            <span className="flex items-center gap-1.5">
              <Radio size={12} className="text-accent animate-pulse" /> LIVE TELEMETRY FEED
            </span>
            <span>NODE CLUSTER: PROD-US-EAST</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between p-3 rounded-lg bg-foreground/[0.03] border border-foreground/5">
              <span className="text-foreground/70 flex items-center gap-2">
                <Server size={14} className="text-accent" /> Edge Content Delivery Network (Cloudflare R2)
              </span>
              <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Operational
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-foreground/[0.03] border border-foreground/5">
              <span className="text-foreground/70 flex items-center gap-2">
                <Wrench size={14} className="text-accent" /> High-Bitrate Video Rendering Engines
              </span>
              <span className="text-amber-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" /> Synchronizing
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-foreground/[0.03] border border-foreground/5">
              <span className="text-foreground/70 flex items-center gap-2">
                <CheckCircle size={14} className="text-accent" /> Client Inquiries & Dispatch Pipelines
              </span>
              <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Active (24/7)
              </span>
            </div>
          </div>

          {/* Progress bar visual */}
          <div className="mt-5 pt-4 border-t border-foreground/10">
            <div className="flex justify-between font-mono text-[10px] text-foreground/50 uppercase mb-1.5">
              <span>Calibration Progress</span>
              <span className="text-accent font-bold">88%</span>
            </div>
            <div className="w-full h-1.5 bg-foreground/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-accent/60 to-accent w-[88%] rounded-full animate-pulse" />
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
        >
          <a
            href="mailto:hello@dieablo.com?subject=Urgent%20Client%20Inquiry%20During%20Maintenance"
            className="flex-1 bg-accent text-black font-mono text-xs font-bold uppercase tracking-widest py-3.5 px-4 rounded-lg flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-lg shadow-accent/20"
          >
            <Mail size={15} /> hello@dieablo.com
          </a>

          <Link
            href="/support"
            className="flex-1 bg-foreground/10 hover:bg-foreground/15 text-foreground font-mono text-xs font-bold uppercase tracking-widest py-3.5 px-4 rounded-lg flex items-center justify-center gap-2 border border-foreground/15 transition-all"
          >
            <LifeBuoy size={15} /> Support Hub
          </Link>
        </motion.div>

        {/* Back Link */}
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-foreground/50 hover:text-foreground transition-colors"
          >
            <ArrowLeft size={12} /> Try Accessing Main Portfolio
          </Link>
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
