import { Skeleton } from '@/components/ui/skeleton';

/** Shown while a page streams in: a title bar and a content card. */
export default function Loading() {
  return (
    <div role="status" aria-label="Загрузка" className="flex flex-col gap-6 py-8">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-62 w-full rounded-lg" />
    </div>
  );
}
