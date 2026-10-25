'use client';

import { useId } from 'react';

import {
  type ThemeName,
  ThemeSwitcher,
  useThemeChoice,
} from '@/components/common/theme-switcher';

function describe(theme: ThemeName | null, dark: boolean | null) {
  // A non-breaking space holds the line until hydration, so nothing jumps.
  if (theme === null) return ' ';
  if (theme === 'system') {
    return `как в настройках устройства — сейчас ${dark ? 'тёмная' : 'светлая'}`;
  }
  return 'сохраняется в этом браузере';
}

/**
 * «Тема» card from the profile mockup. Guests get it too: on phones the
 * header has no theme toggle, and «Войти» in the tab bar leads here.
 */
export function ThemeCard() {
  const { theme, dark } = useThemeChoice();
  const headingId = useId();

  return (
    <section
      aria-labelledby={headingId}
      className="flex flex-wrap items-center gap-x-4 gap-y-3 rounded-lg border
        bg-card p-4 lg:p-5"
    >
      <div className="flex min-w-0 flex-[1_1_220px] flex-col gap-0.5">
        <h2 id={headingId} className="text-h3">
          Тема
        </h2>
        <p className="text-body-sm text-muted-foreground">{describe(theme, dark)}</p>
      </div>
      {/* Full width with equal segments on phones, as wide as needed from 1024. */}
      <ThemeSwitcher className="w-full *:flex-1 lg:w-max" />
    </section>
  );
}
