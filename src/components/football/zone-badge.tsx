import { cn } from '@/lib/utils';
import type { Zone } from '@/lib/types/football';

export const ZONE_COLOR: Record<Zone, string> = {
  ucl: 'bg-zone-ucl',
  uel: 'bg-zone-uel',
  uecl: 'bg-zone-uecl',
  playoff: 'bg-zone-playoff',
  releg: 'bg-zone-releg',
};

/** Zone marker plus its label («ЛЧ», «Стыки», «Вылет»…), labels come from the league config. */
export function ZoneBadge({
  zone,
  label,
  className,
}: {
  zone: Zone;
  label: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        `inline-flex h-5 items-center gap-1 rounded-xs border border-border px-1.5
        text-micro font-normal whitespace-nowrap`,
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn('size-1.5 rounded-[2px]', ZONE_COLOR[zone])}
      />
      {label}
    </span>
  );
}
