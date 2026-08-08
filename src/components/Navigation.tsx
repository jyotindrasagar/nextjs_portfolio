"use client";
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Menu, X, Music } from 'lucide-react';
const logoUrl = '/dieablofx.svg';

interface NavigationProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'work', label: 'Work' },
  // { id: 'case-studies', label: 'Project Breakdowns' },
  { id: 'about', label: 'About' },
  { id: 'feedback', label: 'Feedback' },
  { id: 'contact', label: 'Contact' }
];

export function Navigation({ theme, toggleTheme }: NavigationProps) {
  const { scrollY } = useScroll();
  const navHeight = useTransform(scrollY, [0, 100], [80, 60]);
  const navBorder = useTransform(
    scrollY, 
    [0, 100], 
    ['rgba(0,0,0,0)', theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)']
  );

  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isScrollingRef = useRef(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.2);

  useEffect(() => {
    const audio = new Audio('https://pub-5581a6a5aba4445fb20fc89eb69162c2.r2.dev/sun.mp3');
    audioRef.current = audio;
    audio.volume = volume;
    audio.loop = false;

    // Start muted - music will only play when user explicitly toggles it via the music button.

    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener('ended', handleEnded);

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
      audio.removeEventListener('ended', handleEnded);
      window.removeEventListener('global-audio-play', handleGlobalAudio);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          window.dispatchEvent(new CustomEvent('global-audio-play', { detail: { source: 'bg-music' } }));
        }).catch(() => {});
      }
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
    let elements: HTMLElement[] = [];
    
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
      navIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element && !elements.includes(element)) {
          observer.observe(element);
          elements.push(element);
        }
      });
    };

    tryObserve();
    const interval = setInterval(tryObserve, 1000);

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);



  const handleScroll = (e: React.MouseEvent<HTMLElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      setMobileMenuOpen(false); // Close mobile menu if open
      isScrollingRef.current = true;
      element.scrollIntoView({ behavior: 'smooth' });
      
      // Reset the scrolling flag after smooth scroll is expected to finish
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);
    }
  };

  return (
    <>
      <motion.nav
        aria-label="Main Navigation"
        style={{ height: navHeight, borderBottomColor: navBorder, borderBottomWidth: '1px' }}
        className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-background/95 transition-colors duration-500 border-b select-none"
      >
        {/* Brand logo */}
        <div className="flex-1 flex items-center">
          {/* Mobile Menu Toggle */}
          <button 
            aria-label={mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
            aria-expanded={mobileMenuOpen}
            className="lg:hidden mr-4 p-2 -ml-2 text-foreground/80 hover:text-foreground transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setMobileMenuOpen(false);
            }}
            className="font-display font-bold tracking-[0.18em] text-xs sm:text-sm uppercase hover:opacity-80 transition-opacity"
          >
            <span className="sr-only">DIEABLO FX</span>
            <div aria-hidden="true" className="flex items-center gap-0">
              <motion.img 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                src={logoUrl} 
                alt="DieabloFX Logo" 
                className="h-[0.75em] w-auto object-contain logo-image mr-[0.08em] invert dark:invert-0" 
              />
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="flex items-center"
              >
                <span className="text-foreground">IEABLO</span>
                <span className="text-accent">FX</span>
              </motion.div>
            </div>
          </a>
        </div>

        {/* Desktop Nav links */}
        <div className="hidden lg:flex gap-8 lg:gap-10 text-xs sm:text-sm uppercase tracking-[0.18em] font-display font-bold flex-1 justify-center">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                handleScroll(e, link.id);
                setActiveSection(link.id);
              }}
              className={`hover:text-accent transition-colors relative flex flex-col items-center ${
                activeSection === link.id ? 'text-accent' : 'text-foreground font-bold'
              }`}
            >
              <span>{link.label}</span>
              {activeSection === link.id && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-6 w-full h-[1px] bg-accent"
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              )}
            </a>
          ))}
        </div>

        {/* Action button & theme toggle */}
        <div className="flex-1 flex justify-end items-center gap-3 sm:gap-4">

          {/* Watch Showreel Button */}
          <button 
            onClick={(e) => {
              handleScroll(e, 'work');
              setActiveSection('work');
              window.dispatchEvent(new CustomEvent('openShowreel'));
            }}
            className="hidden md:flex bg-accent text-white px-[22px] py-[11px] rounded-[2px] font-display font-bold text-[10px] sm:text-[11px] uppercase tracking-[0.18em] transition-all duration-300 items-center gap-4 group hover:bg-accent/90 mr-2 shadow-sm"
          >
            <span>Watch Showreel</span>
            <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 text-sm leading-none font-light">↗</span>
          </button>



          {/* Music Button Container with Hover Slider */}
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

            {/* The Volume Slider (appears on hover, vertical dropdown) */}
            <div className="absolute top-full mt-2 opacity-0 h-0 group-hover/music:opacity-100 group-hover/music:h-24 transition-all duration-300 overflow-hidden flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm border border-foreground/10 rounded-full w-8">
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.05" 
                value={volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 bg-foreground/20 rounded-lg appearance-none cursor-pointer accent-accent -rotate-90 origin-center"
              />
            </div>
          </div>

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
      </motion.nav>

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
                className={`text-base font-display uppercase tracking-[0.18em] transition-colors ${
                  activeSection === link.id ? 'text-accent font-extrabold' : 'text-foreground font-extrabold hover:text-accent'
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
            className="flex bg-accent text-white px-[18px] py-[14px] rounded-[2px] font-display font-bold text-[10px] sm:text-[11px] uppercase tracking-[0.18em] transition-all duration-300 items-center justify-between group hover:bg-accent/90 w-full"
          >
            <span>Watch Showreel</span>
            <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 text-lg leading-none font-light">↗</span>
          </button>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}

