import { AICreationPage } from "@oe/dashboard";

export default async function AICreationDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  return <AICreationPage id={id} />;
}
