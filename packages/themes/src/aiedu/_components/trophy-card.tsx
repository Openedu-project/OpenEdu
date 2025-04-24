import { cn } from '@oe/ui';
import { Sparkle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { BG_TROPHY } from '../_utils/constants';
import { formatNumber } from '../_utils/functions';
type TrophyType = 'silver' | 'gold' | 'bronze';
interface TrophyCardProps {
  type?: TrophyType;
  name?: string;
  registrations?: number;
  certificates?: number;
}

const TrophyCard = ({ type = 'gold', name, registrations, certificates }: TrophyCardProps) => {
  const t = useTranslations('themePage.aiedu.homepage.aieduDashboard');

  return (
    <div className={cn('w-full rounded-lg px-4 py-6 text-center', BG_TROPHY?.[type])}>
      {/* <Trophy type={city.trophy} /> */}
      <h3 className="mb-2 font-bold text-xl">{name}</h3>
      <div className="flex flex-col items-center gap-2 md:flex-row md:justify-center md:gap-4">
        <div className="space-y-1">
          <p className="font-bold text-lg">{formatNumber(registrations)}</p>
          <p className="text-xs">{t('registerCount')}</p>
        </div>
        <Sparkle />

        <div className="space-y-1">
          <p className="font-bold text-lg">{formatNumber(certificates)}</p>
          <p className="text-xs">{t('certCount')}</p>
        </div>
      </div>
    </div>
  );
};

export { type TrophyCardProps, type TrophyType, TrophyCard };
