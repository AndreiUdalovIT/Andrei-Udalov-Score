import { ImageResponse } from 'next/og';

// `--primary` and `--primary-foreground` of the light theme in hex:
// the image renderer doesn't take oklch.
const PRIMARY = '#6d48d1';
const ON_PRIMARY = '#fcfbff';

/** The «AU» square as a PNG for favicons and the iOS home screen. */
export function brandIcon(size: number, { rounded }: { rounded: boolean }) {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: PRIMARY,
        color: ON_PRIMARY,
        // iOS rounds the home-screen icon itself, so only the favicon gets corners.
        borderRadius: rounded ? size * 0.28 : 0,
        fontSize: size * 0.44,
        fontWeight: 700,
        letterSpacing: -size * 0.02,
      }}
    >
      AU
    </div>,
    { width: size, height: size },
  );
}
