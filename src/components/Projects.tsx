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
          isSectionOpen ? 'pt-8 sm:pt-10 md:pt-14 pb-12 sm:pb-16 md:pb-20 min-h-[100px]' : 'py-4 sm:py-5 md:py-6 min-h-0'
        }`} 
        id="breakdowns"
      >
        {/* Clickable Header Area: Compact sub-page drawer */}
        <div 
          onClick={() => setIsSectionOpen(!isSectionOpen)}
          className={`relative cursor-pointer group select-none py-1 transition-all duration-300 ${
            isSectionOpen ? 'mb-6 md:mb-8' : 'mb-0'
          }`}
        >
          <AnimatedSection className="flex flex-col items-start text-left">
            {/* CAD reference label */}
            <div className="flex items-center gap-1.5 text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.2em] font-mono font-bold text-accent mb-1 sm:mb-1.5 uppercase text-left truncate max-w-full group-hover:text-accent/90 transition-colors duration-300">
              <span>❖</span>
              <span className="truncate">SYS.PROCESS // BLUEPRINTS_BREAKDOWN</span>
            </div>

            {/* Row: Title on Left, Button on Right */}
            <div className="flex items-center justify-between w-full gap-2 sm:gap-4">
              <h2 className="font-display font-bold text-base min-[360px]:text-lg sm:text-xl md:text-2xl lg:text-3xl tracking-tight text-foreground uppercase leading-none text-left transition-all duration-300 origin-left group-hover:scale-[1.01]">
                Project <span className="text-accent group-hover:drop-shadow-[0_0_8px_rgba(234,135,156,0.25)] transition-all duration-300">Breakdowns</span>
              </h2>

              <button 
                onClick={(e) => { e.stopPropagation(); setIsSectionOpen(!isSectionOpen); }}
                className="relative w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center shrink-0 group focus:outline-none bg-accent text-white transition-all duration-300 group-hover:scale-105 group-hover:bg-accent/90 shadow-[0_2px_6px_rgba(234,135,156,0.2)] group-hover:shadow-[0_0_8px_rgba(234,135,156,0.28)] cursor-pointer"
                title={isSectionOpen ? "Collapse Section" : "Expand Section"}
              >
                <motion.div 
                  animate={{ rotate: isSectionOpen ? 180 : 0 }} 
                  transition={{ duration: 0.35, ease: "easeInOut" }} 
                  className="flex items-center justify-center"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isSectionOpen ? "" : "mt-0.5"}`}>
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
