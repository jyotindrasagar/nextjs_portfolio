"use client";

import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ExternalLink, Music, ArrowRight, CheckCircle2 } from 'lucide-react';
import { type Project } from '../data/projects';
import { CustomYouTubePlayer } from './CustomYouTubePlayer';

interface ProjectModalProps {
  project: Project | null;
  allProjects: Project[];
  onClose: () => void;
  onSelectProject: (project: Project) => void;
}

export function ProjectModal({
  project,
  allProjects,
  onClose,
  onSelectProject,
}: ProjectModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (project) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [project]);

  // Keyboard navigation (Esc to close, Left/Right to navigate)
  const currentIndex = project ? allProjects.findIndex(p => p.id === project.id) : -1;
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex >= 0 && currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!project) return null;

  const isSocial = project.category?.toUpperCase() === 'SOCIAL';
  const isHOF = project.title.toUpperCase().includes('HOF');
  const aspectRatioType = isSocial ? 'social' : (isHOF ? 'hof' : 'video');

  const toolsList = ['Blender', 'After Effects', 'Premiere Pro', 'DaVinci Resolve', 'Photoshop'];

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[99999] flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 bg-black/85 backdrop-blur-xl overflow-y-auto"
        onClick={onClose}
      >
        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className={`relative w-full max-w-6xl bg-background/95 dark:bg-[#0c0c0f]/95 border border-foreground/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh] ${
            isSocial ? 'max-w-5xl' : 'max-w-6xl'
          }`}
        >
          {/* Header Row */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-foreground/10 bg-panels/50 backdrop-blur-md shrink-0">
            <div className="flex flex-col gap-1 min-w-0 pr-4">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-accent/15 text-accent text-[9px] sm:text-[10px] font-mono font-bold tracking-widest uppercase">
                  {project.category} CASE STUDY
                </span>
                {project.subCategory && (
                  <span className="hidden sm:inline px-2 py-0.5 rounded bg-foreground/5 text-foreground/70 text-[9px] sm:text-[10px] font-mono font-bold tracking-widest uppercase">
                    {project.subCategory}
                  </span>
                )}
              </div>
              <h2 className="font-display font-bold text-base sm:text-xl md:text-2xl text-foreground uppercase tracking-tight truncate">
                {project.title}
              </h2>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 sm:p-2.5 rounded-full bg-foreground/5 hover:bg-accent hover:text-white text-foreground/80 border border-foreground/15 transition-all duration-200 cursor-pointer shrink-0"
              title="Close (Esc)"
            >
              <X size={18} />
            </button>
          </div>

          {/* Sub-bar Status */}
          <div className="px-4 sm:px-6 py-2 bg-foreground/[0.02] border-b border-foreground/5 flex items-center justify-between text-[9px] sm:text-[10px] font-mono tracking-wider text-foreground/60 shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="uppercase font-semibold text-foreground/80">MASTER PLAYBACK RUNNER (ACTIVE SOURCE)</span>
            </div>
            <div className="hidden sm:block uppercase">
              {isSocial ? 'SIZE: 1080 X 1920 [9:16] VERTICAL SHORT' : (isHOF ? 'SIZE: 1920 X 960 [2:1] BANNER' : 'SIZE: 1920 X 1080 [16:9] LANDSCAPE')}
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6">
            {isSocial ? (
              /* Vertical / Social Short 2-Column Layout */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                {/* Left Column: Vertical Player */}
                <div className="lg:col-span-5 flex justify-center w-full">
                  <div className="w-full max-w-[360px]">
                    <CustomYouTubePlayer
                      url={project.videoUrl}
                      title={project.title}
                      autoPlay={true}
                      loop={project.loop}
                      aspectRatio="social"
                      className="shadow-2xl"
                    />
                  </div>
                </div>

                {/* Right Column: Case Study Details */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                  {/* Meta Stats Row */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-panels/60 border border-foreground/10 text-center font-mono">
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] uppercase tracking-widest text-foreground/50">CATEGORY</span>
                      <span className="text-xs sm:text-sm font-bold text-foreground truncate">{project.category}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] uppercase tracking-widest text-foreground/50">FORMAT</span>
                      <span className="text-xs sm:text-sm font-bold text-accent">9:16 Short</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] uppercase tracking-widest text-foreground/50">ROLE</span>
                      <span className="text-xs sm:text-sm font-bold text-foreground">Editing & VFX</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[9px] uppercase tracking-widest text-foreground/50">RESULT</span>
                      <span className="text-xs sm:text-sm font-bold text-accent">High Retention</span>
                    </div>
                  </div>

                  {/* Project Overview */}
                  <div className="flex flex-col gap-2">
                    <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-accent uppercase">
                      ❖ PROJECT OVERVIEW
                    </span>
                    <p className="font-sans text-sm sm:text-base text-foreground/85 leading-relaxed">
                      {project.description || 'High-retention visual storytelling engineered for digital platforms, blending cinematic pacing with polished motion graphics.'}
                    </p>
                  </div>

                  {/* Tools Stack */}
                  <div className="flex flex-col gap-2.5">
                    <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-foreground/60 uppercase">
                      TOOLS &amp; SOFTWARE STACK
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {toolsList.map((tool) => (
                        <span 
                          key={tool}
                          className="px-3 py-1.5 rounded-md bg-foreground/5 border border-foreground/10 font-mono text-[10px] sm:text-[11px] font-semibold text-foreground/80"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Landscape Standard Layout */
              <div className="flex flex-col gap-6 max-w-4xl mx-auto">
                {/* 1. Custom Player */}
                <div className="w-full">
                  <CustomYouTubePlayer
                    url={project.videoUrl}
                    title={project.title}
                    autoPlay={true}
                    loop={project.loop}
                    aspectRatio={aspectRatioType}
                    className="shadow-2xl"
                  />
                </div>

                {/* 2. Meta Stats Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-panels/60 border border-foreground/10 text-center font-mono">
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] uppercase tracking-widest text-foreground/50">CATEGORY</span>
                    <span className="text-xs sm:text-sm font-bold text-foreground truncate">{project.category}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] uppercase tracking-widest text-foreground/50">SUBCATEGORY</span>
                    <span className="text-xs sm:text-sm font-bold text-accent truncate">{project.subCategory || 'Cinematic Showcase'}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] uppercase tracking-widest text-foreground/50">ROLE</span>
                    <span className="text-xs sm:text-sm font-bold text-foreground">Motion &amp; VFX</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] uppercase tracking-widest text-foreground/50">RESULT</span>
                    <span className="text-xs sm:text-sm font-bold text-accent">High Impact</span>
                  </div>
                </div>

                {/* 3. Project Overview */}
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-accent uppercase">
                    ❖ PROJECT OVERVIEW
                  </span>
                  <p className="font-sans text-sm sm:text-base text-foreground/85 leading-relaxed">
                    {project.description || 'Cinematic product visualization, motion design, and visual storytelling crafted with industry standard workflows.'}
                  </p>
                </div>

                {/* 4. Tools Stack */}
                <div className="flex flex-col gap-2.5">
                  <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-foreground/60 uppercase">
                    TOOLS &amp; SOFTWARE STACK
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {toolsList.map((tool) => (
                      <span 
                        key={tool}
                        className="px-3 py-1.5 rounded-md bg-foreground/5 border border-foreground/10 font-mono text-[10px] sm:text-[11px] font-semibold text-foreground/80"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Action / Project Navigation Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 py-4 border-t border-foreground/10 bg-panels/70 backdrop-blur-md shrink-0">
            {/* Left: Previous Project */}
            {prevProject ? (
              <button
                onClick={() => onSelectProject(prevProject)}
                className="flex items-center gap-2 text-foreground/80 hover:text-accent font-mono text-[10px] sm:text-[11px] tracking-wider uppercase transition-colors cursor-pointer"
              >
                <ChevronLeft size={14} />
                <span className="truncate max-w-[140px] sm:max-w-[200px]">PREV: {prevProject.title}</span>
              </button>
            ) : (
              <div className="flex items-center gap-1.5 text-foreground/50 text-[10px] font-mono">
                <CheckCircle2 size={13} className="text-accent" />
                <span>Production Complete</span>
              </div>
            )}

            {/* Right: External Track Link + Next Project + Close */}
            <div className="flex items-center gap-3">
              {project.trackUrl && (
                <a
                  href={project.trackUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-md bg-foreground/5 hover:bg-accent hover:text-white border border-foreground/15 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <Music size={12} />
                  <span>Listen Track</span>
                  <ExternalLink size={12} />
                </a>
              )}

              {nextProject && (
                <button
                  onClick={() => onSelectProject(nextProject)}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-md bg-accent text-white font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider hover:bg-accent/90 shadow-[0_2px_10px_rgba(234,135,156,0.3)] transition-all cursor-pointer"
                >
                  <span>Next Project</span>
                  <ArrowRight size={14} />
                </button>
              )}

              <button
                onClick={onClose}
                className="px-3.5 py-2 rounded-md bg-foreground/10 hover:bg-foreground/20 text-foreground font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
