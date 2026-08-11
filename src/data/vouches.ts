export interface Vouch {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  link: string;
  role?: string;
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
    handle: '@alex_vfx',
    role: 'Lead VFX Artist & Editor',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
    link: 'https://twitter.com/alex_vfx',
    verified: true,
  },
===================================================================
*/

export const vouches: Vouch[] = [
  {
    id: 'vouch-1',
    name: 'Marcus Vance',
    handle: '@marcus_cuts',
    role: 'Senior Commercial Editor',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
    link: 'https://x.com/dieablofx',
    verified: true,
  },
  {
    id: 'vouch-2',
    name: 'Elena Rostova',
    handle: '@elena_3d',
    role: 'Lead CGI & Motion Designer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop',
    link: 'https://instagram.com/dieablofx',
    verified: true,
  },
  {
    id: 'vouch-3',
    name: 'David Chen',
    handle: '@david_vfx',
    role: 'VFX Supervisor @ Frame',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop',
    link: 'https://behance.net/dieablofx',
    verified: true,
  },
  {
    id: 'vouch-4',
    name: 'Sophia Sterling',
    handle: '@sophia_cuts',
    role: 'YouTube & Creator Editor',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
    link: 'https://youtube.com/@dieablofx',
    verified: true,
  },
  {
    id: 'vouch-5',
    name: 'Liam Vance',
    handle: '@liam_motion',
    role: '3D Animator & Colorist',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=300&auto=format&fit=crop',
    link: 'https://linkedin.com/in/dieablofx',
    verified: true,
  }
];
