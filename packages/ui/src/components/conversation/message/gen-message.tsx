'use client';

import type { IConversationDetails } from '@oe/api';
import { GENERATING_STATUS } from '@oe/core';
import { type RefObject, memo, useEffect, useState } from 'react';
import type { KeyedMutator } from 'swr';
import { useConversationStore } from '#store/conversation-store';
import { TypewriterState } from '../hooks/useTypingText';
import { AIMessage } from './ai-message';

export const GenMessage = memo(
  ({
    containerRef,
    mutate,
  }: {
    containerRef: RefObject<HTMLDivElement | null>;
    mutate: KeyedMutator<IConversationDetails>;
  }) => {
    const { genMessage, setOpenWebSource, addMessage, resetGenMessage, resetPage } = useConversationStore();
    const [text, setText] = useState(TypewriterState.currentText);
    const [prevScrollTop, setPrevScrollTop] = useState(0);

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
      if (genMessage?.props?.source_results) {
        setOpenWebSource({
          messageId: genMessage?.id ?? '',
          isOpen: true,
          sourceList: genMessage?.props?.source_results,
        });
      }
    }, [genMessage?.props?.source_results]);

    useEffect(() => {
      const unsubscribe = TypewriterState.addSubscriber(setText);
      return unsubscribe;
    }, []);

    // biome-ignore lint/correctness/useExhaustiveDependencies: <handle update content when page become visible>
    useEffect(() => {
      const handleVisibilityChange = () => {
        if (document.visibilityState === 'visible') {
          if (!genMessage) {
            return;
          }
          // Force update to latest content when becoming visible
          TypewriterState.updateText(genMessage?.content ?? '');
        }
      };
      document.addEventListener('visibilitychange', handleVisibilityChange);
    }, [document.visibilityState]);

    // biome-ignore lint/correctness/useExhaustiveDependencies: <handle typing text>
    useEffect(() => {
      const handleGenText = setInterval(() => {
        if (!genMessage) {
          clearInterval(handleGenText);
          TypewriterState.reset();
          return;
        }
        const nextChars = genMessage.content.substring(TypewriterState.position, TypewriterState.position + 2);
        if (!(GENERATING_STATUS.includes(genMessage.status ?? '') || nextChars)) {
          addMessage(genMessage, () => {
            if (resetPage) {
              mutate();
            }
            resetGenMessage();
          });

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
      return null;
    }

    return (
      <AIMessage
        className="pt-2 pb-16"
        message={genMessage}
        content={text}
        loading={true}
        actionsButton={false}
        hiddenSourceBtn
      />
    );
  }
);
