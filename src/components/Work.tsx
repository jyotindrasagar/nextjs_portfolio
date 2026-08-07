"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData } from '../data/projects';
import { HoverVideoPlayer } from './HoverVideoPlayer';
import { AnimatedSection } from './AnimatedSection';
import { Clapperboard } from 'lucide-react';

const categoryInfo: Record<string, { title: string; desc: string }> = {
  'SHOWREEL': { title: '2025 SHOWREEL', desc: 'A COMPILATION OF MY BEST DESIGIN, VISUAL EFFECTS AND EDITING WORK.' },
  'ALL': { title: 'ALL WORK', desc: 'A COMPLETE SHOWCASE OF VISUAL STORIES & ANIMATIONS.' },
  'COMMERCIAL': { title: 'COMMERCIAL', desc: 'BRAND CAMPAIGNS & PRODUCT VISUALIZATION.' },
  'DOCUMENTARY': { title: 'DOCUMENTARY', desc: 'RAW NARRATIVES AND REAL-WORLD STORIES.' },
  'SOCIAL': { title: 'SOCIAL STORIES', desc: 'SHORT-FORM STORIES made for social media.' },
  'DEMOS': { title: 'TRIALS & DEMOS', desc: 'EXPERIMENTAL CUTS AND TECHNICAL SHOWCASES.' },
};

export function Work() {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const categories = ['SHOWREEL', 'ALL', 'COMMERCIAL', 'DOCUMENTARY', 'SOCIAL', 'DEMOS'];

  const filteredProjects = activeCategory === 'ALL'
    ? projectsData.filter(p => p.category.toUpperCase() !== 'SOCIAL')
    : projectsData.filter(p => p.category.toUpperCase() === activeCategory);

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (a.pinPosition !== undefined && b.pinPosition !== undefined) {
      return a.pinPosition - b.pinPosition;
    }
    if (a.pinPosition !== undefined) return -1;
    if (b.pinPosition !== undefined) return 1;
    return 0;
  });

  const getEmbedUrl = (url?: string) => {
    if (!url) return '';
    if (url.includes('youtube.com/watch?v=')) {
      return `https://www.youtube.com/embed/${url.split('v=')[1].split('&')[0]}?autoplay=1`;
    }
    if (url.includes('youtu.be/')) {
      return `https://www.youtube.com/embed/${url.split('youtu.be/')[1].split('?')[0]}?autoplay=1`;
    }
    return url;
  };

  const getThumbnailUrl = (project: any) => {
    if (project.videoUrl) {
      if (project.videoUrl.includes('youtube.com/watch?v=')) {
        const id = project.videoUrl.split('v=')[1].split('&')[0];
        return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
      }
      if (project.videoUrl.includes('youtu.be/')) {
        const id = project.videoUrl.split('youtu.be/')[1].split('?')[0];
        return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
      }
      if (project.videoUrl.includes('youtube.com/embed/')) {
        const id = project.videoUrl.split('embed/')[1].split('?')[0];
        return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
      }
    }

    return undefined;
  };

  return (
    <section className="relative pt-0 pb-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 overflow-hidden">
      {/* CAD reference label */}
      <div className="flex items-center gap-2 text-[9px] tracking-[0.25em] font-mono opacity-50 mb-4 uppercase relative z-10">
        <span>âŒ–</span>
        <span>INDEX // SELECTED_WORK</span>
      </div>

      <AnimatedSection>
        <div className="flex flex-col border-b border-foreground/10 pb-8 mb-16 gap-6 relative min-h-[80px]">
          <div>
            <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-foreground uppercase">
              Selected Work
            </h2>
            <p className="text-foreground/50 text-[11px] font-mono uppercase tracking-widest mt-2">
              Selected projects & visual stories
            </p>
          </div>

          {/* Filter categories */}
          <div className="flex flex-wrap gap-3 md:gap-4 font-mono text-[9px] tracking-widest mt-4">
            {categories.map((cat) => {
              if (cat === 'SHOWREEL') {
                return (
                  <motion.button
                    key={cat}
                    aria-label={`Filter by ${cat} category`}
                    onClick={() => setActiveCategory(cat)}
                    animate={
                      activeCategory !== cat
                        ? { boxShadow: ["0px 0px 4px rgba(255,184,198,0.2)", "0px 0px 16px rgba(255,184,198,0.6)", "0px 0px 4px rgba(255,184,198,0.2)"] }
                        : { boxShadow: "0px 0px 20px rgba(255,184,198,0.6)" }
                    }
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className={`px-8 py-2.5 border transition-all duration-300 cursor-pointer tracking-[0.35em] font-bold uppercase rounded-[2px] ${activeCategory === cat
                      ? 'border-accent text-white bg-accent scale-105'
                      : 'border-accent/60 text-accent bg-transparent hover:border-accent hover:text-white hover:bg-accent/20 hover:scale-105'
                      }`}
                  >
                    {cat}
                  </motion.button>
                );
              }

              return (
                <button
                  key={cat}
                  aria-label={`Filter by ${cat} category`}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 border transition-all duration-300 cursor-pointer ${activeCategory === cat
                    ? 'border-white text-white bg-accent font-bold shadow-[0_0_12px_rgba(255,255,255,0.35)] scale-105 dark:bg-accent dark:border-white dark:text-white'
                    : 'border-white/60 text-white/90 bg-accent/90 hover:border-white hover:text-white hover:scale-105 dark:bg-accent/60 dark:border-white/50 dark:text-white/90 dark:hover:bg-accent dark:hover:border-white'
                    }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* Main 2-column layout */}
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
        {/* Left Sidebar */}
        <div className="lg:w-64 lg:shrink-0 lg:sticky lg:top-32 h-fit flex flex-col gap-8 z-40">
          <AnimatedSection>
            <div className="flex flex-col gap-2">
              <h3 className="text-accent font-mono uppercase tracking-widest text-xs font-bold">{activeCategory}</h3>
              <h2 className="text-foreground font-display text-2xl uppercase tracking-tight">{categoryInfo[activeCategory]?.title || activeCategory}</h2>
            </div>

            <div className="w-[1px] h-12 bg-foreground/20 my-2 hidden lg:block"></div>

            <p className="text-foreground/50 font-mono text-[9px] uppercase tracking-widest leading-loose max-w-[250px]">
              {categoryInfo[activeCategory]?.desc || 'SELECTED PROJECTS & VISUAL STORIES.'}
            </p>

            <div className="mt-12 text-[9px] font-mono text-foreground/40 uppercase tracking-widest hidden lg:block">
              SCROLL TO EXPLORE <br /><br /> â†“
            </div>
          </AnimatedSection>
        </div>

        {/* Projects Grid / Showreel */}
        <div className="flex-1 w-full relative z-30">
          {activeCategory === 'SHOWREEL' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.15)] border-2 border-foreground mx-auto mt-4"
            >
              <iframe
                src="https://www.youtube.com/embed/xeoAIGh7EK8?si=YZQL2AmeEVfunRfa&autoplay=1&controls=1&modestbranding=1&rel=0&cc_load_policy=0&iv_load_policy=3"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className="w-full h-full border-0 bg-black"
              />
            </motion.div>
          ) : (
            <div className={`grid gap-4 md:gap-8 pb-8 relative z-30 w-full ${activeCategory === 'SOCIAL' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-[repeat(auto-fill,minmax(280px,1fr))]' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(400px,1fr))]'}`}>
              <AnimatePresence mode="popLayout">
                {sortedProjects.map((project) => (
                  <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    style={{ willChange: "transform, opacity" }}
                    key={project.id}
                    aria-label={`View project: ${project.title}`}
                    role="button"
                    className={`group relative flex flex-col border border-foreground/10 overflow-hidden w-full cursor-pointer bg-background ${activeCategory === 'SOCIAL' ? 'aspect-[9/16]' : 'aspect-video'
                      }`}
                    onClick={() => {
                      if (playingVideoId === project.id) return;
                      setPlayingVideoId(project.id);
                    }}
                  >
                    {playingVideoId === project.id ? (
                      <div className="absolute inset-0 z-50 bg-black flex items-center justify-center">
                        {project.videoUrl?.includes('youtu') ? (
                          <iframe
                            src={getEmbedUrl(project.videoUrl)}
                            allow="autoplay; fullscreen"
                            className="w-full h-full border-0"
                          />
                        ) : (
                          <video
                            src={project.videoUrl}
                            controls
                            autoPlay
                            className="w-full h-full object-contain"
                          />
                        )}
                      </div>
                    ) : (
                      <>
                      {project.videoUrl && (
                        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                          "@context": "https://schema.org",
                          "@type": "VideoObject",
                          "name": project.title,
                          "description": project.description,
                          "thumbnailUrl": getThumbnailUrl(project) || "https://dieablo.com/og-image.png",
                          "uploadDate": "2023-01-01T08:00:00+08:00",
                          "contentUrl": project.videoUrl,
                          "embedUrl": getEmbedUrl(project.videoUrl)
                        }) }} />
                      )}
                      <HoverVideoPlayer
                        imageUrl={getThumbnailUrl(project)}
                        videoUrl={project.videoUrl}
                        altText={project.title}
                        baseOpacity="opacity-100"
                        baseGrayscale="grayscale"
                      >
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>

                        {/* Card Content */}
                        <div className="relative h-full flex flex-col justify-between p-3 z-10">
                          {/* Top Row: Icon */}
                          <div className="flex items-center justify-between text-white/90 drop-shadow-md">
                            <Clapperboard size={14} strokeWidth={2} />
                          </div>

                          {/* Bottom Row: Title and Subtitle */}
                          <div className="flex flex-col items-start justify-end gap-1">
                            <h3 className="font-display font-bold text-sm md:text-base tracking-tight text-white group-hover:text-accent transition-colors uppercase drop-shadow-md">
                              {project.title}
                            </h3>
                            <p className="font-mono text-[8px] uppercase tracking-widest text-accent drop-shadow-md">
                              {project.category}
                            </p>
                          </div>
                        </div>
                      </HoverVideoPlayer>
                      </>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

