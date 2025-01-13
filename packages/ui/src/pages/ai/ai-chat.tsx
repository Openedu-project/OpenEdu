import { getConversationDetail } from '@oe/api/services/conversation';
import { ChatWindow } from '#components/conversation';

export default async function AIChatPage({ id }: { id?: string }) {
  const chatData = id
    ? await getConversationDetail(undefined, id, {
        per_page: 10,
        sort: 'create_at desc',
      })
    : undefined;
  return (
    <ChatWindow id={id} initMessages={chatData?.results.messages} nextCursorPage={chatData?.pagination?.next_cursor} />
  );
}
