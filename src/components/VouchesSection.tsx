"use client";

import { useState, useRef, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useAnimationFrame, useMotionValue } from 'framer-motion';
import { vouches, Vouch } from '../data/vouches';
import { ShieldCheck, ChevronDown, ExternalLink, ArrowUpRight, Share2, Globe, Building2, Maximize2, X, Sparkles } from 'lucide-react';

interface VouchModalProps {
  vouch: Vouch | null;
  onClose: () => void;
}

function VouchModal({ vouch, onClose }: VouchModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!vouch || typeof document === 'undefined') return null;

  const linkType = vouch.linkType || (vouch.link?.includes('twitter') || vouch.link?.includes('x.com') || vouch.link?.includes('instagram') ? 'social' : 'portfolio');

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-background/80 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 15 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-panels/95 dark:bg-panels/90 border border-foreground/15 rounded-2xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col gap-6"
      >
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        {/* Top Bar / Header */}
        <div className="flex items-center justify-between border-b border-foreground/10 pb-4 relative z-10">
          <div className="flex items-center gap-2 text-accent font-mono text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase">
            <ShieldCheck size={16} />
            <span>CREATIVE CIRCLE // COLLABORATOR</span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-foreground/50 hover:text-foreground hover:bg-foreground/10 transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Profile Details */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 relative z-10 text-center sm:text-left">
          {/* Avatar */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-accent/40 shrink-0 shadow-lg">
            <img
              src={vouch.avatar}
              alt={vouch.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Name & Roles */}
          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h3 className="font-mono font-bold text-lg sm:text-xl text-foreground tracking-wide truncate">
                {vouch.name}
              </h3>
              {vouch.verified && (
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-accent/10 text-accent text-xs font-bold shrink-0" title="Verified Vouch">
                  ✓
                </span>
              )}
            </div>

            {vouch.role && (
              <p className="font-sans text-xs sm:text-sm text-foreground/70">
                {vouch.role}
              </p>
            )}

            {vouch.agency && (
              <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-1 font-mono text-xs text-accent tracking-wider font-semibold">
                <Building2 size={13} className="shrink-0" />
                <span>{vouch.agency}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Links */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2 relative z-10">
          {/* Main Portfolio / Social Link */}
          {vouch.link && (
            <a
              href={vouch.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-accent/40 bg-accent/10 hover:bg-accent hover:text-white text-accent text-xs font-mono font-bold tracking-[0.15em] uppercase transition-all duration-300 shadow-sm hover:shadow-[0_0_20px_rgba(254,205,211,0.3)]"
            >
              {linkType === 'social' ? <Share2 size={14} /> : <ArrowUpRight size={15} />}
              <span>{linkType === 'social' ? 'VIEW PROFILE' : 'VIEW PORTFOLIO'}</span>
            </a>
          )}

          {/* Optional Agency Link */}
          {vouch.agencyLink && (
            <a
              href={vouch.agencyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-foreground/20 bg-foreground/5 hover:border-accent hover:text-accent hover:bg-accent/5 text-foreground/80 text-xs font-mono font-bold tracking-[0.15em] uppercase transition-all duration-300"
            >
              <Building2 size={14} />
              <span>{vouch.agency ? `${vouch.agency.toUpperCase()}` : 'AGENCY SITE'}</span>
              <ExternalLink size={12} className="opacity-70" />
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

export function VouchesSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedVouch, setSelectedVouch] = useState<Vouch | null>(null);

  // Ensure we have enough items to fill the screen for seamless infinite scroll
  const displayVouches = useMemo(() => {
    const minItems = 12;
    const repeatCount = Math.max(3, Math.ceil(minItems / Math.max(1, vouches.length)));
    return Array.from({ length: repeatCount }).flatMap(() => vouches);
  }, [vouches]);

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

      const clampedDelta = Math.min(delta, 32);
      let currentX = x.get() - baseSpeed * (clampedDelta / 16);

      // Loop back smoothly once first set has scrolled off
      if (Math.abs(currentX) >= setWidth) {
        currentX = currentX % setWidth;
      }

      x.set(currentX);
    }
  });

  return (
    <>
      <div className="w-full mt-4 md:mt-6 select-none flex flex-col items-center">
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full border border-foreground/15 bg-panels/40 backdrop-blur-sm text-foreground text-xs sm:text-sm font-mono font-bold tracking-[0.2em] uppercase hover:border-accent hover:text-accent transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(254,205,211,0.25)]"
        >
          <ShieldCheck size={16} className="text-accent group-hover:scale-110 transition-transform" />
          <span>// CREATIVE CIRCLE ({vouches.length})</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown size={16} />
          </motion.div>
        </button>

        {/* Expandable Creative Circle Section */}
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
                  CREATIVE CIRCLE // INDUSTRY EDITORS & COLLABORATORS
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
                  className="flex gap-4 sm:gap-6 w-max px-6 py-2 transform-gpu will-change-transform"
                  style={{ x, willChange: 'transform' }}
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
                          if (!isDragging) {
                            setSelectedVouch(item);
                          }
                        }}
                        className="flex-shrink-0 flex items-center gap-3.5 px-4 py-3 rounded-full border border-foreground/10 bg-panels/80 dark:bg-panels/50 hover:bg-panels/90 hover:border-accent/50 transition-colors duration-300 cursor-pointer group shadow-sm hover:shadow-[0_0_15px_rgba(254,205,211,0.15)] min-w-[220px] sm:min-w-[260px] transform-gpu will-change-transform"
                      >
                        {/* Profile Avatar */}
                        <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-foreground/20 shrink-0 group-hover:scale-105 transition-transform">
                          <img
                            src={item.avatar}
                            alt={item.name}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover"
                          />
                        </div>

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

                        {/* Action Buttons with distinct signs */}
                        <div className="flex items-center gap-2 shrink-0 ml-auto">
                          {/* Optional Agency Website Button (distinct building sign) */}
                          {item.agencyLink && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (!isDragging) {
                                  window.open(item.agencyLink, '_blank', 'noopener,noreferrer');
                                }
                              }}
                              className="p-1.5 rounded-full bg-foreground/5 hover:bg-accent/20 hover:text-accent text-foreground/60 transition-all cursor-pointer"
                              title={`Visit Agency (${item.agency || 'Agency'})`}
                            >
                              <Building2 size={13} />
                            </button>
                          )}

                          {/* Pop-up Modal View Button (distinct expand sign) */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (!isDragging) {
                                setSelectedVouch(item);
                              }
                            }}
                            className="p-1.5 rounded-full bg-foreground/5 hover:bg-accent/20 hover:text-accent text-foreground/60 transition-all cursor-pointer"
                            title="View Full Profile Details"
                          >
                            <Maximize2 size={13} />
                          </button>

                          {/* Direct External Link Button (portfolio / social sign) */}
                          {item.link && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (!isDragging) {
                                  window.open(item.link, '_blank', 'noopener,noreferrer');
                                }
                              }}
                              className="p-1.5 rounded-full bg-foreground/5 hover:bg-accent/20 hover:text-accent text-foreground/60 transition-all cursor-pointer"
                              title={linkType === 'social' ? 'Open Social Profile' : 'Open Portfolio'}
                            >
                              {linkType === 'social' ? (
                                <Share2 size={13} />
                              ) : (
                                <ArrowUpRight size={14} />
                              )}
                            </button>
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

      {/* Pop-up Detail Modal */}
      <AnimatePresence>
        {selectedVouch && (
          <VouchModal
            vouch={selectedVouch}
            onClose={() => setSelectedVouch(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
