"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimationFrame, useMotionValue } from 'framer-motion';
import { vouches, Vouch } from '../data/vouches';
import { ShieldCheck, ChevronDown, ExternalLink, ArrowUpRight, Share2, Globe } from 'lucide-react';

export function VouchesSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Ensure we have enough items to fill the screen for seamless infinite scroll
  // We need at least enough copies to cover ultra-wide monitors, even if there's only 1 vouch.
  const minItems = 30; // 30 items is safe for 4k/5k screens
  const repeatCount = Math.max(4, Math.ceil(minItems / Math.max(1, vouches.length)));
  const displayVouches = Array.from({ length: repeatCount }).flatMap(() => vouches);

  // Continuous infinite scroll state
  const containerRef = useRef<HTMLDivElement | null>(null);
  const firstCardRef = useRef<HTMLDivElement | null>(null);
  const secondSetFirstCardRef = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);

  const baseSpeed = 0.6; // Speed for idle marquee scroll

  useAnimationFrame((_, delta) => {
    if (!isOpen || isHovered || isDragging) return;

    if (firstCardRef.current && secondSetFirstCardRef.current) {
      const firstPos = firstCardRef.current.offsetLeft;
      const secondSetPos = secondSetFirstCardRef.current.offsetLeft;
      const setWidth = secondSetPos - firstPos;

      let currentX = x.get() - baseSpeed * (delta / 16);

      // Loop back smoothly once first set has scrolled off
      if (Math.abs(currentX) >= setWidth) {
        currentX = currentX % setWidth;
      }

      x.set(currentX);
    }
  });

  return (
    <div className="w-full mt-4 md:mt-6 select-none flex flex-col items-center">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full border border-foreground/15 bg-panels/30 backdrop-blur-md text-foreground text-xs sm:text-sm font-mono font-bold tracking-[0.2em] uppercase hover:border-accent hover:text-accent transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(254,205,211,0.25)]"
      >
        <ShieldCheck size={16} className="text-accent group-hover:scale-110 transition-transform" />
        <span>// INDUSTRY VOUCHES ({vouches.length})</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </button>

      {/* Expandable Vouches Section */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="w-full overflow-hidden pt-4 pb-2"
          >
            {/* Header Tag */}
            <div className="text-center mb-3">
              <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-accent font-bold">
                RECOMMENDED & VOUCHED BY INDUSTRY EDITORS
              </span>
            </div>

            {/* Drag & Continuous Infinite Scroll Row */}
            <div
              className="overflow-hidden w-full cursor-grab active:cursor-grabbing py-4 -my-2"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <motion.div
                ref={containerRef}
                className="flex gap-4 sm:gap-6 w-max px-6 py-2"
                style={{ x }}
                drag="x"
                dragConstraints={{ left: -10000, right: 10000 }}
                dragElastic={0}
                dragMomentum={false}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={() => setIsDragging(false)}
              >
                {displayVouches.map((item, idx) => {
                  const linkType = item.linkType || (item.link?.includes('twitter') || item.link?.includes('x.com') || item.link?.includes('instagram') ? 'social' : 'portfolio');
                  return (
                    <div
                      key={`${item.id}-${idx}`}
                      ref={idx === 0 ? firstCardRef : idx === vouches.length ? secondSetFirstCardRef : null}
                      onClick={() => {
                        if (!isDragging && item.link) {
                          window.open(item.link, '_blank', 'noopener,noreferrer');
                        }
                      }}
                      className="flex-shrink-0 flex items-center gap-3.5 px-4 py-3 rounded-full border border-foreground/10 bg-foreground/[0.03] backdrop-blur-xl hover:bg-foreground/[0.08] hover:border-accent/50 transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-[0_0_20px_rgba(254,205,211,0.18)] min-w-[200px] sm:min-w-[220px]"
                    >
                      {/* Profile Avatar */}
                      <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-foreground/20 shrink-0 group-hover:scale-105 transition-transform">
                        <img
                          src={item.avatar}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Editor Name & Role */}
                      <div className="flex flex-col min-w-0 pr-1">
                        <div className="flex items-center gap-1.5 font-mono font-bold text-xs sm:text-sm text-foreground group-hover:text-accent transition-colors truncate">
                          <span className="truncate">{item.name}</span>
                          {item.verified && (
                            <span className="text-accent text-[10px]" title="Verified Vouch">✓</span>
                          )}
                        </div>
                        {item.role && (
                          <div className="font-sans text-[10px] sm:text-[11px] text-foreground/60 truncate">
                            {item.role}
                          </div>
                        )}
                      </div>

                      {/* Link Icon Indicator */}
                      <div className="flex items-center gap-1.5 shrink-0 ml-auto text-foreground/40 group-hover:text-accent transition-all">
                        <span className="font-mono text-[9px] uppercase tracking-wider hidden sm:inline opacity-70 group-hover:opacity-100">
                          {linkType === 'social' ? 'Social' : 'Portfolio'}
                        </span>
                        {linkType === 'social' ? (
                          <Share2 size={13} className="group-hover:scale-110 transition-transform" />
                        ) : (
                          <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
