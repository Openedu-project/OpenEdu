'use client';

import type { ILaunchpad } from '@oe/api/types/launchpad';
import DefaultImg from '@oe/assets/images/defaultimage.png';
import { formatDate } from '@oe/core/utils/datetime';
import { useTranslations } from 'next-intl';
import { useRouter } from '#common/navigation';
import { Image } from '#components/image';
import { Progress } from '#shadcn/progress';
import { formatCurrency } from '#utils/format-currency';
import { calculateProgress, getTimeStatus } from '#utils/launchpad-utils';

const CampainCardHorizontal = ({ campaign }: { campaign: ILaunchpad }) => {
  const router = useRouter();
  const t = useTranslations('launchpadHomepage');
  const timeLeft = getTimeStatus(campaign.funding_end_date);
  const timeText =
    timeLeft <= 0
      ? t('common.ended')
      : `${timeLeft} ${timeLeft === 1 ? t('common.day') : t('common.days')} ${t('common.left')}`;

  const progress = calculateProgress(Number(campaign.total_amount), Number(campaign.funding_goal.target_funding));

  const handleNavigate = () => router.push(`/launchpad/${campaign.id}`);

  return (
    <div className="space-y-4 rounded-2xl bg-white p-4 leading-[125%] transition-all hover:scale-[102%]">
      <div className="flex items-start gap-4">
        <button
          type="button"
          className="relative m-h-[140px] h-full w-2/5 cursor-pointer overflow-hidden rounded-2xl"
          onClick={handleNavigate}
        >
          <Image
            className="w-full"
            alt="campain full card image"
            src={campaign.thumbnail?.url || DefaultImg.src}
            fill
            containerHeight={140}
          />
        </button>
        <div className="w-3/5 space-y-2">
          <div className="space-y-2">
            <button type="button" className="block w-full text-left" onClick={handleNavigate}>
              <h3 className="font-semibold text-xl hover:text-primary">{campaign.name}</h3>
            </button>
            <p className="font-normal text-base">
              {t('common.createBy')}
              <span className="font-semibold">{campaign.owner?.display_name}</span>
            </p>
            <p className="font-normal text-base">
              {t('common.createAt')}
              <span className="font-semibold">{formatDate(campaign.create_at)}</span>
            </p>
          </div>
        </div>
      </div>
      <Progress value={progress.percentage} className="h-2" />
      <div className="flex items-center justify-between gap-2 text-base">
        <p>
          <span className="font-semibold text-base">
            {formatCurrency(Number(campaign.total_amount))} {campaign.funding_goal.currency}
          </span>
          {t('common.funded')}
        </p>
        <p className="font-semibold">{timeText}</p>
      </div>
    </div>
  );
};

export default CampainCardHorizontal;
