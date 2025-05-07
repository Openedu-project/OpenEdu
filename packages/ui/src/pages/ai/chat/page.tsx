import { type TAgentType, isLogin } from '@oe/api';
import { ChatWithSource, ConversationProvider, EmptyChat } from '#components/conversation';

export async function AIChatDetailPage({
  id,
  agent,
}: {
  id: string;
  agent: TAgentType;
}) {
  const login = await isLogin();
  return (
    <ConversationProvider id={id}>
      <ChatWithSource id={id} agent={agent} isLogin={login} />
    </ConversationProvider>
  );
}

export function AIChatPage({ agent }: { agent: TAgentType }) {
  return <EmptyChat agent={agent} />;
}
