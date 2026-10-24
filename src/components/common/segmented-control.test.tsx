import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, expectTypeOf, it, vi } from 'vitest';

import { SegmentedControl } from './segmented-control';

type Venue = 'all' | 'home' | 'away';

const OPTIONS = [
  { value: 'all', label: 'Все' },
  { value: 'home', label: 'Дома' },
  { value: 'away', label: 'В гостях' },
] as const;

// A controlled component needs a parent that stores the value, as in the app.
function Harness({
  initial,
  onChange,
}: {
  initial: Venue;
  onChange: (v: Venue) => void;
}) {
  const [value, setValue] = useState(initial);
  return (
    <SegmentedControl
      options={OPTIONS}
      value={value}
      onChange={(next) => {
        setValue(next);
        onChange(next);
      }}
      label="Матчи"
    />
  );
}

function setup(initial: Venue = 'all') {
  const onChange = vi.fn<(value: Venue) => void>();
  render(<Harness initial={initial} onChange={onChange} />);
  return { onChange, user: userEvent.setup() };
}

describe('SegmentedControl', () => {
  it('is a labelled radio group with the current value checked', () => {
    setup('home');
    expect(screen.getByRole('radiogroup', { name: 'Матчи' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Дома' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Все' })).not.toBeChecked();
  });

  it('reports a clicked option', async () => {
    const { onChange, user } = setup();
    await user.click(screen.getByRole('radio', { name: 'В гостях' }));
    expect(onChange).toHaveBeenCalledWith('away');
  });

  it('keeps only the selected option in the tab order', async () => {
    const { user } = setup('home');
    await user.tab();
    expect(screen.getByRole('radio', { name: 'Дома' })).toHaveFocus();
  });

  // Radix selects on focus while an arrow key is held, and moves focus on the
  // next tick — so the key stays pressed until the selection lands, like a person.
  it('moves the selection with arrow keys and wraps around', async () => {
    const { onChange, user } = setup('away');
    await user.tab();

    await user.keyboard('{ArrowRight>}');
    await waitFor(() => expect(onChange).toHaveBeenLastCalledWith('all'));
    await user.keyboard('{/ArrowRight}');
    expect(screen.getByRole('radio', { name: 'Все' })).toBeChecked();

    await user.keyboard('{ArrowLeft>}');
    await waitFor(() => expect(onChange).toHaveBeenLastCalledWith('away'));
    await user.keyboard('{/ArrowLeft}');
    expect(screen.getByRole('radio', { name: 'В гостях' })).toBeChecked();
  });

  it('moves focus to the ends with Home and End, Space selects', async () => {
    const { onChange, user } = setup('home');
    await user.tab();

    await user.keyboard('{End}');
    await waitFor(() =>
      expect(screen.getByRole('radio', { name: 'В гостях' })).toHaveFocus(),
    );
    expect(onChange).not.toHaveBeenCalled();

    await user.keyboard(' ');
    expect(onChange).toHaveBeenLastCalledWith('away');

    await user.keyboard('{Home}');
    await waitFor(() =>
      expect(screen.getByRole('radio', { name: 'Все' })).toHaveFocus(),
    );
  });

  it('types onChange with the option values', () => {
    expectTypeOf<Parameters<typeof SegmentedControl<Venue>>[0]['onChange']>()
      .parameter(0)
      .toEqualTypeOf<Venue>();
  });
});
