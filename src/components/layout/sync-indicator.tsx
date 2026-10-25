import { Clock } from 'lucide-react';

import { cn } from '@/lib/utils';

/**
 * «Обновлено 2 ч назад». Fed by the last successful sync from stage 1;
 * until there is one, it stays out of the header instead of showing a dash.
 */
export function SyncIndicator({
  label,
  className,
}: {
  /** Ready-made relative time, e.g. «2 ч назад»; `null` — no sync yet. */
  label: string | null;
  className?: string;
}) {
  if (!label) return null;

  return (
    <span
      className={cn(
        'flex items-center gap-1.5 whitespace-nowrap text-muted-foreground',
        className,
      )}
    >
      <Clock aria-hidden="true" className="size-3.5" />
      <span>
        <span className="sr-only">Данные обновлены </span>
        {label}
      </span>
    </span>
  );
}
