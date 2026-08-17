"use client";

import { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { vouches, Vouch } from '../data/vouches';
import { ShieldCheck, ChevronDown, ArrowUpRight, Share2, Building2 } from 'lucide-react';
import { InitialAvatar } from './Feedback';
import { useInfiniteCarousel } from '../hooks/useInfiniteCarousel';
import { useLazyVisibility } from '../hooks/useLazyVisibility';

// Shared global cache of loaded avatars to avoid re-fetching on clone sets
const loadedVouchesCache = new Set<string>();

function VouchAvatar({
  src,
  name,
  className,
  textClassName,
  inView = true,
}: {
  src?: string;
  name: string;
  className: string;
  textClassName: string;
  inView?: boolean;
}) {
  const [hasError, setHasError] = useState(false);
  const isCached = src ? loadedVouchesCache.has(src) : false;
  const [isLoaded, setIsLoaded] = useState(isCached);

  if (!src || hasError) {
    return <InitialAvatar name={name} className={className} textClassName={textClassName} />;
  }

  const shouldMountImage = inView || isCached;

  if (!shouldMountImage) {
    return <InitialAvatar name={name} className={className} textClassName={textClassName} />;
  }

  return (
    <div className={`relative rounded-full overflow-hidden border border-foreground/20 shrink-0 group-hover:scale-105 transition-transform ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 z-0">
          <InitialAvatar name={name} className="w-full h-full" textClassName={textClassName} />
        </div>
      )}
      <img
        src={src}
        alt={name}
        loading="lazy"
        decoding="async"
        onLoad={() => {
          if (src) loadedVouchesCache.add(src);
          setIsLoaded(true);
        }}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover relative z-10 transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}

// Individual Memoized Vouch Card with compact mobile/tablet sizing
const VouchCard = memo(function VouchCard({
  item,
  setIdx,
  itemIdx,
  hasMovedRef,
}: {
  item: Vouch;
  setIdx: number;
  itemIdx: number;
  hasMovedRef: React.MutableRefObject<boolean>;
}) {
  const { ref, hasBeenInView } = useLazyVisibility<HTMLDivElement>({
    rootMargin: '100px 300px 100px 300px',
    once: true,
  });

  const linkType = item.linkType || (item.link?.includes('twitter') || item.link?.includes('x.com') || item.link?.includes('instagram') ? 'social' : 'portfolio');

  return (
    <div
      ref={ref}
      key={`${setIdx}-${item.id}-${itemIdx}`}
      onClick={() => {
        if (!hasMovedRef.current && item.link) {
          window.open(item.link, '_blank', 'noopener,noreferrer');
        }
      }}
      className="flex-shrink-0 flex items-center gap-2 sm:gap-2.5 md:gap-3.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 md:px-4 md:py-3 rounded-full border border-foreground/10 bg-panels/80 dark:bg-panels/50 hover:bg-panels/90 hover:border-accent/50 transition-colors duration-300 cursor-pointer group shadow-sm hover:shadow-[0_0_15px_rgba(254,205,211,0.15)] min-w-[145px] sm:min-w-[175px] md:min-w-[220px] transform-gpu will-change-transform select-none"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '160px 36px' }}
    >
      {/* Profile Avatar with independent lazy loading */}
      <VouchAvatar
        src={item.avatar}
        name={item.name}
        className="w-6 h-6 sm:w-7 sm:h-7 md:w-10 md:h-10"
        textClassName="text-[8px] sm:text-[9px] md:text-sm"
        inView={hasBeenInView}
      />

      {/* Editor Name, Role & Optional Agency */}
      <div className="flex flex-col min-w-0 pr-0.5 sm:pr-1">
        <div className="flex items-center gap-1 sm:gap-1.5 font-mono font-bold text-[10px] sm:text-xs md:text-sm text-foreground group-hover:text-accent transition-colors truncate">
          <span className="truncate">{item.name}</span>
          {item.verified && (
            <span className="text-accent text-[8px] sm:text-[9px] md:text-[10px]" title="Verified Vouch">✓</span>
          )}
        </div>

        <div className="flex items-center gap-1 sm:gap-1.5 font-sans text-[8px] sm:text-[9px] md:text-[11px] text-foreground/60 truncate">
          {item.role && <span className="truncate">{item.role}</span>}
          {item.agency && (
            <>
              <span className="opacity-40">•</span>
              <span className="text-accent/90 font-mono text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-wider truncate">
                {item.agency}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Action Links */}
      <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 shrink-0 ml-auto">
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
            className="p-1 sm:p-1.5 rounded-full bg-foreground/5 hover:bg-accent/20 hover:text-accent text-foreground/60 transition-all cursor-pointer"
            title={`Visit Agency (${item.agency || 'Agency'})`}
          >
            <Building2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5" />
          </button>
        )}

        {/* Direct External Link Icon */}
        {item.link && (
          <div className="text-foreground/40 group-hover:text-accent transition-colors">
            {linkType === 'social' ? (
              <Share2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 group-hover:scale-110 transition-transform" />
            ) : (
              <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-3.5 md:h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            )}
          </div>
        )}
      </div>
    </div>
  );
});

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
    <div className="w-full mt-2 md:mt-4 select-none flex flex-col items-center py-1.5 sm:py-2 relative z-20">
      {/* Toggle Button with responsive mobile/tablet proportions */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative inline-flex items-center gap-2 sm:gap-2.5 md:gap-3 px-4 py-1.5 sm:px-5 sm:py-2 md:px-6 md:py-2.5 rounded-full border border-foreground/15 bg-panels/60 backdrop-blur-md text-foreground text-[10px] sm:text-xs md:text-sm font-mono font-bold tracking-[0.16em] sm:tracking-[0.2em] uppercase hover:border-accent hover:text-accent transition-all duration-300 shadow-sm hover:shadow-[0_0_15px_rgba(234,135,156,0.35)] cursor-pointer"
      >
        <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent group-hover:scale-110 transition-transform" />
        <span>// CREATIVE CIRCLE ({vouches.length})</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center"
        >
          <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
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
            className="w-full overflow-hidden pt-3 sm:pt-4 pb-2"
          >
            {/* Header Tag */}
            <motion.div 
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-center mb-2 sm:mb-3"
            >
              <span className="font-mono text-[8px] sm:text-[9px] md:text-[11px] tracking-[0.2em] sm:tracking-[0.25em] uppercase text-accent font-bold">
                CREATIVE CIRCLE // INDUSTRY EDITORS & COLLABORATORS
              </span>
            </motion.div>

            {/* Drag & Continuous Infinite Scroll Row with Edge Fades */}
            <div className="relative w-full overflow-hidden">
              <div 
                className="hidden sm:block absolute top-0 bottom-0 left-0 w-14 sm:w-24 md:w-56 z-30 pointer-events-none bg-gradient-to-r from-[#F7F7FF] via-[#F7F7FF]/80 to-transparent dark:from-[#0F0F10] dark:via-[#0F0F10]/80 dark:to-transparent" 
                aria-hidden="true" 
              />
              <div 
                className="hidden sm:block absolute top-0 bottom-0 right-0 w-14 sm:w-24 md:w-56 z-30 pointer-events-none bg-gradient-to-l from-[#F7F7FF] via-[#F7F7FF]/80 to-transparent dark:from-[#0F0F10] dark:via-[#0F0F10]/80 dark:to-transparent" 
                aria-hidden="true" 
              />

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 }}
                ref={containerRef}
                className={`overflow-hidden w-full py-2 sm:py-3 md:py-4 -my-2 select-none [mask-image:linear-gradient(to_right,transparent_0%,black_16px,black_calc(100%-16px),transparent_100%)] sm:[mask-image:linear-gradient(to_right,transparent_0%,black_60px,black_calc(100%-60px),transparent_100%)] ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                style={{ 
                  touchAction: 'pan-y',
                }}
                {...handlers}
              >
                <motion.div
                  className="flex gap-2 sm:gap-3.5 md:gap-6 w-max px-3 sm:px-4 md:px-6 py-1 sm:py-2 transform-gpu will-change-transform"
                  style={{ x, willChange: 'transform' }}
                >
                  {/* 3 Identical Sets for infinite bidirectional drag with minimal DOM overhead */}
                  {Array.from({ length: 3 }).map((_, setIdx) => (
                    <div
                      key={setIdx}
                      ref={setIdx === 0 ? set0Ref : setIdx === 1 ? set1Ref : null}
                      className="flex gap-2 sm:gap-3.5 md:gap-6 shrink-0"
                    >
                      {vouches.map((item, itemIdx) => (
                        <VouchCard
                          key={`${setIdx}-${item.id}-${itemIdx}`}
                          item={item}
                          setIdx={setIdx}
                          itemIdx={itemIdx}
                          hasMovedRef={hasMovedRef}
                        />
                      ))}
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
