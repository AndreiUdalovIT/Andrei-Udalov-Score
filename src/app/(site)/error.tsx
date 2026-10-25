'use client';

import { RotateCw } from 'lucide-react';
import Link from 'next/link';

import { StatusPage } from '@/components/layout/status-page';
import { Button } from '@/components/ui/button';

/** Server errors carry a `digest` that matches the entry in the server logs. */
const digestOf = (error: unknown) =>
  error instanceof Error && 'digest' in error && typeof error.digest === 'string'
    ? error.digest
    : null;

// A page failed to render. The header and the tab bar stay: the boundary
// sits inside the `(site)` layout.
export default function SiteError({
  error,
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  const digest = digestOf(error);

  return (
    <StatusPage
      role="alert"
      code="500"
      title="Что-то пошло не так"
      text="Сервер не ответил. Попробуйте ещё раз через минуту."
      actions={
        <>
          <Button size="lg" className="lg:h-10" onClick={() => retry()}>
            <RotateCw aria-hidden="true" />
            Повторить
          </Button>
          <Button size="lg" variant="outline" className="lg:h-10" asChild>
            <Link href="/">На главную</Link>
          </Button>
        </>
      }
      footnote={digest && `код ошибки ${digest}`}
    />
  );
}
