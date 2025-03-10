'use client';
import equal from 'fast-deep-equal';
import { memo } from 'react';
import type { IMessageBoxProps } from '../type';
import { AIMessage } from './ai-message';
import { UserMessage } from './user-message';

const PureMessageBox = ({ id, message, loading, rewrite, sendMessage, messageType }: IMessageBoxProps) => {
  return (
    <div className="min-h-[100px] py-2" id={id}>
      {message?.sender?.role === 'user' && (
        <UserMessage message={message} loading={loading} sendMessage={sendMessage} messageType={messageType} />
      )}
      {message.sender?.role === 'assistant' && <AIMessage message={message} rewrite={rewrite} loading={loading} />}
    </div>
  );
};

const MessageBox = memo(PureMessageBox, (prevProps, nextProps) => {
  if (!equal(prevProps.message, nextProps.message)) {
    return false;
  }
  return true;
});

export default MessageBox;
