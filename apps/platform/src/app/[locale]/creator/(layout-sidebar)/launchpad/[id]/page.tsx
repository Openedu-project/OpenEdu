import { getAdminLaunchpadDetailService } from '@oe/api/services/admin-launchpad';
import { getAdminLaunchpadInvestmentService } from '@oe/api/services/admin-launchpad';
import CreatorLaunchpadDetailMgm from '@oe/dashboard/creator/launchpad/detail/page';

interface LayoutProps {
  params: {
    id: string;
  };
}
export default async function CreatorLaunchpadDetailPage({ params }: LayoutProps) {
  const [{ id }] = await Promise.all([params]);

  const [data, backerData] = await Promise.all([
    getAdminLaunchpadDetailService(null, {
      params: { id },
      queryParams: { preloads: ['VotingMilestones', 'Owner', 'User'] },
    }),
    getAdminLaunchpadInvestmentService(null, {
      params: { id },
      queryParams: { preloads: ['User'], per_page: 9999 },
    }),
  ]);

  return <CreatorLaunchpadDetailMgm backerData={backerData} data={data} />;
}
