export interface Vouch {
  id: string;
  name: string;
  avatar: string;
  link: string;
  linkType?: 'social' | 'portfolio' | 'agency';
  role?: string;
  agency?: string;
  agencyLink?: string;
  verified?: boolean;
}

/*
===================================================================
  HOW TO ADD / EDIT INDUSTRY VOUCHES
===================================================================
  Copy & paste the template below into the `vouches` array:

  {
    id: 'unique-id-1',
    name: 'Alex Rivera',
    role: 'Lead VFX Artist & Editor',
    agency: 'Creative Agency Name',       // Optional agency name
    agencyLink: 'https://agency.com',     // Optional agency URL
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
    link: 'https://twitter.com/alex_vfx',
    linkType: 'social', // 'social' | 'portfolio' | 'agency'
    verified: true,
  },
===================================================================
*/

export const vouches: Vouch[] = [
  {
    id: '1',
    name: 'Alainah',
    role: 'video Editor',
    avatar: 'https://cdn.discordapp.com/avatars/448458949302419469/f888378a781ae7456dba6c1cec7aa8c6.webp?size=1024',
    link: 'https://ytjobs.co/@alainah',
    linkType: 'portfolio',
    verified: true,
  },
  {
    id: '2',
    name: 'Domenico Pepe',
    role: 'video Editor',
    avatar: 'https://pub-5581a6a5aba4445fb20fc89eb69162c2.r2.dev/vouch%20logos/domz.jpg',
    link: 'https://ytjobs.co/@happydomz',
    linkType: 'portfolio',
    verified: true,
  },
  {
    id: '3',
    name: 'freeseoulmedia',
    role: 'video Editor',
    avatar: 'https://pub-5581a6a5aba4445fb20fc89eb69162c2.r2.dev/vouch%20logos/cherry.jpg',
    link: 'https://www.instagram.com/freeseoulmedia',
    linkType: 'social',
    verified: true,
  },
  {
    id: '4',
    name: 'Vedant Patil',
    role: 'Videographer',
    avatar: 'https://pub-5581a6a5aba4445fb20fc89eb69162c2.r2.dev/vouch%20logos/vedant.jpg',
    link: 'https://www.instagram.com/vedantfx3',
    linkType: 'social',
    verified: true,
  },
  {
    id: '5',
    name: 'Chell',
    role: 'video Editor',
    avatar: 'https://pub-5581a6a5aba4445fb20fc89eb69162c2.r2.dev/vouch%20logos/chell.jpg',
    link: 'https://ytjobs.co/@chell',
    linkType: 'portfolio',
    verified: true,
  },
  {
    id: '6',
    name: 'Luke Darby',
    role: 'video Editor',
    avatar: 'https://pub-5581a6a5aba4445fb20fc89eb69162c2.r2.dev/hero%20cards/Feedback%20profiles/darby.png',
    link: 'https://lukedarby.carrd.co/',
    linkType: 'portfolio',
    verified: true,
  },
  {
    id: '7',
    name: 'Mukul Rao',
    role: 'Graphic designer',
    avatar: 'https://pub-5581a6a5aba4445fb20fc89eb69162c2.r2.dev/vouch%20logos/lion.jpg',
    link: '',
    linkType: 'social',
    verified: true,
  },
  {
    id: '8',
    name: 'Flapant',
    role: 'video Editor',
    avatar: 'https://pub-5581a6a5aba4445fb20fc89eb69162c2.r2.dev/vouch%20logos/flapant.png',
    link: 'https://rustedobj.com/',
    linkType: 'portfolio',
    verified: true,
  },
  {
    id: '9',
    name: 'Abdullah',
    role: 'Video Editor & Motion Designer',
    avatar: 'https://pub-5581a6a5aba4445fb20fc89eb69162c2.r2.dev/vouch%20logos/abdullah.jpg',
    link: 'https://ytjobs.co/@notabdullah',
    linkType: 'portfolio',
    verified: true,
  },
  {
    id: '10',
    name: 'stroomer',
    role: 'Video Editor',
    avatar: 'https://pub-5581a6a5aba4445fb20fc89eb69162c2.r2.dev/vouch%20logos/stromer.jpg',
    link: 'https://stroomer.video/',
    linkType: 'portfolio',
    verified: true,
  },
];

