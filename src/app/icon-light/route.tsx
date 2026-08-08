import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const runtime = 'nodejs';

export async function GET() {
  const logo = readFileSync(join(process.cwd(), 'public', 'logo-black.png'));
  const src = `data:image/png;base64,${logo.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          background: 'transparent',
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
    { width: 512, height: 512 }
  );
}
