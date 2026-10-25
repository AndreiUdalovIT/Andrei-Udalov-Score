import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

import { EmptyState } from '@/components/common/empty-state';

/**
 * Placeholder for a section that arrives in a later stage of the plan.
 * `children` — the parts that already work, shown below the placeholder.
 */
export function ComingSoon({
  title,
  icon,
  stage,
  children,
}: {
  title: string;
  icon: LucideIcon;
  stage: number;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6 py-8">
      <h1 className="text-h1">{title}</h1>
      <EmptyState
        icon={icon}
        title="Скоро"
        text={`Раздел появится на этапе ${stage}.`}
      />
      {children}
    </div>
  );
}
