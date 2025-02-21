import type { ILaunchpad } from '@oe/api/types/launchpad';
import { isLogin } from '@oe/api/utils/auth';
import { LAUNCHPAD_STATUS } from '@oe/api/utils/launchpad';
import { CircularProgress } from '#components/circular-progress';
import { Image } from '#components/image';
import { Button } from '#shadcn/button';
import { formatCurrency } from '#utils/format-currency';
import { calculateProgress, getTimeStatus } from '#utils/launchpad-utils';

import DefaultImg from '@oe/assets/images/defaultimage.png';
import { getTranslations } from 'next-intl/server';
import { Link } from '#common/navigation';

const CampaignProgressSection = async ({
  campaign,
  isShowBtn = true,
}: {
  campaign: ILaunchpad | null;
  isShowBtn?: boolean;
}) => {
  const [isLoggedIn, t] = await Promise.all([isLogin(), getTranslations('launchpadDetailPage')]);

  const timeLeft = getTimeStatus(campaign?.funding_end_date || 0);
  const timeText =
    timeLeft <= 0
      ? t('common.ended')
      : `${timeLeft} ${timeLeft === 1 ? t('common.day') : t('common.days')} ${t('common.left')}`;

  const progress = calculateProgress(Number(campaign?.total_amount), Number(campaign?.funding_goal.target_funding));

  const renderBtn = () => {
    if (isLoggedIn && campaign?.status === LAUNCHPAD_STATUS.FUNDING) {
      return (
        <Link href={`/launchpad/${campaign?.id}/pledge`} className="mt-6 w-full p-0">
          <Button className="h-fit w-full rounded-xl px-6 py-4 font-semibold text-base">{t('buttons.pledge')}</Button>
        </Link>
      );
    }
    if (campaign?.status === LAUNCHPAD_STATUS.VOTING && campaign?.investment) {
      return (
        <Link href={`/launchpad/${campaign?.id}/vote`} className="mt-6 w-full p-0">
          <Button className="h-fit w-full rounded-xl px-6 py-4 font-semibold text-base">{t('buttons.vote')}</Button>
        </Link>
      );
    }
    return null;
  };

  return (
    <aside className="sticky top-[90px] hidden h-full w-full md:block md:w-[40%]">
      <div className="rounded-2xl bg-white p-6 shadow-[0px_4px_30px_0px_#F4F5F6]">
        <div className="relative mb-6 aspect-video h-full min-h-[224px] w-full cursor-pointer overflow-hidden rounded-2xl">
          <Image
            className="h-full w-full"
            alt="campaign full card image"
            src={campaign?.thumbnail?.url || DefaultImg.src}
            fill
            containerHeight={224}
          />
        </div>

        <div className="flex items-center justify-between gap-6">
          <div className="space-y-2">
            <p className="text-base">
              <span className="font-semibold text-2xl">
                {formatCurrency(Number(campaign?.total_amount))} {campaign?.funding_goal.currency}
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

        {isLoggedIn ? (
          isShowBtn && renderBtn()
        ) : (
          <p className="mt-6 text-center font-semibold text-base">{t('buttons.loginToEnroll')}</p>
        )}
      </div>
    </aside>
  );
};

export default CampaignProgressSection;
