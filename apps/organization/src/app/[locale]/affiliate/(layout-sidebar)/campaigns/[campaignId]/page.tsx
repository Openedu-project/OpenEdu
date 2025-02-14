import UserAffiliateCampaignsDetailManagement from '@oe/dashboard/affiliate/campaigns/compaign-detail/page';

export default async function UserAffiliateCampaignsDetailPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const {
    campaign_name: campaignName,
    course_name: courseName,
    course_price: coursePrice,
    start_date: startDate,
    end_date: endDate,
  } = await searchParams;

  return (
    <UserAffiliateCampaignsDetailManagement
      campaignName={campaignName}
      courseName={courseName}
      coursePrice={coursePrice}
      startDate={startDate}
      endDate={endDate}
    />
  );
}
