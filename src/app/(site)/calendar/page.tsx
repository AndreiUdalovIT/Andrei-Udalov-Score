import type { Metadata } from 'next';
import { CalendarDays } from 'lucide-react';

import { ComingSoon } from '@/app/(site)/coming-soon';

export const metadata: Metadata = { title: 'Календарь' };

export default function CalendarPage() {
  return <ComingSoon title="Календарь" icon={CalendarDays} stage={4} />;
}
