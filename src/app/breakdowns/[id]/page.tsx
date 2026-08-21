import { notFound } from 'next/navigation';
import { Calendar, Clock, Tag, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { BreakdownInteraction } from '@/components/BreakdownInteraction';
import { ProfileHeaderButton } from '@/components/ProfileHeaderButton';
import { createClient } from '@/utils/supabase/server';
import { createPublicClient } from '@/utils/supabase/public';
import { cookies } from 'next/headers';

export async function generateStaticParams() {
  try {
    const supabase = createPublicClient();
    const { data: blogs } = await supabase.from('blogs').select('id, slug');
    if (!blogs) return [];
    
    const paramsList: { id: string }[] = [];
    blogs.forEach((b) => {
      if (b.slug) paramsList.push({ id: b.slug });
      if (b.id) paramsList.push({ id: b.id });
    });
    return paramsList;
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const supabase = createPublicClient();
  const { data: breakdown } = await supabase
    .from('blogs')
    .select('*')
    .or(`id.eq.${resolvedParams.id},slug.eq.${resolvedParams.id}`)
    .single();

  if (!breakdown) {
    return {
      title: 'Breakdown Not Found | DieabloFX',
      robots: { index: false, follow: false },
    };
  }

  const title = `${breakdown.title} | Case Study & Breakdown | DieabloFX`;
  const description = breakdown.excerpt || `Read the in-depth visual effects and motion design breakdown for ${breakdown.title} by Dieablo (DieabloFX).`;
  const canonicalUrl = `https://dieablo.com/breakdowns/${breakdown.slug || resolvedParams.id}`;
  const ogImage = breakdown.thumbnail_url || 'https://dieablo.com/opengraph-image.jpg';

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'article',
      publishedTime: breakdown.created_at,
      modifiedTime: breakdown.updated_at || breakdown.created_at,
      authors: ['https://dieablo.com'],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: breakdown.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: '@dieablofx',
    },
  };
}

export default async function BreakdownPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: breakdown } = await supabase
    .from('blogs')
    .select('*')
    .or(`id.eq.${resolvedParams.id},slug.eq.${resolvedParams.id}`)
    .single();

  if (!breakdown) {
    notFound();
  }

  // Parse sections
  let sections: any[] = [];
  try {
    sections = typeof breakdown.content === 'string' ? JSON.parse(breakdown.content) : breakdown.content;
    if (!Array.isArray(sections)) sections = [];
  } catch (e) {
    sections = [];
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `https://dieablo.com/breakdowns/${breakdown.slug || resolvedParams.id}#article`,
    "headline": breakdown.title,
    "description": breakdown.excerpt || breakdown.title,
    "image": breakdown.thumbnail_url || "https://dieablo.com/opengraph-image.jpg",
    "datePublished": breakdown.created_at,
    "dateModified": breakdown.updated_at || breakdown.created_at,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://dieablo.com/breakdowns/${breakdown.slug || resolvedParams.id}`
    },
    "author": {
      "@id": "https://dieablo.com/#person"
    },
    "publisher": {
      "@id": "https://dieablo.com/#brand"
    },
    "isPartOf": {
      "@id": "https://dieablo.com/#website"
    },
    "about": {
      "@id": "https://dieablo.com/#brand"
    }
  };

  return (
    <main className="min-h-screen bg-background pt-24 pb-32 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div className="max-w-5xl mx-auto">
        {/* Top Bar Navigation */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-foreground/10">
          <Link 
            href="/blogs"
            className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-widest uppercase text-foreground/60 hover:text-accent transition-colors group"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Blogs
          </Link>
          <div className="flex items-center gap-4">
            <Link 
              href="/blogs"
              className="font-mono text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-accent hover:text-white transition-colors hidden sm:flex items-center gap-2 bg-accent/10 hover:bg-accent border border-accent/20 px-4 py-1.5 rounded group"
            >
              <span>Full Blogs Section</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <ProfileHeaderButton />
          </div>
        </div>

        <article className="flex flex-col gap-10">
          {/* Header Media (CDN Video or Image) */}
          {(breakdown.thumbnail_url || breakdown.video_url) && (
            <div className="w-full aspect-video md:aspect-[21/9] shrink-0 bg-black relative overflow-hidden group rounded-xl border border-foreground/15 shadow-2xl">
              {breakdown.video_url ? (
                <video 
                  src={breakdown.video_url} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <img 
                  src={breakdown.thumbnail_url} 
                  alt={breakdown.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          )}

          {/* Main Article Body */}
          <div className="flex flex-col gap-10">
            
            {/* Category & Meta Header */}
            <div className="flex flex-col gap-4 border-b border-foreground/10 pb-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] font-extrabold uppercase px-3 py-1 bg-accent/15 border border-accent/30 text-accent rounded-md">
                  {breakdown.category === 'my-work' ? '❖ MY WORK' : '❖ INSPIRATION'}
                </span>
                
                {breakdown.created_at && (
                  <span className="font-mono text-xs text-foreground/50 flex items-center gap-1">
                    <Calendar size={12} /> {new Date(breakdown.created_at).toLocaleDateString()}
                  </span>
                )}
                {breakdown.read_time && (
                  <span className="font-mono text-xs text-foreground/50 flex items-center gap-1">
                    <Clock size={12} /> {breakdown.read_time}
                  </span>
                )}
              </div>

              <h1 className="font-display font-bold text-3xl md:text-5xl lg:text-6xl tracking-tight text-foreground uppercase leading-tight">
                {breakdown.title}
              </h1>

              <p className="font-mono text-xs md:text-sm tracking-widest text-foreground/60 uppercase max-w-3xl leading-relaxed">
                {breakdown.excerpt}
              </p>

              {/* Tags Badges */}
              {breakdown.tags && breakdown.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="font-mono text-[10px] text-foreground/40 uppercase tracking-widest flex items-center gap-1 mr-1">
                    <Tag size={11} /> TAGS:
                  </span>
                  {breakdown.tags.map((tag: string, idx: number) => (
                    <span 
                      key={idx} 
                      className="font-mono text-[10px] md:text-[11px] font-bold tracking-wider text-foreground/80 bg-foreground/5 border border-foreground/10 px-2.5 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Dynamic Blog Sections from DB */}
            {sections && sections.length > 0 && (
              <div className="flex flex-col gap-10 mt-4">
                {sections.map((section: any, index: number) => (
                  <div key={index} className="flex flex-col gap-4">
                    {section.type === 'text' && section.content && (
                      <div 
                        className="font-sans font-light text-base md:text-lg text-foreground/90 leading-relaxed max-w-4xl"
                        dangerouslySetInnerHTML={{ __html: section.content }}
                      />
                    )}

                    {section.type === 'image' && section.url && (
                      <div className="my-4 w-full overflow-hidden rounded-lg border border-foreground/15 shadow-xl bg-black/60">
                        <img 
                          src={section.url} 
                          alt="Blog media"
                          className="w-full h-auto object-contain hover:scale-[1.01] transition-transform duration-500 max-h-[80vh]" 
                        />
                      </div>
                    )}

                    {section.type === 'youtube' && section.url && (
                      <div className="my-4 w-full aspect-video rounded-lg border border-foreground/15 shadow-xl bg-black overflow-hidden">
                        <iframe 
                          src={section.url} 
                          title="YouTube video player" 
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen
                          className="w-full h-full"
                        ></iframe>
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
