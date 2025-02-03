import AIChatPage from '@oe/ui/pages/ai/chat';

export default async function AIChatDetails({ params }: { params: { id: string } }) {
  const { id } = await params;
  return <AIChatPage id={id} />;
}
