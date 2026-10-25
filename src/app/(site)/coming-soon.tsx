import type { LucideIcon } from 'lucide-react';

import { EmptyState } from '@/components/common/empty-state';

/** Placeholder for a section that arrives in a later stage of the plan. */
export function ComingSoon({
  title,
  icon,
  stage,
}: {
  title: string;
  icon: LucideIcon;
  stage: number;
}) {
  return (
    <div className="flex flex-col gap-6 py-8">
      <h1 className="text-h1">{title}</h1>
      <EmptyState
        icon={icon}
        title="Скоро"
        text={`Раздел появится на этапе ${stage}.`}
      />
    </div>
  );
}
