import type { IMessage, InputType } from '@oe/api/types/conversation';
import { GENERATING_STATUS } from '@oe/core/utils/constants';
import { useConversationStore } from '#store/conversation-store';
import type { ISendMessageParams } from '../type';
import MessageBox from './message-box';

interface IGenMessageProps {
  rewrite: (msg: IMessage) => void;
  messageType: InputType[];
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
export const GenMessage = ({ sendMessage, rewrite, messageType }: IGenMessageProps) => {
  const { status, genMessage } = useConversationStore();

  return genMessage ? (
    <MessageBox
      key={genMessage.id}
      id={genMessage.id}
      message={genMessage}
      loading={GENERATING_STATUS.includes(status ?? '')}
      rewrite={
        !genMessage.configs?.is_image_analysis || messageType?.includes('image_analysis')
          ? () => rewrite(genMessage)
          : undefined
      }
      sendMessage={sendMessage}
      messageType={messageType}
    />
  ) : (
    <div className="h-[100px]" />
  );
};
