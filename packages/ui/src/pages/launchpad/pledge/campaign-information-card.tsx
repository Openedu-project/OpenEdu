import type { ILaunchpad } from '@oe/api';
import DefaultImg from '@oe/assets/images/defaultimage.png';
import { formatCurrency } from '@oe/core';
import { getTranslations } from 'next-intl/server';
import { CircularProgress } from '#components/circular-progress';
import { Image } from '#components/image';
// import { formatCurrency } from '#utils/format-currency';
import { calculateProgress, getTimeStatus } from '#utils/launchpad-utils';

const CampaignInformationCard = async ({
  campaign,
}: {
  campaign: ILaunchpad | null;
}) => {
  const t = await getTranslations('launchpadDetailPage');

  const timeLeft = getTimeStatus(campaign?.funding_end_date || 0);
  const timeText =
    timeLeft <= 0
      ? t('common.ended')
      : `${timeLeft} ${timeLeft === 1 ? t('common.day') : t('common.days')} ${t('common.left')}`;

  const progress = calculateProgress(Number(campaign?.total_amount), Number(campaign?.funding_goal.target_funding));

  return (
    <aside className="h-full w-full lg:w-[40%]">
      <div className="rounded-2xl bg-white p-6 shadow-[0px_4px_30px_0px_#F4F5F6]">
        <div className="relative mb-6 h-full min-h-[224px] w-full cursor-pointer overflow-hidden rounded-2xl">
          <Image
            className="h-full w-full"
            alt="campain full card image"
            src={campaign?.thumbnail?.url || DefaultImg.src}
            fill
            containerHeight={224}
          />
        </div>

        <h2 className="font-semibold text-2xl text-primary">{campaign?.name}</h2>

        <div className="flex items-center justify-between gap-6">
          <div className="space-y-2">
            <p className="text-base">
              <span className="font-semibold text-2xl">
                {formatCurrency(Number(campaign?.total_amount), {
                  currency: campaign?.funding_goal.currency,
                })}
              </span>
              {t('common.funded')}
            </p>
            <p className="text-base">
              <span className="font-semibold text-2xl">{campaign?.total_backers || 0}</span>
              {t('common.backers')}
            </p>
            <p className="text-base">
              <span className="font-semibold text-base">{timeText}</span>
            </p>
          </div>
          <CircularProgress value={progress.percentage} />
        </div>
      </div>
    </aside>
  );
};

export { CampaignInformationCard };
