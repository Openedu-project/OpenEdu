import type { ILaunchpad } from '@oe/api';
import { VOTING_STATUS } from '@oe/api';
import { isLogin } from '@oe/api';
import { formatCurrency } from '@oe/core';
import { getTranslations } from 'next-intl/server';
import { CircularProgress } from '#components/circular-progress';
import { CourseTimeline } from '#components/course-time-line';
import { Separator } from '#shadcn/separator';
// import { formatCurrency } from '#utils/format-currency';
import { calculateProgress } from '#utils/launchpad-utils';
import { CollapsibleCourseContent } from '../components/collapsible-course-content';
import { CourseCardHorizontal } from '../components/course-card';
import { VotingResultCard } from '../components/voting-result-card';

const CourseInformation = async ({
  campaign,
}: {
  campaign: ILaunchpad | null;
}) => {
  const [isLoggedIn, t] = await Promise.all([isLogin(), getTranslations('launchpadDetailPage')]);

  if (!isLoggedIn) {
    return null;
  }

  if (!campaign) {
    return null;
  }

  const timelineItems =
    campaign.voting_milestones?.map((milestone, index) => ({
      number: index + 1,
      sections: milestone.target_section,
      description: new Date(milestone.estimated_open_vote_date).toLocaleDateString(),
    })) || [];

  const progress = calculateProgress(Number(campaign?.total_amount), Number(campaign?.funding_goal.target_funding));

  const currentVoting = campaign.voting_milestones?.find(milestone => milestone.status === VOTING_STATUS.RUNNING);

  return (
    <div className="w-full space-y-3 rounded-2xl bg-white p-6 shadow-[0px_4px_30px_0px_#F4F5F6] lg:w-[60%]">
      {campaign.status === 'voting' && currentVoting && <VotingResultCard votingProcess={currentVoting} />}
      <CourseCardHorizontal campaign={campaign} className="border" />
      <CourseTimeline items={timelineItems} />
      <div className="flex items-center justify-between gap-6">
        <div className="space-y-2">
          <p className="text-base">
            <span className="font-semibold text-2xl">
              {formatCurrency(Number(campaign?.funding_goal.target_funding), {
                currency: campaign?.funding_goal.currency,
              })}
            </span>
            {t('common.targetFunding')}
          </p>
          <p className="text-base">
            <span className="font-semibold text-2xl">
              {formatCurrency(Number(campaign?.total_amount), {
                currency: campaign?.funding_goal.currency,
              })}
            </span>
            {t('common.funded')}
          </p>
          <p className="text-base">
            <span className="font-semibold text-2xl">
              {formatCurrency(Number(campaign?.investment?.amount), {
                currency: campaign?.funding_goal.currency,
              })}
            </span>
            {t('common.pledgedFromYou')}
          </p>
        </div>
        <CircularProgress value={progress.percentage} />
      </div>
      <Separator />
      {campaign?.outlines && (
        <>
          <h3 className="mt-7 mb-4 font-semibold text-xl md:text-2xl">{t('title.courseContent')}</h3>
          <CollapsibleCourseContent outline={campaign?.outlines} />
        </>
      )}
    </div>
  );
};

export { CourseInformation };
