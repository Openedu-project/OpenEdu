import { AIChatDetailPage } from "@oe/ui";

export default async function AIChatDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  return <AIChatDetailPage id={id} agent="ai_search" />;
}
