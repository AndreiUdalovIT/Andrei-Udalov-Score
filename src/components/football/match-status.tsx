import type { ReactNode } from 'react';

import { LocalTime } from '@/components/common/local-time';
import { cn } from '@/lib/utils';
import type { MatchStatus as Status } from '@/lib/types/football';

/** The six states a visitor can tell apart; API statuses collapse into them. */
export type StatusKind =
  'upcoming' | 'live' | 'suspended' | 'finished' | 'postponed' | 'cancelled';

const KIND: Record<Status, StatusKind> = {
  SCHEDULED: 'upcoming',
  TIMED: 'upcoming',
  IN_PLAY: 'live',
  PAUSED: 'live', // half-time is still a live match
  EXTRA_TIME: 'live',
  PENALTY_SHOOTOUT: 'live',
  SUSPENDED: 'suspended',
  FINISHED: 'finished',
  AWARDED: 'finished',
  POSTPONED: 'postponed',
  CANCELLED: 'cancelled',
};

export function statusKind(status: Status): StatusKind {
  return KIND[status];
}

type Icon = 'dot' | 'pause' | 'slash' | 'cross';

const VIEWS: Record<
  Exclude<StatusKind, 'upcoming'>,
  { label: string; short: string; live: boolean; icon?: Icon }
> = {
  live: { label: 'Идёт', short: 'Идёт', live: true, icon: 'dot' },
  suspended: { label: 'Приостановлен', short: 'Пауза', live: true, icon: 'pause' },
  finished: { label: 'Завершён', short: 'Заверш.', live: false },
  postponed: { label: 'Перенесён', short: 'Перенес.', live: false, icon: 'slash' },
  cancelled: { label: 'Отменён', short: 'Отменён', live: false, icon: 'cross' },
};

const KICKOFF_FORMAT: Intl.DateTimeFormatOptions = {
  hour: '2-digit',
  minute: '2-digit',
};

type MatchStatusProps = {
  status: Status;
  /** ISO kickoff time; shown in the visitor's time zone before the match. */
  kickoff: string;
  /** Second line: «на 17:20» for live matches, the minute, a new date. */
  note?: ReactNode;
  /** Narrow mobile column: short labels, only the live dot and pause icons. */
  compact?: boolean;
};

export function MatchStatus({
  status,
  kickoff,
  note,
  compact = false,
}: MatchStatusProps) {
  const kind = KIND[status];

  if (kind === 'upcoming') {
    return (
      <LocalTime
        value={kickoff}
        options={KICKOFF_FORMAT}
        className={cn('font-medium', compact ? 'text-body-sm' : 'text-body')}
      />
    );
  }

  const view = VIEWS[kind];
  const showIcon =
    view.icon && (!compact || view.icon === 'dot' || view.icon === 'pause');

  return (
    <span className="flex flex-col gap-0.5">
      <span
        className={cn(
          'inline-flex items-center whitespace-nowrap',
          compact ? 'gap-1 text-micro' : 'gap-1.25 text-caption',
          view.live
            ? 'font-semibold text-status-live'
            : 'font-normal text-muted-foreground',
        )}
      >
        {showIcon && view.icon && <StatusIcon icon={view.icon} compact={compact} />}
        {compact && view.short !== view.label ? (
          <>
            <span aria-hidden="true">{view.short}</span>
            <span className="sr-only">{view.label}</span>
          </>
        ) : (
          view.label
        )}
      </span>
      {note && (
        <span
          className={cn(
            'whitespace-nowrap text-muted-foreground',
            compact ? 'text-[10px] leading-3' : 'text-micro font-normal',
          )}
        >
          {note}
        </span>
      )}
    </span>
  );
}

function StatusIcon({ icon, compact }: { icon: Icon; compact: boolean }) {
  if (icon === 'dot') {
    return (
      <span
        aria-hidden="true"
        className="size-1.5 shrink-0 rounded-full bg-current"
      />
    );
  }

  const size = compact ? 10 : 12;
  const common = {
    'aria-hidden': true,
    width: size,
    height: size,
    viewBox: '0 0 16 16',
    className: 'shrink-0',
  } as const;

  if (icon === 'pause') {
    return (
      <svg {...common} fill="currentColor">
        <rect x="4" y="3" width="3" height="10" rx="1" />
        <rect x="9" y="3" width="3" height="10" rx="1" />
      </svg>
    );
  }

  return (
    <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="8" cy="8" r="6.25" />
      {icon === 'slash' ? (
        <path d="M4 12L12 4" />
      ) : (
        <path d="M5.75 5.75l4.5 4.5M10.25 5.75l-4.5 4.5" />
      )}
    </svg>
  );
}
