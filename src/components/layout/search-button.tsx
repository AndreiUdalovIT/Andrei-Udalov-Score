'use client';

import { Search } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Stub until the Ctrl K command palette (stage 4).
const announce = () => toast('Поиск команд и лиг появится на этапе 4');

/** Full search field from 1280px: looks like an input, opens the palette. */
export function SearchField({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={announce}
      className={cn(
        `h-9 min-w-45 flex-[0_1_280px] items-center gap-2 rounded-md border bg-card
        pr-1.5 pl-3 text-body-sm text-muted-foreground outline-none
        hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50`,
        className,
      )}
    >
      <Search aria-hidden="true" className="size-4 shrink-0" />
      <span className="min-w-0 flex-1 truncate text-left">Поиск команд и лиг</span>
      <kbd
        className="h-5.5 shrink-0 rounded-xs border bg-background px-1.5 font-mono
          text-micro leading-5 font-normal"
      >
        Ctrl K
      </kbd>
    </button>
  );
}

/** Search as an icon: below 1280px on desktop, and in the mobile header. */
export function SearchIconButton({
  className,
  mobile = false,
}: {
  className?: string;
  mobile?: boolean;
}) {
  return (
    <Button
      variant={mobile ? 'ghost' : 'outline'}
      size={mobile ? 'icon-lg' : 'icon'}
      aria-label="Поиск команд и лиг"
      title="Поиск команд и лиг · Ctrl K"
      onClick={announce}
      className={cn(!mobile && 'bg-card', mobile && 'text-foreground', className)}
    >
      <Search aria-hidden="true" />
    </Button>
  );
}
