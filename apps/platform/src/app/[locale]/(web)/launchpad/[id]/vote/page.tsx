import LaunchpadVotingPage from '@oe/ui/pages/launchpad/vote';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  return <LaunchpadVotingPage id={id} />;
};

export default Page;
