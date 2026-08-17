"use client";

import { useEffect, useRef, useState, memo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection } from './AnimatedSection';
import { testimonials, Testimonial } from '../data/feedback';
import { VouchesSection } from './VouchesSection';
import { useInfiniteCarousel } from '../hooks/useInfiniteCarousel';
import { useLazyVisibility } from '../hooks/useLazyVisibility';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

function VerifiedBadge({ hasLink }: { hasLink?: boolean }) {
  if (hasLink) {
    return (
      <span className="inline-flex items-center justify-center shrink-0" title="Verified Link">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
          {/* Smooth Meta Verified Rosette Badge */}
          <path 
            d="M12 2L14.39 3.55L17.15 3.12L18.42 5.63L21 6.8L20.84 9.63L22.5 12L20.84 14.37L21 17.2L18.42 18.37L17.15 20.88L14.39 20.45L12 22L9.61 20.45L6.85 20.88L5.58 18.37L3 17.2L3.16 14.37L1.5 12L3.16 9.63L3 6.8L5.58 5.63L6.85 3.12L9.61 3.55L12 2Z" 
            fill="currentColor" 
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
            className="text-accent"
          />
          {/* Perfectly Centered White Checkmark */}
          <path 
            d="M7.5 12.2L10.5 15.2L16.5 9.2" 
            stroke="#FAF9FC" 
            strokeWidth="2.8" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </svg>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center justify-center shrink-0 text-accent" title="Verified Client">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </span>
  );
}

const AVATAR_GRADIENTS = [
  'from-[#FF416C] via-[#FF4B2B] to-[#FF8E53]', // Sunset Coral
  'from-[#6a11cb] via-[#2575fc] to-[#00d2ff]', // Cyber Indigo Cyan
  'from-[#11998e] via-[#38ef7d] to-[#00f2fe]', // Emerald Lagoon
  'from-[#f857a6] via-[#ff5858] to-[#ffc371]', // Flamingo Amber
  'from-[#8E2DE2] via-[#4A00E0] to-[#8A2387]', // Deep Violet
  'from-[#f12711] via-[#f5af19] to-[#ffdd00]', // Fire Blaze
  'from-[#00c6ff] via-[#0072ff] to-[#7f00ff]', // Royal Blue Purple
  'from-[#d946ef] via-[#8b5cf6] to-[#06b6d4]', // Neon Fuchsia
  'from-[#10b981] via-[#06b6d4] to-[#3b82f6]', // Turquoise Sky
  'from-[#ec4899] via-[#f43f5e] to-[#fb923c]', // Rose Peach
];

function getAvatarGradient(name: string) {
  let hash = 0;
  for (let i = 0; i < (name || '').length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_GRADIENTS.length;
  return AVATAR_GRADIENTS[index];
}

export function InitialAvatar({ name, className, textClassName }: { name: string; className: string; textClassName: string }) {
  const initial = name?.trim() ? name.trim().charAt(0).toUpperCase() : '?';
  const gradient = getAvatarGradient(name || '');

  return (
    <div
      className={`rounded-full bg-gradient-to-tr ${gradient} p-[1.5px] flex items-center justify-center shrink-0 shadow-md shadow-black/20 group-hover:scale-105 transition-transform duration-300 ${className}`}
    >
      <div className="w-full h-full rounded-full bg-black/25 dark:bg-black/40 backdrop-blur-[1px] flex items-center justify-center border border-white/25">
        <span className={`font-mono font-extrabold text-white select-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] ${textClassName}`}>
          {initial}
        </span>
      </div>
    </div>
  );
}

// Global in-memory cache of successfully loaded avatars
const loadedAvatarsCache = new Set<string>();

export function CardAvatar({
  src,
  name,
  className,
  textClassName,
  lazyLoad = true,
  inView = true,
}: {
  src?: string;
  name: string;
  className: string;
  textClassName: string;
  lazyLoad?: boolean;
  inView?: boolean;
}) {
  const [hasError, setHasError] = useState(false);
  const isCached = src ? loadedAvatarsCache.has(src) : false;
  const [isLoaded, setIsLoaded] = useState(isCached);

  // If no image url or loading errored, show gradient initial
  if (!src || hasError) {
    return <InitialAvatar name={name} className={className} textClassName={textClassName} />;
  }

  // If lazyLoad enabled and card not in view & not yet cached, show lightweight InitialAvatar with 0 network cost
  const shouldMountImage = !lazyLoad || inView || isCached;

  if (!shouldMountImage) {
    return <InitialAvatar name={name} className={className} textClassName={textClassName} />;
  }

  return (
    <div className={`relative rounded-full overflow-hidden border border-foreground/20 shrink-0 shadow-sm ${className}`}>
      {/* Background initial while downloading */}
      {!isLoaded && (
        <div className="absolute inset-0 z-0">
          <InitialAvatar name={name} className="w-full h-full" textClassName={textClassName} />
        </div>
      )}
      <img
        src={src}
        alt={`${name} Avatar`}
        loading="lazy"
        decoding="async"
        onLoad={() => {
          if (src) loadedAvatarsCache.add(src);
          setIsLoaded(true);
        }}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover relative z-10 transition-opacity duration-300 ${
          isLoaded ? 'opacity-90 group-hover:opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}

// Modal with keyboard nav, scrollable text, and high priority image loading
function ReadMoreModal({
  currentIndex,
  totalTestimonials,
  onClose,
  onNext,
  onPrev
}: {
  currentIndex: number;
  totalTestimonials: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const testimonial = testimonials[currentIndex];
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = 'hidden';
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onNext, onPrev, onClose]);

  const wheelCooldown = useRef(false);
  const handleWheel = (e: React.WheelEvent) => {
    if (wheelCooldown.current) return;
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 30) {
      wheelCooldown.current = true;
      if (e.deltaX > 0) onNext();
      else onPrev();
      setTimeout(() => { wheelCooldown.current = false; }, 400);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-8 bg-black/60 dark:bg-black/80 backdrop-blur-md"
      onClick={onClose}
      onWheel={handleWheel}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] md:max-h-[80vh] flex flex-col border border-foreground/15 bg-background dark:bg-[#0a0a0a]/95 backdrop-blur-2xl shadow-2xl rounded-xl overflow-hidden"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 text-foreground/50 hover:text-foreground hover:text-accent transition-colors z-50 p-2 cursor-pointer"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col md:flex-row overflow-hidden p-6 md:p-10 lg:p-12 pb-16 md:pb-12 h-full">
          
          {/* Desktop Left Decorator */}
          <div className="hidden md:flex flex-col items-center mr-8 lg:mr-12 shrink-0 pt-2 self-stretch">
            <span className="text-accent text-6xl font-serif leading-none mt-[-10px]">”</span>
            <div className="w-[1px] flex-grow bg-accent/20 my-4 relative min-h-[100px]">
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-accent text-xs">✿</span>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex flex-col flex-1 overflow-hidden relative pt-8 md:pt-0">
            <span className="md:hidden text-accent text-5xl font-serif absolute top-0 left-0 leading-none">”</span>

            {/* Scrollable Text */}
            <div className="flex-grow overflow-y-auto pr-2 md:pr-4 mt-4 md:mt-0 pb-6 mb-4 custom-scrollbar flex flex-col justify-start">
              <p className="font-sans font-light text-base md:text-lg lg:text-xl leading-relaxed text-foreground/90 whitespace-pre-wrap text-left">
                {testimonial.quote}
              </p>
            </div>

            {/* Fixed Footer */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-t border-foreground/10 pt-6 mt-auto">
              <div className="flex items-center gap-4">
                <CardAvatar
                  src={testimonial.avatar}
                  name={testimonial.author}
                  className="w-12 h-12 md:w-14 md:h-14"
                  textClassName="text-lg md:text-xl"
                  lazyLoad={false}
                  inView={true}
                />

                <div className="text-left">
                  {(() => {
                    const hasAgency = Boolean(testimonial.agency || testimonial.agencyLink);
                    const authorLink = hasAgency ? (testimonial.agencyLink || testimonial.link) : testimonial.link;
                    const subtitleLink = hasAgency ? testimonial.link : testimonial.agencyLink;
                    const orgName = testimonial.agency || testimonial.company;

                    return (
                      <>
                        <h4 className="font-mono font-bold text-sm md:text-base tracking-wider text-foreground flex items-center gap-2 text-left">
                          {authorLink ? (
                            <a
                              href={authorLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-accent transition-colors flex items-center gap-1.5"
                              title={hasAgency ? `Visit Agency: ${testimonial.agency || 'Agency'}` : `Visit ${testimonial.author}`}
                            >
                              {testimonial.author} <span className="opacity-70 text-[10px]">↗</span>
                            </a>
                          ) : (
                            testimonial.author
                          )}
                          <VerifiedBadge hasLink={Boolean(authorLink || subtitleLink)} />
                        </h4>
                        <p className="font-sans text-[11px] md:text-xs text-foreground/60 mt-1 text-left">
                          {testimonial.role}
                          {orgName && (
                            <span>
                              {testimonial.role ? ' • ' : ''}
                              {subtitleLink ? (
                                <a
                                  href={subtitleLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:text-accent underline decoration-foreground/20 hover:decoration-accent transition-colors"
                                  title="Visit Client Profile"
                                >
                                  {orgName} ↗
                                </a>
                              ) : (
                                orgName
                              )}
                            </span>
                          )}
                        </p>
                      </>
                    );
                  })()}
                  {testimonial.project && (
                    <p className="font-mono text-[9px] md:text-[10px] text-accent tracking-widest uppercase mt-1.5 font-bold text-left">
                      {testimonial.project}
                    </p>
                  )}
                </div>
              </div>

              {/* Arrows */}
              <div className="flex items-center justify-center md:justify-end gap-4">
                <button 
                  onClick={onPrev}
                  className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center text-foreground/70 hover:text-foreground hover:border-accent hover:text-accent hover:bg-accent/10 transition-all cursor-pointer"
                >
                  <ArrowLeft size={18} />
                </button>
                <button 
                  onClick={onNext}
                  className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center text-foreground/70 hover:text-foreground hover:border-accent hover:text-accent hover:bg-accent/10 transition-all cursor-pointer"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Pagination Dots */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
          {Array.from({ length: totalTestimonials }).map((_, i) => (
            <div 
              key={i} 
              className={`w-1.5 h-1.5 rounded-full transition-colors ${i === currentIndex ? 'bg-accent' : 'bg-foreground/20'}`} 
            />
          ))}
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

// Individual Memoized Feedback Card with independent lazy loading
const FeedbackCard = memo(function FeedbackCard({
  testimonial,
  cardIdx,
  setIdx,
  hasMovedRef,
  onSelect,
}: {
  testimonial: Testimonial;
  cardIdx: number;
  setIdx: number;
  hasMovedRef: React.MutableRefObject<boolean>;
  onSelect: (index: number) => void;
}) {
  const { ref, hasBeenInView } = useLazyVisibility<HTMLDivElement>({
    rootMargin: '150px 350px 150px 350px',
    once: true,
  });

  const hasAgency = Boolean(testimonial.agency || testimonial.agencyLink);
  const authorLink = hasAgency ? (testimonial.agencyLink || testimonial.link) : testimonial.link;
  const subtitleLink = hasAgency ? testimonial.link : testimonial.agencyLink;
  const orgName = testimonial.agency || testimonial.company;

  return (
    <div
      ref={ref}
      key={`${setIdx}-${cardIdx}`}
      onClick={() => {
        if (!hasMovedRef.current) {
          onSelect(cardIdx);
        }
      }}
      className="flex-shrink-0 w-[65vw] sm:w-[340px] md:w-[400px] lg:w-[540px] h-[230px] sm:h-[370px] md:h-[420px] p-4 sm:p-6 md:p-8 border border-foreground/10 bg-panels/70 dark:bg-panels/40 relative group hover:bg-panels/90 hover:border-foreground/20 transition-colors duration-300 flex flex-col rounded-xl shadow-sm hover:shadow-[0_0_25px_rgba(255,184,198,0.12)] justify-between overflow-hidden transform-gpu will-change-transform select-none text-left cursor-pointer"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '340px 370px' }}
    >
      <div className="relative z-20 flex-grow flex flex-col justify-center group/text">
        {/* Top-Left Quote Icon */}
        <span className="text-accent text-2xl sm:text-4xl md:text-5xl font-serif absolute top-0 left-0 leading-none opacity-90 group-hover/text:opacity-100 transition-opacity pointer-events-none">“</span>

        <div className="flex-grow flex flex-col justify-center items-center">
          <p className="font-sans font-light text-[12px] sm:text-sm md:text-base leading-snug sm:leading-relaxed text-foreground/90 whitespace-pre-line line-clamp-6 sm:line-clamp-[7] md:line-clamp-[8] group-hover/text:text-foreground transition-colors pt-1 sm:pt-0 text-center select-none">
            {testimonial.quote}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-2 sm:mt-6 pt-2 sm:pt-5 border-t border-foreground/10 relative z-20 w-full min-w-0">
        <div className="flex items-center gap-2 sm:gap-4 w-full min-w-0">
          <CardAvatar
            src={testimonial.avatar}
            name={testimonial.author}
            className="w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12"
            textClassName="text-[10px] sm:text-sm md:text-base"
            lazyLoad={true}
            inView={hasBeenInView}
          />

          <div className="flex flex-col min-w-0 w-full text-left">
            <h4 className="font-mono font-bold text-[11px] sm:text-xs md:text-[15px] tracking-wider text-foreground flex items-center gap-1 sm:gap-2 truncate w-full text-left">
              {authorLink ? (
                <a
                  href={authorLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="hover:text-accent transition-colors flex items-center gap-1 truncate min-w-0"
                  title={hasAgency ? `Visit Agency: ${testimonial.agency || 'Agency'}` : `Visit ${testimonial.author}`}
                >
                  <span className="truncate">{testimonial.author}</span>
                  <span className="opacity-70 text-[8px] sm:text-[10px] shrink-0">↗</span>
                </a>
              ) : (
                <span className="truncate">{testimonial.author}</span>
              )}
              <div className="shrink-0">
                <VerifiedBadge hasLink={Boolean(authorLink || subtitleLink)} />
              </div>
            </h4>
            <p className="font-sans text-[9px] sm:text-[11px] md:text-[13px] text-foreground/60 mt-0.5 truncate w-full text-left">
              {testimonial.role}
              {orgName && (
                <span>
                  {testimonial.role ? ' • ' : ''}
                  {subtitleLink ? (
                    <a
                      href={subtitleLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="hover:text-accent underline decoration-foreground/20 hover:decoration-accent transition-colors"
                      title="Visit Client Profile"
                    >
                      {orgName} ↗
                    </a>
                  ) : (
                    orgName
                  )}
                </span>
              )}
            </p>
            {testimonial.project && (
              <p className="font-mono text-[8px] sm:text-[9px] md:text-[10px] text-accent/90 tracking-widest uppercase mt-0.5 sm:mt-2 font-bold truncate w-full text-left">
                {testimonial.project}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export function Feedback() {
  const [isSectionOpen, setIsSectionOpen] = useState(false);
  const [selectedTestimonialIndex, setSelectedTestimonialIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Listen for navigation expand event
  useEffect(() => {
    const handleExpandSection = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.id === 'feedback') {
        setIsSectionOpen(true);
      }
    };
    window.addEventListener('expand-section', handleExpandSection);
    return () => window.removeEventListener('expand-section', handleExpandSection);
  }, []);

  const {
    x,
    isDragging,
    hasMovedRef,
    containerRef,
    set0Ref,
    set1Ref,
    handlers,
  } = useInfiniteCarousel({
    speed: 0.65,
    direction: -1,
    isPaused: selectedTestimonialIndex !== null,
    isInView: isSectionOpen,
  });

  return (
    <section 
      id="feedback" 
      ref={sectionRef} 
      className={`relative px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 border-t border-foreground/10 overflow-hidden transition-all duration-300 ${
        isSectionOpen ? 'pt-16 md:pt-24 pb-8 md:pb-12 min-h-[100px]' : 'pt-8 pb-8 min-h-0'
      }`}
    >
      <AnimatePresence>
        {selectedTestimonialIndex !== null && (
          <ReadMoreModal
            currentIndex={selectedTestimonialIndex}
            totalTestimonials={testimonials.length}
            onClose={() => setSelectedTestimonialIndex(null)}
            onNext={() => setSelectedTestimonialIndex((prev) => prev !== null ? (prev + 1) % testimonials.length : null)}
            onPrev={() => setSelectedTestimonialIndex((prev) => prev !== null ? (prev - 1 + testimonials.length) % testimonials.length : null)}
          />
        )}
      </AnimatePresence>

      {/* Clickable Header Area: Only CAD Tag & Title on Left, Button on Right */}
      <div 
        onClick={() => setIsSectionOpen(!isSectionOpen)}
        className="relative cursor-pointer group select-none py-3 mb-4"
      >
        <AnimatedSection className="flex flex-col items-start text-left">
          {/* CAD reference label */}
          <div className="flex items-center gap-2 text-[9px] min-[360px]:text-[11px] sm:text-[12px] md:text-[14px] tracking-[0.2em] sm:tracking-[0.25em] font-mono font-extrabold text-accent mb-3 sm:mb-4 md:mb-6 uppercase text-left truncate max-w-full group-hover:text-accent/90 transition-colors duration-300">
            <span>❖</span>
            <span className="truncate">SYS.FEEDBACK // TESTIMONIALS</span>
          </div>

          {/* Row: Title on Left, Button on Right */}
          <div className="flex items-center justify-between w-full gap-2 sm:gap-4">
            <h2 className="font-display font-bold text-[20px] min-[360px]:text-2xl min-[420px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-foreground uppercase leading-none text-left transition-all duration-300 origin-left group-hover:scale-[1.01]">
              Collaborator <span className="text-accent group-hover:drop-shadow-[0_0_8px_rgba(234,135,156,0.25)] transition-all duration-300">Feedback</span>
            </h2>

            <button 
              onClick={(e) => { e.stopPropagation(); setIsSectionOpen(!isSectionOpen); }}
              className="relative w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shrink-0 group focus:outline-none bg-accent text-white transition-all duration-300 group-hover:scale-105 group-hover:bg-accent/90 shadow-[0_2px_8px_rgba(234,135,156,0.2)] group-hover:shadow-[0_0_10px_rgba(234,135,156,0.28)] cursor-pointer"
              title={isSectionOpen ? "Collapse Section" : "Expand Section"}
            >
              <motion.div 
                animate={{ rotate: isSectionOpen ? 180 : 0 }} 
                transition={{ duration: 0.4, ease: "easeInOut" }} 
                className="flex items-center justify-center"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${isSectionOpen ? "" : "mt-0.5"}`}>
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </motion.div>
            </button>
          </div>
        </AnimatedSection>
      </div>

      {/* Main Feedback & Vouches (Collapsible Body) */}
      <AnimatePresence>
        {isSectionOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            {/* Description Subtitle */}
            <div className="flex flex-col items-start text-left pt-2 pb-6">
              <p className="font-mono text-[11px] sm:text-xs md:text-sm text-foreground/50 tracking-widest uppercase max-w-xl leading-relaxed text-left">
                Kind words from incredible people and brands I've had the privilege to work with.
              </p>
            </div>

            <div className="pt-2 pb-2 -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-12 xl:-mx-16">
              {/* Carousel container with both CSS mask-image transparency and multi-stop gradient blur overlays */}
              <div className="relative w-full overflow-hidden">
                {/* Left side deep fade overlay */}
                <div 
                  className="absolute top-0 bottom-0 left-0 w-24 sm:w-44 md:w-64 lg:w-80 z-30 pointer-events-none bg-gradient-to-r from-[#F7F7FF] via-[#F7F7FF]/80 to-transparent dark:from-[#0F0F10] dark:via-[#0F0F10]/80 dark:to-transparent" 
                  aria-hidden="true"
                />
                
                {/* Right side deep fade overlay */}
                <div 
                  className="absolute top-0 bottom-0 right-0 w-24 sm:w-44 md:w-64 lg:w-80 z-30 pointer-events-none bg-gradient-to-l from-[#F7F7FF] via-[#F7F7FF]/80 to-transparent dark:from-[#0F0F10] dark:via-[#0F0F10]/80 dark:to-transparent" 
                  aria-hidden="true"
                />
                
                <div
                  ref={containerRef}
                  className={`overflow-hidden w-full py-3 md:py-5 select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                  style={{ 
                    touchAction: 'pan-y',
                    maskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 120px, rgba(0,0,0,1) calc(100% - 120px), rgba(0,0,0,0) 100%)',
                    WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 120px, rgba(0,0,0,1) calc(100% - 120px), rgba(0,0,0,0) 100%)'
                  }}
                  {...handlers}
                >
                  <motion.div
                    className="flex gap-2.5 sm:gap-4 md:gap-6 w-max pl-3 sm:pl-8 transform-gpu will-change-transform"
                    style={{ x, willChange: 'transform' }}
                  >
                    {/* 3 Sets ensure seamless infinite continuous drag in both directions with low mobile DOM weight */}
                    {Array.from({ length: 3 }).map((_, setIdx) => (
                      <div
                        key={setIdx}
                        ref={setIdx === 0 ? set0Ref : setIdx === 1 ? set1Ref : null}
                        className="flex gap-2.5 sm:gap-4 md:gap-6 shrink-0"
                      >
                        {testimonials.map((testimonial, cardIdx) => (
                          <FeedbackCard
                            key={`${setIdx}-${cardIdx}`}
                            testimonial={testimonial}
                            cardIdx={cardIdx}
                            setIdx={setIdx}
                            hasMovedRef={hasMovedRef}
                            onSelect={setSelectedTestimonialIndex}
                          />
                        ))}
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>

              {/* Industry Vouches / Creative Circle Section */}
              <VouchesSection />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
