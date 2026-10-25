import type { Metadata } from 'next';
import { Scale } from 'lucide-react';

import { ComingSoon } from '@/app/(site)/coming-soon';

export const metadata: Metadata = { title: 'Сравнение' };

export default function ComparePage() {
  return <ComingSoon title="Сравнение" icon={Scale} stage={4} />;
}
