import type { IMessage, InputType } from '@oe/api/types/conversation';
import { useMemo } from 'react';
import { useConversationStore } from '#store/conversation-store';
import { MessageContainer } from './message/message-container';
import type { ISendMessageParams } from './type';

interface IChatProps {
  id: string;
  nextCursorPage?: string;
  sendMessage: ({
    messageInput,
    type,
    url,
    images,
    message_id,
    role,
  }: // biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
  ISendMessageParams) => void | Promise<unknown>;
}
export const ChatWithMessage = ({ id, sendMessage, nextCursorPage = '' }: IChatProps) => {
  const { selectedModel } = useConversationStore();

  const rewrite = (msg: IMessage) => {
    if (selectedModel?.configs.image_analysis_enabled || !msg.configs.is_image_analysis) {
      void sendMessage({
        message_id: msg.id,
        type: msg.configs.is_image_analysis ? 'image_analysis' : 'chat',
        status: 'pending',
        role: msg.sender.role,
      });
    }
  };

  const messageType = useMemo(() => {
    return ['chat', 'scrap_from_url', selectedModel?.configs?.image_analysis_enabled && 'image_analysis'].filter(
      Boolean
    ) as InputType[];
  }, [selectedModel]);

  return (
    <div className="flex h-full flex-col gap-4 overflow-auto">
      <MessageContainer
        rewrite={rewrite}
        messageType={messageType}
        nextCursorPage={nextCursorPage}
        id={id}
        sendMessage={sendMessage}
      />
    </div>
  );
};
