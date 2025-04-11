'use client';

import type { ILaunchpad } from '@oe/api';
import DefaultImg from '@oe/assets/images/defaultimage.png';
import { formatCurrency, formatDate } from '@oe/core';
import { useTranslations } from 'next-intl';
import { useRouter } from '#common/navigation';
import { Image } from '#components/image';
import { Progress } from '#shadcn/progress';
// import { formatCurrency } from '#utils/format-currency';
import { calculateProgress, getTimeStatus } from '#utils/launchpad-utils';

const CampainCardFull = ({ campaign }: { campaign: ILaunchpad }) => {
  const router = useRouter();
  const t = useTranslations('launchpadHomepage');
  const timeLeft = getTimeStatus(campaign.funding_end_date);
  const timeText =
    timeLeft <= 0
      ? t('common.ended')
      : `${timeLeft} ${timeLeft === 1 ? t('common.day') : t('common.days')} ${t('common.left')}`;

  const progress = calculateProgress(Number(campaign.total_amount), Number(campaign.funding_goal.target_funding));

  return (
    <div className="space-y-4 rounded-2xl bg-white p-4 leading-[125%] transition-all hover:scale-[102%]">
      <div
        className="relative h-full min-h-[290px] w-full cursor-pointer overflow-hidden rounded-2xl"
        onClick={() => router.push(`/launchpad/${campaign.id}`)}
        onKeyUp={e => {
          if (e.key === 'Enter') {
            router.push(`/launchpad/${campaign.id}`);
          }
        }}
      >
        <Image
          className="h-full w-full"
          alt="campain full card image"
          src={campaign.thumbnail?.url || DefaultImg.src}
          fill
          containerHeight={290}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3
            className="cursor-pointer font-semibold text-xl hover:text-primary"
            onClick={() => router.push(`/launchpad/${campaign.id}`)}
            onKeyUp={e => {
              if (e.key === 'Enter') {
                router.push(`/launchpad/${campaign.id}`);
              }
            }}
          >
            {campaign.name}
          </h3>
          {/* <HeartIcon className="cursor-pointer" fill="black" /> */}
        </div>
        <p className="font-normal text-base">
          {t('common.createBy')}
          <span className="font-semibold"> {campaign.owner?.display_name}</span>
        </p>
        <p className="font-normal text-base">
          {t('common.createAt')}
          <span className="font-semibold">{formatDate(campaign.create_at)}</span>
        </p>
      </div>
      <Progress value={progress.percentage} className="h-2" />
      <div className="flex items-center justify-between gap-2 text-base">
        <p>
          <span className="font-semibold">
            {formatCurrency(Number(campaign.total_amount), {
              currency: campaign.funding_goal.currency,
            })}
          </span>
          {t('common.funded')}
        </p>
        <p>
          <span className="font-semibold capitalize">{timeText}</span>
        </p>
      </div>
    </div>
  );
};

export { CampainCardFull };
