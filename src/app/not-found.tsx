import type { Metadata } from 'next';
import Link from 'next/link';

import { SiteShell } from '@/components/layout/site-shell';
import { StatusPage } from '@/components/layout/status-page';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = { title: 'Страница не найдена' };

// Handles both `notFound()` and any unknown URL. Stage 4 puts «Найти команду
// или лигу» first (the home link turns outline); stage 6 adds «Может быть,
// вы искали».
export default function NotFound() {
  return (
    <SiteShell>
      <StatusPage
        role="status"
        code="404"
        title="Страница не найдена"
        text="Возможно, ссылка устарела или в адресе опечатка."
        actions={
          <Button size="lg" className="lg:h-10" asChild>
            <Link href="/">На главную</Link>
          </Button>
        }
      />
    </SiteShell>
  );
}
