import BronzeTrophy from '@oe/assets/images/theme/aiedu/bronze-trophy.png';
import GoldTrophy from '@oe/assets/images/theme/aiedu/gold-trophy.png';
import SilverTrophy from '@oe/assets/images/theme/aiedu/silver-trophy.png';

import { Image, cn } from '@oe/ui';
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

  const trophyImage = {
    gold: (
      <div className="h-[98px] translate-y-8">
        <Image
          src={GoldTrophy?.src}
          height={98}
          width={90}
          alt="gold-trophy"
          className="h-[98px] w-full object-contain"
        />
      </div>
    ),
    silver: (
      <div className="h-[64px] translate-y-8">
        <Image
          src={SilverTrophy?.src}
          height={64}
          width={58}
          alt="silver-trophy"
          className="h-[64px] w-full object-contain"
        />
      </div>
    ),
    bronze: (
      <div className="h-[64px] translate-y-8">
        <Image
          src={BronzeTrophy?.src}
          height={64}
          width={58}
          alt="bronze-trophy"
          className="h-[64px] w-full object-contain"
        />
      </div>
    ),
  };

  return (
    <div className="flex w-full flex-col justify-end">
      {trophyImage?.[type]}
      <div className={cn('w-full rounded-3xl px-4 py-6 pt-12 text-center', BG_TROPHY?.[type])}>
        {/* <Trophy type={city.trophy} /> */}

        <h3 className="mb-2 font-bold text-xl">{name}</h3>
        <div className="flex flex-col items-center gap-2 md:flex-row md:justify-center md:gap-4">
          <div className="space-y-1">
            <p className="font-bold text-xl">{formatNumber(registrations)}</p>
            <p>{t('registerCount')}</p>
          </div>
          <Sparkle />

          <div className="space-y-1">
            <p className="font-bold text-xl">{formatNumber(certificates)}</p>
            <p>{t('certCount')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { type TrophyCardProps, type TrophyType, TrophyCard };
