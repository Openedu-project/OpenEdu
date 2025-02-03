import { useEffect, useRef, useState } from 'react';

import { deleteConversation, updateConversationTitle } from '@oe/api/services/conversation';
import type { IChatHistory, IChatHistoryResponse } from '@oe/api/types/conversation';
import type { HTTPResponse } from '@oe/api/types/fetch';
import { createAPIUrl } from '@oe/api/utils/fetch';
import { AI_ROUTES } from '@oe/core/utils/routes';
import type { RefObject } from 'react';
import type { SWRInfiniteResponse } from 'swr/infinite';
import { Link } from '#common/navigation';
import { useConversationStore } from '#store/conversation-store';
import { cn } from '#utils/cn';
import MessageInput from '../message/message-input';
import type { ISendMessageParams } from '../type';
import ActionDropdown from './history-actions-dropdown';

interface IHistoryItem {
  className?: string;
  item: IChatHistory;
  setSelectItem?: (value: IChatHistory) => void;
  mutate?: SWRInfiniteResponse<HTTPResponse<IChatHistoryResponse>>['mutate'];
  pauseAddMessage?: () => void;
  pageIndex: number;
}

export function useClickOutside<T extends HTMLElement>(
  handler: () => void,
  mouseEvent: 'mousedown' | 'mouseup' = 'mousedown'
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;

      if (ref.current && !ref.current.contains(target)) {
        handler();
      }
    };

    document.addEventListener(mouseEvent, handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener(mouseEvent, handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [handler, mouseEvent]);

  return ref;
}

export default function AIHistoryItem({ className, item, mutate, pageIndex }: IHistoryItem) {
  const [isEdit, setIsEdit] = useState(false);
  const { setIsNewChat, resetGenMessage, resetStatus } = useConversationStore();

  const handleEdit = async ({ messageInput }: ISendMessageParams) => {
    await updateConversationTitle(undefined, item.id, { title: messageInput ?? '' });
    setIsEdit(false);
    await mutate?.(currentData => {
      if (!currentData) {
        return currentData;
      }

      return currentData.map((page, index) => {
        if (index === pageIndex - 1 && page) {
          return {
            ...page,
            results: page.data.results.map(chat => (chat.id === item.id ? { ...chat, title: messageInput } : chat)),
          };
        }
        return page;
      });
    });
  };

  const handleDelete = async (onClose?: () => void) => {
    try {
      await deleteConversation(undefined, item.id);
      onClose?.();

      await mutate?.(currentData => {
        if (!currentData) {
          return currentData;
        }

        return currentData.map((page, index) => {
          if (!page || index < pageIndex - 1) {
            return page;
          }

          return {
            ...page,
            results: page?.data?.results?.filter(chat => chat.id !== item?.id),
          };
        });
      });
    } catch (error) {
      console.error(error);
    }
  };
  const editTitleRef = useClickOutside<HTMLDivElement>(() => setIsEdit(false));

  if (isEdit) {
    return (
      <div ref={editTitleRef} className={cn('flex items-center gap-2 rounded-lg px-2', className)}>
        <MessageInput
          initialMessage={item.context?.title}
          sendMessage={handleEdit}
          hiddenBtn
          className="!rounded-lg w-full"
        />
      </div>
    );
  }
  return (
    <div className={cn('group/history flex items-center gap-2 rounded-lg hover:bg-primary/10', className)}>
      <Link
        className="mcaption-regular14 block h-auto w-[calc(100%-30px)] truncate text-start text-foreground hover:no-underline"
        href={createAPIUrl({ endpoint: AI_ROUTES.chatDetail, params: { id: item.id } })}
        activeClassName="text-primary cursor-default"
        onClick={() => {
          setIsNewChat(false);
          resetGenMessage();
          resetStatus();
        }}
      >
        {item.context?.title}
      </Link>
      <ActionDropdown
        className="focus-hover:opacity-100 group-hover/history:opacity-100 lg:opacity-0"
        onEdit={() => {
          setIsEdit(true);
        }}
        item={item}
        onDelete={handleDelete}
      />
    </div>
  );
}
