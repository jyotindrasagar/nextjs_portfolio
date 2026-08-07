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

      <div className="flex flex-col items-center justify-center p-12 md:p-24 border border-foreground/5 bg-panels/15 relative z-30 text-center">
        {/* Visual technical ticks */}
        <div className="absolute top-0 left-6 w-[1px] h-3 bg-accent opacity-50"></div>
        <div className="absolute bottom-0 right-6 w-[1px] h-3 bg-accent opacity-50"></div>
        
        <h3 className="font-mono text-sm md:text-base tracking-[0.2em] text-accent uppercase mb-4 font-bold">
          Update in Progress
        </h3>
        <p className="font-sans font-light text-sm md:text-base leading-relaxed text-foreground/70 max-w-lg">
          The feedback page is currently undergoing updates. Please check back in a few days to view client testimonials and collaborator feedback.
        </p>
      </div>
    </section>
  );
}
