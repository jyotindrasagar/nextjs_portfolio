"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { HoverVideoPlayer } from './HoverVideoPlayer';
import { AnimatedSection } from './AnimatedSection';
import { createClient } from '@/utils/supabase/client';

import { Wrench } from 'lucide-react';
import AccordionGallery from './AccordionGallery';

export function Projects() {
  const [activeTab, setActiveTab] = useState<'my-work' | 'inspiration'>('my-work');
  const [isSectionOpen, setIsSectionOpen] = useState(false);
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from('blogs')
        .select('*')
        .eq('is_highlight', true)
        .order('created_at', { ascending: false });
      
      if (data) setBlogs(data);
    };
    fetchBlogs();
  }, []);

  const displayBreakdowns = blogs.filter((item) => item.category === activeTab).slice(0, 2);

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
                {/* Accordion Gallery replacing the old grid */}
                <div className="w-full relative z-30 pb-4">
                  <AccordionGallery
                    items={
                      displayBreakdowns.length > 0 
                      ? displayBreakdowns.map((item) => ({
                          image: item.thumbnail_url || 'https://picsum.photos/id/1015/900/1200',
                          label: item.title,
                          link: `/breakdowns/${item.slug || item.id}`,
                          alt: item.title
                        }))
                      : [
                          { image: 'https://picsum.photos/id/1015/900/1200', label: 'HOLD ON TRYNNA LOAD MORE STUFF', link: '#' },
                          { image: 'https://picsum.photos/id/1018/900/1200', label: 'GIVE ME THE WRENCH 🔧', link: '#' }
                        ] // Fallbacks if empty
                    }
                    defaultIndex={0}
                    expandRatio={0.52}
                    trigger="hover"
                    height={460}
                    accentColor="#ea879c" // Accent color
                    overlayColor="#000000"
                  />
                </div>

                {/* Go to Blogs Button */}
                <AnimatedSection>
                  <div className="w-full flex justify-center mt-4">
                    <Link
                      href="/blogs"
                      className="font-mono text-[11px] font-bold tracking-[0.25em] uppercase bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 px-8 py-3 rounded-md transition-colors text-foreground flex items-center gap-2"
                    >
                      <span>Go To Full Blogs Section</span>
                      <span>→</span>
                    </Link>
                  </div>
                </AnimatedSection>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
