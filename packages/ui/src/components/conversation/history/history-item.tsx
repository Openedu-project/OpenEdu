'use client';
import { useEffect, useRef, useState } from 'react';

import type { HTTPResponse } from '@oe/api';
import { createAPIUrl } from '@oe/api';
import type { HTTPError } from '@oe/api';
import { deleteConversation, updateConversationTitle } from '@oe/api';
import type { IChatHistory, IChatHistoryResponse } from '@oe/api';
import { AI_ROUTES } from '@oe/core';
import { MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { RefObject } from 'react';
import type { SWRInfiniteResponse } from 'swr/infinite';
import { Link, useRouter } from '#common/navigation';
import { toast } from '#shadcn/sonner';
import { useConversationStore } from '#store/conversation-store';
import { cn } from '#utils/cn';
import { AI_SIDEBAR } from '../constants';
import { MessageInput } from '../message-input/message-input';
import type { ISendMessageParams } from '../type';
import { ActionDropdown } from './history-actions-dropdown';

interface IHistoryItem {
  className?: string;
  item: IChatHistory;
  setSelectItem?: (value: IChatHistory) => void;
  mutate?: SWRInfiniteResponse<HTTPResponse<IChatHistoryResponse>>['mutate'];
  pauseAddMessage?: () => void;
  pageIndex: number;
  activeId?: string;
  callbackFn?: () => void;
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

export function AIHistoryItem({ className, item, mutate, pageIndex, activeId, callbackFn }: IHistoryItem) {
  const tError = useTranslations('errors');

  const [isEdit, setIsEdit] = useState(false);
  const { setIsNewChat, resetStatus } = useConversationStore();
  const router = useRouter();

  const agentData = AI_SIDEBAR().find(data => data.agent === item.ai_agent_type);

  const handleEdit = async ({ messageInput }: ISendMessageParams) => {
    await updateConversationTitle(undefined, item.id, {
      title: messageInput ?? '',
    });
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

      if (item.id === activeId) {
        router.push(AI_ROUTES.chat);
      }

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
      callbackFn?.();
    } catch (error) {
      console.error(error);
      toast.error(tError((error as HTTPError).message));
    }
  };
  const editTitleRef = useClickOutside<HTMLDivElement>(() => setIsEdit(false));

  if (isEdit) {
    return (
      <div ref={editTitleRef} className={cn('flex items-center gap-2 rounded-lg px-2', className)}>
        {agentData?.icon ?? <MessageCircle size={16} color="var(--warning-500)" />}
        <MessageInput
          initialMessage={item.context?.title}
          sendMessage={handleEdit}
          hiddenBtn
          className="!rounded-lg w-full md:min-h-6 md:p-2"
          type="ai_search"
          autoSend
        />
      </div>
    );
  }

  return (
    <div className={cn('group/history flex items-center rounded-lg pl-2 hover:bg-primary/10', className)}>
      {agentData?.icon ?? <MessageCircle size={16} color="var(--warning-500)" />}
      {activeId === item.id ? (
        <p className="mcaption-regular14 !font-bold w-[calc(100%-20px)] truncate p-2 opacity-50">
          {item.context?.title}
        </p>
      ) : (
        <Link
          className="mcaption-regular14 block h-auto w-[calc(100%-20px)] truncate px-2 text-start text-foreground hover:no-underline"
          href={createAPIUrl({
            endpoint: agentData?.detailHref ?? AI_ROUTES.chatDetail,
            params: { id: item.id },
          })}
          onClick={() => {
            setIsNewChat(false);
            resetStatus();
            callbackFn?.();
          }}
        >
          {item.context?.title}
        </Link>
      )}
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
