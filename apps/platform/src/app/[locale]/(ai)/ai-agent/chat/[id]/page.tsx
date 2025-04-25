import { AIChatPage, ConversationProvider } from "@oe/ui";

export default async function AIChatDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  return (
    <ConversationProvider id={id}>
      <AIChatPage id={id} agent="ai_search" />
    </ConversationProvider>
  );
}
