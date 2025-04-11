import { MyLaunchpadList } from "@oe/ui";

export default function MyLaunchpadPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  return <MyLaunchpadList searchParams={searchParams} />;
}
