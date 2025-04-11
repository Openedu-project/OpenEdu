import { getAdminLaunchpadDetailService } from "@oe/api";
import { LaunchpadRequestsDetailMgm } from "@oe/dashboard";

interface LayoutProps {
  params: {
    id: string;
  };
  searchParams: { orderId?: string };
}
export default async function LaunchpadRequestsDetailPage({
  params,
  searchParams,
}: LayoutProps) {
  const [{ id }, { orderId }] = await Promise.all([params, searchParams]);

  const data = await getAdminLaunchpadDetailService(null, {
    params: { id },
    queryParams: { preloads: ["VotingMilestones", "Owner", "User"] },
  });

  return <LaunchpadRequestsDetailMgm orderId={orderId ?? ""} data={data} />;
}
