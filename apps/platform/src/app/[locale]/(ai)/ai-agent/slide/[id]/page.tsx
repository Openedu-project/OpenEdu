import AIChatPage from "@oe/ui/pages/ai/chat";

export default async function AISlideDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  return <AIChatPage id={id} agent="ai_slide" />;
}
