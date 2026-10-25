import { SearchX } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { EmptyState } from '@/components/common/empty-state';
import { SiteShell } from '@/components/layout/site-shell';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = { title: 'Страница не найдена' };

// Handles both `notFound()` and any unknown URL. The full version with
// «Может быть, вы искали» comes in stage 6.
export default function NotFound() {
  return (
    <SiteShell>
      <div className="py-8">
        <EmptyState
          icon={SearchX}
          title="Страница не найдена"
          titleAs="h1"
          text="Возможно, ссылка устарела или в адресе опечатка."
          actions={
            <Button size="lg" asChild>
              <Link href="/">На главную</Link>
            </Button>
          }
        />
      </div>
    </SiteShell>
  );
}
