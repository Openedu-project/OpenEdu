import type { IMessage, InputType } from '@oe/api/types/conversation';
import { GENERATING_STATUS } from '@oe/core/utils/constants';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useConversationStore } from '#store/conversation-store';
import { cn } from '#utils/cn';
import useIsScrolledToBottom from '../../hooks/useScrollPosition';
import MessageBox from './message/message-box';
import type { ISendMessageParams } from './type';

interface IChatProps {
  className?: string;
  nextCursorPage?: string;
  animationScroll?: boolean;
  sendMessage: ({
    messageInput,
    type,
    url,
    images,
    message_id,
    role,
    // biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
  }: ISendMessageParams) => void | Promise<unknown>;
}
export const ChatWithMessage = ({ className, sendMessage, animationScroll }: IChatProps) => {
  const { messages, status, selectedModel, genMessage } = useConversationStore();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const initialScroll = useRef<boolean>(false);

  const { isScrolledToBottom, isScrolledToTop } = useIsScrolledToBottom(containerRef, {
    threshold: 10, // Distance in pixels to consider "at bottom"
    debounceMs: 0, // Debounce delay for scroll checks
    checkOnResize: true, // Whether to check on container resize
  });

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

  const animationScrollEnd = useCallback(() => {
    if (!(containerRef.current && animationScroll)) {
      return;
    }

    const container = containerRef.current;
    const lastChild = container.lastElementChild;

    if (lastChild) {
      lastChild.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, [animationScroll]);

  useEffect(() => {
    if (!messages || messages.length === 0 || !containerRef.current) {
      return;
    }

    if (animationScroll && !initialScroll.current) {
      initialScroll.current = true;
      requestAnimationFrame(animationScrollEnd);
    } else {
      requestAnimationFrame(() => {
        if (containerRef.current && isScrolledToBottom) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      });
    }
  }, [messages, animationScroll, animationScrollEnd, isScrolledToBottom]);

  const messageType = useMemo(() => {
    return ['chat', 'scrap_from_url', selectedModel?.configs?.image_analysis_enabled && 'image_analysis'].filter(
      Boolean
    ) as InputType[];
  }, [selectedModel]);

  const handleScroll = () => {
    if (!isScrolledToTop) {
      return;
    }
    console.log('scrolll to top');
  };

  return (
    <div
      ref={containerRef}
      className={cn('w-full overflow-y-auto overflow-x-hidden', className)}
      onScroll={handleScroll}
    >
      {messages?.map((msg, i) => {
        const isLast = i === messages.length - 1;

        return (
          <MessageBox
            key={msg.id}
            id={msg.id}
            message={msg}
            messageIndex={i}
            loading={GENERATING_STATUS.includes(status ?? '')}
            isLast={isLast}
            rewrite={
              !msg.configs?.is_image_analysis || messageType?.includes('image_analysis')
                ? () => rewrite(msg)
                : undefined
            }
            sendMessage={sendMessage}
            messageType={messageType}
          />
        );
      })}
      {genMessage && (
        <MessageBox
          key={genMessage.id}
          id={genMessage.id}
          message={genMessage}
          messageIndex={messages.length}
          loading={GENERATING_STATUS.includes(status ?? '')}
          isLast={false}
          rewrite={
            !genMessage.configs?.is_image_analysis || messageType?.includes('image_analysis')
              ? () => rewrite(genMessage)
              : undefined
          }
          sendMessage={sendMessage}
          messageType={messageType}
        />
      )}
    </div>
  );
};
