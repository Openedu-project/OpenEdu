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
    scrollToBottom?: () => void;
    setShowScrollButton: Dispatch<SetStateAction<boolean>>;
  }) => {
    const { genMessage, setOpenWebSource, addMessage, resetGenMessage, resetPage } = useConversationStore();
    const prevScrollPosition = useRef<{ position: number; height: number }>({
      position: 0,
      height: 0,
    });

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

    // useEffect(() => {
    //   if (!genMessage) {
    //     return;
    //   }
    //   if (!GENERATING_STATUS.includes(genMessage.status ?? "")) {
    //     addMessage(genMessage, () => {
    //       if (resetPage) {
    //         mutate();
    //       }
    //       resetGenMessage();
    //     });
    //   }

    //   if (containerRef.current) {
    //     const { scrollHeight, scrollTop, clientHeight } = containerRef.current;
    //     const { position, height } = prevScrollPosition.current;

    //     const thresholdBottom = height - position - clientHeight;

    //     if (scrollTop > position - 20 && thresholdBottom < 50) {
    //       scrollToBottom?.();
    //       prevScrollPosition.current = {
    //         position: scrollTop,
    //         height: scrollHeight,
    //       };
    //     }
    //   }
    // }, [
    //   genMessage,
    //   addMessage,
    //   containerRef.current,
    //   mutate,
    //   resetGenMessage,
    //   resetPage,
    //   scrollToBottom,
    // ]);

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

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
      const handleGenText = setInterval(() => {
        const genMessage = useConversationStore.getState().genMessage;
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

          clearInterval(handleGenText);
        }

        if (containerRef.current) {
          const { scrollHeight, scrollTop, clientHeight } = containerRef.current;
          const { position, height } = prevScrollPosition.current;

          const thresholdBottom = height - position - clientHeight;

          if (scrollTop > position - 20 && thresholdBottom < 50) {
            scrollToBottom?.();
            prevScrollPosition.current = {
              position: scrollTop,
              height: scrollHeight,
            };
          } else {
            setShowScrollButton(true);
          }
        }
      }, 20);

      return () => clearInterval(handleGenText);
    }, []);

    if (!genMessage) {
      return null;
    }

    return (
      <AIMessage className="pt-2 pb-16" message={genMessage} loading={true} actionsButton={false} hiddenSourceBtn />
    );
  }
);
