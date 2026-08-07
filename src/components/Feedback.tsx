"use client";
interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  project: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "An incredible eye for motion pacing and layout. He turned our raw architectural concepts into a poetic, cinematic commercial journey.",
    author: "Elena Rostova",
    role: "Global Creative Lead",
    company: "LEXUS MOTOR CO.",
    project: "Project 'Nightrun'"
  },
  {
    quote: "The title sequence crafted by Dieablo set a new aesthetic standard for our series. Crisp, typographic, and deeply atmospheric.",
    author: "Marcus Vance",
    role: "Executive Director",
    company: "HBO MEDIA",
    project: "Project 'Chronos'"
  },
  {
    quote: "A master of pacing. The documentary narrative was sculpted with incredible sensitivity, restraint, and structural patience.",
    author: "Sarah Jenkins",
    role: "Lead Producer",
    company: "INDIE DOCUMENTARIES",
    project: "Project 'Echoes of Silence'"
  }
];

import { AnimatedSection } from './AnimatedSection';

export function Feedback() {
  return (
    <section 
      className="relative pt-16 pb-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16"
    >
      {/* Top Border constrained by padding */}
      <div className="absolute top-0 left-4 md:left-8 lg:left-12 xl:left-16 right-4 md:right-8 lg:right-12 xl:right-16 h-[1px] bg-foreground/10"></div>
      
      <AnimatedSection>
        {/* CAD reference label */}
        <div className="flex items-center gap-2 text-[9px] tracking-[0.25em] font-mono opacity-50 mb-4 uppercase">
          <span>âŒ–</span>
          <span>SYS.FEEDBACK // TESTIMONIALS</span>
        </div>

        <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-foreground uppercase mb-16">
          Collaborator Feedback
        </h2>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-30">
        {testimonials.map((t, idx) => (
          <div 
            key={idx} 
            className="flex flex-col justify-between p-8 border border-foreground/5 bg-panels/15 hover:bg-panels/30 hover:border-foreground/15 transition-all duration-300 relative group"
          >
            {/* Visual technical ticks */}
            <div className="absolute top-0 left-6 w-[1px] h-3 bg-accent opacity-50"></div>
            
            <div className="flex-1">
              <p className="font-sans font-light text-sm md:text-base leading-relaxed text-foreground/80 mb-8 italic">
                "{t.quote}"
              </p>
            </div>

            <div className="border-t border-foreground/10 pt-4 font-mono text-[9px] uppercase tracking-widest text-foreground/60">
              <div className="font-bold text-foreground mb-1">{t.author}</div>
              <div className="opacity-70">{t.role}</div>
              <div className="opacity-70 text-accent">{t.company}</div>
              <div className="mt-2 text-[8px] opacity-40">{t.project}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

