import { getAdminLaunchpadDetailService } from "@oe/api";
import { getAdminLaunchpadInvestmentService } from "@oe/api";
import { LaunchpadApprovedDetailMgm } from "@oe/dashboard";

interface LayoutProps {
  params: {
    id: string;
  };
}
export default async function LaunchpadApprovedDetailPage({
  params,
}: LayoutProps) {
  const [{ id }] = await Promise.all([params]);

  const [data, backerData] = await Promise.all([
    getAdminLaunchpadDetailService(null, {
      params: { id },
      queryParams: { preloads: ["VotingMilestones", "Owner", "User"] },
    }),
    getAdminLaunchpadInvestmentService(null, {
      params: { id },
      queryParams: { preloads: ["User"], per_page: 9999 },
    }),
  ]);
  return <LaunchpadApprovedDetailMgm backerData={backerData} data={data} />;
}
