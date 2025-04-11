import { LaunchpadPledgePage } from "@oe/ui";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  return <LaunchpadPledgePage id={id} />;
};

export default Page;
