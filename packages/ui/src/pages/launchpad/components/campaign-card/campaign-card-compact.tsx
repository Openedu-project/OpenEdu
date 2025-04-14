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

const CampainCardCompact = ({ campaign }: { campaign: ILaunchpad }) => {
  const router = useRouter();
  const t = useTranslations('launchpadHomepage');
  const timeLeft = getTimeStatus(campaign.funding_end_date);
  const timeText =
    timeLeft <= 0
      ? t('common.ended')
      : `${timeLeft} ${timeLeft === 1 ? t('common.day') : t('common.days')} ${t('common.left')}`;
  const progress = calculateProgress(Number(campaign.total_amount), Number(campaign.funding_goal.target_funding));

  return (
    <div className="space-y-4 rounded-2xl bg-white p-4 leading-[125%] shadow-[0px_4px_30px_0px_#F4F5F6] transition-all hover:scale-[102%]">
      <button
        type="button"
        className="relative min-h-[124px] w-full cursor-pointer overflow-hidden rounded-2xl"
        onClick={() => router.push(`/launchpad/${campaign.id}`)}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            router.push(`/launchpad/${campaign.id}`);
          }
        }}
      >
        <Image
          src={campaign.thumbnail?.url || DefaultImg.src}
          alt="campaign card compact"
          fill
          className="aspect-video h-full w-full"
          containerHeight={124}
        />
      </button>
      <div className="space-y-2">
        <div className="flex items-start justify-between">
          <button
            type="button"
            className="cursor-pointer text-left font-semibold text-[20px] leading-[125%] hover:text-primary"
            onClick={() => router.push(`/launchpad/${campaign.id}`)}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                router.push(`/launchpad/${campaign.id}`);
              }
            }}
          >
            {campaign.name}
          </button>
          {/* <HeartIcon className="cursor-pointer" /> */}
        </div>
        {campaign.status === 'publish' ? (
          <>
            <p className="font-normal text-base">
              {t('common.createBy')}
              <span className="font-semibold">{campaign.owner?.display_name}</span>
            </p>
            <p className="font-normal text-base">
              {t('common.createAt')}
              <span className="font-semibold">{formatDate(campaign.create_at)}</span>
            </p>
          </>
        ) : (
          <>
            <Progress value={progress.percentage} className="h-1" />
            <div className="flex items-start justify-between gap-2">
              <p className="text-base">
                <span className="font-semibold">{formatCurrency(Number(campaign.total_amount))}</span>
                funded
              </p>

              <span className="font-semibold text-base text-primary">{progress.displayText}</span>
            </div>
          </>
        )}

        {campaign.status === 'success' ? (
          <p className="text-base text-green-500 capitalize">
            <span className="font-semibold">Success</span>
          </p>
        ) : campaign.status === 'publish' ? (
          <></>
        ) : (
          <p className="text-base capitalize">
            <span className="font-semibold">{timeText}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export { CampainCardCompact };
