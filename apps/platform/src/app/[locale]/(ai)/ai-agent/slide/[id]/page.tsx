import { AIChatDetailPage } from "@oe/ui";

export default async function AISlideDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  return <AIChatDetailPage id={id} agent="ai_slide" />;
}
