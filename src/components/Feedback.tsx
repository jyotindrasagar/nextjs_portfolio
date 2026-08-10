"use client";

import { useEffect, useRef, useState } from 'react';
import { motion, useAnimationFrame, useMotionValue, AnimatePresence } from 'framer-motion';
import { AnimatedSection } from './AnimatedSection';
import { testimonials, Testimonial } from '../data/feedback';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

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

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-background/80 backdrop-blur-md"
      onClick={onClose}
      onWheel={handleWheel}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] md:max-h-[80vh] flex flex-col border border-foreground/10 bg-[#0a0a0a]/90 backdrop-blur-xl shadow-2xl rounded-xl overflow-hidden"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 text-foreground/50 hover:text-foreground transition-colors z-50"
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
            <div className="flex-grow overflow-y-auto pr-2 md:pr-4 mt-4 md:mt-0 pb-6 mb-4 custom-scrollbar">
              <p className="font-sans font-light text-base md:text-lg lg:text-xl leading-relaxed text-foreground/90 whitespace-pre-wrap">
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
                  <h4 className="font-mono font-bold text-sm md:text-base tracking-wider text-foreground flex items-center gap-2">
                    {testimonial.link ? (
                      <a href={testimonial.link} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex items-center gap-1.5">
                        {testimonial.author} <span className="opacity-70 text-[10px]">↗</span>
                      </a>
                    ) : (
                      testimonial.author
                    )}
                    <span className="text-background bg-accent rounded-full p-[3px] inline-flex">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </span>
                  </h4>
                  <p className="font-sans text-[11px] md:text-xs text-foreground/50 mt-1">
                    {testimonial.role} {testimonial.company ? `• ${testimonial.company}` : ''}
                  </p>
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
                  className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center text-foreground/70 hover:text-foreground hover:border-foreground/40 transition-colors"
                >
                  <ArrowLeft size={18} />
                </button>
                <button 
                  onClick={onNext}
                  className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center text-foreground/70 hover:text-foreground hover:border-foreground/40 transition-colors"
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
    </motion.div>
  );
}

export function Feedback() {
  const [contentWidth, setContentWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedTestimonialIndex, setSelectedTestimonialIndex] = useState<number | null>(null);

  const contentRef = useRef<HTMLDivElement>(null);

  const firstCardRef = useRef<HTMLDivElement>(null);
  const secondSetFirstCardRef = useRef<HTMLDivElement>(null);

  // Duplicate testimonials enough times to seamlessly loop.
  // 4 sets should be more than enough to cover even ultra-wide monitors.
  const displayTestimonials = [...testimonials, ...testimonials, ...testimonials, ...testimonials];

  useEffect(() => {
    const measure = () => {
      if (firstCardRef.current && secondSetFirstCardRef.current) {
        // The exact loop distance is the difference in position between the first card of set 1 and the first card of set 2.
        setContentWidth(secondSetFirstCardRef.current.offsetLeft - firstCardRef.current.offsetLeft);
      }
    };

    measure();
    window.addEventListener('resize', measure);
    const timer = setTimeout(measure, 500);

    return () => {
      window.removeEventListener('resize', measure);
      clearTimeout(timer);
    };
  }, []);

  const x = useMotionValue(0);

  useAnimationFrame((t, delta) => {
    if (contentWidth === 0 || selectedTestimonialIndex !== null) return; // Pause if modal is open

    if (!isHovered && !isDragging) {
      const moveBy = 0.04 * delta;
      x.set(x.get() - moveBy);
    }

    const currentX = x.get();
    if (currentX <= -contentWidth) {
      x.set(currentX + contentWidth);
    } else if (currentX > 0) {
      x.set(currentX - contentWidth);
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
    <section className="relative pt-24 pb-32 px-0 overflow-hidden">
      <div className="absolute top-0 left-4 md:left-8 lg:left-12 xl:left-16 right-4 md:right-8 lg:right-12 xl:right-16 h-[1px] bg-foreground/10"></div>

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

      <AnimatedSection className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mb-16 flex flex-col items-start text-left">
        <div className="flex items-center gap-2.5 text-[12px] md:text-[14px] tracking-[0.25em] font-mono font-extrabold text-accent mb-4 md:mb-6 uppercase">
          <span>❖</span>
          <span>SYS.FEEDBACK // TESTIMONIALS</span>
        </div>

        <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-foreground uppercase mb-6">
          Collaborator <span className="text-accent">Feedback</span>
        </h2>
        <p className="font-mono text-xs md:text-sm text-foreground/40 tracking-widest uppercase max-w-xl leading-relaxed">
          Kind words from incredible people and brands I've had the privilege to work with.
        </p>
      </AnimatedSection>

      <div className="relative w-full">
        {/* Left and Right Fade Overlays to replace mask and preserve blur */}
        <div className="absolute top-0 bottom-0 left-0 w-[64px] z-30 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
        <div className="absolute top-0 bottom-0 right-0 w-[64px] z-30 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
        
        <div
          className="overflow-hidden w-full cursor-grab active:cursor-grabbing py-12"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            ref={contentRef}
            className="flex items-center gap-4 md:gap-6 w-max pl-4 md:pl-8"
            style={{ x }}
            drag="x"
            dragConstraints={{ left: -10000, right: 10000 }}
            dragElastic={0}
            dragMomentum={false}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
          >
            {displayTestimonials.map((testimonial, idx) => {
              // Check if we need a "READ MORE" button based on length
              const needsReadMore = testimonial.quote.length > 150;

              return (
                <div
                  key={idx}
                  ref={idx === 0 ? firstCardRef : idx === testimonials.length ? secondSetFirstCardRef : null}
                  className="flex-shrink-0 w-[85vw] sm:w-[510px] md:w-[580px] max-h-[420px] p-6 md:p-8 border border-foreground/10 bg-foreground/[0.03] backdrop-blur-xl relative group hover:bg-foreground/[0.05] transition-all duration-500 flex flex-col rounded-xl shadow-[0_0_15px_rgba(255,184,198,0.15)] hover:shadow-[0_0_30px_rgba(255,184,198,0.4)] justify-between"
                >
                  <div
                    className="relative z-20 flex-grow flex flex-col cursor-pointer group/text"
                    onClick={() => setSelectedTestimonialIndex(idx % testimonials.length)}
                  >
                    <div className="flex-grow flex flex-col">
                      <p className="font-sans font-light text-sm md:text-base leading-relaxed text-foreground/90 whitespace-pre-line line-clamp-[8] group-hover/text:text-foreground transition-colors">
                        <span className="text-accent text-4xl md:text-5xl font-serif float-left mr-2 mt-[-6px] md:mt-[-10px] h-3 leading-none opacity-90 group-hover/text:opacity-100 transition-opacity">“</span>
                        {testimonial.quote}
                      </p>

                      {/* Removed "Read more" from card as requested */}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-5 border-t border-foreground/10 relative z-20">
                    <div className="flex items-center gap-4">
                      {testimonial.avatar ? (
                        <div className="w-12 h-12 rounded-full overflow-hidden border border-foreground/20 shrink-0 opacity-90 group-hover:opacity-100 transition-opacity shadow-lg">
                          <img
                            src={testimonial.avatar}
                            alt={`${testimonial.author} Avatar`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-foreground/50 font-bold font-mono shrink-0 text-sm shadow-lg">
                          {testimonial.author.charAt(0)}
                        </div>
                      )}

                      <div className="flex flex-col">
                        <h4 className="font-mono font-bold text-[13px] md:text-[15px] tracking-wider text-foreground flex items-center gap-2">
                          {testimonial.link ? (
                            <a href={testimonial.link} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex items-center gap-1.5">
                              {testimonial.author} <span className="opacity-70 text-[10px]">↗</span>
                            </a>
                          ) : (
                            testimonial.author
                          )}
                          <span className="text-background bg-accent rounded-full p-[3px] inline-flex">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          </span>
                        </h4>
                        <p className="font-sans text-[12px] md:text-[13px] text-foreground/60 mt-0.5">
                          {testimonial.role} {testimonial.company ? `• ${testimonial.company}` : ''}
                        </p>
                        {testimonial.project && (
                          <p className="font-mono text-[9px] md:text-[10px] text-accent/90 tracking-widest uppercase mt-2 font-bold">
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
      </div>
    </section>
  );
}
