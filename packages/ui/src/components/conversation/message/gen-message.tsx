'use client';

import { GENERATING_STATUS } from '@oe/core/utils/constants';
import { type RefObject, memo, useEffect, useState } from 'react';
import { useConversationStore } from '#store/conversation-store';
import { AIMessage } from './ai-message';

type TextSubscriber = (text: string) => void;

// Create a singleton state to persist across remounts
const TypewriterState = {
  currentText: '',
  position: 0,
  subscribers: new Set<TextSubscriber>(),

  updateText(newText: string): void {
    this.currentText = newText;
    this.position = newText.length;
    this.notifySubscribers();
  },

  addSubscriber(callback: TextSubscriber): () => void {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  },

  notifySubscribers(): void {
    for (const callback of this.subscribers) {
      callback(this.currentText);
    }
  },

  reset(): void {
    this.currentText = '';
    this.position = 0;
    this.notifySubscribers();
  },
};

export const GenMessage = memo(({ containerRef }: { containerRef: RefObject<HTMLDivElement | null> }) => {
  const { genMessage, setOpenWebSource, openWebSource, addMessage, resetGenMessage } = useConversationStore();
  const [text, setText] = useState(TypewriterState.currentText);
  const [prevScrollTop, setPrevScrollTop] = useState(0);

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

  useEffect(() => {
    const unsubscribe = TypewriterState.addSubscriber(setText);
    return unsubscribe;
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const handleGenText = setInterval(() => {
      if (!genMessage) {
        clearInterval(handleGenText);
        TypewriterState.reset();
        return;
      }

      const nextChars = genMessage.content.substring(TypewriterState.position, TypewriterState.position + 2);

      if (!(GENERATING_STATUS.includes(genMessage.status ?? '') || nextChars)) {
        addMessage(genMessage, resetGenMessage);
        clearInterval(handleGenText);
      }

      if (nextChars) {
        const newText = TypewriterState.currentText + nextChars;
        TypewriterState.updateText(newText);
        if (containerRef.current) {
          const { scrollHeight, scrollTop, clientHeight } = containerRef.current;
          const thresholdBottom = scrollHeight - scrollTop - clientHeight;
          setPrevScrollTop(scrollTop);
          if (scrollTop > prevScrollTop - 20 && thresholdBottom < 50) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
          }
        }
      }
    }, 10);

    return () => clearInterval(handleGenText);
  }, [genMessage]);

  if (!genMessage) {
    return <div className="h-[100px]" />;
  }

  return <AIMessage className="pt-2 pb-16" message={genMessage} content={text} loading={true} actionsButton={false} />;
});
