"use client";
import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useAnimationFrame } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const roles = [
  "Video Editor",
  "Motion Designer",
  "Creative Director",
  "VFX Artist"
];

const CountUpStat = ({ end, suffix, decimals = 0 }: { end: number, suffix: string, decimals?: number }) => {
  const rounded = end.toFixed(decimals);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }} transition={{ duration: 0.8 }} className="font-display font-light text-4xl lg:text-5xl tracking-tighter text-white">
      <span>{rounded}</span>
      <span>{suffix}</span>
    </motion.div>
  );
};


import { heroVideosData } from '../data/heroVideos';
import { HoverVideoPlayer } from './HoverVideoPlayer';
import { SocialSidebar } from './SocialSidebar';
import { clients as baseClients } from '../data/clients';
const logoUrl = '/dieablofx.svg';

// Guarantee at least 12 logos so the carousel is always wider than the screen
const displayClients = baseClients.length > 0
  ? Array.from({ length: Math.ceil(12 / baseClients.length) }).flatMap(() => baseClients)
  : [];

export function Hero({ loading = false }: { loading?: boolean }) {
  const { scrollY } = useScroll();
  const yImages = useTransform(scrollY, [0, 500], [0, -30]);

  const [windowWidth, setWindowWidth] = useState(1200);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isDesktop = windowWidth >= 1024;

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  // --- Carousel State ---
  const [contentWidth, setContentWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);

  const firstLogoRef = useRef<HTMLDivElement>(null);
  const secondSetFirstLogoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let initialized = false;
    const measure = () => {
      if (firstLogoRef.current && secondSetFirstLogoRef.current) {
        const width = secondSetFirstLogoRef.current.offsetLeft - firstLogoRef.current.offsetLeft;
        setContentWidth(width);
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
  }, []);

  useAnimationFrame((t, delta) => {
    if (contentWidth === 0) return;

    if (!isHovered && !isDragging) {
      const moveBy = 0.03 * delta; // Slightly slower than feedback cards
      x.set(x.get() - moveBy);
    }

    if (!isDragging) {
      const currentX = x.get();
      if (currentX <= -3 * contentWidth || currentX > -contentWidth) {
        const remainder = currentX % contentWidth;
        let newX = remainder;
        if (newX > 0) newX -= contentWidth;
        newX -= contentWidth;
        x.set(newX);
      }
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
  };

  // Handle smooth scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // The images array has been moved to src/data/heroVideos.ts

  return (
    <div id="home" className="relative w-full flex flex-col pt-32 pb-24">
      <div className="relative flex flex-col xl:flex-row items-start xl:items-stretch justify-between flex-1 mt-4 px-4 md:px-8 lg:px-12 xl:px-16 pb-4 gap-8 md:gap-12 lg:gap-16 xl:gap-24">
        {/* Social Sidebar - Absolute so it stops perfectly at the bottom navigation section */}
        <SocialSidebar />

        {/* Left Typography Column */}
        <div className="flex-1 w-full xl:max-w-[40%] z-20 select-none relative mt-0 md:mt-8 lg:pl-8 xl:pl-10 shrink-0 xl:flex xl:flex-col xl:justify-between h-full">

          <div>
            <div className="flex items-center gap-3 text-[11px] md:text-[12px] tracking-[0.25em] font-mono font-semibold text-foreground/90 mb-4 md:mb-6 uppercase">
              <span className="text-accent font-bold">+</span>
              <div className="relative overflow-hidden h-[1.5em] w-full">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={currentRoleIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center whitespace-nowrap"
                  >
                    {roles[currentRoleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            <h1 className="sr-only">DieabloFX | Video Editor & Motion Designer</h1>
            <motion.div
              aria-hidden="true"
              className="flex items-center gap-[0.15em] mb-6 text-6xl md:text-8xl lg:text-[8rem] xl:text-[6.5rem] 2xl:text-[8rem]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                src={logoUrl}
                alt="DieabloFX Logo"
                className="h-[0.85em] w-auto object-contain logo-image invert dark:invert-0"
              />
              <div
                className="font-display font-bold tracking-tight text-foreground leading-none"
              >
                IEABLO
              </div>
            </motion.div>

            <div className="font-display font-semibold text-[12px] md:text-[14px] tracking-[0.35em] text-foreground uppercase flex flex-col gap-2 mb-4 md:mb-6">
              <span>Visual Storytelling</span>
              <span>Through Editing & Design</span>
            </div>

            <div className="w-12 h-[2px] bg-accent mb-6 md:mb-8"></div>

            <p className="text-[11px] md:text-[13px] font-mono font-medium tracking-[0.18em] leading-[2] text-foreground/85 uppercase max-w-sm mb-8 md:mb-12">
              I direct ideas, craft stories,<br />
              and deliver visuals that leave<br />
              a lasting impact.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 relative z-20 xl:mb-0 xl:mt-auto">
            <button
              aria-label="View All Work"
              onClick={() => scrollToSection('work')}
              className="bg-accent text-white px-6 py-4 md:px-8 md:py-4.5 rounded-md text-[12px] md:text-[13px] font-display font-bold uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-between gap-6 md:gap-12 xl:gap-8 group sm:min-w-[190px] md:min-w-[230px] xl:min-w-[190px] hover:bg-accent/90 shadow-[0_4px_14px_rgba(234,135,156,0.3)] hover:shadow-[0_6px_20px_rgba(234,135,156,0.5)] hover:-translate-y-0.5"
            >
              <span>View All Work</span>
              <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 text-base leading-none font-bold">↗</span>
            </button>

            <button
              aria-label="Contact Me"
              onClick={() => scrollToSection('contact')}
              className="bg-transparent border border-white/60 text-white px-6 py-4 md:px-8 md:py-4.5 rounded-md text-[12px] md:text-[13px] font-display font-bold uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-between gap-6 md:gap-12 xl:gap-8 group sm:min-w-[190px] md:min-w-[230px] xl:min-w-[190px] hover:border-accent hover:text-accent hover:bg-accent/10 hover:-translate-y-0.5"
            >
              <span>Contact Me</span>
              <span className="text-[16px] opacity-80 leading-none">≡</span>
            </button>
          </div>

        </div>

        {/* Right Structured Grid Column (Responsive Masonry) */}
        <motion.div
          style={{ y: yImages, willChange: "transform" }}
          variants={containerVariants}
          initial="hidden"
          animate={!loading ? "visible" : "hidden"}
          className="w-full xl:w-[48vw] xl:max-w-[850px] 2xl:max-w-[1100px] flex flex-col gap-3 lg:gap-4 z-30 self-start xl:self-end mt-4 xl:mt-0 ml-auto justify-end shrink"
        >

          {/* Layout Wrapper (2 Columns on Desktop) */}
          <div className="flex flex-col md:flex-row gap-3 lg:gap-4 w-full">

            {/* Left & Middle Group */}
            <div className="flex flex-col gap-3 lg:gap-4 md:w-[65%] shrink-0">

              {/* 1. Logo Animation (1440x720) */}
              <motion.div variants={itemVariants} whileHover={{ scale: 1.02, opacity: 1 }} className="flex w-full aspect-[1440/720] shrink-0 group cursor-pointer relative overflow-hidden rounded-[5px] border border-foreground/5 bg-panels/20 flex-col">
                <HoverVideoPlayer
                  imageUrl={heroVideosData[0].imageUrl}
                  videoUrl={heroVideosData[0].videoUrl}
                  altText={heroVideosData[0].title}
                  baseOpacity="opacity-[0.99]"
                  baseGrayscale="grayscale-[40%]"
                  alwaysPlay={isDesktop}
                  loadDelay={0}
                >
                  <div className="absolute bottom-4 left-4 z-20 flex flex-col">
                    <span className="font-display font-bold text-[10px] tracking-widest text-white uppercase mix-blend-difference">{heroVideosData[0].title}</span>
                    <div className="grid transition-all duration-500 ease-out grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100">
                      <div className="overflow-hidden flex flex-col">
                        <span className="font-mono text-[8px] tracking-[0.2em] text-white uppercase pt-1 pb-1 mix-blend-difference">{heroVideosData[0].subtitle}</span>
                      </div>
                    </div>
                    <div className="h-[1px] bg-accent w-0 group-hover:w-8 transition-all duration-500 ease-out delay-100"></div>
                  </div>
                </HoverVideoPlayer>
              </motion.div>

              {/* Bottom Split (Promotionals & Animations) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4 w-full">

                {/* 4. Promotionals */}
                <motion.div variants={itemVariants} whileHover={{ scale: 1.02, opacity: 1 }} className="flex w-full aspect-video shrink-0 group cursor-pointer relative overflow-hidden rounded-[5px] border border-foreground/5 bg-panels/20 flex-col">
                  <HoverVideoPlayer
                    imageUrl={heroVideosData[2].imageUrl}
                    videoUrl={heroVideosData[2].videoUrl}
                    altText={heroVideosData[2].title}
                    baseOpacity="opacity-[0.99]"
                    baseGrayscale="grayscale-[40%]"
                    alwaysPlay={isDesktop}
                    loadDelay={2000}
                    volume={0.88}
                  >
                    <div className="absolute bottom-4 left-4 z-20 flex flex-col">
                      <span className="font-display font-bold text-[10px] tracking-widest text-white uppercase mix-blend-difference">{heroVideosData[2].title}</span>
                      <div className="grid transition-all duration-500 ease-out grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100">
                        <div className="overflow-hidden flex flex-col">
                          <span className="font-mono text-[8px] tracking-[0.2em] text-white uppercase pt-1 pb-1 mix-blend-difference">{heroVideosData[2].subtitle}</span>
                        </div>
                      </div>
                      <div className="h-[1px] bg-accent w-0 group-hover:w-8 transition-all duration-500 ease-out delay-100"></div>
                    </div>
                  </HoverVideoPlayer>
                </motion.div>

                {/* 5. Animations */}
                <motion.div variants={itemVariants} whileHover={{ scale: 1.02, opacity: 1 }} className="flex w-full aspect-video shrink-0 group cursor-pointer relative overflow-hidden rounded-[5px] border border-foreground/5 bg-panels/20 flex-col">
                  <HoverVideoPlayer
                    imageUrl={heroVideosData[3].imageUrl}
                    videoUrl={heroVideosData[3].videoUrl}
                    altText={heroVideosData[3].title}
                    baseOpacity="opacity-[0.99]"
                    baseGrayscale="grayscale-[40%]"
                    alwaysPlay={isDesktop}
                    loadDelay={3000}
                  >
                    <div className="absolute bottom-4 left-4 z-20 flex flex-col">
                      <span className="font-display font-bold text-[10px] tracking-widest text-white uppercase mix-blend-difference">{heroVideosData[3].title}</span>
                      <div className="grid transition-all duration-500 ease-out grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100">
                        <div className="overflow-hidden flex flex-col">
                          <span className="font-mono text-[8px] tracking-[0.2em] text-white uppercase pt-1 pb-1 mix-blend-difference">{heroVideosData[3].subtitle}</span>
                        </div>
                      </div>
                      <div className="h-[1px] bg-accent w-0 group-hover:w-8 transition-all duration-500 ease-out delay-100"></div>
                    </div>
                  </HoverVideoPlayer>
                </motion.div>

              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-3 lg:gap-4 flex-1">

              {/* 2. Explainers (1920x1080 Landscape) */}
              <motion.div variants={itemVariants} whileHover={{ scale: 1.02, opacity: 1 }} className="flex w-full aspect-video shrink-0 group cursor-pointer relative overflow-hidden rounded-[5px] border border-foreground/5 bg-panels/20 flex-col">
                <HoverVideoPlayer
                  imageUrl={heroVideosData[1].imageUrl}
                  videoUrl={heroVideosData[1].videoUrl}
                  altText={heroVideosData[1].title}
                  baseOpacity="opacity-[0.99]"
                  baseGrayscale="grayscale-[40%]"
                  alwaysPlay={isDesktop}
                  loadDelay={4000}
                >
                  <div className="absolute bottom-4 left-4 z-20 flex flex-col">
                    <span className="font-display font-bold text-[10px] tracking-widest text-white uppercase mix-blend-difference">{heroVideosData[1].title}</span>
                    <div className="grid transition-all duration-500 ease-out grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100">
                      <div className="overflow-hidden flex flex-col">
                        <span className="font-mono text-[8px] tracking-[0.2em] text-white uppercase pt-1 pb-1 mix-blend-difference">{heroVideosData[1].subtitle}</span>
                      </div>
                    </div>
                    <div className="h-[1px] bg-accent w-0 group-hover:w-8 transition-all duration-500 ease-out delay-100"></div>
                  </div>
                </HoverVideoPlayer>
              </motion.div>

              {/* 3. Motion Loops (1280x700) */}
              <motion.div variants={itemVariants} whileHover={{ scale: 1.02, opacity: 1 }} className="flex w-full aspect-[1280/700] shrink-0 group cursor-pointer relative overflow-hidden rounded-[5px] border border-foreground/5 bg-panels/20 flex-col">
                <HoverVideoPlayer
                  imageUrl={heroVideosData[4].imageUrl}
                  videoUrl={heroVideosData[4].videoUrl}
                  altText={heroVideosData[4].title}
                  baseOpacity="opacity-[0.99]"
                  baseGrayscale="grayscale-[40%]"
                  alwaysPlay={isDesktop}
                  loadDelay={4000}
                >
                  <div className="absolute bottom-4 left-4 z-20 flex flex-col">
                    <span className="font-display font-bold text-[10px] tracking-widest text-white uppercase mix-blend-difference">{heroVideosData[4].title}</span>
                    <div className="grid transition-all duration-500 ease-out grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100">
                      <div className="overflow-hidden flex flex-col">
                        <span className="font-mono text-[8px] tracking-[0.2em] text-white uppercase pt-1 pb-1 mix-blend-difference">{heroVideosData[4].subtitle}</span>
                      </div>
                    </div>
                    <div className="h-[1px] bg-accent w-0 group-hover:w-8 transition-all duration-500 ease-out delay-100"></div>
                  </div>
                </HoverVideoPlayer>
              </motion.div>

              {/* 6. More Works */}
              <motion.div variants={itemVariants} whileHover={{ scale: 1.02, opacity: 1 }} className="flex-1 w-full min-h-[120px] group cursor-pointer relative overflow-hidden rounded-[5px] border border-foreground/5 bg-panels/20 flex flex-col items-center justify-center p-6 text-center hover:bg-panels/30 transition-colors duration-300">
                <div className="font-display font-bold text-lg md:text-xl text-foreground mb-2">More Works</div>
                <div className="font-mono text-[9px] tracking-[0.2em] text-foreground/60 uppercase">Coming Soon</div>
              </motion.div>
            </div>

          </div>
        </motion.div>
      </div>



      {/* Bottom Stats Section */}
      <div className="w-full mt-4 z-20">
        <div
          className="grid grid-cols-1 lg:grid-cols-12 border-t border-b border-white/50 dark:border-accent/50 divide-y lg:divide-y-0 lg:divide-x divide-white/50 dark:divide-accent/50 px-4 md:px-6 lg:px-6 xl:px-16 bg-[#ea879c] dark:bg-black text-white relative overflow-hidden"
        >

          {/* Left Section: Clients */}
          <div className="col-span-1 lg:col-span-4 xl:col-span-5 relative min-h-[140px] flex items-end pb-4 lg:pb-6 px-3 md:px-4 lg:px-5 overflow-hidden">
            {/* Carousel spanning all over */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden flex items-center opacity-100 cursor-grab active:cursor-grabbing"
              style={{ maskImage: 'linear-gradient(to right, transparent, black 20px, black calc(100% - 20px), transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 20px, black calc(100% - 20px), transparent)' }}
              onPointerEnter={(e) => { if (e.pointerType === 'mouse') setIsHovered(true) }}
              onPointerLeave={(e) => { if (e.pointerType === 'mouse') setIsHovered(false) }}
            >
              <motion.div
                className="flex items-center min-w-max"
                style={{ x, willChange: "transform" }}
                drag="x"
                dragConstraints={{ left: -10000, right: 10000 }}
                dragElastic={0}
                dragMomentum={false}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={() => setIsDragging(false)}
              >
                {/* 6 sets for robust infinite math */}
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex gap-8 sm:gap-12 lg:gap-16 items-center pr-8 sm:pr-12 lg:pr-16">
                    {displayClients.map((client, j) => (
                      <div 
                        key={`${i}-${j}`} 
                        ref={i === 0 && j === 0 ? firstLogoRef : i === 1 && j === 0 ? secondSetFirstLogoRef : null}
                        className="flex-shrink-0 flex items-center justify-center group/logo"
                      >
                        {client.svgLogo ? (
                          <div className="transition-all duration-300 opacity-70 group-hover/logo:scale-110 group-hover/logo:opacity-100 group-hover/logo:![filter:none] [&>svg]:transition-all [&>svg]:duration-300 hover:[&>svg]:!filter-none">
                            {client.svgLogo}
                          </div>
                        ) : client.imagePath ? (
                          <img
                            draggable={false}
                            src={client.imagePath}
                            alt={client.name}
                            className={`h-7 sm:h-9 md:h-10 w-auto object-contain transition-all duration-300 opacity-80 group-hover/logo:scale-110 group-hover/logo:opacity-100 group-hover/logo:![filter:none] ${client.filterClass || 'brightness-0 invert'}`}
                          />
                        ) : (
                          <div className={`${client.fontStyle} leading-none text-xs sm:text-sm transition-all duration-300 group-hover/logo:scale-110 group-hover/logo:text-accent`}>{client.textLogo}</div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Text at bottom left */}
            <div className="relative z-10 flex items-center gap-2 text-[9px] font-mono tracking-widest text-white/80 uppercase">
              <span>Trusted by <span className="text-white font-bold">50+</span> clients worldwide</span>
            </div>
          </div>

          {/* Right Section: Stats Grid */}
          <div className="col-span-1 lg:col-span-8 xl:col-span-7 grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/50 dark:divide-accent/50 overflow-hidden">
            {/* Stat 1 */}
            <div className="flex flex-col gap-2 md:gap-3 py-4 md:py-6 lg:py-8 px-2.5 sm:px-4 lg:px-5 xl:px-6 justify-start overflow-hidden">
              <div className="flex items-start gap-1.5 text-[9px] sm:text-[10px] lg:text-[10.5px] xl:text-[11px] font-mono font-bold tracking-normal sm:tracking-wider uppercase text-white min-h-[24px] md:min-h-[32px] truncate">
                <span>Total Projects</span>
              </div>
              <CountUpStat end={140} suffix="+" />
              <div className="text-[8px] sm:text-[8.5px] lg:text-[9.5px] xl:text-[10px] font-mono font-semibold tracking-normal sm:tracking-[0.12em] uppercase text-white/90 min-h-[24px] md:min-h-[32px] leading-tight">Completed Projects</div>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col gap-2 md:gap-3 py-4 md:py-6 lg:py-8 px-2.5 sm:px-4 lg:px-5 xl:px-6 justify-start overflow-hidden">
              <div className="flex items-start gap-1.5 text-[9px] sm:text-[10px] lg:text-[10.5px] xl:text-[11px] font-mono font-bold tracking-normal sm:tracking-wider uppercase text-white min-h-[24px] md:min-h-[32px] truncate">
                <span>Total Views</span>
              </div>
              <CountUpStat end={17} suffix="M+" />
              <div className="text-[8px] sm:text-[8.5px] lg:text-[9.5px] xl:text-[10px] font-mono font-semibold tracking-normal sm:tracking-[0.12em] uppercase text-white/90 min-h-[24px] md:min-h-[32px] leading-tight">Across Platforms</div>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col gap-2 md:gap-3 py-4 md:py-6 lg:py-8 px-2.5 sm:px-4 lg:px-5 xl:px-6 justify-start overflow-hidden">
              <div className="flex items-start gap-1.5 text-[9px] sm:text-[10px] lg:text-[10.5px] xl:text-[11px] font-mono font-bold tracking-normal sm:tracking-wider uppercase text-white min-h-[24px] md:min-h-[32px] truncate">
                <span>Hours Delivered</span>
              </div>
              <CountUpStat end={5.1} suffix="K+" decimals={1} />
              <div className="text-[8px] sm:text-[8.5px] lg:text-[9.5px] xl:text-[10px] font-mono font-semibold tracking-normal sm:tracking-[0.12em] uppercase text-white/90 min-h-[24px] md:min-h-[32px] leading-tight">Hours of Work</div>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col gap-2 md:gap-3 py-4 md:py-6 lg:py-8 px-2.5 sm:px-4 lg:px-5 xl:px-6 justify-start overflow-hidden">
              <div className="flex items-start gap-1.5 text-[9px] sm:text-[10px] lg:text-[10.5px] xl:text-[11px] font-mono font-bold tracking-normal sm:tracking-wider uppercase text-white min-h-[24px] md:min-h-[32px] truncate">
                <span>Client Satisfaction</span>
              </div>
              <CountUpStat end={95} suffix="%" />
              <div className="text-[8px] sm:text-[8.5px] lg:text-[9.5px] xl:text-[10px] font-mono font-semibold tracking-normal sm:tracking-[0.12em] uppercase text-white/90 min-h-[24px] md:min-h-[32px] leading-tight">Repeated & Referral Work</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
