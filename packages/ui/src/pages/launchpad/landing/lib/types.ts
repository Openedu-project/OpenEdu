import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

export type TLaunchpadStep = {
  step: number;
  title: string;
  listDesc: (string | ReactNode)[];
};

export type THowToGetMoney = {
  title: string;
  icon: LucideIcon;
  listDesc: (string | ReactNode)[];
};
