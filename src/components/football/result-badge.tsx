import { cn } from '@/lib/utils';
import type { Result } from '@/lib/types/football';

const RESULTS: Record<Result, { letter: string; label: string; className: string }> =
  {
    W: { letter: 'В', label: 'Победа', className: 'bg-win/18 text-win' },
    D: { letter: 'Н', label: 'Ничья', className: 'bg-draw/18 text-draw' },
    L: { letter: 'П', label: 'Поражение', className: 'bg-loss/18 text-loss' },
  };

/** В / Н / П on a tinted square — the letter, not only the color, carries the result. */
export function ResultBadge({
  result,
  className,
}: {
  result: Result;
  className?: string;
}) {
  const { letter, label, className: tone } = RESULTS[result];

  return (
    <span
      title={label}
      className={cn(
        `inline-grid size-5.5 shrink-0 place-items-center rounded-[5px] text-micro
        font-bold`,
        tone,
        className,
      )}
    >
      <span aria-hidden="true">{letter}</span>
      <span className="sr-only">{label}</span>
    </span>
  );
}
