import { IconBitcoinRefresh, IconDollarCircle, IconNote2, IconNote3 } from '@oe/assets';
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
  badgeContent: string;
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
  badgeContent: string;
  description: string | ReactNode;
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

const TimeBasedCard = ({ icon: Icon, title, badgeContent, description, daysLeft }: TimeBasedCardProps): JSX.Element => (
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

      <p className="mcaption-regular14 mt-1.5 mb-4 sm:mt-2">{description}</p>

      <p className="mcaption-semibold16 md:mcaption-semibold20 rounded-[8px] bg-white p-4">{daysLeft}</p>
    </CardContent>
  </Card>
);

export async function InviteReferralProgramAdvanceReward(): Promise<JSX.Element> {
  const t = await getTranslations('referralProgram.advancedReward');

  const activityBonusData: ActivityBonusData[] = [
    {
      icon: IconBitcoinRefresh,
      title: t('activityBonus.tokenDeposit.title'),
      badgeContent: t('activityBonus.tokenDeposit.pointsPerDeposit', {
        points: 5,
      }),
      description: t('activityBonus.tokenDeposit.description'),
    },
    {
      icon: IconDollarCircle,
      title: t('activityBonus.fiatDeposit.title'),
      badgeContent: t('activityBonus.fiatDeposit.pointsPerDeposit', {
        points: 2,
      }),
      description: t('activityBonus.fiatDeposit.description'),
    },
    {
      icon: IconNote2,
      title: t('activityBonus.courseCompletion.title'),
      badgeContent: t('activityBonus.courseCompletion.percentPerCompletion', {
        percent: 10,
      }),
      description: t('activityBonus.courseCompletion.description'),
    },
  ];

  const streakData: StreakData[] = [
    {
      icon: IconNote2,
      title: t('consistencyRewards.weeklyStreak.title'),
      badgeContent: t('consistencyRewards.weeklyStreak.points', { points: 3 }),
      description: '',
      progressPercentage: 60,
      daysRemaining: t('consistencyRewards.weeklyStreak.daysRemaining', {
        days: 2,
      }),
      progress: {
        current: 6,
        total: 10,
      },
    },
    {
      icon: IconNote3,
      title: t('consistencyRewards.monthlyStreak.title'),
      badgeContent: t('consistencyRewards.monthlyStreak.points', { points: 3 }),
      description: '',
      progressPercentage: 60,
      daysRemaining: t('consistencyRewards.monthlyStreak.daysRemaining', {
        days: 2,
      }),
      progress: {
        current: 6,
        total: 10,
      },
    },
  ];

  const timeBasedData: TimeBasedData = {
    icon: IconNote2,
    title: t('timeBasedRewards.limitedTimeOffer.title'),
    badgeContent: t('timeBasedRewards.limitedTimeOffer.points', {
      points: 3,
    }),
    description: t.rich('timeBasedRewards.limitedTimeOffer.description', {
      highlight: chunks => <span className="mcaption-semibold14 text-primary">{chunks}</span>,
      x: 2,
      fromDate: '11/11/2023',
      toDate: '11/12/2023',
    }),
    daysLeft: t('timeBasedRewards.limitedTimeOffer.daysLeft', {
      days: 3,
    }),
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
              badgeContent={timeBasedData.badgeContent}
              description={timeBasedData.description}
              daysLeft={timeBasedData.daysLeft}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
