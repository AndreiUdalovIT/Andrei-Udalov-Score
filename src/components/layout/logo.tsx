import Link from 'next/link';

import { cn } from '@/lib/utils';

/**
 * «AU» square plus the wordmark; `short` drops the first name on mobile.
 * The link is named by the wordmark itself, so voice control finds it by
 * the words on screen.
 */
export function Logo({ short = false, title }: { short?: boolean; title?: string }) {
  return (
    <Link
      href="/"
      title={title}
      className="flex shrink-0 items-center gap-2.5 rounded-md outline-none
        focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <span
        aria-hidden="true"
        className="grid size-7 place-items-center rounded-md bg-primary text-micro
          font-bold tracking-tight text-primary-foreground"
      >
        AU
      </span>
      <span
        className={cn(
          'font-bold tracking-[-0.01em] whitespace-nowrap',
          short ? 'text-[15px]' : 'text-[17px]',
        )}
      >
        {short ? 'Udalov ' : 'Andrei Udalov '}
        <span className="text-primary">Score</span>
      </span>
    </Link>
  );
}
