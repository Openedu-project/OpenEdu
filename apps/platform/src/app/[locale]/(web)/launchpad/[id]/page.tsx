import LaunchpadDetailPage from '@oe/ui/pages/launchpad/detail';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  return <LaunchpadDetailPage id={id} />;
};

export default Page;
