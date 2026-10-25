'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { isNavActive, tabBarNav } from '@/lib/config/nav';
import { cn } from '@/lib/utils';

/**
 * Bottom navigation below 1024px. Sticky rather than fixed: it is the last
 * block of the page, so it pins to the screen bottom yet never covers the
 * footer. The bottom padding clears the iPhone home indicator.
 */
export function BottomTabBar({ signedIn = false }: { signedIn?: boolean }) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Разделы"
      className="sticky bottom-0 z-20 grid grid-cols-5 border-t bg-background
        pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      {tabBarNav(signedIn).map((item) => {
        const active = isNavActive(item.href, pathname);
        return (
          <Link
            key={item.label}
            href={item.href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              `flex h-16 flex-col items-center justify-center gap-1 text-micro
              outline-none focus-visible:ring-3 focus-visible:ring-ring/50
              focus-visible:ring-inset`,
              active
                ? 'font-semibold text-primary'
                : 'font-medium text-muted-foreground',
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                'grid h-6 w-10 place-items-center rounded-full',
                active && 'bg-primary-soft',
              )}
            >
              <item.icon className="size-5" strokeWidth={active ? 2 : 1.75} />
            </span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
