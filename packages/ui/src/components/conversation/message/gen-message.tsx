import type { TAgentType } from '@oe/api/types/conversation';
import { GENERATING_STATUS } from '@oe/core/utils/constants';
import { useEffect } from 'react';
import { useConversationStore } from '#store/conversation-store';
import type { ISendMessageParams } from '../type';
import MessageBox from './message-box';

interface IGenMessageProps {
  messageType: TAgentType[];
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
export const GenMessage = ({ sendMessage, messageType }: IGenMessageProps) => {
  const { status, genMessage, setOpenWebSource, openWebSource } = useConversationStore();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (genMessage?.props?.source_results && openWebSource.messageId !== genMessage?.id) {
      setOpenWebSource({
        messageId: genMessage?.id ?? '',
        isOpen: true,
        sourceList: genMessage?.props?.source_results,
      });
    }
  }, [genMessage?.props]);

  return genMessage ? (
    <MessageBox
      key={genMessage.id}
      id={genMessage.id}
      message={genMessage}
      loading={GENERATING_STATUS.includes(status ?? '')}
      sendMessage={sendMessage}
      messageType={messageType}
    />
  ) : (
    <div className="h-[100px]" />
  );
};
