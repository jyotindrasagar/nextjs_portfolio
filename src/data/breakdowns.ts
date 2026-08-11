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

export const breakdowns: BreakdownData[] = [
  // Add your custom project breakdowns here using the template above!
];
