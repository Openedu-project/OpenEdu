'use client';
import { API_ENDPOINT, createAPIUrl, updateConversationTitle } from '@oe/api';
import type { HTTPError, ISearchHistoryParams } from '@oe/api';
import { deleteConversation } from '@oe/api';
import type { IChatHistory, IChatHistoryResponse } from '@oe/api';
import { AI_ROUTES } from '@oe/core';
import { MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import type { Dispatch, RefObject, SetStateAction } from 'react';
import { type KeyedMutator, useSWRConfig } from 'swr';
import { Link, useRouter } from '#common/navigation';
import { toast } from '#shadcn/sonner';
import { useConversationStore } from '#store/conversation-store';
import { cn } from '#utils/cn';
import { AI_SIDEBAR, HISTORY_DEFAULT_PARAMS } from '../constants';
import { MessageInput } from '../message-input/message-input';
import type { ISendMessageParams } from '../type';
import { ActionDropdown } from './history-actions-dropdown';

interface IHistoryItem {
  className?: string;
  item: IChatHistory;
  setSelectItem?: (value: IChatHistory) => void;
  mutate?: KeyedMutator<IChatHistoryResponse | null>;
  pauseAddMessage?: () => void;
  pageIndex?: number;
  activeId?: string;
  callbackFn?: () => void;
  searchParams?: ISearchHistoryParams;
  setHistoryData?: Dispatch<SetStateAction<IChatHistory[]>>;
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

export function AIHistoryItem({
  className,
  item,
  pageIndex = 1,
  activeId,
  callbackFn,
  searchParams = HISTORY_DEFAULT_PARAMS,
  setHistoryData,
}: IHistoryItem) {
  const tError = useTranslations('errors');

  const [isEdit, setIsEdit] = useState(false);
  const { setIsNewChat, resetStatus } = useConversationStore();
  const router = useRouter();
  const { mutate: globalMutate } = useSWRConfig();

  const agentData = AI_SIDEBAR().find(data => data.agent === item.ai_agent_type);

  const handleEdit = async ({ messageInput }: ISendMessageParams) => {
    await updateConversationTitle(undefined, item.id, {
      title: messageInput ?? '',
    });
    setIsEdit(false);
    const initkey = createAPIUrl({
      endpoint: API_ENDPOINT.COM_CHANNELS,
      queryParams: { ...searchParams, page: 1 },
    });
    const apikey = createAPIUrl({
      endpoint: API_ENDPOINT.COM_CHANNELS,
      queryParams: { ...searchParams, page: pageIndex },
    });
    setHistoryData?.(prev =>
      prev.map(history => {
        if (history.id !== item.id) {
          return history;
        }
        return { ...history, context: { ...history.context, title: messageInput ?? '' } };
      })
    );
    await globalMutate((key: string) => !!key.includes(apikey) || !!key.includes(initkey), undefined, {
      revalidate: true,
    });
  };

  const handleDelete = async (onClose?: () => void) => {
    try {
      await deleteConversation(undefined, item.id);
      onClose?.();

      if (item.id === activeId) {
        router.push(AI_ROUTES.chat);
      }
      setHistoryData?.(prev => prev.filter(history => history.id !== item.id));
      await globalMutate((key: string) => !!key.includes(`${API_ENDPOINT.COM_CHANNELS}/`), undefined, {
        revalidate: true,
      });
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
