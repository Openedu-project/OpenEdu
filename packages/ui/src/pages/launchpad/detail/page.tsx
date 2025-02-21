import { getLaunchpadService } from '@oe/api/services/launchpad';
import { CampaignDetailsSection, CampaignProgressSection } from './components';

const LaunchpadDetailPage = async ({ id }: { id: string }) => {
  const campaign = await getLaunchpadService(undefined, {
    id,
    preloads: ['Owner', 'Courses', 'User', 'Outline', 'Investment', 'VotingMilestones'],
  });

  return (
    <div className="container my-10 flex min-h-screen items-start justify-between gap-6 px-2 pb-24 sm:px-6 md:px-8 lg:px-10 xl:px-12">
      <CampaignDetailsSection campaign={campaign} />
      <CampaignProgressSection campaign={campaign} />
    </div>
  );
};

export default LaunchpadDetailPage;
