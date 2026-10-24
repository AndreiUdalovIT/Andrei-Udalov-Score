'use client';

import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';

import { SegmentedControl } from '@/components/common/segmented-control';

const THEMES = [
  { value: 'system', label: 'Системная' },
  { value: 'dark', label: 'Тёмная' },
  { value: 'light', label: 'Светлая' },
] as const;

type ThemeName = (typeof THEMES)[number]['value'];

const isThemeName = (value: string | undefined): value is ThemeName =>
  THEMES.some((t) => t.value === value);

const subscribe = () => () => {};

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  // The server can't know the stored theme: select nothing until hydration.
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  return (
    <SegmentedControl
      options={THEMES}
      value={hydrated && isThemeName(theme) ? theme : null}
      onChange={setTheme}
      label="Тема"
    />
  );
}
