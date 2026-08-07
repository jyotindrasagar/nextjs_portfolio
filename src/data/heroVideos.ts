/**
 * -----------------------------------------------------------------------------
 * HOW TO ADD A NEW VIDEO TO THE LANDING PAGE HERO SECTION
 * -----------------------------------------------------------------------------
 * 1. This section specifically controls the 5 images/videos shown on the initial landing page.
 * 2. The layout relies on having EXACTLY 5 items. Do not add more or fewer than 5 items here.
 * 3. Copy the template and replace one of the existing 5 items.
 *
 * --- TEMPLATE ---
 * {
 *   id: 'hero-video-1', 
 *   title: 'Cinematic Edit',
 *   subtitle: 'Travel Film',
 *   imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=600',
 *   videoUrl: 'https://link-to-video-file.mp4', // Optional: actual video link
 *   pinPosition: 1 // Controls the layout spot:
 *                  // 1 = Top Left (Tall)
 *                  // 2 = Top Right (Short)
 *                  // 3 = Bottom Left (Square)
 *                  // 4 = Bottom Middle (Square)
 *                  // 5 = Bottom Right (Tall)
 * }
 * -----------------------------------------------------------------------------
 */

export interface HeroVideo {
  id: string;
  title: string;
  subtitle: string;
  imageUrl?: string;
  videoUrl?: string;
  pinPosition: number;
}

export const heroVideosData: HeroVideo[] = [
  {
    id: 'hero-1',
    title: 'Logo animation',
    subtitle: 'concept to creation',
    imageUrl: '/hero-posters/hero-1.jpg',
    videoUrl: 'https://pub-5581a6a5aba4445fb20fc89eb69162c2.r2.dev/hero%20cards/logo%20ani.webm',
    pinPosition: 1, // Top Left (Tall)
  },
  {
    id: 'hero-2',
    title: 'explainers',
    subtitle: 'Advanced graphics',
    imageUrl: '/hero-posters/hero-2.jpg',
    videoUrl: 'https://pub-5581a6a5aba4445fb20fc89eb69162c2.r2.dev/hero%20cards/paper%20compresed.webm',
    pinPosition: 2, // Top Right (Short)
  },
  {
    id: 'hero-3',
    title: 'Promotionals',
    subtitle: 'ads and marketing',
    imageUrl: '/hero-posters/hero-3.jpg',
    videoUrl: 'https://pub-5581a6a5aba4445fb20fc89eb69162c2.r2.dev/hero%20cards/ad%20and%20promo.webm',
    pinPosition: 3, // Bottom Left (Square)
  },
  {
    id: 'hero-4',
    title: 'animations',
    subtitle: '3d & 2D',
    imageUrl: '/hero-posters/hero-4.jpg',
    videoUrl: 'https://pub-5581a6a5aba4445fb20fc89eb69162c2.r2.dev/hero%20cards/animations.webm',
    pinPosition: 4, // Bottom Middle (Square)
  },
  {
    id: 'hero-5',
    title: 'motion loops',
    subtitle: 'abstract',
    imageUrl: '/hero-posters/hero-5.jpg',
    videoUrl: 'https://pub-5581a6a5aba4445fb20fc89eb69162c2.r2.dev/hero%20cards/keyy%20ani.webm',
    pinPosition: 5, // Bottom Right (Tall)
  }
];
