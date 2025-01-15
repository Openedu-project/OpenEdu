'use client';
import { useGetListConversation } from '@oe/api/hooks/useConversation';
import type { IChatHistory, IChatHistoryResponse } from '@oe/api/types/conversation';
import type { HTTPResponse } from '@oe/api/types/fetch';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { FileClock, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { useSWRConfig } from 'swr';
import type { SWRInfiniteResponse } from 'swr/infinite';
import { Button } from '#shadcn/button';
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle } from '#shadcn/drawer';
import { Input } from '#shadcn/input';
import { useIsMobile } from '#shadcn/use-mobile';
import { cn } from '#utils/cn';
import { useConversationStore } from '../_stores/conversation-store';
import AIHistoryItem from './history-item';
const PER_PAGE = 50;

interface SearchHistoryProps {
  className?: string;
  mutate?: SWRInfiniteResponse<HTTPResponse<IChatHistoryResponse>>['mutate'];
  isLoading?: boolean;
  chatHistory?: Array<IChatHistory & { page: number }>;
  handleSearch?: (text?: string, nextPage?: boolean) => void;
  pauseAddMessage?: () => void;
  isLogin?: boolean;
}

const SearchHistory = ({ className, mutate, handleSearch, chatHistory = [], isLoading }: SearchHistoryProps) => {
  const tGeneral = useTranslations('general');
  const tAI = useTranslations('aiAssistant');

  const searchRef = useRef<HTMLInputElement | null>(null);

  const today = new Date().setHours(0, 0, 0, 0);
  const yesterday = today - 86_400_000; // 24 hours in milliseconds

  const getItemsByDate = (targetDate: number) =>
    chatHistory
      ?.filter(item => {
        const itemDate = new Date(item.create_at).setHours(0, 0, 0, 0);

        return itemDate === targetDate;
      })
      .sort((a, b) => b.create_at - a.create_at); // Sort items within same create_at descending
  const getDates = () => {
    const uniqueDates = [...new Set(chatHistory?.map(item => new Date(item.create_at).setHours(0, 0, 0, 0)))];

    return uniqueDates.sort((a, b) => b - a); // Sort dates descending
  };

  const formatDate = (timestamp: number) => {
    if (timestamp === today) {
      return 'Today';
    }
    if (timestamp === yesterday) {
      return 'Yesterday';
    }

    // Format as dd/mm/yyyy for all other dates
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) {
      return;
    }

    if (e.key === 'Enter' && searchRef.current) {
      e.preventDefault();
      handleSearch?.(searchRef.current.value ?? '');
    }
  };

  return (
    <div className={cn('mx-auto flex flex-col gap-2 bg-primary/5 p-4 text-foreground', className)}>
      <Input
        ref={searchRef}
        prefixIcon={<Search color="#000" width={16} height={16} />}
        className="!rounded-3xl mcaption-regular14 !border-1 w-full bg-gray-50 pl-8"
        placeholder={tGeneral('search')}
        onKeyDown={handleKeyDown}
      />
      {!isLoading && chatHistory.length === 0 ? (
        <div className="p-4 text-center text-foreground">{tAI('noHistory')}</div>
      ) : (
        <Virtuoso
          style={{ display: 'flex', flexGrow: 1 }}
          data={getDates()}
          firstItemIndex={0}
          initialTopMostItemIndex={0}
          increaseViewportBy={200}
          endReached={() => {
            handleSearch?.(undefined, true);
          }}
          itemContent={(_, date: number) => (
            <div key={date} className="mt-2 space-y-2">
              <h5 className="mcaption-semibold14">{formatDate(date)}</h5>
              <div>
                {getItemsByDate(date)?.map(item => {
                  const { page, ...baseData } = item;
                  return <AIHistoryItem key={item.id} item={baseData} pageIndex={page} mutate={mutate} />;
                })}
              </div>
            </div>
          )}
          components={{
            Footer: () =>
              isLoading ? <div className="p-4 text-center text-foreground">{tAI('loadingHistory')}</div> : null,
          }}
        />
      )}
    </div>
  );
};

export default function AIHistory({ className, isLogin = false, pauseAddMessage }: SearchHistoryProps) {
  const [isShow, setIsShow] = useState<boolean>(false);
  const isMobile = useIsMobile();
  const { mutate: globalMutate } = useSWRConfig();
  const { isNewChat } = useConversationStore();

  const [searchParams, setSearchParams] = useState({
    page: 1,
    per_page: PER_PAGE,
    sort: 'create_at desc',
    search_term: '',
  });

  const { data, mutate, size, setSize, isLoading, getKey } = useGetListConversation(searchParams, isLogin);
  const historyData = useMemo(
    () => data?.flatMap(item => item?.results?.map(history => ({ ...history, page: item.pagination.page ?? 1 }))),
    [data]
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (isNewChat) {
      mutate();
    }
  }, [isNewChat]);

  const searchChatHistory = async (title?: string, isNextPage?: boolean) => {
    const pagination = data?.at(-1)?.pagination;

    if (isLoading || (title === undefined && size === pagination?.total_pages)) {
      return;
    }

    const apiKey = getKey(isNextPage ? size : 0, undefined, {
      ...searchParams,
      search_term: title ?? searchParams.search_term,
    });

    if (title !== undefined) {
      await globalMutate(apiKey, undefined, { revalidate: false });
    }

    if (isNextPage) {
      void setSize(size + 1);
    } else {
      void setSize(1);
      await new Promise(resolve => {
        setSearchParams(prev => {
          resolve(null);
          return { ...prev, search_term: title ?? '', page: 1 };
        });
      });
    }
  };
  return (
    <>
      {isMobile ? (
        <>
          {!isShow && (
            <Button
              className={cn(
                '!p-2 !rounded-l-full !rounded-r-none pointer-events-auto absolute right-0 z-[60] mb-1 bg-primary lg:hidden',
                isShow ? 'top-0 rotate-90 opacity-100' : 'bottom-2 opacity-80'
              )}
              onClick={() => setIsShow(!isShow)}
            >
              <FileClock className="h-4 w-4 text-primary-foreground" />
            </Button>
          )}
          <Drawer open={isShow} onOpenChange={setIsShow} direction="right">
            <DrawerContent className="!duration-300 top-0 h-[calc(100vh-100px] md:w-1/2 first:[&>div]:hidden">
              <DrawerTitle>
                <VisuallyHidden asChild>Title</VisuallyHidden>
              </DrawerTitle>
              <DrawerDescription>
                <VisuallyHidden asChild>Description</VisuallyHidden>
              </DrawerDescription>

              <SearchHistory
                className={cn('w-full grow rounded-l-4 bg-background', isShow ? 'translate-x-0' : 'translate-x-full')}
                chatHistory={historyData}
                handleSearch={searchChatHistory}
                pauseAddMessage={pauseAddMessage}
                mutate={mutate}
                isLoading={isLoading}
              />
            </DrawerContent>
          </Drawer>
        </>
      ) : (
        <SearchHistory
          className={cn('hidden lg:flex lg:w-1/4', className)}
          chatHistory={historyData}
          handleSearch={searchChatHistory}
          pauseAddMessage={pauseAddMessage}
          mutate={mutate}
          isLoading={isLoading}
        />
      )}
    </>
  );
}
