"use client";
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, Music, ArrowLeft } from 'lucide-react';
import { ProfileHeaderButton } from './ProfileHeaderButton';
import Link from 'next/link';
const logoUrl = '/dieablofx.svg';

interface NavigationProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  compact?: boolean;
}

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'work', label: 'Work' },
  { id: 'breakdowns', label: 'Breakdowns' },
  { id: 'about', label: 'About' },
  { id: 'feedback', label: 'Feedback' },
  { id: 'contact', label: 'Contact' }
];

export function Navigation({ theme, toggleTheme, compact }: NavigationProps) {
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isScrollingRef = useRef(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.2);

  useEffect(() => {
    // Listen for global audio play events to pause background music if another video is unmuted
    const handleGlobalAudio = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail.source !== 'bg-music') {
        if (audioRef.current && !audioRef.current.paused) {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      }
    };
    window.addEventListener('global-audio-play', handleGlobalAudio);

    return () => {
      window.removeEventListener('global-audio-play', handleGlobalAudio);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) {
      const audio = new Audio('https://pub-5581a6a5aba4445fb20fc89eb69162c2.r2.dev/sun.mp3');
      audio.volume = volume;
      audio.loop = false;
      audio.addEventListener('ended', () => setIsPlaying(false));
      audioRef.current = audio;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        window.dispatchEvent(new CustomEvent('global-audio-play', { detail: { source: 'bg-music' } }));
      }).catch(() => { });
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
  };

  useEffect(() => {
    const navIds = navLinks.map(link => link.id);
    const elements = new Set<HTMLElement>();
    let interval: ReturnType<typeof setInterval> | null = null;
    let attempts = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingRef.current) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -50% 0px' }
    );

    const tryObserve = () => {
      attempts++;
      navIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element && !elements.has(element)) {
          observer.observe(element);
          elements.add(element);
        }
      });

      if (elements.size >= navIds.length || attempts >= 5) {
        if (interval) {
          clearInterval(interval);
          interval = null;
        }
      }
    };

    tryObserve();
    if (elements.size < navIds.length) {
      interval = setInterval(tryObserve, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLElement>, id: string) => {
    if (compact) return;
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('expand-section', { detail: { id } }));
    const element = document.getElementById(id);
    if (element) {
      setMobileMenuOpen(false);
      isScrollingRef.current = true;
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 50);

      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);
    }
  };

  return (
    <>
      <nav
        aria-label="Main Navigation"
        className={`${compact
          ? 'sticky top-0 z-[60] w-full flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-4 bg-background/90 backdrop-blur-md border-b border-foreground/10 transition-colors duration-500 select-none'
          : 'fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 h-16 md:h-20 bg-background/95 border-b border-foreground/[0.06] transition-colors duration-500 select-none'
          }`}
      >
        {/* Brand logo */}
        <div className="shrink-0 flex items-center gap-3 sm:gap-5">
          {!compact && (
            <button
              aria-label={mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
              aria-expanded={mobileMenuOpen}
              className="lg:hidden mr-2 p-2 -ml-2 text-foreground/80 hover:text-foreground transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}

          <Link
            href="/"
            onClick={(e) => {
              if (compact) return;
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setMobileMenuOpen(false);
            }}
            className="font-display font-bold tracking-[0.15em] lg:tracking-[0.18em] text-xs sm:text-sm uppercase hover:opacity-80 transition-opacity flex items-center"
          >
            <span className="sr-only">DIEABLO FX</span>
            <div aria-hidden="true" className="flex items-center flex-nowrap whitespace-nowrap">
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                src={logoUrl}
                alt="DieabloFX Logo"
                className="h-[0.82em] w-auto object-contain logo-image mr-[0.1em] shrink-0"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="flex items-center leading-none"
              >
                <span className="text-foreground">IEABLO</span>
                <span className="text-accent">FX</span>
              </motion.div>
            </div>
          </Link>

          {compact && (
            <div className="hidden sm:block h-4 w-[1px] bg-foreground/20"></div>
          )}
          {compact && (
            <span className="hidden sm:block font-mono text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-foreground/60">
              Project Blogs
            </span>
          )}

          {compact && (
            <Link
              href="/"
              className="hidden lg:inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-foreground/60 hover:text-accent transition-colors ml-3"
            >
              <ArrowLeft size={12} /> Return Home
            </Link>
          )}
        </div>

        {/* Desktop Nav links */}
        {!compact && (
          <div className="hidden lg:flex items-center h-full gap-1 lg:gap-1.5 xl:gap-4 text-[10px] lg:text-[11px] xl:text-xs uppercase tracking-[0.06em] lg:tracking-[0.08em] xl:tracking-[0.16em] font-display font-bold justify-center absolute left-[48.5%] top-0 bottom-0 -translate-x-1/2 whitespace-nowrap">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  handleScroll(e, link.id);
                  setActiveSection(link.id);
                }}
                className={
                  link.id === 'contact'
                    ? `ml-2 xl:ml-4 px-4 py-1.5 xl:px-5 xl:py-2 rounded-[3px] font-display font-bold text-[9px] xl:text-[10px] uppercase tracking-[0.15em] transition-all duration-300 flex items-center justify-center group hover:-translate-y-0.5 ${activeSection === link.id
                      ? 'bg-accent text-white shadow-[0_4px_14px_rgba(234,135,156,0.3)]'
                      : 'bg-transparent border border-accent text-accent hover:bg-accent hover:text-white hover:shadow-[0_6px_20px_rgba(234,135,156,0.4)]'
                    }`
                    : `h-full px-2 lg:px-2.5 xl:px-3.5 flex items-center justify-center hover:text-accent transition-colors relative ${activeSection === link.id ? 'text-accent' : 'text-foreground font-bold'
                    }`
                }
              >
                <span>{link.label}</span>
                {link.id !== 'contact' && activeSection === link.id && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-2 right-2 h-[2px] bg-accent"
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                )}
              </a>
            ))}
          </div>
        )}

        {/* Action button & theme toggle */}
        <div className="shrink-0 flex justify-end items-center gap-2 sm:gap-3 lg:gap-3.5 xl:gap-4 ml-auto z-10">

          {/* Social Links on Compact / Blog page */}
          {compact && (
            <div className="flex items-center gap-3 sm:gap-4 mr-1">
              <div className="hidden sm:flex items-center gap-3">
                <a href="https://x.com/dieablofx" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-foreground hover:scale-110 transition-all p-1" title="Twitter (X)">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
                    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
                  </svg>
                </a>
                <a href="https://instagram.com/dieablofx" target="_blank" rel="noopener noreferrer" className="text-foreground/60 hover:text-foreground hover:scale-110 transition-all p-1" title="Instagram">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="mailto:hello@dieablo.com" className="text-foreground/60 hover:text-foreground hover:scale-110 transition-all p-1" title="Email">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </a>
              </div>
              <ProfileHeaderButton />
            </div>
          )}

          {/* Watch Showreel Button */}
          {!compact && (
            <button
              onClick={(e) => {
                handleScroll(e, 'work');
                setActiveSection('work');
                window.dispatchEvent(new CustomEvent('openShowreel'));
              }}
              title="Watch Showreel"
              className="hidden sm:flex bg-accent text-white px-5 py-2 lg:w-8 lg:h-8 lg:p-0 2xl:w-auto 2xl:h-auto 2xl:px-6 2xl:py-2.5 rounded-[3px] font-display font-bold text-[10px] lg:text-xs uppercase tracking-[0.15em] transition-all duration-300 items-center justify-center gap-2 lg:gap-0 2xl:gap-2 group hover:bg-accent/90 shadow-[0_4px_14px_rgba(234,135,156,0.25)] hover:shadow-[0_6px_20px_rgba(234,135,156,0.4)] hover:-translate-y-0.5 shrink-0 whitespace-nowrap"
            >
              <span className="mt-[2px] block lg:hidden 2xl:block">Watch Showreel</span>
              <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 text-[14px] leading-none font-medium flex items-center justify-center">↗</span>
            </button>
          )}

          {/* Music Button Container with Hover Slider */}
          {!compact && (
            <div className="relative group/music flex flex-col items-center">
              <button
                onClick={toggleMusic}
                className="relative w-8 h-8 sm:w-8 sm:h-8 flex items-center justify-center rounded-full hover:bg-foreground/5 transition-all duration-300 group"
                title={isPlaying ? "Mute Music" : "Play Music"}
              >
                {/* Dashed ring */}
                <div className={`absolute inset-0 rounded-full border border-dashed border-foreground/30 transition-transform duration-[3000ms] ease-linear ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`}></div>

                {/* Icon */}
                <div className="relative">
                  <Music size={14} className={`transition-colors duration-300 ${isPlaying ? 'text-accent' : 'text-foreground/70 group-hover:text-foreground'}`} />
                  {!isPlaying && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-[1.5px] bg-foreground/70 -rotate-45 group-hover:bg-foreground transition-colors duration-300"></div>
                  )}
                </div>

                {/* Subtle glow when playing */}
                {isPlaying && (
                  <div className="absolute inset-0 rounded-full bg-accent/10 blur-md -z-10 animate-pulse"></div>
                )}
              </button>

              {/* The Volume Slider (appears on hover, vertical dropdown with sleek fill bar) */}
              <div className="absolute top-full mt-2 opacity-0 h-0 group-hover/music:opacity-100 group-hover/music:h-24 transition-all duration-300 overflow-hidden flex flex-col items-center justify-center bg-background/90 backdrop-blur-md border border-foreground/10 rounded-full w-8 py-3 shadow-lg">
                <div
                  role="slider"
                  aria-label="Background Music Volume"
                  aria-valuenow={Math.round(volume * 100)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  tabIndex={0}
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const pos = Math.max(0, Math.min(rect.bottom - e.clientY, rect.height));
                    const newVol = Number((pos / rect.height).toFixed(2));
                    setVolume(newVol);
                    if (audioRef.current) audioRef.current.volume = newVol;
                  }}
                  className="w-1.5 h-16 bg-foreground/15 rounded-full cursor-pointer relative overflow-hidden flex flex-col justify-end"
                  title={`Volume: ${Math.round(volume * 100)}%`}
                >
                  <div
                    className="w-full bg-gradient-to-t from-accent/90 to-accent rounded-full transition-all"
                    style={{ height: `${volume * 100}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Theme (Day/Night) Toggle */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            className="relative w-8 h-8 sm:w-8 sm:h-8 flex items-center justify-center rounded-full hover:bg-foreground/5 transition-colors text-foreground/70 hover:text-foreground"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[50] pt-20 bg-background/95 lg:hidden flex flex-col items-center justify-center gap-8 border-b border-foreground/10"
          >
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  handleScroll(e, link.id);
                  setActiveSection(link.id);
                }}
                className={`text-base font-display uppercase tracking-[0.18em] transition-colors ${activeSection === link.id ? 'text-accent font-extrabold' : 'text-foreground font-extrabold hover:text-accent'
                  }`}
              >
                {link.label}
              </a>
            ))}

            <button
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleScroll(e, 'work');
                setActiveSection('work');
                window.dispatchEvent(new CustomEvent('openShowreel'));
              }}
              className="flex bg-accent text-white px-4 py-3 rounded-[3px] font-display font-bold text-[10px] sm:text-xs uppercase tracking-[0.18em] transition-all duration-300 items-center justify-between group hover:bg-accent/90 w-full"
            >
              <span>Watch Showreel</span>
              <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 text-base leading-none font-light">↗</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}
