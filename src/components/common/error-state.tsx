import { CircleAlert, LoaderCircle, RotateCw } from 'lucide-react';
import type { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ErrorStateProps = {
  title?: string;
  text?: ReactNode;
  /** Shows «Повторить»; omit when there is nothing to retry. */
  onRetry?: () => void;
  /** A retry is in flight: the button turns into «Подключаемся…». */
  retrying?: boolean;
  className?: string;
};

/** A block failed to load. Announced to screen readers as an alert. */
export function ErrorState({
  title = 'Не удалось загрузить данные',
  text = 'Сервер данных не ответил. Проверьте соединение или попробуйте ещё раз через минуту.',
  onRetry,
  retrying = false,
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        `flex flex-col items-center gap-2 rounded-lg border border-border bg-card
        px-6 py-10 text-center`,
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="grid size-11 place-items-center rounded-full bg-loss/16 text-loss"
      >
        <CircleAlert className="size-4" strokeWidth={1.75} />
      </span>
      <p className="mt-1 text-base font-semibold">{title}</p>
      <p className="max-w-100 text-body-sm text-pretty text-muted-foreground">
        {text}
      </p>
      {onRetry && (
        <Button size="lg" className="mt-3" onClick={onRetry} disabled={retrying}>
          {retrying ? (
            <LoaderCircle aria-hidden="true" className="animate-spin" />
          ) : (
            <RotateCw aria-hidden="true" />
          )}
          {retrying ? 'Подключаемся…' : 'Повторить'}
        </Button>
      )}
    </div>
  );
}
