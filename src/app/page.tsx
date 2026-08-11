"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation } from '../components/Navigation';
import { Hero } from '../components/Hero';
import { CADOverlay } from '../components/CADOverlay';
import { FallingPetals } from '../components/FallingPetals';

import dynamic from 'next/dynamic';

const Work = dynamic(() => import('../components/Work').then(m => m.Work), { ssr: false });
const Projects = dynamic(() => import('../components/Projects').then(m => m.Projects), { ssr: false });
const About = dynamic(() => import('../components/About').then(m => m.About), { ssr: false });
const Feedback = dynamic(() => import('../components/Feedback').then(m => m.Feedback), { ssr: false });
const Contact = dynamic(() => import('../components/Contact').then(m => m.Contact), { ssr: false });

function LazySection({ id, children, height = "100vh" }: { id: string, children: React.ReactNode, height?: string }) {
  const [hasMounted, setHasMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin: '300px' } 
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section id={id} ref={ref} style={{ minHeight: hasMounted ? "auto" : height }} className="relative w-full">
      {hasMounted ? children : null}
    </section>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const fadeRef = useRef<HTMLDivElement>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <>
      {/* Snappy Initial Loading Screen */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-[10000] bg-background flex flex-col items-center justify-center select-none"
          >
            <div className="relative w-14 h-14 flex items-center justify-center">
              {/* Single Snappy Border Draw (0% to 100% starting from top) */}
              <svg className="absolute inset-0 w-full h-full -rotate-90 overflow-visible" viewBox="0 0 100 100">
                {/* Track line */}
                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" className="text-foreground/10" fill="none" />
                {/* Snappy active draw line */}
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
                  transition={{ duration: 0.45, ease: "easeInOut" }}
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
        transition={{ duration: 0.5, ease: "easeOut", delay: 0 }}
        className="fixed inset-0 z-50 pointer-events-none"
      >
        <div className="pointer-events-auto">
          <Navigation theme={theme} toggleTheme={toggleTheme} />
        </div>
      </motion.div>

      <div className="relative z-10 min-h-screen w-full bg-transparent text-foreground transition-colors duration-500 overflow-x-hidden">
        <main className="relative w-full">
          <Hero loading={loading} />
          <LazySection id="work" height="100vh"><Work /></LazySection>
          <LazySection id="breakdowns" height="100vh"><Projects /></LazySection>
          <LazySection id="about" height="100vh"><About /></LazySection>
          <div ref={fadeRef}>
            <LazySection id="feedback" height="50vh"><Feedback /></LazySection>
            <LazySection id="contact" height="50vh"><Contact /></LazySection>
          </div>
        </main>
      </div>
    </>
  );
}
