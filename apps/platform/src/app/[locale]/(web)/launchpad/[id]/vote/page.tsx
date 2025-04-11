import { LaunchpadVotePage } from "@oe/ui";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  return <LaunchpadVotePage id={id} />;
};

export default Page;
