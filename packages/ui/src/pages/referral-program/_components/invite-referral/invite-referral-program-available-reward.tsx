import type { INewPoints } from '@oe/api';
import { IconAward, IconCategory2, IconGift, IconLogin, IconStreakBonus, IconTimer } from '@oe/assets';
import { getTranslations } from 'next-intl/server';
import type { ElementType, ReactNode } from 'react';
import type { JSX } from 'react';
import { Badge } from '#shadcn/badge';
import { Card, CardContent } from '#shadcn/card';
import { InviteReferralClaimButton } from './invite-referral-claim-button';

interface RewardBadgeProps {
  children: ReactNode;
}

interface IconProps {
  className?: string;
}

interface RewardCardProps {
  icon: ElementType<IconProps>;
  title: string;
  points: string;
  description: ReactNode;
}

interface RewardData {
  icon: ElementType<IconProps>;
  title: string;
  points: string;
  description: ReactNode;
}

const RewardBadge = ({ children }: RewardBadgeProps): JSX.Element => (
  <Badge className="mcaption-semibold10 lg:mcaption-semibold16 whitespace-nowrap rounded-[40px] border-none bg-white px-4 py-2 text-positive-500">
    {children}
  </Badge>
);

const RewardCard = ({ icon: Icon, title, points, description }: RewardCardProps): JSX.Element => (
  <Card className="relative overflow-hidden rounded-[12px] border-none bg-base-cool">
    <CardContent className="p-4">
      <div className="mb-3 flex flex-col items-center justify-between md:flex-row">
        <div className="flex items-center">
          <div className="mr-3 rounded-full">
            <Icon className="h-10 w-10" />
          </div>
          <span className="mcaption-semibold14 md:mcaption-semibold16 lg:mcaption-semibold20">{title}</span>
        </div>
        <RewardBadge>{points}</RewardBadge>
      </div>
      <p className="mbutton-regular16 text-center md:text-left">{description}</p>
    </CardContent>
  </Card>
);

export async function InviteReferralProgramAvailableReward({
  data,
}: {
  data: INewPoints | undefined;
}) {
  const t = await getTranslations('referralProgram.availableReward');

  if (!data) {
    return null;
  }

  const rewardData: RewardData[] = [
    {
      icon: IconGift,
      title: t('baseReferrals.title'),
      points: t('pointsEarned', {
        points: String(data?.referral?.amount ?? 0),
        suffix: t('points'),
      }),
      description: t('baseReferrals.description', {
        points: String(data?.referral?.count ?? 0),
      }),
    },
    {
      icon: IconAward,
      title: t('milestone.title'),
      points: t('pointsEarned', {
        points: String(data?.milestone?.amount ?? 0),
        suffix: t('points'),
      }),
      description: t('milestone.description', {
        count: String(data?.milestone?.count ?? 0),
      }),
    },
    {
      icon: IconCategory2,
      title: t('featuresDiscovery.title'),
      points: t('pointsEarned', {
        points: String(data?.featured?.amount ?? 0),
        suffix: t('points'),
      }),
      description: t.rich('featuresDiscovery.description', {
        course: String(data?.featured?.course_count ?? 0),
        fiat: String(data?.featured?.fiat_count ?? 0),
        token: String(data?.featured?.crypto_count ?? 0),
      }),
    },
    {
      icon: IconTimer,
      title: t('timeBasedReward.title'),
      points: t('pointsEarned', {
        points: String(data?.timebase?.amount ?? 0),
        suffix: t('points'),
      }),
      description: t.rich('timeBasedReward.description', {
        points: String(data?.timebase?.amount ?? 0),
      }),
    },
    {
      icon: IconStreakBonus,
      title: t('streakBonus.title'),
      points: t('pointsEarned', {
        points: String(Number(data?.weekly_streak?.amount + data?.monthly_streak?.amount) ?? 0),
        suffix: t('points'),
      }),
      description: t.rich('streakBonus.description', {
        weekly: String(data?.weekly_streak?.amount ?? 0),
        monthly: String(data?.monthly_streak?.amount ?? 0),
      }),
    },
    {
      icon: IconLogin,
      title: t('registrationRewards.title'),
      points: t('pointsEarned', {
        points: String(data?.referee?.amount ?? 0),
        suffix: t('points'),
      }),
      description: t('registrationRewards.description', {
        points: String(data?.referee?.amount),
      }),
    },
  ];

  return (
    <section className="mb-6 block rounded-[16px] bg-white p-2 md:p-6">
      {/* Available Reward Section */}
      <div className="mb-6">
        <div className="mb-2 flex flex-col items-center justify-between md:flex-row">
          <h3 className="mcaption-semibold18 md:mcaption-semibold24 text-center md:text-left">{t('title')}</h3>
          <InviteReferralClaimButton data={data} />
        </div>
        <p className="mbutton-regular16 mb-4 text-center md:text-left">{t('subtitle')}</p>
      </div>

      {/* Reward Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {rewardData.map(reward => (
          <RewardCard
            key={reward.title}
            icon={reward.icon}
            title={reward.title}
            points={reward.points}
            description={reward.description}
          />
        ))}
      </div>
    </section>
  );
}
