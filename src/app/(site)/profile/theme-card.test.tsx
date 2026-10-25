import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, expect, it, vi } from 'vitest';

import { ThemeCard } from './theme-card';

const themes = vi.hoisted(() => ({
  theme: 'system',
  resolvedTheme: 'dark',
  setTheme: (() => {}) as (theme: string) => void,
}));

vi.mock('next-themes', () => ({ useTheme: () => themes }));

beforeEach(() => {
  themes.theme = 'system';
  themes.resolvedTheme = 'dark';
  themes.setTheme = vi.fn();
});

it('follows the device and says which theme that is now', () => {
  render(<ThemeCard />);

  expect(screen.getByRole('region', { name: 'Тема' })).toHaveTextContent(
    'как в настройках устройства — сейчас тёмная',
  );
  expect(screen.getByRole('radio', { name: 'Системная' })).toBeChecked();
});

it('keeps an explicit choice in this browser', () => {
  themes.theme = 'light';
  themes.resolvedTheme = 'light';
  render(<ThemeCard />);

  expect(screen.getByRole('region', { name: 'Тема' })).toHaveTextContent(
    'сохраняется в этом браузере',
  );
  expect(screen.getByRole('radio', { name: 'Светлая' })).toBeChecked();
});

it('switches the theme', async () => {
  render(<ThemeCard />);
  await userEvent.setup().click(screen.getByRole('radio', { name: 'Тёмная' }));

  expect(themes.setTheme).toHaveBeenCalledWith('dark');
});
