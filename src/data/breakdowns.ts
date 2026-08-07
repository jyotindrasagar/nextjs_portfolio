export interface BreakdownData {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  videoUrl: string;
  content: string;
}

export const breakdowns: BreakdownData[] = [
  {
    id: "timeline-edit-1",
    title: "Timeline Edit",
    excerpt: "Deconstructing pacing and structural foundations.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
    videoUrl: "https://cdn.coverr.co/videos/coverr-editing-a-video-on-a-laptop-2714/1080p.mp4",
    content: "When approaching the structural foundation of a piece, pacing is paramount. In this breakdown, we examine the raw timelines and how the rhythmic cutting creates an emotional undertone long before any visual effects or color grades are applied.\n\nThe timeline is not just a sequence of clips; it is the heartbeat of the film. By manipulating micro-pauses and aggressive match cuts, we established a frenetic yet controlled energy that carries the viewer through the narrative."
  },
  {
    id: "node-editor-2",
    title: "Node Editor",
    excerpt: "Complex visual compositing and spatial transformations.",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1200",
    videoUrl: "https://cdn.coverr.co/videos/coverr-a-man-working-on-his-computer-5278/1080p.mp4",
    content: "Modern compositing requires a nodal workflow to keep complex operations organized. This project involved deep spatial transformations and heavy plate cleanups.\n\nBy utilizing a procedural node-based approach, we were able to iterate rapidly on the client's feedback without destroying the core alpha channels. The breakdown highlights the exact node trees used to pull seamless keys against difficult backgrounds and the mathematical operations that blended the VFX seamlessly into the live-action plates."
  },
  {
    id: "premiere-blueprint-3",
    title: "Premiere Blueprint",
    excerpt: "Architecting the workflow for seamless client delivery.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200",
    videoUrl: "https://cdn.coverr.co/videos/coverr-editing-a-video-2715/1080p.mp4",
    content: "A successful edit isn't just about the creative cuts—it's about the technical blueprint that supports it. Here, we dive into the organization of bins, proxies, and multi-cam sequences that allowed a team of three editors to work concurrently.\n\nWe implemented a strict naming convention and proxy-first workflow that reduced rendering bottlenecks by 40%. This blueprint is now the standard for all fast-turnaround commercial projects in our studio."
  },
  {
    id: "grading-monitor-4",
    title: "Grading Monitor",
    excerpt: "The subtle art of establishing mood through color.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1200",
    videoUrl: "https://cdn.coverr.co/videos/coverr-neon-lights-in-the-city-4321/1080p.mp4",
    content: "Color is narrative. In this breakdown, we dissect the custom LUTs and node-based grading used to achieve the cinematic 'Nightrun' look. \n\nWe pushed the teal and orange cinematic staple but localized the saturation solely to the mid-tones to retain a gritty, filmic texture in the shadows. The monitor scopes reveal exactly how we compressed the highlights to emulate 35mm film stock, giving the final piece its signature analog warmth."
  }
];
