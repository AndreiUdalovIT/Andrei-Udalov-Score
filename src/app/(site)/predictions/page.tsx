import type { Metadata } from 'next';
import { ChartLine } from 'lucide-react';

import { ComingSoon } from '@/app/(site)/coming-soon';

export const metadata: Metadata = { title: 'Прогнозы' };

export default function PredictionsPage() {
  return <ComingSoon title="Прогнозы" icon={ChartLine} stage={4} />;
}
