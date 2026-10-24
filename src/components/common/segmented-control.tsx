import type { ReactNode } from 'react';
import { RadioGroup } from 'radix-ui';

import { cn } from '@/lib/utils';

export type SegmentOption<T extends string> = { value: T; label: ReactNode };

type SegmentedControlProps<T extends string> = {
  options: readonly SegmentOption<T>[];
  value: T;
  /** Receives exactly one of the option values, typed as `T`. */
  onChange: (value: T) => void;
  /** What is being chosen, read by screen readers: «Тема», «Таблица». */
  label: string;
  className?: string;
};

/**
 * One choice out of a few: «Все / Дома / В гостях», «Тёмная / Светлая».
 * A radio group under the hood: arrow keys move the selection (wrapping
 * around), Home/End move focus to the ends and Space selects, and only the
 * selected segment is in the tab order.
 */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  label,
  className,
}: SegmentedControlProps<T>) {
  return (
    <RadioGroup.Root
      value={value}
      // Radix hands back a plain string; map it to the typed option value.
      onValueChange={(next) => {
        const option = options.find((o) => o.value === next);
        if (option) onChange(option.value);
      }}
      orientation="horizontal"
      aria-label={label}
      className={cn('flex w-max gap-1 rounded-[10px] bg-muted p-1', className)}
    >
      {options.map((option) => (
        <RadioGroup.Item
          key={option.value}
          value={option.value}
          className="h-8 rounded-[7px] px-3.5 text-body-sm font-semibold
            whitespace-nowrap text-muted-foreground transition-colors outline-none
            hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50
            data-[state=checked]:bg-card data-[state=checked]:text-foreground
            data-[state=checked]:shadow-sm"
        >
          {option.label}
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  );
}
