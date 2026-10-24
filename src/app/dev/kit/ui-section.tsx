'use client';

import { CalendarDays, ChevronDown, Search, Star } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { Chips } from '@/components/common/chips';
import { EmptyState } from '@/components/common/empty-state';
import { ErrorState } from '@/components/common/error-state';
import { SegmentedControl } from '@/components/common/segmented-control';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from '@/components/ui/command';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { Demo, Section } from './section';

const VENUES = [
  { value: 'all', label: 'Все' },
  { value: 'home', label: 'Дома' },
  { value: 'away', label: 'В гостях' },
] as const;

const COMPETITIONS = [
  { value: 'all', label: 'Все' },
  { value: 'pl', label: 'АПЛ' },
  { value: 'pd', label: 'Ла Лига' },
  { value: 'bl1', label: 'Бундеслига' },
  { value: 'sa', label: 'Серия А' },
  { value: 'fl1', label: 'Лига 1' },
  { value: 'cl', label: 'Лига чемпионов' },
] as const;

export function UiSection() {
  const [venue, setVenue] = useState<(typeof VENUES)[number]['value']>('all');
  const [competition, setCompetition] =
    useState<(typeof COMPETITIONS)[number]['value']>('all');
  const [retrying, setRetrying] = useState(false);

  const retry = () => {
    setRetrying(true);
    setTimeout(() => setRetrying(false), 2000);
  };

  return (
    <>
      <Section
        title="Кнопки"
        note="sm 32 · default 36 · lg 44 — минимальная зона нажатия на мобильной"
      >
        <div className="flex flex-col gap-5">
          <Demo label="Варианты">
            <Button>Primary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Удалить аккаунт</Button>
            <Button variant="link">Методология</Button>
            <Button disabled>Disabled</Button>
          </Demo>
          <Demo label="Размеры и иконки">
            <Button size="sm" variant="outline">
              Small
            </Button>
            <Button>Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon-sm" variant="ghost" aria-label="Избранное">
              <Star />
            </Button>
            <Button size="icon" variant="outline" aria-label="Поиск">
              <Search />
            </Button>
            <Button size="icon-lg" variant="secondary" aria-label="Календарь">
              <CalendarDays />
            </Button>
          </Demo>
        </div>
      </Section>

      <Section title="Переключатели">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Demo label={`SegmentedControl · выбрано: ${venue}`}>
            <SegmentedControl
              options={VENUES}
              value={venue}
              onChange={setVenue}
              label="Матчи"
            />
          </Demo>
          <Demo label="Tabs (shadcn) · разделы страницы">
            <Tabs defaultValue="table">
              <TabsList>
                <TabsTrigger value="table">Таблица</TabsTrigger>
                <TabsTrigger value="matches">Матчи</TabsTrigger>
                <TabsTrigger value="stats">Статистика</TabsTrigger>
              </TabsList>
            </Tabs>
          </Demo>
          <div className="flex min-w-0 flex-col gap-2 lg:col-span-2">
            <span className="text-caption text-muted-foreground">
              Chips · выбрано: {competition} — сузьте окно до 360, ряд листается
              внутри себя
            </span>
            <Chips
              items={COMPETITIONS}
              value={competition}
              onChange={setCompetition}
              label="Турнир"
            />
          </div>
          <Demo label="Switch · Select">
            <label className="flex items-center gap-2 text-body-sm">
              <Switch defaultChecked /> Только мои команды
            </label>
            <Select defaultValue="pl">
              <SelectTrigger className="w-48" aria-label="Лига">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {COMPETITIONS.slice(1).map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Demo>
          <Demo label="Badge">
            <Badge>Новое</Badge>
            <Badge variant="secondary">Мало данных</Badge>
            <Badge variant="outline">ЛЧ · 1/8</Badge>
            <Badge variant="destructive">Вылет</Badge>
          </Demo>
        </div>
      </Section>

      <Section
        title="Всплывающие элементы"
        note="Затемнение — токен --overlay, тени — shadow-md / shadow-lg"
      >
        <div className="flex flex-col gap-5">
          <Demo label="Dialog · Sheet · Popover · Tooltip · DropdownMenu · Toast">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Выйти из аккаунта?</DialogTitle>
                  <DialogDescription>
                    Синхронизация избранного между устройствами остановится.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Отмена</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button>Выйти</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Sheet снизу</Button>
              </SheetTrigger>
              <SheetContent side="bottom">
                <SheetHeader>
                  <SheetTitle>Выбор команд</SheetTitle>
                  <SheetDescription>
                    На мобильной диалоги открываются шторкой.
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  Октябрь 2026 <ChevronDown />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 text-body-sm">
                Здесь будет выбор месяца с точками дней, когда есть матчи.
              </PopoverContent>
            </Popover>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost">Обновлено 2 ч назад</Button>
              </TooltipTrigger>
              <TooltipContent>Синхронизация каждые 4 часа</TooltipContent>
            </Tooltip>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Меню профиля</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuLabel>andrei</DropdownMenuLabel>
                <DropdownMenuItem>Мои команды</DropdownMenuItem>
                <DropdownMenuItem>Профиль и настройки</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Выйти</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              onClick={() =>
                toast('«Inter» убран из избранного', {
                  duration: 5000,
                  action: { label: 'Вернуть', onClick: () => {} },
                })
              }
            >
              Toast
            </Button>
          </Demo>

          <Demo label="Command · основа палитры Ctrl K">
            <Command className="max-w-md rounded-lg border border-border">
              <CommandInput placeholder="Поиск команд и лиг" />
              <CommandList>
                <CommandEmpty>Ничего не найдено</CommandEmpty>
                <CommandGroup heading="Команды">
                  <CommandItem>Arsenal</CommandItem>
                  <CommandItem>Liverpool</CommandItem>
                  <CommandItem>Inter</CommandItem>
                </CommandGroup>
                <CommandGroup heading="Действия">
                  <CommandItem>
                    Сравнить Arsenal с…
                    <CommandShortcut>⏎</CommandShortcut>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </Demo>

          <Demo label="Skeleton · загрузка">
            <div className="flex w-full max-w-md flex-col gap-2">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-15 w-full" />
              <Skeleton className="h-15 w-full" />
            </div>
          </Demo>
        </div>
      </Section>

      <Section title="Состояния">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <EmptyState
            icon={CalendarDays}
            title="Пауза на матчи сборных"
            text="В топ-лигах матчей нет до субботы, 21 ноября. Ближайший — «Arsenal» — «Tottenham», 15:30."
            actions={
              <>
                <Button size="lg">К 21 ноября</Button>
                <Button size="lg" variant="outline">
                  Открыть календарь
                </Button>
              </>
            }
          />
          <ErrorState
            title="Не удалось загрузить матчи"
            onRetry={retry}
            retrying={retrying}
          />
          <EmptyState
            variant="dashed"
            title="У ваших команд нет матчей в этот день"
            text="Снимите фильтр «Только мои команды» или выберите другую дату."
          />
        </div>
      </Section>
    </>
  );
}
