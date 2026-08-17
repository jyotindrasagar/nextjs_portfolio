"use client";
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSection } from './AnimatedSection';

export function About() {
  const [isSectionOpen, setIsSectionOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!isSectionOpen) return;
    const el = videoRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          el.play().catch(() => { });
        } else {
          el.pause();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isSectionOpen]);

  // Listen for navigation expand event
  useEffect(() => {
    const handleExpandSection = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.id === 'about') {
        setIsSectionOpen(true);
      }
    };
    window.addEventListener('expand-section', handleExpandSection);
    return () => window.removeEventListener('expand-section', handleExpandSection);
  }, []);

  return (
    <section
      id="about"
      className={`relative px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 z-20 border-t border-foreground/10 overflow-hidden transition-all duration-300 ${isSectionOpen ? 'pt-16 md:pt-24 pb-16 md:pb-24 min-h-[100px]' : 'pt-8 pb-8 min-h-0'
        }`}
    >
      {/* Clickable Header Area: Only CAD Tag & Title on Left, Button on Right */}
      <div
        onClick={() => setIsSectionOpen(!isSectionOpen)}
        className="relative cursor-pointer group select-none py-3 mb-4"
      >
        {/* Soft-edge feathered ambient glow: subtle sakura pink in light mode, subtle white in dark mode */}
        <div
          className="absolute -inset-x-6 -inset-y-3 sm:-inset-x-8 sm:-inset-y-4 rounded-[40px] bg-gradient-to-r from-accent/[0.035] via-accent/[0.012] to-transparent dark:from-white/[0.03] dark:via-white/[0.01] dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-2xl -z-10"
          aria-hidden="true"
        />

        <AnimatedSection className="flex flex-col items-start text-left">
          {/* CAD reference label */}
          <div className="flex items-center gap-2 text-[9px] min-[360px]:text-[11px] sm:text-[12px] md:text-[14px] tracking-[0.2em] sm:tracking-[0.25em] font-mono font-extrabold text-accent mb-3 sm:mb-4 md:mb-6 uppercase text-left truncate max-w-full">
            <span>❖</span>
            <span className="truncate">SYS.ABOUT // PHILOSOPHY</span>
          </div>

          {/* Row: Title on Left, Button on Right */}
          <div className="flex items-center justify-between w-full gap-2 sm:gap-4">
            <h2 className="font-display font-bold text-[22px] min-[360px]:text-2xl min-[420px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-foreground uppercase leading-none text-left">
              About <span className="text-accent">Me</span>
            </h2>

            <button
              onClick={(e) => { e.stopPropagation(); setIsSectionOpen(!isSectionOpen); }}
              className="relative w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shrink-0 group focus:outline-none bg-accent text-white transition-all duration-300 hover:bg-accent/90 shadow-[0_4px_14px_rgba(234,135,156,0.3)] hover:shadow-[0_6px_20px_rgba(234,135,156,0.5)] hover:-translate-y-0.5 cursor-pointer"
              title={isSectionOpen ? "Collapse Section" : "Expand Section"}
            >
              <motion.div
                animate={{ rotate: isSectionOpen ? 180 : 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="flex items-center justify-center"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${isSectionOpen ? "" : "mt-0.5"}`}>
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </motion.div>
            </button>
          </div>
        </AnimatedSection>
      </div>

      {/* Main Content (Collapsible Body) */}
      <AnimatePresence>
        {isSectionOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            {/* Subtitle / Philosophy statement */}
            <div className="flex flex-col items-start text-left border-b border-foreground/10 pb-8 mb-10 pt-2">
              <div className="font-mono text-[12px] md:text-[14px] font-semibold tracking-[0.2em] leading-relaxed text-foreground/80 uppercase text-left">
                <span>STUFF ABOUT ME ^_^</span><br />
                <span className="text-foreground/50 text-[11px] md:text-[12px]">VIDEO EDITOR, MOTION DESIGNER &amp; VFX ARTIST.</span>
              </div>
            </div>

            {/* 2-Column layout */}
            <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-20">
              {/* Left narrative content */}
              <AnimatedSection className="flex-1 max-w-2xl z-10 flex flex-col items-start text-left">
                <div className="space-y-6 text-foreground/80 font-light text-sm md:text-base leading-relaxed text-left">
                  <p>
                    Hi 🫡
                  </p>
                  <p>
                    I'm Dieablo, a 23 year old Video Editor and a Motion Designer working under the Creative identity <strong className="font-semibold text-foreground">DieabloFX</strong>.
                  </p>
                  <p>
                    I personally enjoy stuff that involves heavy Graphical Input, As for the reason why? To be completely honest I do not know, I was just naturally attracted to them from early age I guess and that got me in to making Commercials and advertisement based contents.
                  </p>
                  <p>
                    I am still trying to find my own style and my own Artform but I do enjoy proper Story and Cinematic based works aswell. I am trying to get better at Animation on side, and Always looking for oppertunities to learn new stuff and work on new projects so yeah thats me. 🫠
                  </p>
                  <p>
                    Hit me up if you feel like working together, or even if you just wanna chat :)
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-12 pt-8 border-t border-foreground/15 text-foreground/80 font-light text-sm md:text-base leading-relaxed w-full text-left">
                  <div>
                    <h4 className="text-accent font-mono font-bold mb-5 text-[11px] md:text-[13px] tracking-[0.2em] uppercase text-left">// CORE CAPABILITIES</h4>
                    <ul className="space-y-3.5">
                      <li className="flex items-center gap-3 group">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent/40 group-hover:bg-accent transition-colors shrink-0"></span>
                        <span className="group-hover:text-foreground transition-colors">Creative Direction</span>
                      </li>
                      <li className="flex items-center gap-3 group">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent/40 group-hover:bg-accent transition-colors shrink-0"></span>
                        <span className="group-hover:text-foreground transition-colors">Motion & Stage Graphics</span>
                      </li>
                      <li className="flex items-center gap-3 group">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent/40 group-hover:bg-accent transition-colors shrink-0"></span>
                        <span className="group-hover:text-foreground transition-colors">3D & 2D Animation</span>
                      </li>
                      <li className="flex items-center gap-3 group">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent/40 group-hover:bg-accent transition-colors shrink-0"></span>
                        <span className="group-hover:text-foreground transition-colors">Track & Simulation</span>
                      </li>
                      <li className="flex items-center gap-3 group">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent/40 group-hover:bg-accent transition-colors shrink-0"></span>
                        <span className="group-hover:text-foreground transition-colors">Ads and Promotional Marketing</span>
                      </li>
                      <li className="flex items-center gap-3 group">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent/40 group-hover:bg-accent transition-colors shrink-0"></span>
                        <span className="group-hover:text-foreground transition-colors">Music Videos</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-accent font-mono font-bold mb-5 text-[11px] md:text-[13px] tracking-[0.2em] uppercase text-left">// ENGINE SETUP</h4>
                    <ul className="space-y-3.5">
                      <li className="flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent/40 group-hover:bg-accent transition-colors shrink-0"></span>
                          <span className="group-hover:text-foreground transition-colors">After Effects / AE</span>
                        </div>
                        <img
                          src="https://pub-5581a6a5aba4445fb20fc89eb69162c2.r2.dev/App%20icons/after-effects.svg"
                          className="w-[18px] h-[18px] object-contain opacity-80 group-hover:opacity-100 transition-opacity rounded-[3px]"
                          alt="After Effects"
                          loading="lazy"
                        />
                      </li>
                      <li className="flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent/40 group-hover:bg-accent transition-colors shrink-0"></span>
                          <span className="group-hover:text-foreground transition-colors">Premiere Pro / DaVinci</span>
                        </div>
                        <div className="flex gap-2 items-center">
                          <img
                            src="https://pub-5581a6a5aba4445fb20fc89eb69162c2.r2.dev/App%20icons/premiere.svg"
                            className="w-[18px] h-[18px] object-contain opacity-80 group-hover:opacity-100 transition-opacity rounded-[3px]"
                            alt="Premiere Pro"
                            loading="lazy"
                          />
                          <div className="w-[18px] h-[18px] flex items-center justify-center overflow-hidden shrink-0">
                            <img
                              src="https://pub-5581a6a5aba4445fb20fc89eb69162c2.r2.dev/App%20icons/DaVinci_Resolve_Studio.png"
                              className="w-full h-full object-contain scale-[1.18] opacity-80 group-hover:opacity-100 transition-opacity rounded-[3px]"
                              alt="DaVinci Resolve"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      </li>
                      <li className="flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent/40 group-hover:bg-accent transition-colors shrink-0"></span>
                          <span className="group-hover:text-foreground transition-colors">Blender / Unreal Engine</span>
                        </div>
                        <div className="flex gap-2 items-center">
                          <img
                            src="https://pub-5581a6a5aba4445fb20fc89eb69162c2.r2.dev/App%20icons/Blender_logo_no_text.svg"
                            className="w-[18px] h-[18px] object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                            alt="Blender"
                            loading="lazy"
                          />
                          <div className="w-[18px] h-[18px] rounded-full bg-black flex items-center justify-center overflow-hidden opacity-80 group-hover:opacity-100 transition-opacity shrink-0">
                            <img
                              src="https://pub-5581a6a5aba4445fb20fc89eb69162c2.r2.dev/App%20icons/unrealengine.svg"
                              className="w-full h-full invert brightness-200 object-contain"
                              alt="Unreal Engine"
                              loading="lazy"
                            />
                          </div>
                        </div>
                      </li>
                      <li className="flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent/40 group-hover:bg-accent transition-colors shrink-0"></span>
                          <span className="group-hover:text-foreground transition-colors">SynthEyes & Mocha Pro</span>
                        </div>
                        <div className="flex gap-2 items-center">
                          <img
                            src="https://pub-5581a6a5aba4445fb20fc89eb69162c2.r2.dev/App%20icons/syntheyes.png"
                            className="w-[18px] h-[18px] object-cover rounded-[3px] opacity-80 group-hover:opacity-100 transition-opacity"
                            alt="SynthEyes"
                            loading="lazy"
                          />
                          <img
                            src="https://pub-5581a6a5aba4445fb20fc89eb69162c2.r2.dev/App%20icons/mochapro.jpg"
                            className="w-[18px] h-[18px] object-cover rounded-[3px] opacity-80 group-hover:opacity-100 transition-opacity"
                            alt="Mocha Pro"
                            loading="lazy"
                          />
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </AnimatedSection>

              {/* Right Portrait/Conceptual Image Block (Hidden on mobile screens smaller than tablet) */}
              <div className="hidden md:flex flex-1 relative w-full max-w-md lg:max-w-lg aspect-[4/5] bg-panels border border-foreground/10 p-4 select-none z-30">
                {/* Internal CAD frame */}
                <div className="absolute inset-0 pointer-events-none border border-foreground/10 opacity-30 m-6 flex flex-col justify-between p-2">
                  <div className="flex justify-between font-mono text-[7px] text-foreground">
                    <span>REG_08_PORTRAIT</span>
                    <span>A: 4:5</span>
                  </div>
                  <div className="flex justify-between font-mono text-[7px] text-foreground">
                    <span>LOC // 34.0522° N, 118.2437° W</span>
                    <span>SCALE // 1.0</span>
                  </div>
                </div>

                <video
                  ref={videoRef}
                  src="https://pub-5581a6a5aba4445fb20fc89eb69162c2.r2.dev/about%20me.webm"
                  title="Dieablo Studio Portrait"
                  loop
                  muted
                  playsInline
                  preload="none"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
