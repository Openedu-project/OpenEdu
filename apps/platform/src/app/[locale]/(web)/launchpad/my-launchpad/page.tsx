import MyLaunchpadList from '@oe/ui/pages/launchpad/my-launchpad';

export default function MyLaunchpadPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  return <MyLaunchpadList searchParams={searchParams} />;
}
