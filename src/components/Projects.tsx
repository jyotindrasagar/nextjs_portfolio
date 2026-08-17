"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
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

  // Listen for navigation expand event
  useEffect(() => {
    const handleExpandSection = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.id === 'breakdowns') {
        setIsSectionOpen(true);
      }
    };
    window.addEventListener('expand-section', handleExpandSection);
    return () => window.removeEventListener('expand-section', handleExpandSection);
  }, []);

  const displayBreakdowns = blogs.filter((item) => item.category === activeTab).slice(0, 2);

  return (
    <>
      <section 
        className={`relative px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 border-t border-foreground/10 transition-all duration-300 ${
          isSectionOpen ? 'pt-16 md:pt-24 pb-16 md:pb-24 min-h-[100px]' : 'pt-8 pb-8 min-h-0'
        }`} 
        id="breakdowns"
      >
        {/* Clickable Header Area: Only CAD Tag & Title on Left, Button on Right */}
        <div 
          onClick={() => setIsSectionOpen(!isSectionOpen)}
          className="relative cursor-pointer group select-none py-3 mb-4"
        >
          {/* Soft-edge feathered ambient glow: subtle sakura pink in light mode, subtle white in dark mode */}
          <div 
            className="absolute -inset-x-6 -inset-y-3 sm:-inset-x-8 sm:-inset-y-4 rounded-[40px] bg-gradient-to-r from-accent/[0.035] via-accent/[0.012] to-transparent dark:from-white/[0.03] dark:via-white/[0.01] dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-2xl -z-10" 
            aria-hidden="true" 
          />

          <AnimatedSection className="flex flex-col items-start text-left">
            {/* CAD reference label */}
            <div className="flex items-center gap-2.5 text-[11px] sm:text-[12px] md:text-[14px] tracking-[0.25em] font-mono font-extrabold text-accent mb-4 md:mb-6 uppercase text-left">
              <span>❖</span>
              <span>SYS.PROCESS // BLUEPRINTS_BREAKDOWN</span>
            </div>

            {/* Row: Title on Left, Button on Right */}
            <div className="flex items-center justify-between w-full">
              <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight text-foreground uppercase leading-none text-left">
                Project <span className="text-accent">Breakdowns</span>
              </h2>

              <button 
                onClick={(e) => { e.stopPropagation(); setIsSectionOpen(!isSectionOpen); }}
                className="relative w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shrink-0 group focus:outline-none bg-accent text-white transition-all duration-300 hover:bg-accent/90 shadow-[0_4px_14px_rgba(234,135,156,0.3)] hover:shadow-[0_6px_20px_rgba(234,135,156,0.5)] hover:-translate-y-0.5 cursor-pointer"
                title={isSectionOpen ? "Collapse Section" : "Expand Section"}
              >
                <motion.div 
                  animate={{ rotate: isSectionOpen ? 180 : 0 }} 
                  transition={{ duration: 0.4, ease: "easeInOut" }} 
                  className="flex items-center justify-center"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={isSectionOpen ? "" : "mt-1"}>
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </motion.div>
              </button>
            </div>
          </AnimatedSection>
        </div>

        {/* Collapsible Body */}
        <AnimatePresence>
          {isSectionOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              {/* Description & Switcher Row */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-foreground/10 pb-8 mb-8 pt-2">
                <div className="font-mono text-[12px] md:text-[13px] font-semibold tracking-[0.18em] leading-relaxed text-foreground/80 uppercase text-left">
                  <span>DECONSTRUCTING PACING, VFX COMPOSITING,</span><br />
                  <span>TIMELINES, AND VISUAL INSPIRATION.</span>
                </div>

                <div className="flex items-center p-1 bg-background/40 backdrop-blur-md border border-foreground/10 rounded-md shadow-sm relative z-40 whitespace-nowrap self-start md:self-auto">
                  {[ { id: 'my-work', label: 'My Work Breakdowns' }, { id: 'inspiration', label: 'Inspired Work' } ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as 'my-work' | 'inspiration')}
                      className={`relative font-display text-[9px] md:text-[10px] font-bold tracking-[0.15em] uppercase px-4 py-2.5 md:py-2 rounded transition-colors duration-300 flex items-center justify-center cursor-pointer ${activeTab === tab.id ? 'text-white' : 'text-foreground/60 hover:text-foreground hover:bg-foreground/5'}`}
                    >
                      {activeTab === tab.id && (
                        <motion.div layoutId="activeTabPill" className="absolute inset-0 bg-accent rounded shadow-[0_4px_14px_rgba(234,135,156,0.25)] z-[-1]" transition={{ type: "spring", bounce: 0.25, duration: 0.5 }} />
                      )}
                      <span className="relative z-10">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Accordion Gallery */}
              <div className="w-full relative z-30 pb-4">
                {displayBreakdowns.length > 0 ? (
                  <AccordionGallery
                    items={displayBreakdowns.map((item) => ({
                      image: item.thumbnail_url || 'https://picsum.photos/id/1015/900/1200',
                      label: item.title,
                      link: `/breakdowns/${item.slug || item.id}`,
                      alt: item.title
                    }))}
                    defaultIndex={0}
                    expandRatio={0.52}
                    trigger="hover"
                    height={460}
                    tilt={0}
                    accentColor="var(--accent)"
                    textColor="#ffffff"
                    overlayColor="#000000"
                  />
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="group flex flex-col items-center justify-center border border-dashed border-foreground/20 bg-foreground/[0.03] backdrop-blur-md rounded-xl p-6 text-center w-full max-w-2xl mx-auto h-[250px] md:h-[300px] pointer-events-none select-none overflow-hidden"
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
              </div>

              {/* Go to Blogs Button & Under Development Notice */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="w-full flex flex-col items-center justify-center gap-3 mt-6 text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Link
                    href="/blogs"
                    className="group font-mono text-[11px] font-bold tracking-[0.25em] uppercase bg-foreground/[0.04] hover:bg-accent text-foreground hover:text-white border border-foreground/15 hover:border-accent px-8 py-3.5 rounded-md transition-all duration-300 flex items-center gap-3 shadow-sm hover:shadow-[0_4px_16px_rgba(234,135,156,0.35)] cursor-pointer"
                  >
                    <span>Go To Full Blogs Section</span>
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5 font-bold">→</span>
                  </Link>
                </motion.div>

                {/* Under Development Status Note */}
                <div className="flex items-center gap-2 font-mono text-[9px] md:text-[10px] tracking-[0.18em] uppercase text-foreground/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <span>Project under development // Full blog page in active build</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}
