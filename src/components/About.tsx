"use client";
import { AnimatedSection } from './AnimatedSection';

export function About() {
  return (
    <section id="about" className="relative pt-16 pb-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 z-20 border-t border-foreground/10 overflow-hidden">

      {/* Dust Particles Removed for Performance */}

      {/* CAD reference label */}
      <div className="flex items-center gap-2.5 text-[13px] md:text-[15px] tracking-[0.25em] font-mono font-extrabold text-foreground/90 mb-4 md:mb-6 uppercase">
        <span className="text-accent">❖</span>
        <span>SYS.ABOUT // PHILOSOPHY</span>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
        {/* Left narrative content */}
        <AnimatedSection className="flex-1 max-w-2xl z-10">
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight text-foreground uppercase mb-8">
            Visual Storytelling,<br />
            My Way
          </h2>

          <div className="space-y-6 text-foreground/80 font-light text-sm md:text-base leading-relaxed">
            <p>
              Hi 🫡
            </p>
            <p> I'm Dieablo, a 23 year old Video Editor and a Motion Designer working under the Creative identity <strong className="font-semibold text-foreground">DieabloFX</strong>,
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-12 pt-8 border-t border-foreground/15 text-foreground/80 font-light text-sm md:text-base leading-relaxed">
            <div>
              <h4 className="text-accent font-mono font-bold mb-5 text-[11px] md:text-[13px] tracking-[0.2em] uppercase">// CORE CAPABILITIES</h4>
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
              <h4 className="text-accent font-mono font-bold mb-5 text-[11px] md:text-[13px] tracking-[0.2em] uppercase">// ENGINE SETUP</h4>
              <ul className="space-y-3.5">
                <li className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/40 group-hover:bg-accent transition-colors shrink-0"></span>
                    <span className="group-hover:text-foreground transition-colors">After Effects / AE</span>
                  </div>
                  <img src="https://pub-5581a6a5aba4445fb20fc89eb69162c2.r2.dev/AfterEffects.svg" className="w-[18px] h-[18px] object-contain opacity-80 group-hover:opacity-100 transition-opacity" alt="After Effects" loading="lazy" />
                </li>
                <li className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/40 group-hover:bg-accent transition-colors shrink-0"></span>
                    <span className="group-hover:text-foreground transition-colors">Premiere Pro / DaVinci</span>
                  </div>
                  <div className="flex gap-2">
                    <img src="https://pub-5581a6a5aba4445fb20fc89eb69162c2.r2.dev/Premiere_Pro.svg" className="w-[18px] h-[18px] object-contain opacity-80 group-hover:opacity-100 transition-opacity" alt="Premiere Pro" loading="lazy" />
                    <img src="https://pub-5581a6a5aba4445fb20fc89eb69162c2.r2.dev/DaVinci_Resolve_Studio.png" className="w-[18px] h-[18px] object-contain opacity-80 group-hover:opacity-100 transition-opacity" alt="DaVinci Resolve" loading="lazy" />
                  </div>
                </li>
                <li className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/40 group-hover:bg-accent transition-colors shrink-0"></span>
                    <span className="group-hover:text-foreground transition-colors">Blender / Unreal Engine</span>
                  </div>
                  <div className="flex gap-2">
                    <img src="https://cdn.simpleicons.org/blender/ea7600" className="w-[18px] h-[18px] opacity-80 group-hover:opacity-100 transition-opacity" alt="Blender" loading="lazy" />
                    <img src="https://cdn.simpleicons.org/unrealengine" className="w-[18px] h-[18px] opacity-60 dark:invert group-hover:opacity-100 transition-opacity" alt="Unreal" loading="lazy" />
                  </div>
                </li>
                <li className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/40 group-hover:bg-accent transition-colors shrink-0"></span>
                    <span className="group-hover:text-foreground transition-colors">SynthEyes & Mocha Pro</span>
                  </div>
                  <div className="flex gap-2">
                    <img src="/syntheyes.png" className="w-[18px] h-[18px] object-cover rounded-[2px] opacity-80 group-hover:opacity-100 transition-opacity" alt="Syntheyes" loading="lazy" />
                    <img src="/mochapro.jpg" className="w-[18px] h-[18px] object-cover rounded-[2px] opacity-80 group-hover:opacity-100 transition-opacity" alt="Mocha Pro" loading="lazy" />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </AnimatedSection>

        {/* Right Portrait/Conceptual Image Block */}
        <div className="flex-1 relative w-full max-w-md lg:max-w-lg aspect-[4/5] bg-panels border border-foreground/10 p-4 select-none z-30">
          {/* Internal CAD frame */}
          <div className="absolute inset-0 pointer-events-none border border-foreground/10 opacity-30 m-6 flex flex-col justify-between p-2">
            <div className="flex justify-between font-mono text-[7px] text-foreground">
              <span>REG_08_PORTRAIT</span>
              <span>A: 4:5</span>
            </div>
            <div className="flex justify-between font-mono text-[7px] text-foreground">
              <span>LOC // 34.0522Â° N, 118.2437Â° W</span>
              <span>SCALE // 1.0</span>
            </div>
          </div>

          <video
            src="https://pub-5581a6a5aba4445fb20fc89eb69162c2.r2.dev/about%20me.webm"
            title="Dieablo Studio Portrait"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
        </div>
      </div >
    </section >
  );
}
