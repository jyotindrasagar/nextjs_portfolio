"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation } from '../../components/Navigation';
import { Footer } from '../../components/Footer';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';

export function BlogsClient() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();
  const fadeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadBlogs();
  }, []);

  async function loadBlogs() {
    const { data } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      setBlogs(data);
      // Extract unique tags
      const tagsSet = new Set<string>();
      data.forEach(blog => {
        if (blog.tags && Array.isArray(blog.tags)) {
          blog.tags.forEach((tag: string) => tagsSet.add(tag));
        }
      });
      setAllTags(Array.from(tagsSet));
    }
    setLoading(false);
  }

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
    ? blogs.filter(item => item.tags && item.tags.includes(activeTag)) 
    : blogs;

  return (
    <>
      <div className="fixed inset-0 z-0 pointer-events-none bg-background">
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/0 to-background/0 dark:from-background/90 dark:via-background/0 dark:to-background/0" />
      </div>

      <div className="relative z-50 pointer-events-auto">
        <Navigation theme={theme} toggleTheme={toggleTheme} compact={true} />
      </div>

      <div className="relative z-10 w-full bg-transparent text-foreground pt-12 transition-colors duration-500 overflow-x-hidden min-h-screen flex flex-col">
        <main className="relative w-full max-w-7xl mx-auto flex flex-col gap-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pb-24 flex-1">
          
          {/* Under Development Banner */}
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 py-3 rounded-md bg-foreground/[0.03] border border-foreground/10 text-foreground/80 font-mono text-[10px] md:text-[11px] tracking-wider uppercase">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse shrink-0" />
              <span className="font-bold text-accent">Notice:</span>
              <span>This project & full blog archive are currently under development.</span>
            </div>
            <span className="text-foreground/40 text-[9px] tracking-widest">[WIP // IN ACTIVE BUILD]</span>
          </div>

          {/* Top Actions & Filters */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-foreground/10 pb-8">
            <div>
              <h1 className="font-display font-black text-2xl md:text-3xl uppercase tracking-wider text-foreground">
                Case Studies <span className="text-accent">&</span> Insights
              </h1>
              <p className="font-mono text-[11px] text-foreground/50 tracking-widest uppercase mt-1">
                Visual effects breakdowns, technical workflows & creative musings
              </p>
            </div>

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

          {loading ? (
            <div className="w-full py-20 flex justify-center text-foreground/40 font-mono tracking-widest text-xs uppercase">
              Loading Blogs...
            </div>
          ) : (
            /* Masonry Layout */
            <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 w-full select-none relative z-30">
              <AnimatePresence mode="popLayout">
                {filteredBreakdowns.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="break-inside-avoid"
                  >
                    <Link
                      href={`/breakdowns/${item.slug || item.id}`}
                      className="block group flex flex-col cursor-pointer gap-4"
                    >
                      {/* Fluid Thumbnail Image */}
                      <div className="relative w-full rounded-xl overflow-hidden border border-foreground/10 shadow-sm bg-panels">
                        <img 
                          src={item.thumbnail_url || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop"} 
                          alt={item.title}
                          className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                          loading="lazy"
                        />
                      </div>

                      {/* Content Below Image */}
                      <div className="flex flex-col gap-2 px-1">
                        {/* Meta Tags */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-[9px] font-extrabold tracking-[0.2em] uppercase text-accent bg-accent/10 px-2 py-0.5 rounded">
                            {item.category === 'my-work' ? 'PROJECT' : 'INSPIRATION'}
                          </span>
                          {item.read_time && (
                            <>
                              <span className="text-foreground/30">•</span>
                              <span className="font-mono text-[9px] text-foreground/50 tracking-wider uppercase">
                                {item.read_time}
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
                    </Link>
                  </motion.div>
                ))}

                {filteredBreakdowns.length === 0 && (
                  <div className="col-span-full py-12 flex flex-col items-center justify-center text-foreground/40 font-mono tracking-widest text-xs uppercase break-inside-avoid">
                    No blogs available.
                  </div>
                )}
              </AnimatePresence>
            </div>
          )}

        </main>
        
        {/* Universal Footer */}
        <div className="relative w-full bg-background/40 dark:bg-[#0F0F10]/50 backdrop-blur-[3px] border-t border-foreground/5 shadow-[0_-10px_40px_rgba(0,0,0,0.3)]">
          <Footer />
        </div>

      </div>
    </>
  );
}
