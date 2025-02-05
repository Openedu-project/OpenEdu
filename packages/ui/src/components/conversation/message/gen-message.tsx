import type { TAgentType } from '@oe/api/types/conversation';
import { GENERATING_STATUS } from '@oe/core/utils/constants';
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
  const { status, genMessage } = useConversationStore();

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
