'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

/**
 * Flips between light and dark from whatever is showing now, system included.
 * The icon follows the `dark` class on <html>, which is set before the first
 * paint — so it never flashes the wrong one, and needs no JS to pick.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label="Сменить тему"
      title="Сменить тему"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      <Sun aria-hidden="true" className="dark:hidden" />
      <Moon aria-hidden="true" className="hidden dark:block" />
    </Button>
  );
}
