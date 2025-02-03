import { getConversationDetail } from '@oe/api/services/conversation';
import { ChatWindow } from '#components/conversation';

const getChatMessages = async (id?: string) => {
  if (!id) {
    return undefined;
  }

  const res = await getConversationDetail(undefined, id, {
    per_page: 10,
    sort: 'create_at desc',
  });
  return res;
};

export default async function AIChatPage({ id }: { id?: string }) {
  const chatData = await getChatMessages(id);
  return <ChatWindow id={id} initData={chatData} />;
}
