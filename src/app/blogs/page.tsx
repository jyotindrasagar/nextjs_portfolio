"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation } from '../../components/Navigation';
import { breakdowns } from '../../data/breakdowns';
import Link from 'next/link';

export default function BlogsPage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(breakdowns.flatMap(b => b.tools)));

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

  const filteredBreakdowns = activeTag 
    ? breakdowns.filter(item => item.tools.includes(activeTag)) 
    : breakdowns;

  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-none bg-background">
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/0 to-background/0 dark:from-background/90 dark:via-background/0 dark:to-background/0" />
      </div>

      <div className="relative z-50 pointer-events-auto">
        <Navigation theme={theme} toggleTheme={toggleTheme} compact={true} />
      </div>

      <div className="relative z-10 min-h-screen w-full bg-transparent text-foreground pt-12 pb-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 transition-colors duration-500 overflow-x-hidden">
        <main className="relative w-full max-w-7xl mx-auto flex flex-col gap-12">
          
          {/* Top Actions & Filters */}
          <div className="flex flex-col lg:flex-row justify-end items-start lg:items-center gap-6 border-b border-foreground/10 pb-8">
            {/* Tag Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveTag(null)}
                className={`font-mono text-[9px] font-extrabold tracking-[0.15em] uppercase px-3 py-1.5 rounded-full transition-colors ${
                  activeTag === null 
                    ? 'bg-accent text-white shadow-[0_2px_10px_rgba(234,135,156,0.3)]' 
                    : 'bg-foreground/5 text-foreground/60 hover:bg-foreground/10 hover:text-foreground'
                }`}
              >
                All
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`font-mono text-[9px] font-extrabold tracking-[0.15em] uppercase px-3 py-1.5 rounded-full transition-colors ${
                    activeTag === tag 
                      ? 'bg-accent text-white shadow-[0_2px_10px_rgba(234,135,156,0.3)]' 
                      : 'bg-foreground/5 text-foreground/60 hover:bg-foreground/10 hover:text-foreground'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Lightweight Cards Grid - Generic Blog Style */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full select-none gap-8 relative z-30">
            <AnimatePresence mode="wait">
              {filteredBreakdowns.map((item) => (
                <Link
                  href={`/breakdowns/${item.id}`}
                  key={item.id}
                  className="block group"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    whileHover={{ y: -6, transition: { duration: 0.3 } }}
                    className="group flex flex-col cursor-pointer gap-4"
                  >
                    {/* Thumbnail Image */}
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-foreground/10 shadow-sm bg-panels">
                      <div className="absolute inset-0 z-0">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    {/* Content Below Image */}
                    <div className="flex flex-col gap-2 px-1">
                      {/* Meta Tags */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-[9px] font-extrabold tracking-[0.2em] uppercase text-accent bg-accent/10 px-2 py-0.5 rounded">
                          {item.category === 'my-work' ? 'PROJECT' : 'INSPIRATION'}
                        </span>
                        {item.readTime && (
                          <>
                            <span className="text-foreground/30">•</span>
                            <span className="font-mono text-[9px] text-foreground/50 tracking-wider uppercase">
                              {item.readTime}
                            </span>
                          </>
                        )}
                        {item.date && (
                          <>
                            <span className="text-foreground/30">•</span>
                            <span className="font-mono text-[9px] text-foreground/50 tracking-wider uppercase">
                              {item.date}
                            </span>
                          </>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="font-display font-bold text-xl md:text-2xl uppercase tracking-wide text-foreground group-hover:text-accent transition-colors duration-300 mt-1">
                        {item.title}
                      </h3>
                      
                      {/* Highlighted Description */}
                      <p className="font-sans text-sm text-foreground/70 line-clamp-3 leading-relaxed">
                        {item.excerpt}
                      </p>

                      {/* Read More Link */}
                      <div className="mt-2">
                        <span className="font-mono text-[10px] font-bold tracking-[0.25em] uppercase text-foreground/40 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300 inline-block">
                          READ FULL POST →
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}

              {filteredBreakdowns.length === 0 && (
                <div className="col-span-full py-12 flex flex-col items-center justify-center text-foreground/40 font-mono tracking-widest text-xs uppercase">
                  No blogs available for this tag.
                </div>
              )}
            </AnimatePresence>
          </div>

        </main>
      </div>
    </>
  );
}
