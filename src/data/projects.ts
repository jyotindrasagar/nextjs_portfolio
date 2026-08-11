/**
 * -----------------------------------------------------------------------------
 * HOW TO ADD A NEW PROJECT TO "SELECTED WORK"
 * -----------------------------------------------------------------------------
 * 1. Copy the template below and paste it into the `projectsData` array.
 * 2. Fill in the specific details for your video/project.
 * 3. Use `pinPosition` if you want to strictly control where this project appears in the grid.
 *    - E.g., `pinPosition: 1` means it will be the very first project shown.
 *    - Items without a pinPosition will appear after the pinned items.
 *
 * --- TEMPLATE ---
 * {
 *   title: 'PROJECT TITLE',
 *   category: 'VFX', // Must be EXACTLY one of: 'VFX' | 'Commercial' | 'Editorial' | 'Documentary' | 'Social' | 'Demos' | 'Teasers'
 *   videoUrl: 'https://link-to-video-file.mp4', // Optional: The actual video file link or embed URL
 *   trackUrl: 'https://spotify.com/...', // Optional: Link to the song, track, or artist page
 *   postUrl: 'https://instagram.com/...', // Optional: Hyperlink to the actual post
 *   description: 'A short description detailing the breakdown.',
 *   pinPosition: 1 // Optional: 1 is first, 2 is second, etc.
 * }
 * -----------------------------------------------------------------------------
 */

export interface ProjectInput {
  title: string;
  category: string;
  subCategory?: string;
  videoUrl?: string;
  postUrl?: string;
  trackUrl?: string;
  externalUrl?: string;
  description: string;
  pinPosition?: number;
  loop?: boolean;
}

export interface Project extends ProjectInput {
  id: string;
}

const rawProjects: ProjectInput[] = [
  {
    title: 'Fintech Landing Page Motion Design',
    category: 'Commercial',
    subCategory: 'Ads',
    videoUrl: 'https://www.youtube.com/watch?v=hLVrIpj-F_s',
    description: 'Premium 3D banking app hero animation featuring a seamless fintech landing page background loop designed for modern financial websites, mobile apps, and commercial motion design portfolios.',
    pinPosition: 5,
    loop: true
  },
  {
    title: 'World War III Documentary',
    category: 'Documentary',
    videoUrl: 'https://www.youtube.com/watch?v=VvQjsQ_DdsY',
    description: 'A documentary-style explainer examining whether the Russia–Ukraine War and the Israel–Hamas conflict could escalate into a broader global confrontation. The edit combines archival footage, cinematic pacing, motion graphics, typography, color grading, and sound design to present a complex geopolitical topic in a clear and engaging format. Services: Video Editing • Motion Graphics • Color Grading • Sound Design • Documentary Editing • Typography Animation',
    pinPosition: 3
  },
  {
    title: 'Electronic Logging Device (ELD) | 3D',
    category: 'Commercial',
    subCategory: 'Ads',
    videoUrl: 'https://www.youtube.com/watch?v=8-FyWvnZcWM',
    description: 'This 3D commercial was created for ALA Engineering to showcase their Electronic Logging Device (ELD) through cinematic product visualization, motion graphics, and visual storytelling. The project combines realistic 3D animation, commercial editing, motion design, and visual effects to communicate complex product features in a clear and engaging way. Every shot was designed to balance technical accuracy with modern advertising aesthetics, creating a commercial that is both informative and visually compelling. Created by Dieablo (DieabloFX), this project covers the complete production pipeline, including creative direction, 3D animation, product visualization, motion graphics, compositing, video editing, color grading, lighting, rendering, and final post-production using Blender, Adobe After Effects, and Adobe Premiere Pro.',
    pinPosition: 2
  },
  {
    title: 'Looksmaxing Foundations | (Hook)',
    category: 'Demos',
    videoUrl: 'https://www.youtube.com/watch?v=7f6P3ts4peM',
    description: 'Discover the five science-based looksmaxing foundations that can improve facial aesthetics, confidence, grooming, and overall appearance with practical self-improvement tips for long-term results.',
    pinPosition: 8
  },

  {
    title: 'Fan Edit(Spiderman)',
    category: 'Demos',
    videoUrl: 'https://www.youtube.com/watch?v=_UCXDOj13QU',
    description: 'A cinematic and emotional fan edit from amazing spiderman 2 and amazing spiderman 1, The project focuses on emotional pacing, cinematic editing, sound design, and storytelling.',
    pinPosition: 10
  },
  {
    title: 'Black Bunny Venue Showcase',
    category: 'Commercial',
    subCategory: 'Ads',
    videoUrl: 'https://www.youtube.com/watch?v=akOsJpUSTn4',
    description: 'Commercial promotional video for Black Bunny Dubai featuring cinematic editing, camera tracking, 3D animation, motion graphics, and visual effects produced through HekayaHaus.',
    pinPosition: 1
  },
  {
    title: 'Black Bunny Arcade Promo',
    category: 'Commercial',
    subCategory: 'Ads',
    videoUrl: 'https://www.youtube.com/watch?v=T5gVxAogrWM',
    description: 'Commercial venue showcase for Black Bunny Dubai featuring cinematic editing, motion graphics, tracked visual effects, 3D animation, and promotional storytelling created through HekayaHaus.',
    pinPosition: 9
  },
  {
    title: 'Character Animation',
    category: 'Demos',
    videoUrl: 'https://www.youtube.com/watch?v=TefbTIfo4wo',
    description: '2D character animation sample created by dieablofx for L3G1T_DC showcasing Adobe After Effects animation, motion graphics, expressive character animation, visual storytelling, and professional motion design services.',
    pinPosition: 4
  },
  {
    title: 'HOF Logo Animation',
    category: 'Commercial',
    subCategory: 'Logo Animations',
    videoUrl: 'https://www.youtube.com/watch?v=FY0C61ks3dM',
    description: 'Premium logo animation created by DieabloFX for HOF India featuring elegant motion graphics, brand animation, commercial design, corporate identity, and 2D motion design.',
    pinPosition: 4
  },
  {
    title: 'HOF Brand Reveal',
    category: 'Commercial',
    subCategory: 'Logo Animations',
    videoUrl: 'https://www.youtube.com/watch?v=3kUKesOFciE',
    description: 'Luxury brand reveal and logo animation created by DieabloFX for HOF India featuring premium motion graphics, corporate branding, elegant visual identity, commercial animation, and 2D motion design.',
    pinPosition: 7
  },
  {
    title: 'Music Release Promo',
    category: 'teasers',
    videoUrl: 'https://www.youtube.com/watch?v=kUQn52ZEDeg',
    trackUrl: 'https://open.spotify.com/album/0s1GF1doXtBtksW2lXoQud?si=FtHajscWSy6qmy3hng5BkQ', // Replace with link to song or artist
    description: 'Advanced music release promotional animation created by DieabloFX for Ashley Marie single Charing Cross, featuring cinematic motion graphics, 2.5D depth map animation, camera projection, typography animation, visual effects, and commercial video production.',
    pinPosition: 8
  },
  {
    title: 'Springwel Product Explainer',
    category: 'Commercial',
    subCategory: 'Ads',
    videoUrl: 'https://www.youtube.com/watch?v=GgUcBTQbCAE',
    description: 'Commercial product explainer animation created by DieabloFX for Springwel, featuring motion graphics, typography animation, product visualization, educational animation, furniture marketing, mattress buying guide, and commercial video production.',
    pinPosition: 70
  },
  /*
  {
    title: 'Drift home Highlights 1',
    category: 'social',
    videoUrl: 'https://www.youtube.com/watch?v=yTYIbCkoA9w',
    description: 'Motorsport promotional video for The Drift Home featuring cinematic event editing, automotive storytelling, motion graphics, color grading, drifting highlights, timed racing coverage, and commercial video production.',
    pinPosition: 1
  },
   */
  {
    title: 'Kobe Bryant',
    category: 'Social',
    videoUrl: 'https://www.youtube.com/watch?v=hFwy3F6yhZ0',
    description: 'A short-form basketball edit featuring an insightful discussion on Kobe Bryants impact and why NBA players continue to hold him in such high regard.This project emphasizes visual clarity and engagement through cinematic color grading, dynamic caption animation, and polished editing, transforming a simple interview into compelling social media content.Services: Video Editing • Color Grading • Caption Animation • Motion Graphics',
    pinPosition: 5
  },
  /*
  {
    title: 'Marines Surprise WWII & Korean War Hero',
    category: 'Social',
    videoUrl: 'https://www.youtube.com/watch?v=rYvWk9y-yfg',
    description: 'A cinematic motivational edit built around a real story of U.S. Marines honoring World War II and Korean War veteran Robert "Woody" Woodbury. The project focuses on emotional pacing, cinematic editing, sound design, and storytelling to transform a simple act of respect into an impactful short-form narrative. Client - CBH',
    pinPosition: 2
  },
  
  {
    title: 'Drift home Highlights 2',
    category: 'Social',
    videoUrl: 'https://www.youtube.com/watch?v=nTvmnxt_kFs',
    description: 'Motorsport promotional video for The Drift Home featuring cinematic event editing, automotive storytelling, motion graphics, color grading, drifting highlights, timed racing coverage, and commercial video production.',
    pinPosition: 3
  },
  {
    title: 'Drift home Highlights 3',
    category: 'Social',
    videoUrl: 'https://www.youtube.com/watch?v=4m7myWaopUc',
    description: 'Motorsport promotional video for The Drift Home featuring cinematic event editing, automotive storytelling, motion graphics, color grading, drifting highlights, timed racing coverage, and commercial video production.',
    pinPosition: 4
  },
   */
];

export const projectsData: Project[] = rawProjects.map(project => ({
  ...project,
  // Auto-generate a safe, URL-friendly ID from the title
  id: project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
}));
