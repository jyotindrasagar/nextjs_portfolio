"use client";
import { AnimatedSection } from './AnimatedSection';

export function About() {
  return (
    <section id="about" className="relative pt-16 pb-24 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 border-t border-foreground/10 z-20 overflow-hidden">
      {/* Top Border constrained by padding */}
      <div className="absolute top-0 left-4 md:left-8 lg:left-12 xl:left-16 right-4 md:right-8 lg:right-12 xl:right-16 h-[1px] bg-foreground/10"></div>
      
      {/* Dust Particles Removed for Performance */}

      {/* CAD reference label */}
      <div className="flex items-center gap-2 text-[9px] tracking-[0.25em] font-mono opacity-50 mb-4 uppercase">
        <span>âŒ–</span>
        <span>SYS.ABOUT // PHILOSOPHY</span>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
        {/* Left narrative content */}
        <AnimatedSection className="flex-1 max-w-2xl z-10">
          <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight text-foreground uppercase mb-8">
            Visual Storytelling<br />
            My Way
          </h2>
          
          <div className="space-y-6 text-foreground/80 font-light text-sm md:text-base leading-relaxed">
            <p>
              I approach cinematic editing and motion design not merely as decoration, but as architectural construction. Every frame must support the narrative, every transition must carry the weight of spatial logic, and every color grade must structure emotional depth.
            </p>
            <p>
              Under the moniker <strong className="font-semibold text-foreground">DieabloFX</strong>, I partner with forward-thinking brands, musicians, and directors to build high-end editorial experiences. Whether directing an abstract sequence or compiling a raw documentary narrative, the focus remains on visual excellence and structural integrity.
            </p>
            <p>
              With over a decade of experience across commercial campaigns, music videos, and title sequences, my work lives at the intersection of classical storytelling and modern design technology.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-12 pt-8 border-t border-foreground/5 font-mono text-[10px] uppercase tracking-widest text-foreground/60">
            <div>
              <h4 className="text-accent mb-2">// CORE CAPABILITIES</h4>
              <ul className="space-y-1">
                <li>Creative Direction</li>
                <li>Motion & Stage Graphics</li>
                <li>3D & 2D Animation</li>
                <li>Track & Simulation</li>
                <li>Ads and Promotional Marketing</li>
                <li>Music Videos</li>
              </ul>
            </div>
            <div>
              <h4 className="text-accent mb-2">// ENGINE SETUP</h4>
              <ul className="space-y-3">
                <li className="flex items-center justify-between">
                  <span>AFTER EFFECTS / AE</span>
                  <img src="https://pub-5581a6a5aba4445fb20fc89eb69162c2.r2.dev/AfterEffects.svg" className="w-5 h-5 object-contain" alt="After Effects" />
                </li>
                <li className="flex items-center justify-between">
                  <span>PREMIERE PRO / DAVINCI</span>
                  <div className="flex gap-2">
                    <img src="https://pub-5581a6a5aba4445fb20fc89eb69162c2.r2.dev/Premiere_Pro.svg" className="w-5 h-5 object-contain" alt="Premiere Pro" />
                    <img src="https://pub-5581a6a5aba4445fb20fc89eb69162c2.r2.dev/DaVinci_Resolve_Studio.png" className="w-5 h-5 object-contain" alt="DaVinci Resolve" />
                  </div>
                </li>
                <li className="flex items-center justify-between">
                  <span>BLENDER / UNREAL ENGINE</span>
                  <div className="flex gap-2">
                    <img src="https://cdn.simpleicons.org/blender/ea7600" className="w-5 h-5" alt="Blender" />
                    <img src="https://cdn.simpleicons.org/unrealengine/white" className="w-5 h-5 opacity-80" alt="Unreal" />
                  </div>
                </li>
                <li className="flex items-center justify-between">
                  <span>SYNTHEYES & MOCHA PRO</span>
                  <div className="flex gap-2">
                    <img src="/syntheyes.png" className="w-5 h-5 object-cover rounded-sm" alt="Syntheyes" />
                    <img src="/mochapro.jpg" className="w-5 h-5 object-cover rounded-sm" alt="Mocha Pro" />
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

          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" 
            alt="Dieablo Studio Portrait" 
            loading="lazy"
            className="w-full h-full object-cover opacity-80 dark:opacity-75 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700 rounded-sm"
          />
        </div>
      </div>
    </section>
  );
}

