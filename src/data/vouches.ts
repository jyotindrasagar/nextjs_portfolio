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

];
