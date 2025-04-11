import { isLogin } from '@oe/api';
import { getConversationDetail } from '@oe/api';
import type { TAgentType } from '@oe/api';
import { AI_ROUTES, AUTH_ROUTES } from '@oe/core';
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

  try {
    const res = await getConversationDetail(
      undefined,
      id,
      {
        per_page: 10,
        sort: 'create_at desc',
      },
      { cache: 'no-store', next: { revalidate: 0 } }
    );
    return res;
  } catch (error) {
    console.error(error);
    redirect(AI_ROUTES.chat);
  }
};

export async function AIChatPage({
  id,
  agent,
}: {
  id?: string;
  agent: TAgentType;
}) {
  const chatData = await getChatMessages(id);
  return <ChatWithSource id={id} initData={chatData} agent={agent} />;
}
