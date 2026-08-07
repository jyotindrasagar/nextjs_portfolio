"use client";
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import type { BreakdownData } from '../data/breakdowns';

interface BreakdownModalProps {
  breakdown: BreakdownData | null;
  onClose: () => void;
}

export function BreakdownModal({ breakdown, onClose }: BreakdownModalProps) {
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (breakdown) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [breakdown]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {breakdown && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-background/95 backdrop-blur-md"
        >
          {/* Close Backdrop Overlay */}
          <div className="absolute inset-0 cursor-pointer" onClick={onClose}></div>

          {/* Modal Content Container */}
          <motion.div 
            initial={{ y: 50, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-panels border border-foreground/10 shadow-2xl rounded-sm flex flex-col hide-scrollbar"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-30 flex items-center justify-center w-10 h-10 rounded-full bg-background/70 hover:bg-background border border-foreground/10 text-foreground transition-colors backdrop-blur-sm"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 1L1 13M1 1L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Hero Video */}
            <div className="w-full aspect-video shrink-0 bg-black">
              <video 
                src={breakdown.videoUrl} 
                className="w-full h-full object-cover" 
                controls 
                autoPlay 
                playsInline
              />
            </div>

            {/* Blog Content */}
            <div className="p-8 md:p-16 lg:px-24">
              <div className="flex items-center gap-2 text-[9px] tracking-[0.25em] font-mono opacity-50 mb-6 uppercase">
                <span className="text-accent">â—</span>
                <span>SYS.ARCHIVE // CASE STUDY</span>
              </div>
              
              <h2 className="font-display font-bold text-4xl md:text-6xl tracking-tight text-foreground uppercase mb-6">
                {breakdown.title}
              </h2>

              <p className="font-mono text-sm tracking-[0.1em] text-foreground/50 uppercase mb-12 max-w-2xl leading-relaxed">
                {breakdown.excerpt}
              </p>

              <div className="w-16 h-[1px] bg-accent/50 mb-12"></div>

              {/* Formatted Content */}
              <div className="prose prose-invert prose-p:font-sans prose-p:font-light prose-p:text-foreground/80 prose-p:leading-[1.8] prose-p:text-base md:prose-p:text-lg max-w-3xl whitespace-pre-wrap">
                {breakdown.content}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

