export interface InlineMedia {
  type: 'image' | 'video';
  url: string;
  caption?: string;
  aspectRatio?: 'video' | 'square' | 'wide';
}

export interface BreakdownSection {
  title?: string;
  text?: string;
  media?: InlineMedia;
  codeSnippet?: string;
}

export interface BreakdownData {
  id: string;
  title: string;
  excerpt: string;
  category: 'my-work' | 'inspiration';
  date: string;
  readTime: string;
  tools: string[];
  image: string;
  videoUrl: string;
  headerMedia?: InlineMedia;
  content: string;
  sections?: BreakdownSection[];
  isHighlight?: boolean;
}

/* 
====================================================================
  TEMPLATE FOR ADDING NEW PROJECT BREAKDOWNS:
====================================================================
  Uncomment and copy the block below to add a new breakdown project:

  {
    id: "my-project-slug",
    title: "Project Title Here",
    excerpt: "Short teaser description of what was done...",
    category: "my-work", // or "inspiration"
    date: "AUG 2026",
    readTime: "4 MIN READ",
    tools: ["Nuke", "DaVinci Resolve", "After Effects", "Blender"],
    image: "https://your-image-url.jpg",
    videoUrl: "https://your-video-url.mp4",
    headerMedia: {
      type: "video", // or "image"
      url: "https://your-video-url.mp4",
      caption: "Header media caption"
    },
    content: "Detailed main description of the breakdown project...",
    sections: [
      {
        title: "01. First Breakdown Phase",
        text: "Explanation of this step...",
        media: {
          type: "image",
          url: "https://your-step-image.jpg",
          caption: "Caption for step 1 media"
        }
      }
    ]
  },
====================================================================
*/

const createDummy = (id: string, title: string, category: 'my-work' | 'inspiration', isHighlight: boolean) => ({
  id,
  title,
  excerpt: "Wait a bit! Working on this feature to bring you in-depth breakdowns.",
  category,
  date: "COMING SOON",
  readTime: "0 MIN READ",
  tools: ["After Effects", "Nuke"],
  image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
  videoUrl: "",
  headerMedia: {
    type: "image" as const,
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    caption: ""
  },
  content: "<p>Wait a bit, working on this feature! More content coming soon.</p>",
  sections: [],
  isHighlight
});

export const breakdowns: BreakdownData[] = [
  createDummy("dummy-1", "VFX Breakdown 01", "my-work", true),
  createDummy("dummy-2", "Motion Design 02", "my-work", true),
  createDummy("dummy-3", "Color Grading 01", "my-work", false),
  createDummy("dummy-4", "Inspiring Edits 01", "inspiration", true),
  createDummy("dummy-5", "Cinematography Study", "inspiration", false),
];
