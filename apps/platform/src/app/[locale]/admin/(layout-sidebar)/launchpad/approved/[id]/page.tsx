import { getAdminLaunchpadDetailService } from '@oe/api/services/admin-launchpad';
import LaunchpadApprovedDetailMgm from '@oe/dashboard/admin/launchpad/approved/detail/page';

interface LayoutProps {
  params: {
    id: string;
  };
}
export default async function LaunchpadRequestsDetailPage({ params }: LayoutProps) {
  const [{ id }] = await Promise.all([params]);

  const data = await getAdminLaunchpadDetailService(null, {
    params: { id },
    queryParams: { preloads: ['VotingMilestones', 'Owner', 'User'] },
  });

  return <LaunchpadApprovedDetailMgm data={data} />;
}
