import React from 'react';

// Replace these placeholders with your actual imported images.
// For example:
// import RedBullLogo from '../assets/clients/redbull.svg';
// import NikeLogo from '../assets/clients/nike.png';

export interface Client {
  name: string;
  imagePath?: string;
  textLogo?: string;
  fontStyle?: string;
  svgLogo?: React.ReactNode;
}

export const clients: Client[] = [
  { name: 'Ala', imagePath: 'https://pub-5581a6a5aba4445fb20fc89eb69162c2.r2.dev/Client%20logos/ala.png' },
  { name: 'Black Bunny', imagePath: 'https://pub-5581a6a5aba4445fb20fc89eb69162c2.r2.dev/Client%20logos/black%20bunny.png' },
  { name: 'Drift Home', imagePath: 'https://pub-5581a6a5aba4445fb20fc89eb69162c2.r2.dev/Client%20logos/drift%20home.png' },
  { name: 'Hekayahaus', imagePath: 'https://pub-5581a6a5aba4445fb20fc89eb69162c2.r2.dev/Client%20logos/hekayahaus.png' },
  { name: 'Muscle Blaze', imagePath: 'https://pub-5581a6a5aba4445fb20fc89eb69162c2.r2.dev/Client%20logos/muscle%20blaze.png' },
  { name: 'Springwel', imagePath: 'https://pub-5581a6a5aba4445fb20fc89eb69162c2.r2.dev/Client%20logos/springwel.png' },
  { name: 'Northladder', imagePath: 'https://pub-5581a6a5aba4445fb20fc89eb69162c2.r2.dev/Client%20logos/northladder.png' },
  { name: 'Keyy', imagePath: 'https://pub-5581a6a5aba4445fb20fc89eb69162c2.r2.dev/Client%20logos/keyy.png' },
  { name: 'Valcs', imagePath: 'https://pub-5581a6a5aba4445fb20fc89eb69162c2.r2.dev/Client%20logos/valcs.png' },
];
