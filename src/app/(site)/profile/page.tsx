import type { Metadata } from 'next';
import { User } from 'lucide-react';

import { ComingSoon } from '@/app/(site)/coming-soon';

import { ThemeCard } from './theme-card';

export const metadata: Metadata = { title: 'Профиль' };

// Sign-in and favorites arrive in stage 5; the theme works for everyone now.
export default function ProfilePage() {
  return (
    <ComingSoon title="Профиль" icon={User} stage={5}>
      <ThemeCard />
    </ComingSoon>
  );
}
