import CreateLaunchpadLayout from "@oe/dashboard/creator/create-launchpad/create-launchpad";
interface CreateLaunchpadPageLayoutProps {
  params: {
    launchpadId: string;
  };
}
export default async function CreateLaunchpadPage({
  params,
}: CreateLaunchpadPageLayoutProps) {
  const { launchpadId } = await params;

  console.log("launchpadId", launchpadId);

  return <CreateLaunchpadLayout />;
}
