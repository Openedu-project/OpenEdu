import { useEffect, useRef, useState } from 'react';

import { deleteConversation, updateConversationTitle } from '@oe/api/services/conversation';
import type { IChatHistory, IChatHistoryResponse } from '@oe/api/types/conversation';
import type { HTTPResponse } from '@oe/api/types/fetch';
import { createAPIUrl } from '@oe/api/utils/fetch';
import type { HTTPError } from '@oe/api/utils/http-error';
import { AI_ROUTES } from '@oe/core/utils/routes';
import { MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { RefObject } from 'react';
import type { SWRInfiniteResponse } from 'swr/infinite';
import { Link, useRouter } from '#common/navigation';
import { toast } from '#shadcn/sonner';
import { useConversationStore } from '#store/conversation-store';
import { cn } from '#utils/cn';
import { INPUT_BUTTON } from '../constants';
import MessageInput from '../message-input/message-input';
import type { ISendMessageParams } from '../type';
import ActionDropdown from './history-actions-dropdown';

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

export default function AIHistoryItem({ className, item, mutate, pageIndex, activeId, callbackFn }: IHistoryItem) {
  const tError = useTranslations('errors');

  const [isEdit, setIsEdit] = useState(false);
  const { setIsNewChat, resetStatus } = useConversationStore();
  const router = useRouter();

  const agentData = INPUT_BUTTON.find(data => data.type === item.ai_agent_type);

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
        {agentData?.icon ?? <MessageCircle size={16} color="hsl(var(--warning-500))" />}
        <MessageInput
          initialMessage={item.context?.title}
          sendMessage={handleEdit}
          hiddenBtn
          className="!rounded-lg min-h-6 w-full md:p-2"
          type="ai_search"
        />
      </div>
    );
  }

  return (
    <div className={cn('group/history flex items-center rounded-lg pl-2 hover:bg-primary/10', className)}>
      {agentData?.icon ?? <MessageCircle size={16} color="hsl(var(--warning-500))" />}
      {activeId === item.id ? (
        <p className="mcaption-regular14 md:mcaption-regular16 !font-bold w-[calc(100%-20px)] truncate p-2 opacity-50">
          {item.context?.title}
        </p>
      ) : (
        <Link
          className="mcaption-regular14 md:mcaption-regular16 block h-auto w-[calc(100%-20px)] truncate px-2 text-start text-foreground hover:no-underline"
          href={createAPIUrl({
            endpoint: AI_ROUTES.chatDetail,
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
