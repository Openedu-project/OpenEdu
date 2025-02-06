import { getAdminLaunchpadDetailService } from '@oe/api/services/admin-launchpad';
import { getAdminLaunchpadInvestmentService } from '@oe/api/services/admin-launchpad';
import LaunchpadApprovedDetailMgm from '@oe/dashboard/admin/launchpad/approved/detail/page';

interface LayoutProps {
  params: {
    id: string;
  };
}
export default async function LaunchpadRequestsDetailPage({ params }: LayoutProps) {
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

  return <LaunchpadApprovedDetailMgm backerData={backerData} data={data} />;
}
