'use client';

import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';

const THEMES = [
  { value: 'system', label: 'Системная' },
  { value: 'dark', label: 'Тёмная' },
  { value: 'light', label: 'Светлая' },
] as const;

const subscribe = () => () => {};

// The server can't know the stored theme, so the active option
// is highlighted only after hydration.
function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const hydrated = useHydrated();

  return (
    <div
      role="group"
      aria-label="Тема"
      className="flex w-max gap-1 rounded-[10px] bg-muted p-1"
    >
      {THEMES.map((option) => {
        const active = hydrated && theme === option.value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => setTheme(option.value)}
            className={
              active
                ? `h-8 rounded-[7px] bg-card px-3.5 text-body-sm font-semibold
                  shadow-sm`
                : `h-8 rounded-[7px] px-3.5 text-body-sm font-semibold
                  text-muted-foreground hover:text-foreground`
            }
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
