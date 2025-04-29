import type { INewPoints, ISettingReferralProgram } from '@oe/api';
import { IconBitcoinRefresh, IconDollarCircle, IconNote2, IconNote3 } from '@oe/assets';
import { calculateRemainingDays, formatDateTime, getRemainingDaysInMonth, getRemainingDaysInWeek } from '@oe/core';
import { getTranslations } from 'next-intl/server';
import type { ElementType, ReactNode } from 'react';
import type { JSX } from 'react';
import { Badge } from '#shadcn/badge';
import { Card, CardContent } from '#shadcn/card';

interface IconProps {
  className?: string;
}

interface RewardCardProps {
  icon: ElementType<IconProps>;
  title: string;
  badgeContent?: string;
  description: string | ReactNode;
}

interface StreakCardProps extends RewardCardProps {
  progressPercentage: number;
  daysRemaining: string;
  progress: {
    current: number;
    total: number;
  };
}

interface TimeBasedCardProps extends RewardCardProps {
  daysLeft: string;
}

interface ActivityBonusData {
  icon: ElementType<IconProps>;
  title: string;
  badgeContent?: string;
  description: string | ReactNode;
  isActive: boolean;
}

interface StreakData extends ActivityBonusData {
  progressPercentage: number;
  daysRemaining: string;
  progress: {
    current: number;
    total: number;
  };
}

interface TimeBasedData extends ActivityBonusData {
  daysLeft: string;
}

const RewardBadge = ({ children }: { children: ReactNode }): JSX.Element => (
  <Badge className="mcaption-semibold10 lg:mcaption-semibold16 whitespace-nowrap rounded-[40px] border-none bg-white px-4 py-2 text-positive-500">
    {children}
  </Badge>
);

const ActivityBonusCard = ({ icon: Icon, title, badgeContent, description }: RewardCardProps): JSX.Element => (
  <Card className="rounded-[12px] border-none bg-base-cool">
    <CardContent className="p-3 sm:p-4">
      <div className="mb-1 flex flex-col items-center justify-between gap-2 sm:mb-2 md:flex-row md:items-start">
        <div className="flex items-center">
          <div className="mr-2 rounded-full sm:mr-3">
            <Icon className="h-10 w-10" />
          </div>
          <span className="mcaption-semibold14 md:mcaption-semibold16 lg:mcaption-semibold20">{title}</span>
        </div>
        <RewardBadge>{badgeContent}</RewardBadge>
      </div>
      <p className="mcaption-regular16 text-center md:text-left">{description}</p>
    </CardContent>
  </Card>
);

const StreakCard = ({
  icon: Icon,
  title,
  badgeContent,
  progressPercentage,
  daysRemaining,
  progress,
}: StreakCardProps): JSX.Element => (
  <Card className="rounded-[12px] border-none bg-base-cool">
    <CardContent className="p-3 sm:p-4">
      <div className="mb-1 flex flex-col items-center justify-between sm:mb-2 md:flex-row">
        <div className="flex items-center">
          <div className="mr-2 rounded-full sm:mr-3">
            <Icon className="h-10 w-10" />
          </div>
          <span className="mcaption-semibold14 md:mcaption-semibold16 lg:mcaption-semibold20">{title}</span>
        </div>
        <RewardBadge>{badgeContent}</RewardBadge>
      </div>

      <div className="mt-1.5 mb-1 sm:mt-2">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200 sm:h-2">
          <div className="h-full rounded-full bg-primary" style={{ width: `${progressPercentage}%` }} />
        </div>
      </div>

      <div className="mcaption-regular14 flex justify-between">
        <span>{daysRemaining}</span>
        <span>{`${progress.current}/${progress.total}`}</span>
      </div>
    </CardContent>
  </Card>
);

const TimeBasedCard = ({ icon: Icon, title, description, daysLeft }: TimeBasedCardProps): JSX.Element => (
  <Card className="rounded-[12px] border-none bg-base-cool">
    <CardContent className="p-3 sm:p-4">
      <div className="mb-1 flex flex-col items-center justify-between sm:mb-2 md:flex-row">
        <div className="flex items-center">
          <div className="mr-2 rounded-full sm:mr-3">
            <Icon className="h-10 w-10" />
          </div>
          <span className="mcaption-semibold14 md:mcaption-semibold16 lg:mcaption-semibold20">{title}</span>
        </div>
      </div>

      <p className="mcaption-regular14 mt-1.5 mb-4 sm:mt-2">{description}</p>

      <p className="mcaption-semibold16 md:mcaption-semibold20 rounded-[8px] bg-white p-4">{daysLeft}</p>
    </CardContent>
  </Card>
);

export async function InviteReferralProgramAdvanceReward({
  dataSetting,
  dateNewPoint,
}: {
  dataSetting: ISettingReferralProgram | undefined;
  dateNewPoint: INewPoints | undefined;
}) {
  const t = await getTranslations('referralProgram.advancedReward');

  const activityBonusData: ActivityBonusData[] = [
    {
      icon: IconBitcoinRefresh,
      title: t('activityBonus.tokenDeposit.title'),
      badgeContent: t('activityBonus.tokenDeposit.pointsPerDeposit', {
        points: String(dataSetting?.deposit_crypto_bonus?.amount),
        suffix: dataSetting?.deposit_crypto_bonus?.type === 'percentage' ? '%' : t('activityBonus.tokenDeposit.points'),
      }),
      description: t('activityBonus.tokenDeposit.description'),
      isActive: true,
    },
    {
      icon: IconDollarCircle,
      title: t('activityBonus.fiatDeposit.title'),
      badgeContent: t('activityBonus.fiatDeposit.pointsPerDeposit', {
        points: String(dataSetting?.deposit_fiat_bonus?.amount),
        suffix: dataSetting?.deposit_fiat_bonus?.type === 'percentage' ? '%' : t('activityBonus.fiatDeposit.points'),
      }),
      description: t('activityBonus.fiatDeposit.description'),
      isActive: true,
    },
    {
      icon: IconNote2,
      title: t('activityBonus.courseCompletion.title'),
      badgeContent: t('activityBonus.courseCompletion.pointsCompletion', {
        points: String(dataSetting?.complete_course_bonus?.amount),
        suffix:
          dataSetting?.complete_course_bonus?.type === 'percentage' ? '%' : t('activityBonus.courseCompletion.points'),
      }),
      description: t('activityBonus.courseCompletion.description'),
      isActive: true,
    },
  ];

  const streakData: StreakData[] = [
    {
      icon: IconNote2,
      title: t('consistencyRewards.weeklyStreak.title'),
      badgeContent: t('consistencyRewards.weeklyStreak.pointsReward', {
        points: String(dataSetting?.weekly_streak_bonus?.reward?.amount),
        suffix:
          dataSetting?.weekly_streak_bonus?.reward?.type === 'percentage'
            ? '%'
            : t('consistencyRewards.weeklyStreak.point'),
      }),
      description: '',
      progressPercentage: Math.min(
        100,
        Math.floor(
          ((dateNewPoint?.weekly_streak?.total_count ?? 0) / (dataSetting?.weekly_streak_bonus?.threshold ?? 1)) * 100
        )
      ),
      daysRemaining: t('consistencyRewards.weeklyStreak.daysRemaining', {
        days: getRemainingDaysInWeek(),
      }),
      progress: {
        current: dateNewPoint?.weekly_streak?.total_count ?? 0,
        total: dataSetting?.weekly_streak_bonus?.threshold ?? 0,
      },
      isActive: Boolean(dataSetting?.weekly_streak_bonus?.enable),
    },
    {
      icon: IconNote3,
      title: t('consistencyRewards.monthlyStreak.title'),
      badgeContent: t('consistencyRewards.monthlyStreak.pointsReward', {
        points: String(dataSetting?.monthly_streak_bonus?.reward?.amount),
        suffix:
          dataSetting?.monthly_streak_bonus?.reward?.type === 'percentage'
            ? '%'
            : t('consistencyRewards.monthlyStreak.point'),
      }),
      description: '',
      progressPercentage: Math.min(
        100,
        Math.floor(
          ((dateNewPoint?.monthly_streak?.total_count ?? 0) / (dataSetting?.monthly_streak_bonus?.threshold ?? 1)) * 100
        )
      ),
      daysRemaining: t('consistencyRewards.monthlyStreak.daysRemaining', {
        days: getRemainingDaysInMonth(),
      }),
      progress: {
        current: dateNewPoint?.monthly_streak?.total_count ?? 0,
        total: dataSetting?.monthly_streak_bonus?.threshold ?? 0,
      },
      isActive: Boolean(dataSetting?.monthly_streak_bonus?.enable),
    },
  ].filter(streak => streak.isActive);

  const timeBasedData: TimeBasedData = {
    icon: IconNote2,
    title: t('timeBasedRewards.limitedTimeOffer.title'),
    description: t.rich('timeBasedRewards.limitedTimeOffer.description', {
      highlight: chunks => <span className="mcaption-semibold14 text-primary">{chunks}</span>,
      x: String(((Number(dataSetting?.time_base_rewards?.reward?.amount ?? 0) + 100) / 100).toFixed(2)),
      fromDate: formatDateTime(dataSetting?.time_base_rewards?.start_date ?? 0),
      toDate: formatDateTime(dataSetting?.time_base_rewards?.end_date ?? 0),
    }),
    daysLeft: t('timeBasedRewards.limitedTimeOffer.daysLeft', {
      days: calculateRemainingDays(dataSetting?.time_base_rewards?.end_date ?? 0),
    }),
    isActive: true,
  };

  return (
    <section className="block rounded-[16px] bg-white p-2 md:p-6">
      {/* Advanced Rewards Section */}
      <div>
        <h2 className="mcaption-semibold18 md:mcaption-semibold24 mb-1 text-center md:text-left">{t('title')}</h2>
        <p className="mbutton-regular16 mb-4 text-center sm:mb-6 md:text-left">{t('subtitle')}</p>

        {/* Activity Bonus Rewards */}
        <div className="mb-6 sm:mb-8">
          <h3 className="mcaption-semibold14 md:mcaption-semibold16 lg:mcaption-semibold20 mb-3 sm:mb-4">
            {t('activityBonus.title')}
          </h3>

          <div className="mb-4 grid grid-cols-1 gap-3 sm:mb-6 sm:grid-cols-2 sm:gap-4">
            {activityBonusData.map(activity => (
              <ActivityBonusCard
                key={activity.title}
                icon={activity.icon}
                title={activity.title}
                badgeContent={activity.badgeContent}
                description={activity.description}
              />
            ))}
          </div>
        </div>

        {/* Consistency Rewards */}
        <div>
          <h3 className="mcaption-semibold14 md:mcaption-semibold16 lg:mcaption-semibold20 mb-3 sm:mb-4">
            {t('consistencyRewards.title')}
          </h3>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {streakData.map(streak => (
              <StreakCard
                key={streak.title}
                icon={streak.icon}
                title={streak.title}
                badgeContent={streak.badgeContent}
                description={streak.description}
                progressPercentage={streak.progressPercentage}
                daysRemaining={streak.daysRemaining}
                progress={streak.progress}
              />
            ))}
          </div>
        </div>

        {/* Time-based Rewards */}
        <div>
          <h3 className="mcaption-semibold14 md:mcaption-semibold16 lg:mcaption-semibold20 mb-3 sm:mb-4">
            {t('timeBasedRewards.title')}
          </h3>

          <div className="grid grid-cols-1 gap-3">
            <TimeBasedCard
              icon={timeBasedData.icon}
              title={timeBasedData.title}
              description={timeBasedData.description}
              daysLeft={timeBasedData.daysLeft}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
