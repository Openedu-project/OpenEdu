import type { IMessage, TAgentType } from '@oe/api/types/conversation';
import { MessageContainer } from './message/message-container';
import type { ISendMessageParams } from './type';

interface IChatProps {
  id: string;
  nextCursorPage?: string;
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
export const ChatWithMessage = ({ id, sendMessage, messageType, nextCursorPage = '' }: IChatProps) => {
  const rewrite = (msg: IMessage) => {
    if (!msg.ai_agent_type || messageType.includes(msg.ai_agent_type)) {
      void sendMessage({
        message_id: msg.id,
        type: msg.ai_agent_type,
        status: 'pending',
        role: msg.sender.role,
      });
    }
  };

  return (
    <div className="flex h-full flex-col gap-4">
      <MessageContainer
        rewrite={rewrite}
        className="overflow-x-hidden"
        messageType={messageType}
        nextCursorPage={nextCursorPage}
        id={id}
        sendMessage={sendMessage}
      />
    </div>
  );
};
