"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, Check, ShieldCheck, BarChart3, Sliders, CheckCircle2, ArrowLeft, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Footer } from '@/components/Footer';

interface CookieSettings {
  essential: boolean;
  analytics: boolean;
  functional: boolean;
}

export default function CookiesPage() {
  const [settings, setSettings] = useState<CookieSettings>({
    essential: true,
    analytics: true,
    functional: true,
  });
  const [savedToast, setSavedToast] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('cookie_preferences');
    if (stored) {
      try {
        setSettings(JSON.parse(stored));
      } catch {}
    }
  }, []);

  const handleSave = (newSettings: CookieSettings) => {
    setSettings(newSettings);
    localStorage.setItem('cookie_preferences', JSON.stringify(newSettings));
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  const handleAcceptAll = () => {
    handleSave({
      essential: true,
      analytics: true,
      functional: true,
    });
  };

  const handleRejectNonEssential = () => {
    handleSave({
      essential: true,
      analytics: false,
      functional: false,
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-accent selection:text-white">
      {/* Toast Alert */}
      <AnimatePresence>
        {savedToast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 right-8 z-[9999] bg-accent text-black font-mono text-xs font-bold uppercase tracking-widest px-5 py-3 rounded-lg shadow-2xl border border-white flex items-center gap-2 pointer-events-none"
          >
            <CheckCircle2 size={16} />
            <span>Preferences Saved Successfully</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-10 right-1/4 w-[450px] h-[450px] bg-accent/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 left-10 w-[350px] h-[350px] bg-foreground/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ea879c_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.04]" />
      </div>

      {/* Top Header */}
      <header className="relative z-10 w-full px-6 md:px-12 py-6 flex items-center justify-between border-b border-foreground/10 bg-background/80 backdrop-blur-md sticky top-0">
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

        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-foreground/60 hover:text-accent transition-colors"
          >
            <ArrowLeft size={12} /> Return Home
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-20 flex-1">
        {/* Header */}
        <div className="mb-10 border-b border-foreground/10 pb-8">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-3">
            <Cookie size={14} /> Privacy & Storage Management
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-wider text-foreground">
            Cookie <span className="text-accent">Preferences</span>
          </h1>
          <p className="font-mono text-xs text-foreground/50 tracking-wider uppercase mt-2">
            Customize how cookies, local sessions & telemetry tokens are handled
          </p>
        </div>

        {/* Interactive Manager Card */}
        <div className="bg-panels border border-foreground/10 rounded-2xl p-6 sm:p-8 shadow-xl mb-12">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8 pb-6 border-b border-foreground/10">
            <div>
              <h2 className="font-display font-bold text-lg uppercase tracking-wide text-foreground">
                Live Consent Dashboard
              </h2>
              <p className="font-sans text-xs text-foreground/60 mt-0.5">
                Toggle your preferences below. Changes take effect immediately across all sessions.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleAcceptAll}
                className="bg-accent text-black font-mono text-[10px] font-extrabold uppercase tracking-wider px-3.5 py-2 rounded hover:brightness-110 transition-all"
              >
                Accept All
              </button>
              <button
                onClick={handleRejectNonEssential}
                className="bg-foreground/10 text-foreground font-mono text-[10px] font-bold uppercase tracking-wider px-3.5 py-2 rounded hover:bg-foreground/20 transition-all"
              >
                Reject Non-Essential
              </button>
            </div>
          </div>

          {/* Toggle Items */}
          <div className="space-y-6">
            {/* 1. Essential */}
            <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-foreground/[0.03] border border-foreground/10">
              <div className="flex gap-3">
                <div className="p-2 rounded-lg bg-accent/10 text-accent shrink-0 mt-0.5">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-sm uppercase tracking-wider text-foreground">
                      Strictly Essential Cookies
                    </span>
                    <span className="font-mono text-[9px] bg-accent/20 text-accent px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                      Always Active
                    </span>
                  </div>
                  <p className="font-sans text-xs text-foreground/70 mt-1 leading-relaxed">
                    Required for core system security, Supabase user authentication, theme switcher state, and safeguarding form submissions against CSRF attacks.
                  </p>
                </div>
              </div>

              <div className="shrink-0 pt-1">
                <span className="font-mono text-xs font-bold text-foreground/40 uppercase">Locked</span>
              </div>
            </div>

            {/* 2. Analytics */}
            <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-foreground/[0.03] border border-foreground/10">
              <div className="flex gap-3">
                <div className="p-2 rounded-lg bg-accent/10 text-accent shrink-0 mt-0.5">
                  <BarChart3 size={18} />
                </div>
                <div>
                  <span className="font-display font-bold text-sm uppercase tracking-wider text-foreground block">
                    Analytics & Performance Telemetry
                  </span>
                  <p className="font-sans text-xs text-foreground/70 mt-1 leading-relaxed">
                    Helps us understand video load latency, CDN bandwidth performance, and page interactions through anonymous Vercel Analytics and Speed Insights.
                  </p>
                </div>
              </div>

              <div className="shrink-0 pt-1">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.analytics}
                    onChange={(e) => setSettings({ ...settings, analytics: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-foreground/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                </label>
              </div>
            </div>

            {/* 3. Functional */}
            <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-foreground/[0.03] border border-foreground/10">
              <div className="flex gap-3">
                <div className="p-2 rounded-lg bg-accent/10 text-accent shrink-0 mt-0.5">
                  <Sliders size={18} />
                </div>
                <div>
                  <span className="font-display font-bold text-sm uppercase tracking-wider text-foreground block">
                    Functional & Audio State Cookies
                  </span>
                  <p className="font-sans text-xs text-foreground/70 mt-1 leading-relaxed">
                    Remembers your background music volume level, audio playback states, and expanded section toggles across page reloads.
                  </p>
                </div>
              </div>

              <div className="shrink-0 pt-1">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.functional}
                    onChange={(e) => setSettings({ ...settings, functional: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-foreground/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-8 pt-6 border-t border-foreground/10 flex justify-end">
            <button
              onClick={() => handleSave(settings)}
              className="bg-accent text-black font-mono text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-lg hover:brightness-110 transition-all flex items-center gap-2 shadow-lg shadow-accent/20"
            >
              <Save size={14} /> Save Cookie Preferences
            </button>
          </div>
        </div>

        {/* Detailed Explanation Sections */}
        <div className="space-y-8 font-sans text-sm text-foreground/80 leading-relaxed">
          <section className="space-y-3">
            <h3 className="font-display font-bold text-lg uppercase tracking-wide text-foreground">
              What Are Cookies?
            </h3>
            <p>
              Cookies and local browser storage identifiers are small data packets stored directly on your computer or mobile device. They allow web applications to maintain session continuity, remember your preferences, and provide smooth client-side transitions.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-display font-bold text-lg uppercase tracking-wide text-foreground">
              Managing Cookies via Browser Controls
            </h3>
            <p>
              In addition to our preference dashboard above, most web browsers permit you to block or delete cookies through browser settings (Chrome, Firefox, Safari, Edge). Please note that disabling essential cookies may impact authentication and portfolio video playback.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
