import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type EmptyStateProps = {
  title: string;
  text?: ReactNode;
  /** Shown in a muted circle above the title; card variant only. */
  icon?: LucideIcon;
  /** Buttons or links: «К 21 ноября», «Открыть календарь». */
  actions?: ReactNode;
  /**
   * `card` — a whole block has nothing to show (international break, no matches);
   * `dashed` — a quieter hint inside a section («Только мои команды» found nothing).
   */
  variant?: 'card' | 'dashed';
  /** `h1` when the empty state is the whole page (404); inside a section — `p`. */
  titleAs?: 'p' | 'h1';
  className?: string;
};

export function EmptyState({
  title,
  text,
  icon: Icon,
  actions,
  variant = 'card',
  titleAs: Title = 'p',
  className,
}: EmptyStateProps) {
  const card = variant === 'card';

  return (
    <div
      className={cn(
        'flex flex-col items-center text-center',
        card
          ? 'gap-2 rounded-lg border border-border bg-card px-6 py-10'
          : 'gap-1.5 rounded-lg border border-dashed border-border px-4 py-9',
        className,
      )}
    >
      {card && Icon && (
        <span
          aria-hidden="true"
          className="grid size-11 place-items-center rounded-full bg-muted
            text-muted-foreground"
        >
          <Icon className="size-4" strokeWidth={1.75} />
        </span>
      )}
      <Title className={cn('font-semibold', card ? 'mt-1 text-base' : 'text-body')}>
        {title}
      </Title>
      {text && (
        <p className="max-w-100 text-body-sm text-pretty text-muted-foreground">
          {text}
        </p>
      )}
      {actions && (
        <div
          className={cn(
            'flex flex-wrap justify-center gap-2',
            card ? 'mt-3' : 'mt-2.5',
          )}
        >
          {actions}
        </div>
      )}
    </div>
  );
}
