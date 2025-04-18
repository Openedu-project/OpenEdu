import type { IMilestoneDetailPoint, IRefCountBonus } from '@oe/api';
import { IconMedal, IconOpeneduBalance, IconTimeLine, IconUser2 } from '@oe/assets';
import { PROTECTED_ROUTES, formatDate } from '@oe/core';
import { getTranslations } from 'next-intl/server';
import { Link } from '#common/navigation';
import { buttonVariants } from '#shadcn/button';
import { Card, CardContent } from '#shadcn/card';
import { cn } from '#utils/cn';

export async function InviteReferralProgramHeader({
  id,
  data,
  milestones,
  totalReferrals,
  totalEarnedPoints,
  totalBalance,
  startDate = 0,
  endDate = 0,
}: {
  id: string;
  data: IRefCountBonus[];
  milestones: IMilestoneDetailPoint[];
  totalReferrals: number;
  totalEarnedPoints: number;
  totalBalance: string;
  startDate: number;
  endDate: number;
}) {
  const t = await getTranslations('referralProgram.header');

  const sortedByReachCount = [...data].sort((a, b) => a.reach_count - b.reach_count);

  const result = sortedByReachCount.map(item => {
    const hasReached = milestones.some(m => m.milestone_reached === item.reach_count);
    return {
      ...item,
      reached: hasReached,
    };
  });
  const latestReachedCount = milestones?.[milestones?.length - 1]?.milestone_reached;

  const reachedMilestones = result.filter(item => item.reached).length;
  const totalMilestones = result.length;
  const progressPercentage = (reachedMilestones / totalMilestones) * 100;

  return (
    <section className="block">
      <div className="mt-4 mb-6 flex flex-col items-center justify-between gap-2 lg:flex-row lg:gap-6">
        {/* Progress Steps */}
        <div className="mx-auto h-[72px] w-full rounded-[40px] bg-white px-4 drop-shadow-shadow-7 md:w-[60%] lg:w-[68%]">
          <div className=" relative mt-7 w-full ">
            <div className="-translate-y-1/2 absolute top-1/2 left-0 z-10 mb-2 flex w-full justify-between ">
              <div className="flex w-[70px] flex-col items-center rounded-[24px] bg-gradient-4 py-1 text-center text-white md:w-[80px]">
                <p className="mbutton-semibold10 text-black">{t('refCount', { count: 0 })}</p>
                <p className="mbutton-semibold8 text-positive-500">
                  {t('pointsEarned', {
                    points: 0,
                    suffix: sortedByReachCount?.[0]?.reward?.type === 'percentage' ? '%' : t('points'),
                  })}
                </p>
              </div>
              {result?.map((item, index) => (
                <div
                  key={item.reach_count}
                  className={`flex w-[70px] flex-col items-center rounded-[24px] ${
                    item.reached ? 'bg-gradient-4' : 'bg-gradient-3'
                  } py-1 text-center text-white md:w-[80px]`}
                >
                  <p className="mbutton-semibold10 text-black">{t('refCount', { count: item.reach_count })}</p>
                  <p
                    className={`mbutton-semibold8 ${
                      index === 0 || index === 1 ? 'text-positive-500' : 'text-neutral-300'
                    }`}
                  >
                    {t('pointsEarned', {
                      points: item.reward?.amount,
                      suffix: item?.reward?.type === 'percentage' ? '%' : t('points'),
                    })}
                  </p>
                </div>
              ))}
            </div>
            <div className="h-2 rounded-[40px] bg-gradient-3">
              <div
                className="h-2 rounded-xl bg-positive-500 transition-all duration-300 ease-in-out"
                style={{
                  width: `${progressPercentage}%`,
                }}
              />
            </div>
          </div>
          <p className="mcaption-regular10 mt-4 text-center text-neutral-300">
            {latestReachedCount ?? 0}/{sortedByReachCount?.[sortedByReachCount?.length - 1]?.reach_count ?? 0}
          </p>
        </div>
      </div>
      {/* Balance and Timeline Card */}
      <Card>
        <CardContent className="flex flex-col justify-between p-2 md:flex-row md:items-center md:px-5 md:py-6">
          <div className="flex w-full flex-col items-center gap-3 md:flex-row md:justify-between md:gap-1">
            <div className="flex w-full flex-col md:w-1/2 md:flex-row md:items-center">
              <div className="flex items-center">
                <div className="mr-3 rounded-full bg-pink-50">
                  <IconOpeneduBalance className="h-10 w-10" />
                </div>
                <span className="mcaption-semibold18 lg:mcaption-semibold24">{t('balancePoint')}:&nbsp;</span>
              </div>
              <div className="mcaption-semibold18 lg:mcaption-semibold24 text-center md:text-right">
                {totalBalance ?? 0}
              </div>
            </div>
            <div className="flex w-full flex-col md:w-1/2 md:flex-row md:items-center md:border-l-2 md:pl-5">
              <div className="flex items-center">
                <div className="mr-3 rounded-full bg-pink-50">
                  <IconTimeLine className="h-10 w-10" />
                </div>
                <span className="mcaption-semibold18 lg:mcaption-semibold24">{t('timeline')}:&nbsp;</span>
              </div>
              <div className="mcaption-semibold18 lg:mcaption-semibold24 text-center md:text-left">
                {formatDate(startDate)} - {formatDate(endDate)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="my-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Total Referrals Card */}
        <Card>
          <CardContent className="flex flex-col justify-between p-2 md:flex-row md:items-center md:px-5 md:py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-3 rounded-full bg-pink-50">
                  <IconUser2 className="h-10 w-10" />
                </div>
                <span className="mcaption-semibold18 lg:mcaption-semibold24">{t('totalReferrals')}</span>
              </div>
              <div>
                <Link
                  href={`${PROTECTED_ROUTES.referralProgramHistory}?id=${id}`}
                  className={cn(
                    buttonVariants({
                      variant: 'outline',
                    }),
                    'ml-2 text-outline-foreground'
                  )}
                >
                  {t('viewAll')}
                </Link>
              </div>
            </div>
            <div className="mcaption-semibold18 lg:mcaption-semibold24 text-center md:text-right">
              {totalReferrals ?? 0}
            </div>
          </CardContent>
        </Card>

        {/* Total Earned Points Card */}
        <Card>
          <CardContent className="flex flex-col justify-between p-2 md:flex-row md:items-center md:px-5 md:py-6">
            <div className="flex items-center">
              <div className="mr-3 rounded-full bg-yellow-50 ">
                <IconMedal className="h-10 w-10" />
              </div>
              <span className="mcaption-semibold18 lg:mcaption-semibold24">{t('totalEarnedPoints')}</span>
            </div>
            <div className="mcaption-semibold18 lg:mcaption-semibold24 text-center md:text-right">
              {totalEarnedPoints ?? 0}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
