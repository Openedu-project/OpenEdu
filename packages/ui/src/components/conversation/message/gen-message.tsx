'use client';

import type { IConversationDetails } from '@oe/api';
import { GENERATING_STATUS } from '@oe/core';
import { type Dispatch, type RefObject, type SetStateAction, memo, useEffect, useRef } from 'react';
import type { KeyedMutator } from 'swr';
import { useConversationStore } from '#store/conversation-store';
import { AIMessage } from './ai-message';

export const GenMessage = memo(
  ({
    containerRef,
    mutate,
    scrollToBottom,
    setShowScrollButton,
  }: {
    containerRef: RefObject<HTMLDivElement | null>;
    mutate: KeyedMutator<IConversationDetails>;
    scrollToBottom?: (behavior: 'auto' | 'smooth') => void;
    setShowScrollButton: Dispatch<SetStateAction<boolean>>;
  }) => {
    const { genMessage } = useConversationStore();
    const prevScrollPosition = useRef<{ position: number; height: number }>({
      position: 0,
      height: 0,
    });

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
      if (!genMessage?.content) {
        return;
      }

      if (containerRef.current) {
        const { scrollHeight, scrollTop, clientHeight } = containerRef.current;
        const { position } = prevScrollPosition.current;

        if (scrollTop > position - 20) {
          scrollToBottom?.('auto');
          prevScrollPosition.current = {
            position: scrollTop,
            height: scrollHeight,
          };
        } else if (scrollTop + clientHeight < scrollHeight) {
          setShowScrollButton(true);
        }
      }
    }, [genMessage]);

    return <PureGenMessage mutate={mutate} />;
  }
);

const PureGenMessage = memo(({ mutate }: { mutate: KeyedMutator<IConversationDetails> }) => {
  const { genMessage, addMessage, resetPage, resetGenMessage, setOpenWebSource } = useConversationStore();

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
    if (!genMessage) {
      return;
    }
    if (!GENERATING_STATUS.includes(genMessage.status ?? '')) {
      addMessage(genMessage, () => {
        if (resetPage) {
          mutate();
        }
        resetGenMessage();
      });
    }
  }, [genMessage, addMessage, mutate, resetGenMessage, resetPage]);
  if (!genMessage) {
    return null;
  }

  return (
    <div id={genMessage.id}>
      <AIMessage className="pt-2 pb-8" message={genMessage} loading={true} actionsButton={false} hiddenSourceBtn />
    </div>
  );
});
