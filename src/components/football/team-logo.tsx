'use client';

import Image from 'next/image';
import { useState } from 'react';

import { cn } from '@/lib/utils';

type LogoSize = 20 | 24 | 28 | 40;

// Placeholder shape per size, from the design sheet.
const SHAPE: Record<LogoSize, string> = {
  20: 'rounded-full',
  24: 'rounded-full',
  28: 'rounded-[7px]',
  40: 'rounded-[10px]',
};

type TeamLogoProps = {
  /** Crest URL from football-data.org; may be missing for some clubs. */
  src?: string | null;
  /** Club name, shown as a tooltip on the placeholder. */
  name: string;
  /** Three-letter code, printed on the 40px placeholder. */
  tla?: string | null;
  size: LogoSize;
  className?: string;
};

/**
 * A club crest. Decorative: the club name always sits next to it, so the image
 * has an empty alt. Falls back to a hatched placeholder if there is no crest
 * or it fails to load.
 */
export function TeamLogo({ src, name, tla, size, className }: TeamLogoProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const failed = !src || failedSrc === src;

  if (failed) {
    return (
      <span
        title={name}
        data-slot="team-logo-fallback"
        style={{ width: size, height: size }}
        className={cn(
          `grid shrink-0 place-items-center border border-border
          bg-[repeating-linear-gradient(135deg,var(--muted)_0_3px,transparent_3px_6px)]`,
          SHAPE[size],
          className,
        )}
      >
        {size === 40 && tla && (
          <span
            aria-hidden="true"
            className="font-mono text-[10px] text-subtle-foreground"
          >
            {tla}
          </span>
        )}
      </span>
    );
  }

  return (
    <Image
      src={src}
      alt=""
      width={size}
      height={size}
      onError={() => setFailedSrc(src)}
      className={cn('shrink-0 object-contain', className)}
      style={{ width: size, height: size }}
    />
  );
}
