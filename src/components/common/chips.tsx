import type { ReactNode } from 'react';
import { RadioGroup } from 'radix-ui';

import { cn } from '@/lib/utils';

export type ChipItem<T extends string> = { value: T; label: ReactNode };

type ChipsProps<T extends string> = {
  items: readonly ChipItem<T>[];
  value: T;
  onChange: (value: T) => void;
  /** What is being filtered, read by screen readers: «Турнир». */
  label: string;
  className?: string;
};

/**
 * A single-choice filter row: «Все · АПЛ · Ла Лига…». Scrolls sideways inside
 * itself, so a long row never widens the page; edges fade where more chips hide.
 */
export function Chips<T extends string>({
  items,
  value,
  onChange,
  label,
  className,
}: ChipsProps<T>) {
  return (
    <RadioGroup.Root
      value={value}
      onValueChange={(next) => {
        const item = items.find((i) => i.value === next);
        if (item) onChange(item.value);
      }}
      orientation="horizontal"
      aria-label={label}
      className={cn(
        `no-scrollbar flex min-w-0 scroll-fade-x snap-x gap-1.5 overflow-x-auto
        overscroll-x-contain`,
        className,
      )}
    >
      {items.map((item) => (
        <RadioGroup.Item
          key={item.value}
          value={item.value}
          className="h-8 shrink-0 snap-start rounded-full border border-border px-3
            text-body-sm font-medium whitespace-nowrap text-foreground
            transition-colors outline-none hover:bg-muted focus-visible:ring-3
            focus-visible:ring-ring/50 data-[state=checked]:border-foreground
            data-[state=checked]:bg-foreground data-[state=checked]:text-background"
        >
          {item.label}
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  );
}
