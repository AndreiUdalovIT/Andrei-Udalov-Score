import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { MatchStatus } from './match-status';

const KICKOFF = '2026-10-24T16:30:00Z';

describe('MatchStatus', () => {
  it.each([
    ['IN_PLAY', 'Идёт'],
    ['PAUSED', 'Идёт'],
    ['EXTRA_TIME', 'Идёт'],
    ['PENALTY_SHOOTOUT', 'Идёт'],
    ['SUSPENDED', 'Приостановлен'],
    ['FINISHED', 'Завершён'],
    ['AWARDED', 'Завершён'],
    ['POSTPONED', 'Перенесён'],
    ['CANCELLED', 'Отменён'],
  ] as const)('%s → %s', (status, label) => {
    render(<MatchStatus status={status} kickoff={KICKOFF} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it.each(['SCHEDULED', 'TIMED'] as const)(
    '%s shows the kickoff in the local time zone',
    (status) => {
      render(<MatchStatus status={status} kickoff={KICKOFF} />);
      const local = new Date(KICKOFF).toLocaleString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
      });
      expect(screen.getByText(local)).toHaveAttribute('datetime', KICKOFF);
    },
  );

  it('shows the short label on narrow screens and keeps the full one for screen readers', () => {
    render(<MatchStatus status="FINISHED" kickoff={KICKOFF} compact />);
    expect(screen.getByText('Заверш.')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByText('Завершён')).toHaveClass('sr-only');
  });

  it('renders the note under the status', () => {
    render(<MatchStatus status="IN_PLAY" kickoff={KICKOFF} note="на 17:20" />);
    expect(screen.getByText('на 17:20')).toBeInTheDocument();
  });
});
