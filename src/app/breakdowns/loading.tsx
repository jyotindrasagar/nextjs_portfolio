import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-32 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <Loader2 className="w-12 h-12 text-accent animate-spin" />
        <div className="font-mono text-sm tracking-[0.2em] text-foreground/60 uppercase">
          Initializing Breakdown...
        </div>
      </div>
    </main>
  );
}
