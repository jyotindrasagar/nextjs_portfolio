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
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSectionOpen, setIsSectionOpen] = useState(false);

  // First filter by category
  const categoryBreakdowns = breakdowns.filter((item) => item.category === activeTab);
  
  // Then filter by highlight if not expanded
  const displayBreakdowns = isExpanded 
    ? categoryBreakdowns 
    : categoryBreakdowns.filter(item => item.isHighlight);

  const hasMore = categoryBreakdowns.length > displayBreakdowns.length;

  return (
    <>
      <section className={`relative px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 border-t border-foreground/10 transition-all duration-300 ${isSectionOpen ? 'pt-24 pb-24 min-h-[100px]' : 'pt-8 pb-8 min-h-0'}`} id="breakdowns">
        <AnimatedSection>
          {/* CAD reference label */}
          <div className="flex items-center gap-2.5 text-[12px] md:text-[14px] tracking-[0.25em] font-mono font-extrabold text-accent mb-8 uppercase">
            <span>❖</span>
            <span>SYS.PROCESS // BLUEPRINTS_BREAKDOWN</span>
          </div>
        </AnimatedSection>

        <div className="flex flex-col gap-12">
          <AnimatedSection>
            {/* Header Text, Category Switcher & Toggle Button */}
            <div 
              onClick={() => setIsSectionOpen(!isSectionOpen)}
              className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-8 transition-all duration-300 cursor-pointer select-none group ${isSectionOpen ? 'border-b border-foreground/10 pb-8' : ''}`}
            >
              
              {/* Left Side: Text Stack */}
              <div className="flex-1 max-w-xl flex flex-col gap-4">
                <div>
                  <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight text-foreground uppercase leading-none">
                    Project <span className="text-accent">Breakdowns</span>
                  </h2>
                </div>

                <AnimatePresence>
                  {isSectionOpen && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="font-mono text-[13px] md:text-[14px] font-semibold tracking-[0.2em] leading-relaxed text-foreground/80 uppercase overflow-hidden"
                    >
                      <div className="pt-4">
                        <span>DECONSTRUCTING PACING, VFX COMPOSITING,</span><br />
                        <span>TIMELINES, AND VISUAL INSPIRATION.</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Right Side: Actions & Sci-Fi Toggle */}
              <div className="flex flex-col sm:flex-row items-end sm:items-center gap-6 md:gap-8 shrink-0 w-full md:w-auto">
                
                {/* Action Buttons Stack */}
                <AnimatePresence>
                  {isSectionOpen && (
                    <motion.div 
                      initial={{ opacity: 0, width: 0, scale: 0.9 }}
                      animate={{ opacity: 1, width: 'auto', scale: 1 }}
                      exit={{ opacity: 0, width: 0, scale: 0.9 }}
                      className="flex flex-col items-start sm:items-end gap-3 w-full sm:w-auto overflow-hidden"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Link to Blogs Page */}
                      <Link 
                        href="/blogs"
                        className="font-mono text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-accent hover:text-white transition-colors flex items-center gap-2 bg-accent/10 hover:bg-accent border border-accent/20 px-4 py-1.5 rounded group ml-auto whitespace-nowrap"
                      >
                        <span>Go to Full Blogs Section</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </Link>

                      {/* Category Switcher Buttons */}
                      <div className="flex items-center p-1 bg-background/40 backdrop-blur-md border border-foreground/10 rounded-md shadow-sm relative z-40 ml-auto whitespace-nowrap">
                        {[
                          { id: 'my-work', label: 'My Work Breakdowns' },
                          { id: 'inspiration', label: 'Inspired Work' }
                        ].map((tab) => (
                          <button
                            key={tab.id}
                            onClick={() => {
                              setActiveTab(tab.id as 'my-work' | 'inspiration');
                              setIsExpanded(false); 
                            }}
                            className={`relative font-display text-[9px] md:text-[10px] font-bold tracking-[0.15em] uppercase px-4 py-1.5 md:py-2 rounded transition-colors duration-300 flex items-center justify-center ${
                              activeTab === tab.id
                                ? 'text-white'
                                : 'text-foreground/60 hover:text-foreground hover:bg-foreground/5'
                            }`}
                          >
                            {activeTab === tab.id && (
                              <motion.div
                                layoutId="activeTabPill"
                                className="absolute inset-0 bg-accent rounded shadow-[0_4px_14px_rgba(234,135,156,0.25)] z-[-1]"
                                transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                              />
                            )}
                            <span className="relative z-10">{tab.label}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Circle Toggle Button (Showreel Style) */}
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsSectionOpen(!isSectionOpen); }}
                  className="relative w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shrink-0 group focus:outline-none self-end sm:self-auto bg-accent text-white transition-all duration-300 hover:bg-accent/90 shadow-[0_4px_14px_rgba(234,135,156,0.3)] hover:shadow-[0_6px_20px_rgba(234,135,156,0.5)] hover:-translate-y-0.5"
                  title={isSectionOpen ? "Collapse Section" : "Expand Section"}
                >
                  {/* Animated Arrow */}
                  <motion.div
                    animate={{ rotate: isSectionOpen ? 180 : 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="flex items-center justify-center"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={isSectionOpen ? "" : "mt-1"}><path d="M6 9l6 6 6-6"/></svg>
                  </motion.div>
                </button>

              </div>
            </div>
          </AnimatedSection>

          {/* Full Uncollapsed Grid Section */}
          <AnimatePresence>
            {isSectionOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full select-none gap-6 pb-4 relative z-30">
                  <AnimatePresence mode="wait">
                    {displayBreakdowns.map((item) => (
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

                    {/* Translucent Placeholder Card if count < 4 and Expanded or Not filtering */}
                    {displayBreakdowns.length < 4 && isExpanded && (
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
                            HOLD ON TRYNNA LOAD MORE STUFF UP IN HERE
                          </h4>
                          <span className="font-mono text-[10px] text-accent tracking-widest uppercase font-bold">
                            GIVE ME THE WRENCH 🔧
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Load More Button */}
                {hasMore && (
                  <AnimatedSection>
                    <div className="w-full flex justify-center mt-4">
                      <button
                        onClick={() => setIsExpanded(true)}
                        className="font-mono text-[11px] font-bold tracking-[0.25em] uppercase bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 px-8 py-3 rounded-md transition-colors text-foreground flex items-center gap-2"
                      >
                        <span>Load More Breakdowns</span>
                        <span>↓</span>
                      </button>
                    </div>
                  </AnimatedSection>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
