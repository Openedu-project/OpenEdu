import { UserAffiliateCampaignsReportDetail } from "@oe/dashboard";

export default async function UserAffiliateCampaignsReportDetailPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { campaign_name: campaignName, course_name: courseName } =
    await searchParams;

  return (
    <UserAffiliateCampaignsReportDetail
      campaignName={campaignName}
      courseName={courseName}
    />
  );
}
