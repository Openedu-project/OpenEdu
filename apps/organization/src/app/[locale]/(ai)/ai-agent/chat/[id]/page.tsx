import { AIChatPage } from "@oe/ui";

export default async function AIChatDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  return <AIChatPage id={id} agent="ai_search" />;
}
