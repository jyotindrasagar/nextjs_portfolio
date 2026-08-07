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
 *   id: 'unique-id-here', // Must be unique, e.g., 'commercial-nike-01'
 *   title: 'PROJECT TITLE',
 *   category: 'VFX', // Must be EXACTLY one of: 'VFX' | 'Commercial' | 'Editorial' | 'Documentary'
 *   videoUrl: 'https://link-to-video-file.mp4', // Optional: The actual video file link or embed URL
 *   postUrl: 'https://instagram.com/...', // Optional: Hyperlink to the actual post
 *   description: 'A short description detailing the breakdown.',
 *   pinPosition: 1 // Optional: 1 is first, 2 is second, etc.
 * }
 * -----------------------------------------------------------------------------
 */

export interface Project {
  id: string;
  title: string;
  category: string;
  videoUrl?: string;
  postUrl?: string;
  description: string;
  pinPosition?: number;
}

export const projectsData: Project[] = [

  {
    id: 'echoes',
    title: 'ECHOES OF SILENCE',
    category: 'Documentary',
    videoUrl: 'https://link-to-video-file.mp4',
    description: 'A quiet, cinematic exploration of remote architectural settlements and local communities.',
    pinPosition: 2
  },
  {
    id: 'kinetic',
    title: 'KINETIC MOTION',
    category: 'Commercial',
    videoUrl: 'https://link-to-video-file.mp4',
    description: 'High-speed macro capture and liquid dynamics simulation showcasing natural textile flexibility.',
    pinPosition: 3
  },
  {
    id: 'chronos',
    title: 'CHRONOS TITLES',
    category: 'Editorial',
    videoUrl: 'https://link-to-video-file.mp4',
    description: 'Main title sequence using geometric wireframe structures and deep temporal displacement typography.',
    pinPosition: 4
  },

  {
    id: 'lenscraft',
    title: 'LENSCRAFT',
    category: 'Social',
    videoUrl: 'https://link-to-video-file.mp4',
    description: 'Product visualization & camera lens breakdown with realistic lighting and detail.',
    pinPosition: 5
  },
];
