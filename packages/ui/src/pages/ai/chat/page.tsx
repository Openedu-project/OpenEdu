import { isLogin } from '@oe/api';
import type { TAgentType } from '@oe/api';
import { AUTH_ROUTES } from '@oe/core';
import { redirect } from 'next/navigation';
import { ChatWithSource } from '#components/conversation';

const getChatMessages = async (id?: string) => {
  if (!id) {
    return undefined;
  }

  const login = await isLogin();

  if (!login) {
    redirect(AUTH_ROUTES.login);
  }
};

export async function AIChatPage({
  id,
  agent,
}: {
  id?: string;
  agent: TAgentType;
}) {
  await getChatMessages(id);
  return <ChatWithSource id={id} agent={agent} />;
}
