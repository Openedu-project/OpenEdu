import { getConversationDetail } from '@oe/api/services/conversation';
import { isLogin } from '@oe/api/utils/auth';
import { AI_ROUTES, AUTH_ROUTES } from '@oe/core/utils/routes';
import { redirect } from 'next/navigation';
import { ChatWindow } from '#components/conversation';

const getChatMessages = async (id?: string) => {
  if (!id) {
    return undefined;
  }

  const login = await isLogin();

  if (!login) {
    redirect(AUTH_ROUTES.login);
  }

  try {
    const res = await getConversationDetail(undefined, id, {
      per_page: 10,
      sort: 'create_at desc',
    });
    return res;
  } catch (error) {
    console.error(error);
    redirect(AI_ROUTES.chat);
  }
};

export default async function AIChatPage({ id }: { id?: string }) {
  const chatData = await getChatMessages(id);
  return <ChatWindow id={id} initData={chatData} />;
}
