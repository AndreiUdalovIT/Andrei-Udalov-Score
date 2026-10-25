'use client';

import { ChevronDown, Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { isNavActive, mainNav } from '@/lib/config/nav';
import { cn } from '@/lib/utils';

/** Header sections in a row, from 1100px. The only client part of the row: it reads the path. */
export function NavLinks({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Разделы" className={cn('gap-1', className)}>
      {mainNav.map((item) => {
        const active = isNavActive(item.href, pathname);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              `flex h-9 items-center rounded-md px-2.5 text-body font-medium
              whitespace-nowrap outline-none focus-visible:ring-3
              focus-visible:ring-ring/50`,
              active
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
}

/** The same sections behind «Меню», for 1024–1099px where the row doesn't fit. */
export function NavMenu({ className }: { className?: string }) {
  const pathname = usePathname();

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
          const active = isNavActive(item.href, pathname);
          return (
            <DropdownMenuItem
              key={item.href}
              asChild
              className={cn(active && 'bg-muted')}
            >
              <Link href={item.href} aria-current={active ? 'page' : undefined}>
                <item.icon aria-hidden="true" />
                {item.label}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
