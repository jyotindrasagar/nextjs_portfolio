"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { breakdowns, type BreakdownData } from '../data/breakdowns';
import Link from 'next/link';
import { HoverVideoPlayer } from './HoverVideoPlayer';
import { AnimatedSection } from './AnimatedSection';

import { Wrench } from 'lucide-react';

export function Projects() {
  const [activeTab, setActiveTab] = useState<'my-work' | 'inspiration'>('my-work');

  const filteredBreakdowns = breakdowns.filter((item) => item.category === activeTab);

  return (
    <>
      <section className="relative pt-24 pb-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 border-t border-foreground/10">
        <AnimatedSection>
          {/* CAD reference label */}
          <div className="flex items-center gap-2.5 text-[12px] md:text-[14px] tracking-[0.25em] font-mono font-extrabold text-accent mb-8 uppercase">
            <span>❖</span>
            <span>SYS.PROCESS // BLUEPRINTS_BREAKDOWN</span>
          </div>
        </AnimatedSection>

        <div className="flex flex-col gap-12">
          <AnimatedSection>
            {/* Header Text & Category Switcher */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-foreground/10 pb-8">
              <div className="flex-1 max-w-xl flex flex-col gap-4">
                <div>
                  <div className="font-mono text-[11px] md:text-[12px] tracking-[0.3em] opacity-60 mb-2 uppercase font-bold">
                    05 PROCESS & INSPIRATION
                  </div>
                  <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-foreground uppercase leading-none">
                    Project <span className="text-accent">Breakdowns</span>
                  </h2>
                </div>

                <div className="font-mono text-[11px] md:text-[12px] font-semibold tracking-[0.2em] leading-relaxed text-foreground/80 uppercase">
                  <span>DECONSTRUCTING PACING, VFX COMPOSITING,</span><br />
                  <span>TIMELINES, AND VISUAL INSPIRATION.</span>
                </div>
              </div>

              {/* Category Switcher Buttons */}
              <div className="flex items-center p-1 bg-foreground/5 border border-foreground/15 rounded-lg">
                <button
                  onClick={() => setActiveTab('my-work')}
                  className={`font-mono text-xs md:text-sm font-bold tracking-wider uppercase px-5 py-2.5 rounded-md transition-all duration-300 ${
                    activeTab === 'my-work'
                      ? 'bg-accent text-black shadow-lg'
                      : 'text-foreground/60 hover:text-foreground hover:bg-foreground/5'
                  }`}
                >
                  My Work Breakdowns
                </button>
                <button
                  onClick={() => setActiveTab('inspiration')}
                  className={`font-mono text-xs md:text-sm font-bold tracking-wider uppercase px-5 py-2.5 rounded-md transition-all duration-300 ${
                    activeTab === 'inspiration'
                      ? 'bg-accent text-black shadow-lg'
                      : 'text-foreground/60 hover:text-foreground hover:bg-foreground/5'
                  }`}
                >
                  Inspired Work
                </button>
              </div>
            </div>
          </AnimatedSection>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full select-none gap-6 pb-4 relative z-30">
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
                  whileHover={{ 
                    y: -6, 
                    scale: 1.015,
                    boxShadow: '0 20px 40px -15px rgba(255,184,198,0.2)',
                    transition: { duration: 0.3 }
                  }}
                  className="group flex flex-col cursor-pointer bg-panels border border-foreground/10 shadow-md relative overflow-hidden rounded-xl aspect-video"
                >
                  {/* Lightweight Poster Image by Default -> Video ONLY loads on Hover */}
                  <HoverVideoPlayer 
                    imageUrl={item.image}
                    videoUrl={item.videoUrl}
                    altText={item.title}
                    baseOpacity="opacity-100"
                    baseGrayscale="grayscale"
                  />
                  
                  {/* Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500 z-10 pointer-events-none"></div>

                  {/* Text Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end items-start z-20 p-6 text-left gap-2 pointer-events-none">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[9px] font-extrabold tracking-[0.2em] uppercase px-2 py-0.5 bg-accent/20 border border-accent/40 text-accent rounded">
                        {item.category === 'my-work' ? 'PROJECT' : 'INSPIRATION'}
                      </span>
                      {item.readTime && (
                        <span className="font-mono text-[10px] text-white/60 tracking-wider">
                          {item.readTime}
                        </span>
                      )}
                    </div>

                    <h3 className="font-display font-bold text-lg md:text-xl uppercase tracking-wide text-white group-hover:text-accent transition-colors duration-300">
                      {item.title}
                    </h3>
                    
                    <p className="font-mono text-[11px] text-white/70 line-clamp-2 leading-relaxed">
                      {item.excerpt}
                    </p>

                    <div className="mt-2 pt-2 border-t border-white/10 w-full flex justify-between items-center">
                      <span className="font-mono text-[10px] font-bold tracking-[0.25em] uppercase text-accent group-hover:translate-x-1 transition-transform duration-300">
                        EXPLORE BREAKDOWN →
                      </span>
                    </div>
                  </div>
                  </motion.div>
                </Link>
              ))}

              {/* Translucent Placeholder Card if count < 4 */}
              {filteredBreakdowns.length < 4 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group flex flex-col items-center justify-center border border-dashed border-foreground/20 bg-foreground/[0.03] backdrop-blur-md rounded-xl p-6 text-center w-full aspect-video pointer-events-none select-none overflow-hidden"
                >
                  <div className="flex flex-col items-center justify-center gap-3 p-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent animate-pulse">
                      <Wrench size={18} />
                    </div>
                    <h4 className="font-display font-bold text-xs md:text-sm uppercase tracking-wider text-foreground/80 leading-snug max-w-[240px]">
                      HOLD ON TRYNNA LOAD MOURE STUFF UP IN HERE
                    </h4>
                    <span className="font-mono text-[10px] text-accent tracking-widest uppercase font-bold">
                      GIVE ME THE WRENCH 🔧
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
}
