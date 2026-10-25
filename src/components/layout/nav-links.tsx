'use client';

import { ChevronDown, Menu } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { isNavActive, mainNav } from '@/lib/config/nav';
import { cn } from '@/lib/utils';

import { withPathname } from './with-pathname';

type NavProps = { className?: string };
type NavViewProps = NavProps & { pathname: string | null };

/** `null` path — the build-time fallback: nothing is highlighted. */
const active = (href: string, pathname: string | null) =>
  pathname !== null && isNavActive(href, pathname);

/** Header sections in a row, from 1100px. */
export const NavLinks = withPathname<NavProps>(function NavLinksView({
  className,
  pathname,
}: NavViewProps) {
  return (
    <nav aria-label="Разделы" className={cn('gap-1', className)}>
      {mainNav.map((item) => {
        const current = active(item.href, pathname);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={current ? 'page' : undefined}
            className={cn(
              `flex h-9 items-center rounded-md px-2.5 text-body font-medium
              whitespace-nowrap outline-none focus-visible:ring-3
              focus-visible:ring-ring/50`,
              current
                ? 'bg-muted text-foreground'
                : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
});

/** The same sections behind «Меню», for 1024–1099px where the row doesn't fit. */
export const NavMenu = withPathname<NavProps>(function NavMenuView({
  className,
  pathname,
}: NavViewProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className={cn('px-2.5', className)}>
          <Menu aria-hidden="true" />
          Меню
          <ChevronDown aria-hidden="true" className="text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-55">
        {mainNav.map((item) => {
          const current = active(item.href, pathname);
          return (
            <DropdownMenuItem
              key={item.href}
              asChild
              className={cn(current && 'bg-muted')}
            >
              <Link href={item.href} aria-current={current ? 'page' : undefined}>
                <item.icon aria-hidden="true" />
                {item.label}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
