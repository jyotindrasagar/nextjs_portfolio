"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { breakdowns, type BreakdownData } from '../data/breakdowns';
import { BreakdownModal } from './BreakdownModal';
import { HoverVideoPlayer } from './HoverVideoPlayer';
import { AnimatedSection } from './AnimatedSection';

export function Projects() {
  const [selectedBreakdown, setSelectedBreakdown] = useState<BreakdownData | null>(null);

  return (
    <>
      <section className="relative pt-32 pb-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 border-t border-foreground/10">
        <AnimatedSection>
          {/* CAD reference label */}
          <div className="flex items-center gap-2.5 text-[12px] md:text-[14px] tracking-[0.25em] font-mono font-extrabold text-foreground/90 mb-12 uppercase">
            <span className="text-accent">❖</span>
            <span>SYS.PROCESS // BLUEPRINTS_BREAKDOWN</span>
          </div>
        </AnimatedSection>

        <div className="flex flex-col gap-16">
          <AnimatedSection>
            {/* Top Row: Header Text */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-foreground/10 pb-8">
              <div className="flex-1 max-w-xl flex flex-col gap-6">
                <div>
                  <div className="font-mono text-[11px] md:text-[12px] tracking-[0.3em] opacity-60 mb-4 uppercase font-bold">
                    05 PROCESS
                  </div>
                  <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-foreground uppercase leading-none">
                    Project Breakdowns
                  </h2>
                  <div className="font-display text-[11px] md:text-[12px] tracking-[0.25em] text-accent uppercase font-bold mt-2">
                    TECHNICAL BLUEPRINTS
                  </div>
                </div>

                <div className="font-mono text-[11px] md:text-[12px] font-semibold tracking-[0.25em] leading-relaxed text-foreground/90 uppercase">
                  <span>DECONSTRUCTING PACING,</span><br />
                  <span>TIMELINES, AND EDIT</span><br />
                  <span>STRUCTURES.</span>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Bottom Row: 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full select-none gap-6 pb-8 relative z-30">
            {breakdowns.slice(0, 3).map((item) => (
              <motion.div
                key={item.id}
                onClick={() => setSelectedBreakdown(item)}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                whileHover={{ 
                  y: -6, 
                  scale: 1.02,
                  boxShadow: '0 15px 30px -10px rgba(0,0,0,0.2)',
                  transition: { duration: 0.3 }
                }}
                className="group flex flex-col cursor-pointer bg-panels border border-foreground/10 shadow-md relative overflow-hidden aspect-video"
              >
                <HoverVideoPlayer 
                  imageUrl={item.image}
                  videoUrl={item.videoUrl}
                  altText={item.title}
                  baseOpacity="opacity-100"
                  baseGrayscale="grayscale"
                />
                
                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-accent/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500 z-10 pointer-events-none"></div>

                {/* Hover Text Overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end items-start z-20 p-6 text-left gap-4 pointer-events-none">
                  <h3 className="font-display font-bold text-xl uppercase tracking-wide text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {item.title}
                  </h3>
                  <span className="font-mono text-[11px] font-bold tracking-[0.3em] uppercase border border-white/20 text-white px-4 py-2 pointer-events-auto hover:bg-white hover:text-black transition-colors translate-y-4 group-hover:translate-y-0 duration-300 delay-75">
                    Read More
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedBreakdown && (
        <BreakdownModal 
          breakdown={selectedBreakdown} 
          onClose={() => setSelectedBreakdown(null)} 
        />
      )}
    </>
  );
}
