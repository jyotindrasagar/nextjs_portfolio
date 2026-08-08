import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const runtime = 'nodejs';
export const size = { width: 512, height: 512 };
export const contentType = 'image/png';

export default async function Icon() {
  const logo = readFileSync(join(process.cwd(), 'public', 'logo-extracted.png'));
  const src = `data:image/png;base64,${logo.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img src={src} width={256} height={256} style={{ objectFit: 'contain' }} />
      </div>
    ),
    { ...size }
  );
}
