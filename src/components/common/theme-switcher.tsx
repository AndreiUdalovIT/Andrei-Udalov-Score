'use client';

import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';

import { SegmentedControl } from '@/components/common/segmented-control';

const THEMES = [
  { value: 'system', label: 'Системная' },
  { value: 'dark', label: 'Тёмная' },
  { value: 'light', label: 'Светлая' },
] as const;

export type ThemeName = (typeof THEMES)[number]['value'];

const isThemeName = (value: string | undefined): value is ThemeName =>
  THEMES.some((t) => t.value === value);

const subscribe = () => () => {};

/**
 * The stored theme choice and whether the page is dark right now. The server
 * can't know the stored theme, so both stay `null` until hydration.
 */
export function useThemeChoice() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  return {
    theme: hydrated && isThemeName(theme) ? theme : null,
    dark: hydrated ? resolvedTheme === 'dark' : null,
    setTheme,
  };
}

/** «Системная / Тёмная / Светлая»: unlike the header toggle, can go back to system. */
export function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme } = useThemeChoice();

  return (
    <SegmentedControl
      options={THEMES}
      value={theme}
      onChange={setTheme}
      label="Тема"
      className={className}
    />
  );
}
