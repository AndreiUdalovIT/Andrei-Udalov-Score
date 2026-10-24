import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Chips } from './chips';

type Competition = 'all' | 'pl' | 'pd' | 'cl';

const ITEMS = [
  { value: 'all', label: 'Все' },
  { value: 'pl', label: 'АПЛ' },
  { value: 'pd', label: 'Ла Лига' },
  { value: 'cl', label: 'ЛЧ' },
] as const;

function setup(value: Competition = 'all') {
  const onChange = vi.fn<(value: Competition) => void>();
  render(<Chips items={ITEMS} value={value} onChange={onChange} label="Турнир" />);
  return { onChange, user: userEvent.setup() };
}

describe('Chips', () => {
  it('is a labelled single-choice group', () => {
    setup('pl');
    expect(screen.getByRole('radiogroup', { name: 'Турнир' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'АПЛ' })).toBeChecked();
    expect(
      screen.getAllByRole('radio').filter((chip) => chip.ariaChecked === 'true'),
    ).toHaveLength(1);
  });

  it('reports a clicked chip', async () => {
    const { onChange, user } = setup();
    await user.click(screen.getByRole('radio', { name: 'ЛЧ' }));
    expect(onChange).toHaveBeenCalledWith('cl');
  });

  it('moves between chips with arrow keys', async () => {
    const { onChange, user } = setup('pl');
    await user.tab();
    // Held until the selection lands — Radix moves focus on the next tick.
    await user.keyboard('{ArrowRight>}');
    await waitFor(() => expect(onChange).toHaveBeenLastCalledWith('pd'));
    await user.keyboard('{/ArrowRight}');
  });

  it('scrolls inside itself instead of widening the page', () => {
    setup();
    expect(screen.getByRole('radiogroup')).toHaveClass('overflow-x-auto', 'min-w-0');
  });
});
