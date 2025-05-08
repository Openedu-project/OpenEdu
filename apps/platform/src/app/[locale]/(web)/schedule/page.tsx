import { Schedule } from "@oe/ui";

export default function Schedulepage({
  searchParams,
}: {
  searchParams: { n?: string };
}) {
  return <Schedule searchParams={searchParams}/>;
}
