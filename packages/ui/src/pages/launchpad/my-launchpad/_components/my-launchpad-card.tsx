'use client';

import type { ILaunchpad } from '@oe/api/types/launchpad';
import DefaultImg from '@oe/assets/images/defaultimage.png';
import { formatDate } from '@oe/core/utils/datetime';
import { useTranslations } from 'next-intl';
import { useRouter } from '#common/navigation';
import { Image } from '#components/image';
import { getTimeStatus } from '#utils/launchpad-utils';

const CampaignCardCompact = ({ campaign }: { campaign: ILaunchpad }) => {
  const router = useRouter();
  const t = useTranslations('myLaunchpadList');

  if (!campaign) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <h3 className="giant-iheading-semibold20 mb-2">{t('noLaunchpads')}</h3>
      </div>
    );
  }

  const timeLeft = getTimeStatus(campaign?.funding_end_date);
  const timeText = timeLeft <= 0 ? t('ended') : `${timeLeft} ${timeLeft === 1 ? t('day') : t('days')} ${t('left')}`;

  return (
    <div className="space-y-4 rounded-2xl bg-white p-4 leading-[125%] shadow-[0px_4px_30px_0px_#F4F5F6] transition-all hover:scale-[102%]">
      <button
        type="button"
        className="relative min-h-[124px] w-full cursor-pointer overflow-hidden rounded-2xl"
        onClick={() => router.push(`/launchpad/${campaign?.id}`)}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            router.push(`/launchpad/${campaign?.id}`);
          }
        }}
      >
        <Image
          src={campaign?.thumbnail?.url || DefaultImg.src}
          alt="campaign card compact"
          fill
          className="h-full w-full"
          containerHeight={124}
        />
      </button>
      <div className="space-y-2">
        <div className="flex items-start justify-between">
          <button
            type="button"
            className="cursor-pointer text-left font-semibold text-[20px] leading-[125%] hover:text-primary"
            onClick={() => router.push(`/launchpad/${campaign?.id}`)}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                router.push(`/launchpad/${campaign?.id}`);
              }
            }}
          >
            {campaign?.name}
          </button>
          {/* <MyLaunchpadFavoriteButton id={} /> */}
          {/* <HeartIcon className="cursor-pointer" /> */}
        </div>
        {/* <Progress value={progress.percentage} className="h-1" /> */}

        <div className="flex flex-col items-start justify-between gap-2">
          <p className="mcaption-regular12">
            {t('createdBy')}
            <span className="mcaption-semibold14 ml-1">{campaign.owner?.display_name}</span>
          </p>
          <p className="mcaption-regular12">
            {t('createdAt')}
            <span className="mcaption-semibold14 ml-1">{formatDate(campaign?.create_at)}</span>
          </p>
        </div>

        <p className="text-base">
          <span className="font-semibold">{timeText}</span>
        </p>
      </div>
    </div>
  );
};

export default CampaignCardCompact;
