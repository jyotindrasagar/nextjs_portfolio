"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation } from '../components/Navigation';
import { Hero } from '../components/Hero';
import { CADOverlay } from '../components/CADOverlay';
import { FallingPetals } from '../components/FallingPetals';
import { Work } from '../components/Work';
import { Projects } from '../components/Projects';
import { About } from '../components/About';
import { Feedback } from '../components/Feedback';
import { Contact } from '../components/Contact';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const fadeRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700); // 0.7-second loading screen
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark' || storedTheme === 'light') {
      setTheme(storedTheme);
      return;
    }
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      return;
    }
    setTheme('light');
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.style.scrollbarGutter = 'stable';
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <>
      {/* 0.7-Second Loading Screen with SVG Ring Draw & Center Logo */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 z-[10000] bg-background flex flex-col items-center justify-center select-none"
          >
            <div className="relative w-14 h-14 flex items-center justify-center">
              {/* Single Snappy Border Draw (0% to 100% starting from top) */}
              <svg className="absolute inset-0 w-full h-full -rotate-90 overflow-visible" viewBox="0 0 100 100">
                {/* Track line */}
                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" className="text-foreground/10" fill="none" />
                {/* Active draw line synced to 0.7 second */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="var(--accent)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.65, ease: "easeInOut" }}
                  className="drop-shadow-[0_0_10px_rgba(234,135,156,0.85)]"
                />
              </svg>

              {/* Compact Logo */}
              <img
                src="/dieablofx.svg"
                alt="DieabloFX"
                className="w-7 h-7 object-contain logo-image"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed inset-0 z-0 pointer-events-none">
        <CADOverlay loading={loading} targetRef={fadeRef} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/0 to-background/0 dark:from-background/90 dark:via-background/0 dark:to-background/0" />
        <FallingPetals />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed inset-0 z-50 pointer-events-none"
      >
        <div className="pointer-events-auto">
          <Navigation theme={theme} toggleTheme={toggleTheme} />
        </div>
      </motion.div>

      <div className="relative z-10 min-h-screen w-full bg-transparent text-foreground transition-colors duration-500 overflow-x-hidden">
        <main className="relative w-full">
          <Hero loading={loading} />
          
          <div className="relative w-full bg-background/40 dark:bg-[#0F0F10]/50 backdrop-blur-[3px] border-t border-foreground/5 shadow-[0_-10px_40px_rgba(0,0,0,0.3)] -mt-24 pt-24">
            <Work />
            <Projects />
            <About />
            <div ref={fadeRef}>
              <Feedback />
              <Contact />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
