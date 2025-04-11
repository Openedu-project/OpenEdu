import IconAward from '@oe/assets/icons/referral-program/icon-award';
import IconCategory2 from '@oe/assets/icons/referral-program/icon-category-2';
import IconGift from '@oe/assets/icons/referral-program/icon-gift';
import IconLogin from '@oe/assets/icons/referral-program/icon-login';
import IconOpeneduBalance from '@oe/assets/icons/referral-program/icon-openedu-balance';
import IconTimer from '@oe/assets/icons/referral-program/icon-timer';
import { getTranslations } from 'next-intl/server';
import type { ElementType, ReactNode } from 'react';
import type { JSX } from 'react';
import { Badge } from '#shadcn/badge';
import { Button } from '#shadcn/button';
import { Card, CardContent } from '#shadcn/card';

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

export default async function InviteReferralProgramAvailableReward(): Promise<JSX.Element> {
  const t = await getTranslations('referralProgram.availableReward');

  const rewardData: RewardData[] = [
    {
      icon: IconGift,
      title: t('baseReferral.title'),
      points: t('pointsEarned', { points: 200 }),
      description: t('baseReferral.description'),
    },
    {
      icon: IconAward,
      title: t('milestone.title'),
      points: t('pointsEarned', { points: 100 }),
      description: t('milestone.description', { count: 10 }),
    },
    {
      icon: IconCategory2,
      title: t('featureDiscovery.title'),
      points: t('pointsEarned', { points: 10099 }),
      description: t.rich('featureDiscovery.description', {
        course: 30,
        flip: 30,
        token: 30,
      }),
    },
    {
      icon: IconTimer,
      title: t('streakBonus.title'),
      points: t('pointsEarned', { points: 100 }),
      description: t.rich('streakBonus.description', {
        weekly: 15,
        monthly: 15,
      }),
    },
    {
      icon: IconLogin,
      title: t('registrationReward.title'),
      points: t('pointsEarned', { points: 10 }),
      description: t('registrationReward.description', { points: 10 }),
    },
  ];

  return (
    <section className="mb-6 block rounded-[16px] bg-white p-2 md:p-6">
      {/* Available Reward Section */}
      <div className="mb-6">
        <div className="mb-2 flex flex-col items-center justify-between md:flex-row">
          <h3 className="mcaption-semibold18 md:mcaption-semibold24 text-center md:text-left">{t('title')}</h3>
          <Button className="rounded-[24px]">
            {t('claimButton', { points: 500 })}
            <IconOpeneduBalance className="ml-4 h-7 w-7" />
          </Button>
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
