"use client";

import { useEffect, useRef, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, useAnimationFrame, useMotionValue, AnimatePresence } from 'framer-motion';
import { AnimatedSection } from './AnimatedSection';
import { testimonials, Testimonial } from '../data/feedback';
import { VouchesSection } from './VouchesSection';
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

// Redesigned modal with scrollable text, fixed footer, and navigation
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

  // Add keyboard navigation and body scroll lock
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

  // Add wheel/trackpad horizontal scroll navigation with cooldown to prevent rapid firing
  const wheelCooldown = useRef(false);
  const handleWheel = (e: React.WheelEvent) => {
    if (wheelCooldown.current) return;
    
    // Only trigger on mostly horizontal scrolling
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
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 bg-black/60 dark:bg-black/80 backdrop-blur-md"
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
            {/* Mobile Quote Icon */}
            <span className="md:hidden text-accent text-5xl font-serif absolute top-0 left-0 leading-none">”</span>

            {/* Scrollable Text */}
            <div className="flex-grow overflow-y-auto pr-2 md:pr-4 mt-4 md:mt-0 pb-6 mb-4 custom-scrollbar flex flex-col justify-start">
              <p className="font-sans font-light text-base md:text-lg lg:text-xl leading-relaxed text-foreground/90 whitespace-pre-wrap text-left">
                {testimonial.quote}
              </p>
            </div>

            {/* Fixed Footer */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-t border-foreground/10 pt-6 mt-auto">
              {/* Profile */}
              <div className="flex items-center gap-4">
                {testimonial.avatar ? (
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border border-foreground/20 shrink-0">
                    <img
                      src={testimonial.avatar}
                      alt={`${testimonial.author} Avatar`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center text-foreground/50 font-bold font-mono shrink-0 text-lg md:text-xl">
                    {testimonial.author.charAt(0)}
                  </div>
                )}

                <div>
                  {(() => {
                    const hasAgency = Boolean(testimonial.agency || testimonial.agencyLink);
                    const authorLink = hasAgency ? (testimonial.agencyLink || testimonial.link) : testimonial.link;
                    const subtitleLink = hasAgency ? testimonial.link : testimonial.agencyLink;
                    const orgName = testimonial.agency || testimonial.company;

                    return (
                      <>
                        <h4 className="font-mono font-bold text-sm md:text-base tracking-wider text-foreground flex items-center gap-2">
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
                        <p className="font-sans text-[11px] md:text-xs text-foreground/60 mt-1">
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
                    <p className="font-mono text-[9px] md:text-[10px] text-accent tracking-widest uppercase mt-1.5 font-bold">
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

export function Feedback() {
  // Ensure enough items to seamlessly loop across any screen size
  const displayTestimonials = useMemo(() => {
    const minItems = 12;
    const repeatCount = Math.max(3, Math.ceil(minItems / Math.max(1, testimonials.length)));
    return Array.from({ length: repeatCount }).flatMap(() => testimonials);
  }, [testimonials]);

  const [contentWidth, setContentWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedTestimonialIndex, setSelectedTestimonialIndex] = useState<number | null>(null);
  const [isInView, setIsInView] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const firstCardRef = useRef<HTMLDivElement>(null);
  const secondSetFirstCardRef = useRef<HTMLDivElement>(null);

  // Intersection observer to only run animation loop when in view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let initialized = false;
    const measure = () => {
      if (firstCardRef.current && secondSetFirstCardRef.current) {
        // The exact loop distance is the difference in position between the first card of set 1 and the first card of set 2.
        const width = secondSetFirstCardRef.current.offsetLeft - firstCardRef.current.offsetLeft;
        setContentWidth(width);
        
        // Initialize x to the middle set to guarantee buffer on both sides
        if (!initialized && width > 0) {
          x.set(-width);
          initialized = true;
        }
      }
    };

    measure();
    window.addEventListener('resize', measure);
    const timer = setTimeout(measure, 500);

    return () => {
      window.removeEventListener('resize', measure);
      clearTimeout(timer);
    };
  }, [displayTestimonials]);

  const x = useMotionValue(0);

  useAnimationFrame((t, delta) => {
    if (contentWidth === 0 || selectedTestimonialIndex !== null || !isInView) return; // Pause if modal is open or off-screen

    if (!isHovered && !isDragging) {
      // Clamp delta to prevent erratic jumps on high-refresh 120Hz/144Hz displays
      const clampedDelta = Math.min(delta, 32);
      const moveBy = 0.04 * clampedDelta;
      x.set(x.get() - moveBy);
    }

    if (!isDragging) {
      const currentX = x.get();
      // Keep x safely within the middle sets to ensure infinite buffer on both ends.
      if (currentX <= -2 * contentWidth || currentX > 0) {
        const remainder = currentX % contentWidth;
        let newX = remainder;
        if (newX > 0) newX -= contentWidth; // Normalize to negative
        newX -= contentWidth;
        x.set(newX);
      }
    }
  });

  // Handlers for arrow buttons to manually shift the carousel
    const shiftLeft = () => {
    x.set(x.get() + 400);
  };

  const shiftRight = () => {
    x.set(x.get() - 400);
  };

  return (
    <section id="feedback" ref={sectionRef} className="relative pt-10 md:pt-20 pb-6 md:pb-12 px-0 border-t border-foreground/10 overflow-hidden">

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

      <AnimatedSection className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mb-4 md:mb-8 flex flex-col items-start text-left">
        <div className="flex items-center gap-2 text-[11px] sm:text-[13px] md:text-[15px] tracking-[0.25em] font-mono font-extrabold text-accent mb-2 md:mb-4 uppercase">
          <span>❖</span>
          <span>SYS.FEEDBACK // TESTIMONIALS</span>
        </div>

        <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight text-foreground uppercase mb-3 md:mb-4">
          Collaborator <span className="text-accent">Feedback</span>
        </h2>
        <p className="font-mono text-[10px] sm:text-xs md:text-sm text-foreground/40 tracking-widest uppercase max-w-xl leading-relaxed">
          Kind words from incredible people and brands I've had the privilege to work with.
        </p>
      </AnimatedSection>

      <div className="relative w-full">
        {/* Left and Right Fade Overlays to replace mask and preserve blur */}
        <div className="absolute top-0 bottom-0 left-0 w-[24px] sm:w-[64px] z-30 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
        <div className="absolute top-0 bottom-0 right-0 w-[24px] sm:w-[64px] z-30 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
        
        <div
          className="overflow-hidden w-full cursor-grab active:cursor-grabbing py-6 md:py-10"
          onPointerEnter={(e) => { if (e.pointerType === 'mouse') setIsHovered(true) }}
          onPointerLeave={(e) => { if (e.pointerType === 'mouse') setIsHovered(false) }}
        >
          <motion.div
            ref={contentRef}
            className="flex gap-2.5 sm:gap-4 md:gap-6 w-max pl-3 sm:pl-8 transform-gpu will-change-transform"
            style={{ x, willChange: 'transform' }}
            drag="x"
            dragConstraints={{ left: -10000, right: 10000 }}
            dragElastic={0}
            dragMomentum={false}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
          >
            {displayTestimonials.map((testimonial, idx) => {
              // Check if long quote that fills the card (left-aligned) or short quote (middle/center-aligned)
              const isLongQuote = testimonial.quote.length > 200;

              return (
                <div
                  key={idx}
                  ref={idx === 0 ? firstCardRef : idx === testimonials.length ? secondSetFirstCardRef : null}
                  className="flex-shrink-0 w-[65vw] sm:w-[340px] md:w-[400px] lg:w-[540px] h-[230px] sm:h-[370px] md:h-[420px] p-4 sm:p-6 md:p-8 border border-foreground/10 bg-panels/70 dark:bg-panels/40 relative group hover:bg-panels/90 hover:border-foreground/20 transition-colors duration-300 flex flex-col rounded-xl shadow-sm hover:shadow-[0_0_25px_rgba(255,184,198,0.12)] justify-between overflow-hidden transform-gpu will-change-transform"
                >
                  <div
                    className="relative z-20 flex-grow flex flex-col justify-center cursor-pointer group/text"
                    onClick={() => setSelectedTestimonialIndex(idx % testimonials.length)}
                  >
                    {/* Fixed Top-Left Quote Icon for all cards */}
                    <span className="text-accent text-2xl sm:text-4xl md:text-5xl font-serif absolute top-0 left-0 leading-none opacity-90 group-hover/text:opacity-100 transition-opacity pointer-events-none">“</span>

                    <div className={`flex-grow flex flex-col ${isLongQuote ? 'justify-start pt-1' : 'justify-center items-center'}`}>
                      <p className={`font-sans font-light text-[12px] sm:text-sm md:text-base leading-snug sm:leading-relaxed text-foreground/90 whitespace-pre-line line-clamp-6 sm:line-clamp-[7] md:line-clamp-[8] group-hover/text:text-foreground transition-colors pt-1 sm:pt-0 ${isLongQuote ? 'text-left' : 'text-center'}`}>
                        {isLongQuote && (
                          <span className="text-accent text-2xl sm:text-4xl md:text-5xl font-serif float-left mr-1 sm:mr-2 mt-[-4px] md:mt-[-10px] h-3 leading-none opacity-0">“</span>
                        )}
                        {testimonial.quote}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2 sm:mt-6 pt-2 sm:pt-5 border-t border-foreground/10 relative z-20 w-full min-w-0">
                    <div className="flex items-center gap-2 sm:gap-4 w-full min-w-0">
                      {testimonial.avatar ? (
                        <div className="w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full overflow-hidden border border-foreground/20 shrink-0 opacity-90 group-hover:opacity-100 transition-opacity shadow-sm">
                          <img
                            src={testimonial.avatar}
                            alt={`${testimonial.author} Avatar`}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center text-foreground/50 font-bold font-mono shrink-0 text-[10px] sm:text-sm shadow-sm">
                          {testimonial.author.charAt(0)}
                        </div>
                      )}

                      <div className="flex flex-col min-w-0 w-full">
                        {(() => {
                          const hasAgency = Boolean(testimonial.agency || testimonial.agencyLink);
                          const authorLink = hasAgency ? (testimonial.agencyLink || testimonial.link) : testimonial.link;
                          const subtitleLink = hasAgency ? testimonial.link : testimonial.agencyLink;
                          const orgName = testimonial.agency || testimonial.company;

                          return (
                            <>
                              <h4 className="font-mono font-bold text-[11px] sm:text-xs md:text-[15px] tracking-wider text-foreground flex items-center gap-1 sm:gap-2 truncate w-full">
                                {authorLink ? (
                                  <a
                                    href={authorLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
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
                              <p className="font-sans text-[9px] sm:text-[11px] md:text-[13px] text-foreground/60 mt-0.5 truncate w-full">
                                {testimonial.role}
                                {orgName && (
                                  <span>
                                    {testimonial.role ? ' • ' : ''}
                                    {subtitleLink ? (
                                      <a
                                        href={subtitleLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
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
                          <p className="font-mono text-[8px] sm:text-[9px] md:text-[10px] text-accent/90 tracking-widest uppercase mt-0.5 sm:mt-2 font-bold truncate w-full">
                            {testimonial.project}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Industry Vouches / Creative Circle Section (Hidden) */}
        {/* <VouchesSection /> */}
      </div>
    </section>
  );
}
