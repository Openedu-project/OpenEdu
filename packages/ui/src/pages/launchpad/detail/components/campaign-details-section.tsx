import type { ILaunchpad } from '@oe/api/types/launchpad';
import { isLogin } from '@oe/api/utils/auth';
import { LAUNCHPAD_STATUS, VOTING_STATUS } from '@oe/api/utils/launchpad';
import DefaultImg from '@oe/assets/images/defaultimage.png';
import { formatDate } from '@oe/core/utils/datetime';
import { Calendar } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '#common/navigation';
import { CircularProgress } from '#components/circular-progress';
import { CourseTimeline } from '#components/course-time-line';
import { Image } from '#components/image';
import { Button } from '#shadcn/button';
import { formatCurrency } from '#utils/format-currency';
import { calculateProgress, getTimeStatus } from '#utils/launchpad-utils';
import { CollapsibleCourseContent } from '../../components/collapsible-course-content';
import { CourseCardHorizontal } from '../../components/course-card';
import { CreatorCard } from '../../components/creator-card';
import { DescriptionCard } from '../../components/description-card';
import VotingResultCard from '../../components/voting-result-card/voting-result-card';

const CampaignDetailsSection = async ({
  campaign,
}: {
  campaign: ILaunchpad | null;
}) => {
  if (!campaign) {
    return null;
  }

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
        <Link href={`/launchpad/${campaign?.id}/pledge`} className="mt-6 w-full p-0 md:hidden">
          <Button className="h-fit w-full rounded-xl px-6 py-4 font-semibold text-base">{t('buttons.pledge')}</Button>
        </Link>
      );
    }
  };

  const timelineItems =
    campaign.voting_milestones?.map((milestone, index) => ({
      number: index + 1,
      sections: milestone.target_section,
      description: new Date(milestone.estimated_open_vote_date).toLocaleDateString(),
    })) || [];

  const currentVoting = campaign.voting_milestones?.find(milestone => milestone.status === VOTING_STATUS.RUNNING);

  return (
    <div className="w-full px-4 md:w-[60%] md:px-0">
      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <h2 className="font-bold text-2xl text-primary md:text-3xl">{campaign?.name}</h2>
        {/* Keeping the commented buttons as is */}
      </div>

      <div className="relative mb-6 block h-full min-h-[224px] w-full cursor-pointer overflow-hidden rounded-2xl md:hidden">
        <Image
          className="h-full w-full object-cover"
          alt="campaign full card image"
          src={campaign?.thumbnail?.url || DefaultImg.src}
          fill
          containerHeight={224}
        />
      </div>

      <div className="mb-6 flex items-center gap-1">
        <Calendar className="h-5 w-5" />
        <p className="text-sm md:text-base">
          {t('common.createAt')}
          <span className="font-semibold">{campaign?.create_at ? formatDate(campaign.create_at) : ''}</span>
        </p>
      </div>

      {campaign.status === 'voting' && currentVoting && (
        <>
          <h3 className="mt-7 mb-4 font-semibold text-xl md:text-2xl">{t('title.votingProcess')}</h3>
          <VotingResultCard votingProcess={currentVoting} />
        </>
      )}

      <h3 className="mt-7 mb-4 font-semibold text-xl md:text-2xl">{t('title.votingPlan')}</h3>
      <CourseTimeline items={timelineItems} />

      <div className="mt-6 flex items-center justify-between gap-6 md:hidden">
        <div className="space-y-2">
          <p className="text-base">
            <span className="font-semibold text-xl md:text-2xl">{formatCurrency(Number(campaign?.total_amount))}</span>
            {campaign?.funding_goal.currency} {t('common.funded')}
          </p>
          <p className="font-normal text-base">
            <span className="font-semibold text-xl md:text-2xl">{campaign?.total_backers || 0}</span>
            {t('common.backers')}
          </p>
          <p className="text-base">
            <span className="font-semibold">{timeText}</span>
          </p>
        </div>
        <CircularProgress value={progress.percentage} />
      </div>

      {isLoggedIn ? (
        renderBtn()
      ) : (
        <p className="mt-6 block text-center font-semibold text-base md:hidden">{t('buttons.loginToEnroll')}</p>
      )}

      <h3 className="mt-7 mb-4 font-semibold text-xl md:text-2xl">Course</h3>
      <CourseCardHorizontal campaign={campaign || undefined} />

      <h3 className="mt-7 mb-4 font-semibold text-xl md:text-2xl">{t('title.creator')}</h3>
      <CreatorCard educator={campaign?.owner || undefined} />

      <h3 className="mt-7 mb-4 font-semibold text-xl md:text-2xl">{t('title.description')}</h3>
      <DescriptionCard text={campaign?.description || ''} />

      {campaign?.outlines && (
        <>
          <h3 className="mt-7 mb-4 font-semibold text-xl md:text-2xl">{t('title.courseContent')}</h3>
          <CollapsibleCourseContent outline={campaign?.outlines} />
        </>
      )}
    </div>
  );
};

export default CampaignDetailsSection;
