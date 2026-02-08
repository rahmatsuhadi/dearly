import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Dearly - Kirim Kartu Ucapan Digital';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
          backgroundImage: 'linear-gradient(to bottom right, #fff1f2, #fdf4ff, #f0f9ff)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
          }}
        >
          {/* Logo Icon */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 100,
              height: 100,
              borderRadius: 24,
              background: 'linear-gradient(135deg, #f43f5e, #ec4899)',
              marginRight: 32,
              boxShadow: '0 20px 25px -5px rgba(244, 63, 94, 0.3)',
            }}
          >
            <svg
              width="60"
              height="60"
              viewBox="0 0 24 24"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <path d="M22 6l-10 7L2 6" stroke="white" strokeWidth="2" fill="none" />
            </svg>
          </div>
          
          {/* Brand Name */}
          <div
            style={{
              fontSize: 120,
              fontWeight: 800,
              background: 'linear-gradient(to right, #be185d, #4338ca)',
              backgroundClip: 'text',
              color: 'transparent',
              letterSpacing: '-0.05em',
            }}
          >
            Dearly
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 48,
            color: '#4b5563',
            textAlign: 'center',
            maxWidth: 1000,
            lineHeight: 1.2,
            fontWeight: 500,
          }}
        >
          Sampaikan Pesanmu Lebih Bermakna
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
