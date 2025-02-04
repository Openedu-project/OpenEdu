'use client';
import type { IMessageBoxProps } from '../type';
import { AIMessage } from './ai-message';
import { UserMessage } from './user-message';

const MessageBox = ({ id, message, loading, rewrite, sendMessage, messageType }: IMessageBoxProps) => {
  return (
    <div className="py-2" id={id}>
      {message?.sender?.role === 'user' && (
        <UserMessage message={message} loading={loading} sendMessage={sendMessage} messageType={messageType} />
      )}
      {message.sender?.role === 'assistant' && <AIMessage message={message} rewrite={rewrite} loading={loading} />}
    </div>
  );
};

export default MessageBox;
