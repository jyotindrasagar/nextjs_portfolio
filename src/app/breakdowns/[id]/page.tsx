import { breakdowns } from '@/data/breakdowns';
import { notFound } from 'next/navigation';
import { Calendar, Clock, Tag, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { BreakdownInteraction } from '@/components/BreakdownInteraction';

import { ProfileHeaderButton } from '@/components/ProfileHeaderButton';

export function generateStaticParams() {
  return breakdowns.map((b) => ({
    id: b.id,
  }));
}

export default async function BreakdownPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const breakdown = breakdowns.find((b) => b.id === resolvedParams.id);

  if (!breakdown) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background pt-24 pb-32 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="max-w-5xl mx-auto">
        {/* Top Bar Navigation */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-foreground/10">
          <Link 
            href="/#breakdowns"
            className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-widest uppercase text-foreground/60 hover:text-accent transition-colors group"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Breakdowns
          </Link>
          
          <ProfileHeaderButton />
        </div>

        <article className="flex flex-col gap-10">
          {/* Header Media (Video or Hero Image) */}
          <div className="w-full aspect-video md:aspect-[21/9] shrink-0 bg-black relative overflow-hidden group rounded-xl border border-foreground/15 shadow-2xl">
            {breakdown.headerMedia?.type === 'video' || breakdown.videoUrl ? (
              <video 
                src={breakdown.headerMedia?.url || breakdown.videoUrl} 
                className="w-full h-full object-cover" 
                controls 
                autoPlay 
                playsInline
                loop
                muted
              />
            ) : (
              <img 
                src={breakdown.headerMedia?.url || breakdown.image} 
                alt={breakdown.title}
                className="w-full h-full object-cover"
              />
            )}
            {breakdown.headerMedia?.caption && (
              <div className="absolute bottom-3 left-4 right-4 text-[11px] font-mono text-white/70 bg-black/60 px-3 py-1.5 rounded backdrop-blur-sm pointer-events-none">
                {breakdown.headerMedia.caption}
              </div>
            )}
          </div>

          {/* Main Article Body */}
          <div className="flex flex-col gap-10">
            
            {/* Category & Meta Header */}
            <div className="flex flex-col gap-4 border-b border-foreground/10 pb-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] font-extrabold uppercase px-3 py-1 bg-accent/15 border border-accent/30 text-accent rounded-md">
                  {breakdown.category === 'my-work' ? '❖ MY WORK BREAKDOWN' : '❖ INSPIRED WORK BREAKDOWN'}
                </span>
                
                {breakdown.date && (
                  <span className="font-mono text-xs text-foreground/50 flex items-center gap-1">
                    <Calendar size={12} /> {breakdown.date}
                  </span>
                )}
                {breakdown.readTime && (
                  <span className="font-mono text-xs text-foreground/50 flex items-center gap-1">
                    <Clock size={12} /> {breakdown.readTime}
                  </span>
                )}
              </div>

              <h1 className="font-display font-bold text-3xl md:text-5xl lg:text-6xl tracking-tight text-foreground uppercase leading-tight">
                {breakdown.title}
              </h1>

              <p className="font-mono text-xs md:text-sm tracking-widest text-foreground/60 uppercase max-w-3xl leading-relaxed">
                {breakdown.excerpt}
              </p>

              {/* Tools Used Badges */}
              {breakdown.tools && breakdown.tools.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="font-mono text-[10px] text-foreground/40 uppercase tracking-widest flex items-center gap-1 mr-1">
                    <Tag size={11} /> TOOLS:
                  </span>
                  {breakdown.tools.map((tool, idx) => (
                    <span 
                      key={idx} 
                      className="font-mono text-[10px] md:text-[11px] font-bold tracking-wider text-foreground/80 bg-foreground/5 border border-foreground/10 px-2.5 py-1 rounded"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Main Content Paragraph */}
            <div className="font-sans font-light text-base md:text-lg text-foreground/90 leading-relaxed max-w-4xl whitespace-pre-line border-l-2 border-accent/40 pl-4 md:pl-6 py-1">
              {breakdown.content}
            </div>

            {/* Rich Sections (Inline CDN Images & Videos) */}
            {breakdown.sections && breakdown.sections.length > 0 && (
              <div className="flex flex-col gap-12 mt-4">
                {breakdown.sections.map((section, index) => (
                  <div key={index} className="flex flex-col gap-4 border-t border-foreground/10 pt-8">
                    {section.title && (
                      <h3 className="font-display font-bold text-xl md:text-2xl text-foreground uppercase tracking-wide flex items-center gap-2">
                        <span className="text-accent text-sm font-mono font-normal">[{index + 1}]</span>
                        {section.title}
                      </h3>
                    )}

                    {section.text && (
                      <p className="font-sans font-light text-sm md:text-base text-foreground/80 leading-relaxed max-w-3xl">
                        {section.text}
                      </p>
                    )}

                    {/* Inline CDN Media Embed */}
                    {section.media && (
                      <div className="my-4 flex flex-col gap-2">
                        <div className="w-full overflow-hidden rounded-lg border border-foreground/15 bg-black/60 shadow-xl relative group">
                          {section.media.type === 'video' ? (
                            <video 
                              src={section.media.url} 
                              className="w-full max-h-[500px] object-cover" 
                              controls 
                              playsInline 
                              loop 
                              muted 
                            />
                          ) : (
                            <img 
                              src={section.media.url} 
                              alt={section.media.caption || section.title || 'Breakdown detail'} 
                              className="w-full max-h-[500px] object-cover hover:scale-[1.01] transition-transform duration-500" 
                            />
                          )}
                        </div>
                        {section.media.caption && (
                          <span className="font-mono text-[11px] text-foreground/50 tracking-wider uppercase text-center md:text-left">
                            ▲ {section.media.caption}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </article>

        {/* Interaction Block */}
        <BreakdownInteraction breakdownId={breakdown.id} />

      </div>
    </main>
  );
}
