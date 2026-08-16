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
    name: 'Domenico Pepe',
    role: 'video Editor',
    avatar: 'https://pub-5581a6a5aba4445fb20fc89eb69162c2.r2.dev/vouch%20logos/domz.jpg',
    link: 'https://ytjobs.co/@happydomz',
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
    name: 'Domenico Pepe',
    role: 'video Editor',
    avatar: 'https://pub-5581a6a5aba4445fb20fc89eb69162c2.r2.dev/vouch%20logos/domz.jpg',
    link: 'https://ytjobs.co/@happydomz',
    linkType: 'portfolio',
    verified: true,
  },
  {
    id: '4',
    name: 'Domenico Pepe',
    role: 'video Editor',
    avatar: 'https://pub-5581a6a5aba4445fb20fc89eb69162c2.r2.dev/vouch%20logos/domz.jpg',
    link: 'https://ytjobs.co/@happydomz',
    linkType: 'portfolio',
    verified: true,
  },


];

