import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ThemeSwitcher } from './theme-switcher';

export const metadata: Metadata = {
  title: 'Токены и компоненты',
  robots: { index: false },
};

type Swatch = { token: string; className: string; note: string };

// Full class names are listed literally so Tailwind can find them.
const COLOR_GROUPS: { title: string; swatches: Swatch[] }[] = [
  {
    title: 'Базовые',
    swatches: [
      { token: 'background', className: 'bg-background', note: 'Фон страницы' },
      {
        token: 'foreground',
        className: 'bg-foreground',
        note: 'Основной текст, цифры',
      },
      { token: 'card', className: 'bg-card', note: 'Карточки, таблицы' },
      { token: 'muted', className: 'bg-muted', note: 'Hover, трек табов, заглушки' },
      {
        token: 'muted-foreground',
        className: 'bg-muted-foreground',
        note: 'Подписи, мета',
      },
      {
        token: 'subtle-foreground',
        className: 'bg-subtle-foreground',
        note: 'Шевроны, «–» вместо счёта',
      },
      {
        token: 'border',
        className: 'bg-border',
        note: 'Обводки, разделители, поля',
      },
    ],
  },
  {
    title: 'Бренд',
    swatches: [
      {
        token: 'primary',
        className: 'bg-primary',
        note: 'Единственный акцент: CTA, активное',
      },
      {
        token: 'primary-foreground',
        className: 'bg-primary-foreground',
        note: 'Текст на акценте',
      },
      {
        token: 'primary-soft',
        className: 'bg-primary-soft',
        note: 'Подложка активного пункта',
      },
    ],
  },
  {
    title: 'Результат · статус',
    swatches: [
      { token: 'win', className: 'bg-win', note: 'Победа — «В»' },
      { token: 'draw', className: 'bg-draw', note: 'Ничья — «Н»' },
      { token: 'loss', className: 'bg-loss', note: 'Поражение — «П»' },
      {
        token: 'status-live',
        className: 'bg-status-live',
        note: 'Идёт — точка и слово',
      },
    ],
  },
  {
    title: 'Зоны таблицы',
    swatches: [
      { token: 'zone-ucl', className: 'bg-zone-ucl', note: 'Лига чемпионов — «ЛЧ»' },
      { token: 'zone-uel', className: 'bg-zone-uel', note: 'Лига Европы — «ЛЕ»' },
      {
        token: 'zone-uecl',
        className: 'bg-zone-uecl',
        note: 'Лига конференций — «ЛК»',
      },
      { token: 'zone-playoff', className: 'bg-zone-playoff', note: 'Стыки' },
      {
        token: 'zone-releg',
        className: 'bg-zone-releg',
        note: 'Вылет; в ЛЧ — «Выбыли»',
      },
    ],
  },
  {
    title: 'Графики · Okabe–Ito',
    swatches: [
      { token: 'chart-1', className: 'bg-chart-1', note: 'Синий' },
      { token: 'chart-2', className: 'bg-chart-2', note: 'Оранжевый' },
      { token: 'chart-3', className: 'bg-chart-3', note: 'Сине-зелёный' },
      { token: 'chart-4', className: 'bg-chart-4', note: 'Жёлтый' },
      { token: 'chart-5', className: 'bg-chart-5', note: 'Пурпурный' },
      { token: 'chart-draw', className: 'bg-chart-draw', note: 'Ничья, «прочие»' },
    ],
  },
  {
    title: 'Синонимы',
    swatches: [
      {
        token: 'chart-home',
        className: 'bg-chart-home',
        note: '= chart-1 · хозяева, П1',
      },
      {
        token: 'chart-away',
        className: 'bg-chart-away',
        note: '= chart-2 · гости, П2',
      },
      { token: 'team-a', className: 'bg-team-a', note: '= chart-home · команда A' },
      { token: 'team-b', className: 'bg-team-b', note: '= chart-away · команда B' },
      {
        token: 'overlay',
        className: 'bg-overlay',
        note: 'Затемнение под диалогами',
      },
    ],
  },
];

const TYPE_SCALE = [
  { className: 'text-score-xl', spec: '48/56 · 600', sample: '2 : 1' },
  { className: 'text-display', spec: '32/40 · 600', sample: '64% · Barça' },
  { className: 'text-h1', spec: '24/32 · 600', sample: 'Ла Лига · 10-й тур' },
  { className: 'text-h2', spec: '18/24 · 600', sample: 'Мои команды' },
  { className: 'text-h3', spec: '15/20 · 600', sample: 'Обновление данных' },
  { className: 'text-score', spec: '16/20 · 600', sample: '3 : 1   0 : 2   1 : 1' },
  {
    className: 'text-body',
    spec: '14/20 · 400',
    sample: 'Arsenal — Man City 19:30',
  },
  {
    className: 'text-body-sm',
    spec: '13/18 · 400',
    sample: 'Данные обновлены 2 ч назад',
  },
  {
    className: 'text-caption',
    spec: '12/16 · 400',
    sample: 'Англия · 9-й тур · 44% 26% 30%',
  },
  { className: 'text-micro', spec: '11/14 · 600', sample: 'ЛЧ  В  Н  П' },
];

const NUMBERS = ['111', '888', '1 234', '10 : 2', '71,4%'];

const RADII = [
  { className: 'rounded-xs', label: 'xs · 4 · бейджи' },
  { className: 'rounded-sm', label: 'sm · 6 · лого' },
  { className: 'rounded-md', label: 'md · 8 · кнопки' },
  { className: 'rounded-lg', label: 'lg · 12 · карточки' },
  { className: 'rounded-full', label: 'full' },
];

const SHADOWS = [
  { className: 'shadow-sm', label: 'sm · активный таб' },
  { className: 'shadow-md', label: 'md · подсказка' },
  { className: 'shadow-lg', label: 'lg · диалог' },
];

const PANGRAM = 'Съешь же ещё этих мягких французских булок · Quick brown fox';

export default function DevKitPage() {
  // Showcase for local development and preview deployments only.
  if (process.env.VERCEL_ENV === 'production') notFound();

  return (
    <main
      className="mx-auto flex w-full max-w-[1280px] flex-col gap-8 px-4 py-8 lg:px-8"
    >
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-caption text-muted-foreground">
            Udalov Score · витрина для разработки
          </p>
          <h1 className="text-h1">Токены и компоненты</h1>
          <BreakpointBadge />
        </div>
        <ThemeSwitcher />
      </header>

      <Section title="Цвет">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {COLOR_GROUPS.map((group) => (
            <div key={group.title} className="flex flex-col gap-3">
              <h3 className="text-h3">{group.title}</h3>
              <ul className="flex flex-col gap-2">
                {group.swatches.map((swatch) => (
                  <li key={swatch.token} className="flex items-center gap-3">
                    <span
                      className={`size-10 shrink-0 rounded-md border border-border
                      ${swatch.className}`}
                    />
                    <span className="flex min-w-0 flex-col">
                      <span className="truncate font-mono text-caption">
                        --{swatch.token}
                      </span>
                      <span className="truncate text-caption text-muted-foreground">
                        {swatch.note}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Типографика · IBM Plex Sans">
        <ul className="flex flex-col divide-y divide-border">
          {TYPE_SCALE.map((style) => (
            <li
              key={style.className}
              className="grid grid-cols-1 gap-x-4 gap-y-1 py-3 first:pt-0 last:pb-0
                sm:grid-cols-[9rem_6rem_minmax(0,1fr)] sm:items-center"
            >
              <span className="font-mono text-caption">{style.className}</span>
              <span className="font-mono text-caption text-muted-foreground">
                {style.spec}
              </span>
              <span
                className={`overflow-hidden text-ellipsis whitespace-pre
                ${style.className}`}
              >
                {style.sample}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Section title="Цифры">
          <div className="grid grid-cols-2 gap-6">
            <NumberColumn title="tabular-nums · везде" className="" />
            <NumberColumn
              title="proportional · для сравнения"
              className="proportional-nums"
            />
          </div>
          <p className="mt-4 text-caption text-muted-foreground">
            В левой колонке «111» и «888» одной ширины — счёт и таблицы не прыгают.
          </p>
        </Section>

        <Section title="Шрифты">
          <ul className="flex flex-col gap-2 text-body">
            <li className="truncate font-normal">400 · {PANGRAM}</li>
            <li className="truncate font-medium">500 · {PANGRAM}</li>
            <li className="truncate font-semibold">600 · {PANGRAM}</li>
            <li className="truncate font-bold">700 · {PANGRAM}</li>
            <li className="truncate font-mono">Mono 400 · ARS MCI 2 : 1 · Модрич</li>
            <li className="truncate font-mono font-medium">
              Mono 500 · ARS MCI 2 : 1 · Модрич
            </li>
          </ul>
        </Section>
      </div>

      <Section title="Радиусы и тени">
        <div className="flex flex-wrap gap-6">
          {RADII.map((radius) => (
            <figure
              key={radius.className}
              className="flex flex-col items-center gap-2"
            >
              <span
                className={`size-14 border-[1.5px] border-primary bg-primary-soft
                ${radius.className}`}
              />
              <figcaption className="text-caption text-muted-foreground">
                {radius.label}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-6">
          {SHADOWS.map((shadow) => (
            <figure key={shadow.className} className="flex flex-col gap-2">
              <span className={`h-14 w-24 rounded-md bg-card ${shadow.className}`} />
              <figcaption className="text-caption text-muted-foreground">
                {shadow.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-h2">{title}</h2>
      <div className="rounded-lg border border-border bg-card p-5">{children}</div>
    </section>
  );
}

function NumberColumn({ title, className }: { title: string; className: string }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <span className="text-caption text-muted-foreground">{title}</span>
      {NUMBERS.map((number) => (
        <span key={number} className="text-right text-score">
          {number}
        </span>
      ))}
    </div>
  );
}

function BreakpointBadge() {
  return (
    <p className="text-caption text-muted-foreground">
      Раскладка:{' '}
      <span className="font-semibold text-foreground lg:hidden">
        мобильная, до 1024
      </span>
      <span className="hidden font-semibold text-foreground lg:inline nav:hidden">
        1024–1099 · разделы в «Меню»
      </span>
      <span className="hidden font-semibold text-foreground nav:inline xl:hidden">
        1100–1279 · поиск иконкой
      </span>
      <span className="hidden font-semibold text-foreground xl:inline">
        от 1280 · полная шапка
      </span>
    </p>
  );
}
