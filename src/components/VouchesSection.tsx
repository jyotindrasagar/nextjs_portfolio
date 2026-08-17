"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { vouches } from '../data/vouches';
import { ShieldCheck, ChevronDown, ArrowUpRight, Share2, Building2 } from 'lucide-react';
import { InitialAvatar } from './Feedback';
import { useInfiniteCarousel } from '../hooks/useInfiniteCarousel';

function VouchAvatar({
  src,
  name,
  className,
  textClassName,
}: {
  src?: string;
  name: string;
  className: string;
  textClassName: string;
}) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return <InitialAvatar name={name} className={className} textClassName={textClassName} />;
  }

  return (
    <div className={`relative rounded-full overflow-hidden border border-foreground/20 shrink-0 group-hover:scale-105 transition-transform ${className}`}>
      <img
        src={src}
        alt={name}
        loading="lazy"
        decoding="async"
        onError={() => setHasError(true)}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export function VouchesSection() {
  const [isOpen, setIsOpen] = useState(false);

  const {
    x,
    isDragging,
    hasMovedRef,
    containerRef,
    set0Ref,
    set1Ref,
    handlers,
  } = useInfiniteCarousel({
    speed: 0.7,
    direction: -1,
    isInView: isOpen,
  });

  return (
    <div className="w-full mt-4 md:mt-6 select-none flex flex-col items-center">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full border border-foreground/15 bg-panels/40 backdrop-blur-sm text-foreground text-xs sm:text-sm font-mono font-bold tracking-[0.2em] uppercase hover:border-accent hover:text-accent transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(254,205,211,0.25)] cursor-pointer"
      >
        <ShieldCheck size={16} className="text-accent group-hover:scale-110 transition-transform" />
        <span>// CREATIVE CIRCLE ({vouches.length})</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </button>

      {/* Expandable Creative Circle Section with smooth buttery reveal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, scale: 0.98 }}
            animate={{ height: 'auto', opacity: 1, scale: 1 }}
            exit={{ height: 0, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="w-full overflow-hidden pt-4 pb-2"
          >
            {/* Header Tag */}
            <motion.div 
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-center mb-3"
            >
              <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-accent font-bold">
                CREATIVE CIRCLE // INDUSTRY EDITORS & COLLABORATORS
              </span>
            </motion.div>

            {/* Drag & Continuous Infinite Scroll Row */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              ref={containerRef}
              className={`overflow-hidden w-full py-4 -my-2 select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
              style={{ touchAction: 'pan-y' }}
              {...handlers}
            >
              <motion.div
                className="flex gap-4 sm:gap-6 w-max px-6 py-2 transform-gpu will-change-transform"
                style={{ x, willChange: 'transform' }}
              >
                {/* 3 Identical Sets for infinite bidirectional drag with minimal DOM overhead */}
                {Array.from({ length: 3 }).map((_, setIdx) => (
                  <div
                    key={setIdx}
                    ref={setIdx === 0 ? set0Ref : setIdx === 1 ? set1Ref : null}
                    className="flex gap-4 sm:gap-6 shrink-0"
                  >
                    {vouches.map((item, itemIdx) => {
                      const linkType = item.linkType || (item.link?.includes('twitter') || item.link?.includes('x.com') || item.link?.includes('instagram') ? 'social' : 'portfolio');
                      return (
                        <div
                          key={`${setIdx}-${item.id}-${itemIdx}`}
                          onClick={() => {
                            if (!hasMovedRef.current && item.link) {
                              window.open(item.link, '_blank', 'noopener,noreferrer');
                            }
                          }}
                          className="flex-shrink-0 flex items-center gap-3.5 px-4 py-3 rounded-full border border-foreground/10 bg-panels/80 dark:bg-panels/50 hover:bg-panels/90 hover:border-accent/50 transition-colors duration-300 cursor-pointer group shadow-sm hover:shadow-[0_0_15px_rgba(254,205,211,0.15)] min-w-[200px] sm:min-w-[220px] transform-gpu will-change-transform select-none"
                          style={{ contentVisibility: 'auto', containIntrinsicSize: '220px 48px' }}
                        >
                          {/* Profile Avatar */}
                          <VouchAvatar
                            src={item.avatar}
                            name={item.name}
                            className="w-9 h-9 sm:w-10 sm:h-10"
                            textClassName="text-xs sm:text-sm"
                          />

                          {/* Editor Name, Role & Optional Agency */}
                          <div className="flex flex-col min-w-0 pr-1">
                            <div className="flex items-center gap-1.5 font-mono font-bold text-xs sm:text-sm text-foreground group-hover:text-accent transition-colors truncate">
                              <span className="truncate">{item.name}</span>
                              {item.verified && (
                                <span className="text-accent text-[10px]" title="Verified Vouch">✓</span>
                              )}
                            </div>

                            <div className="flex items-center gap-1.5 font-sans text-[10px] sm:text-[11px] text-foreground/60 truncate">
                              {item.role && <span className="truncate">{item.role}</span>}
                              {item.agency && (
                                <>
                                  <span className="opacity-40">•</span>
                                  <span className="text-accent/90 font-mono text-[9px] uppercase tracking-wider truncate">
                                    {item.agency}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>

                          {/* Action Links */}
                          <div className="flex items-center gap-2 shrink-0 ml-auto">
                            {/* Optional Agency Link Button */}
                            {item.agencyLink && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (!hasMovedRef.current) {
                                    window.open(item.agencyLink, '_blank', 'noopener,noreferrer');
                                  }
                                }}
                                className="p-1.5 rounded-full bg-foreground/5 hover:bg-accent/20 hover:text-accent text-foreground/60 transition-all cursor-pointer"
                                title={`Visit Agency (${item.agency || 'Agency'})`}
                              >
                                <Building2 size={13} />
                              </button>
                            )}

                            {/* Direct External Link Icon */}
                            {item.link && (
                              <div className="text-foreground/40 group-hover:text-accent transition-colors">
                                {linkType === 'social' ? (
                                  <Share2 size={13} className="group-hover:scale-110 transition-transform" />
                                ) : (
                                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
