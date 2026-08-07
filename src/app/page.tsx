"use client";

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Navigation } from '../components/Navigation';
import { Hero } from '../components/Hero';
import { CADOverlay } from '../components/CADOverlay';
import { FallingPetals } from '../components/FallingPetals';

import { Work } from '../components/Work';
import { About } from '../components/About';
import { Feedback } from '../components/Feedback';
import { Contact } from '../components/Contact';

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
      { rootMargin: '600px' } 
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
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <>
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
