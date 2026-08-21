import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, Award, ShieldAlert, Scale, CheckCircle2, ArrowLeft, Mail } from 'lucide-react';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: "Terms & Conditions | DieabloFX",
  description: "Official Terms and Conditions of Service for DieabloFX creative studio, video editing, VFX commissions, and digital media.",
  alternates: {
    canonical: "https://dieablo.com/terms",
  },
};

export default function TermsAndConditionsPage() {
  const lastUpdated = "August 22, 2026";

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-accent selection:text-white">
      {/* Background ambient glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-1/3 w-[450px] h-[450px] bg-accent/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-10 w-[350px] h-[350px] bg-foreground/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ea879c_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.04]" />
      </div>

      {/* Top Header */}
      <header className="relative z-10 w-full px-6 md:px-12 py-6 flex items-center justify-between border-b border-foreground/10 bg-background/80 backdrop-blur-md sticky top-0">
        <Link href="/" className="flex items-center gap-2 group">
          <img
            src="/dieablofx.svg"
            alt="DieabloFX"
            className="h-5 w-auto logo-image invert dark:invert-0 group-hover:scale-105 transition-transform"
          />
          <span className="font-display font-bold text-xs uppercase tracking-[0.2em]">
            Dieablo<span className="text-accent">FX</span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-foreground/60 hover:text-accent transition-colors"
          >
            <ArrowLeft size={12} /> Return Home
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-12 py-12 md:py-20 flex-1">
        {/* Title Header */}
        <div className="mb-12 border-b border-foreground/10 pb-8">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-3">
            <FileText size={14} /> Studio Legal Agreements
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-wider text-foreground">
            Terms <span className="text-accent">&</span> Conditions
          </h1>
          <p className="font-mono text-xs text-foreground/50 tracking-wider uppercase mt-2">
            Last Updated: {lastUpdated} // Applicable to All Visitors & Clients
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Quick Table of Contents */}
          <aside className="lg:col-span-1 hidden lg:block">
            <div className="sticky top-28 space-y-2 font-mono text-xs">
              <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest block mb-3">
                Index Navigation
              </span>
              <a href="#acceptance" className="block text-foreground/70 hover:text-accent transition-colors py-1">1. Acceptance of Terms</a>
              <a href="#ip" className="block text-foreground/70 hover:text-accent transition-colors py-1">2. Intellectual Property</a>
              <a href="#commissions" className="block text-foreground/70 hover:text-accent transition-colors py-1">3. Creative Services & Commissions</a>
              <a href="#revisions" className="block text-foreground/70 hover:text-accent transition-colors py-1">4. Deliverables & Revisions</a>
              <a href="#community" className="block text-foreground/70 hover:text-accent transition-colors py-1">5. Community & Comments</a>
              <a href="#liability" className="block text-foreground/70 hover:text-accent transition-colors py-1">6. Limitation of Liability</a>
              <a href="#governing" className="block text-foreground/70 hover:text-accent transition-colors py-1">7. Governing Law</a>
              <a href="#contact" className="block text-foreground/70 hover:text-accent transition-colors py-1">8. Support & Inquiries</a>
            </div>
          </aside>

          {/* Legal Text */}
          <article className="lg:col-span-3 space-y-12 text-foreground/80 font-sans text-sm md:text-base leading-relaxed">

            <section id="acceptance" className="space-y-4">
              <h2 className="font-display font-bold text-xl uppercase tracking-wide text-foreground flex items-center gap-2">
                <span className="font-mono text-xs text-accent">01.</span> Acceptance of Terms
              </h2>
              <p>
                By accessing or using the website at <a href="https://dieablo.com" className="text-accent underline">dieablo.com</a>, engaging our video editing or motion design services, or interacting with our digital breakdown case studies, you agree to be bound by these Terms and Conditions and our Privacy Policy.
              </p>
              <p>
                If you do not agree to these terms in their entirety, you must discontinue your use of this website and our related digital properties.
              </p>
            </section>

            <section id="ip" className="space-y-4">
              <h2 className="font-display font-bold text-xl uppercase tracking-wide text-foreground flex items-center gap-2">
                <span className="font-mono text-xs text-accent">02.</span> Intellectual Property Rights
              </h2>
              <p>
                All content published on this website—including showreels, video edits, 3D animations, custom shaders, motion graphics breakdowns, website source code, visual branding, and trademarks—is the exclusive intellectual property of Jyotindra Narayan Kalyani ("Dieablo") unless explicitly attributed to a third-party client.
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2 text-foreground/75">
                <li>You may not redistribute, duplicate, mirror, or repackage our video breakdowns or creative assets for commercial sale without express written authorization.</li>
                <li>You may share public links to our portfolio, videos, or articles provided clear credit to <strong>DieabloFX</strong> is maintained.</li>
              </ul>
            </section>

            <section id="commissions" className="space-y-4">
              <h2 className="font-display font-bold text-xl uppercase tracking-wide text-foreground flex items-center gap-2">
                <span className="font-mono text-xs text-accent">03.</span> Creative Services & Client Commissions
              </h2>
              <p>
                When commissioning DieabloFX for motion design, VFX compositing, commercial video editing, or 3D visual production:
              </p>
              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-lg bg-foreground/5 border border-foreground/10">
                  <span className="font-mono text-xs font-bold uppercase text-accent block mb-1">Scope & Master Services Agreement (MSA)</span>
                  <p className="text-xs text-foreground/70">Specific deliverables, milestones, and payment terms will be governed by an individualized Statement of Work (SOW) or invoice agreed upon prior to project initiation.</p>
                </div>
                <div className="p-4 rounded-lg bg-foreground/5 border border-foreground/10">
                  <span className="font-mono text-xs font-bold uppercase text-accent block mb-1">Client Materials & Licensing</span>
                  <p className="text-xs text-foreground/70">Clients warrant that all footage, audio, brand assets, and scripts provided have adequate licenses. DieabloFX assumes no liability for copyright infringements arising from client-supplied assets.</p>
                </div>
              </div>
            </section>

            <section id="revisions" className="space-y-4">
              <h2 className="font-display font-bold text-xl uppercase tracking-wide text-foreground flex items-center gap-2">
                <span className="font-mono text-xs text-accent">04.</span> Deliverables & Revisions
              </h2>
              <p>
                Standard project scopes include defined revision rounds specified in the project proposal. Significant modifications outside the approved creative direction or storyboard will be quoted as additional scope.
              </p>
              <p>
                Final project render files and high-bitrate deliverables will be provided via secure cloud transfer upon settlement of milestone invoices.
              </p>
            </section>

            <section id="community" className="space-y-4">
              <h2 className="font-display font-bold text-xl uppercase tracking-wide text-foreground flex items-center gap-2">
                <span className="font-mono text-xs text-accent">05.</span> Community Guidelines & User Conduct
              </h2>
              <p>
                Users utilizing our feedback, comments, or authenticated portal must maintain professional and respectful communication. We reserve the right to remove any comments containing hate speech, harassment, spam, unauthorized promotional links, or malicious code.
              </p>
            </section>

            <section id="liability" className="space-y-4">
              <h2 className="font-display font-bold text-xl uppercase tracking-wide text-foreground flex items-center gap-2">
                <span className="font-mono text-xs text-accent">06.</span> Limitation of Liability
              </h2>
              <p>
                To the maximum extent permitted by applicable law, DieabloFX shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or inability to access the website or services.
              </p>
            </section>

            <section id="governing" className="space-y-4">
              <h2 className="font-display font-bold text-xl uppercase tracking-wide text-foreground flex items-center gap-2">
                <span className="font-mono text-xs text-accent">07.</span> Governing Law
              </h2>
              <p>
                These terms shall be governed by and construed in accordance with the laws applicable to international digital media service agreements, without regard to conflict of law principles.
              </p>
            </section>

            <section id="contact" className="space-y-4 pt-6 border-t border-foreground/10">
              <h2 className="font-display font-bold text-xl uppercase tracking-wide text-foreground flex items-center gap-2">
                <span className="font-mono text-xs text-accent">08.</span> Inquiries & Legal Notice
              </h2>
              <p>
                For questions regarding these Terms or to request commercial licensing for existing assets:
              </p>
              <div className="p-4 rounded-xl bg-panels border border-foreground/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
                <div>
                  <span className="text-foreground/50 block text-[10px] uppercase tracking-wider">Official Legal Point of Contact</span>
                  <span className="font-bold text-foreground">Jyotindra Narayan Kalyani (DieabloFX)</span>
                </div>
                <a
                  href="mailto:hello@dieablo.com"
                  className="bg-accent text-black font-bold px-4 py-2 rounded uppercase tracking-wider hover:brightness-110 transition-all flex items-center gap-1.5"
                >
                  <Mail size={13} /> hello@dieablo.com
                </a>
              </div>
            </section>

          </article>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
