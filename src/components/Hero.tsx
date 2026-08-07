"use client";
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

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
            <div className="flex items-center gap-3 text-[8px] md:text-[9px] tracking-[0.25em] font-mono opacity-50 mb-4 md:mb-6 uppercase">
              <span className="text-accent">+</span>
              <span>Creative Direction</span>
            </div>

            <h1 className="sr-only">DieabloFX | Creative Director, Motion Designer & VFX Artist</h1>
            <div aria-hidden="true" className="flex items-center gap-0 mb-6 text-6xl md:text-8xl lg:text-[8rem] xl:text-[6.5rem] 2xl:text-[8rem]">
              <motion.img 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                src={logoUrl} 
                alt="DieabloFX Logo" 
                className="h-[0.72em] w-auto object-contain logo-image scale-125" 
              />
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="font-display font-bold tracking-tight -ml-[0.025em] text-foreground leading-none"
              >
                IEABLO
              </motion.div>
            </div>

            <div className="font-display font-light text-[10px] md:text-[12px] tracking-[0.35em] text-foreground/80 uppercase flex flex-col gap-2 mb-4 md:mb-6">
              <span>Visual Storytelling</span>
              <span>Through Editing & Design</span>
            </div>

            <div className="w-10 h-[1px] bg-accent mb-6 md:mb-8"></div>

            <p className="text-[9px] md:text-[11px] font-mono tracking-[0.2em] leading-[2.2] text-foreground/60 uppercase max-w-sm mb-8 md:mb-12">
              I direct ideas, craft stories,<br />
              and deliver visuals that leave<br />
              a lasting impact.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 relative z-20 xl:mb-0 xl:mt-auto">
            <button 
              aria-label="View All Work"
              onClick={() => scrollToSection('work')}
              className="bg-accent text-white px-5 py-3 md:px-6 md:py-4 xl:px-5 xl:py-3 text-[9px] md:text-[10px] xl:text-[9px] font-mono font-bold uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-between gap-6 md:gap-12 xl:gap-8 group sm:min-w-[180px] md:min-w-[220px] xl:min-w-[180px] hover:bg-accent/90"
            >
              <span>View All Work</span>
              <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 text-sm leading-none font-light">↗</span>
            </button>
            
            <button 
              aria-label="Contact Me"
              onClick={() => scrollToSection('contact')}
              className="bg-transparent border border-foreground text-foreground px-5 py-3 md:px-6 md:py-4 xl:px-5 xl:py-3 text-[9px] md:text-[10px] xl:text-[9px] font-mono font-bold uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-between gap-6 md:gap-12 xl:gap-8 group sm:min-w-[180px] md:min-w-[220px] xl:min-w-[180px] hover:bg-foreground/10"
            >
              <span>Contact Me</span>
              <span className="text-[14px] opacity-70 leading-none">≡</span>
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
                    loadDelay={500}
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
                    loadDelay={1000}
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
                  loadDelay={1500}
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
                  loadDelay={2000}
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
          className="grid grid-cols-1 lg:grid-cols-12 border-t border-b border-white/50 dark:border-accent/50 divide-y lg:divide-y-0 lg:divide-x divide-white/50 dark:divide-accent/50 px-6 md:px-8 lg:px-12 xl:px-16 bg-[#ea879c] dark:bg-black text-white relative overflow-hidden"
        >
          
          {/* Left Section: Clients */}
          <div className="col-span-1 lg:col-span-5 relative min-h-[140px] flex items-end pb-4 lg:pb-6 pr-8">
            {/* Carousel spanning all over */}
            <div 
              className="absolute inset-0 w-full h-full overflow-hidden flex items-center opacity-100"
              style={{ maskImage: 'linear-gradient(to right, transparent, black 40px, black calc(100% - 40px), transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 40px, black calc(100% - 40px), transparent)' }}
            >
              <motion.div 
                className="flex items-center min-w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 415, repeat: Infinity, ease: "linear" }}
              >
                {/* Repeat logos twice for seamless infinite scroll */}
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex gap-12 sm:gap-16 lg:gap-24 items-center pr-12 sm:pr-16 lg:pr-24">
                    {displayClients.map((client, j) => (
                      <div key={`${i}-${j}`} className="flex-shrink-0 flex items-center justify-center">
                        {client.imagePath ? (
                          <img 
                            src={client.imagePath} 
                            alt={client.name} 
                            className="h-8 sm:h-11 md:h-12 w-auto object-contain brightness-0 invert" 
                          />
                        ) : client.svgLogo ? (
                          client.svgLogo
                        ) : (
                          <div className={`${client.fontStyle} leading-none`}>{client.textLogo}</div>
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
          <div className="col-span-1 lg:col-span-7 grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/50 dark:divide-accent/50">
            {/* Stat 1 */}
            <div className="flex flex-col gap-3 py-6 lg:py-8 pl-0 md:pl-6 lg:pl-8 pr-4 justify-start">
              <div className="flex items-start gap-2 text-[8px] font-mono tracking-widest uppercase text-white/80 min-h-[24px] md:min-h-[32px]">
                <span>Total Projects</span>
              </div>
              <CountUpStat end={140} suffix="+" />
              <div className="text-[7px] font-mono tracking-[0.2em] uppercase text-white/70 min-h-[24px] md:min-h-[32px]">Completed Projects</div>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col gap-3 py-6 lg:py-8 px-4 lg:px-8 justify-start">
              <div className="flex items-start gap-2 text-[8px] font-mono tracking-widest uppercase text-white/80 min-h-[24px] md:min-h-[32px]">
                <span>Total Views</span>
              </div>
              <CountUpStat end={17} suffix="M+" />
              <div className="text-[7px] font-mono tracking-[0.2em] uppercase text-white/70 min-h-[24px] md:min-h-[32px]">Across Platforms</div>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col gap-3 py-6 lg:py-8 px-4 lg:px-8 justify-start">
              <div className="flex items-start gap-2 text-[8px] font-mono tracking-widest uppercase text-white/80 min-h-[24px] md:min-h-[32px]">
                <span>Hours Delivered</span>
              </div>
              <CountUpStat end={5.1} suffix="K+" decimals={1} />
              <div className="text-[7px] font-mono tracking-[0.2em] uppercase text-white/70 min-h-[24px] md:min-h-[32px]">Hours of Work</div>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col gap-3 py-6 lg:py-8 px-4 lg:px-8 justify-start">
              <div className="flex items-start gap-2 text-[8px] font-mono tracking-widest uppercase text-white/80 min-h-[24px] md:min-h-[32px]">
                <span>Client Satisfaction</span>
              </div>
              <CountUpStat end={95} suffix="%" />
              <div className="text-[7px] font-mono tracking-[0.2em] uppercase text-white/70 min-h-[24px] md:min-h-[32px]">Repeated & Referral Work</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
