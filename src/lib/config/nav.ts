import {
  CalendarDays,
  ChartLine,
  House,
  LogIn,
  Scale,
  Trophy,
  User,
  type LucideIcon,
} from 'lucide-react';

export type NavItem = { href: string; label: string; icon: LucideIcon };

/**
 * Site sections, the single source for the header and the tab bar.
 * An early mockup let the two lists drift apart; one list can't.
 */
export const mainNav = [
  { href: '/', label: 'Главная', icon: House },
  { href: '/leagues', label: 'Лиги', icon: Trophy },
  { href: '/calendar', label: 'Календарь', icon: CalendarDays },
  { href: '/predictions', label: 'Прогнозы', icon: ChartLine },
  { href: '/compare', label: 'Сравнение', icon: Scale },
] as const satisfies readonly NavItem[];

/** Mobile tab bar: the first four sections, then the account slot instead of «Сравнение». */
export function tabBarNav(signedIn: boolean): readonly NavItem[] {
  return [
    ...mainNav.slice(0, 4),
    signedIn
      ? { href: '/profile', label: 'Профиль', icon: User }
      : // Until sign-in exists (stage 5), «Войти» leads to the profile stub.
        { href: '/profile', label: 'Войти', icon: LogIn },
  ];
}

/** `/` matches only itself; any other section also matches its nested pages. */
export function isNavActive(href: string, pathname: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}
