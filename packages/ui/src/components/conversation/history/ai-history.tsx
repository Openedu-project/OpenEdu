'use client';
import { useGetListConversation } from '@oe/api/hooks/useConversation';
import MessageTime from '@oe/assets/icons/message-time';
import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { useSWRConfig } from 'swr';
import { useDebouncedCallback } from 'use-debounce';
import { Modal } from '#components/modal';
import { Button } from '#shadcn/button';
import { Input } from '#shadcn/input';
import { useConversationStore } from '#store/conversation-store';
import { cn } from '#utils/cn';
import { HISTORY_DEFAULT_PARAMS } from '../constants';
import { formatDate } from '../utils';
import AIHistoryItem from './history-item';

interface SearchHistoryProps {
  className?: string;
  isLogin?: boolean;
  callbackFn?: () => void;
}

const SearchHistory = ({ className, isLogin, callbackFn }: SearchHistoryProps) => {
  const tGeneral = useTranslations('general');
  const tAI = useTranslations('aiAssistant');
  const { id } = useParams();

  const searchRef = useRef<HTMLInputElement | null>(null);

  const { mutate: globalMutate } = useSWRConfig();
  const { isNewChat } = useConversationStore();

  const [searchParams, setSearchParams] = useState(HISTORY_DEFAULT_PARAMS);

  const { data, mutate, size, setSize, isLoading, getKey } = useGetListConversation(searchParams, isLogin);

  const historyData = useMemo(
    () =>
      data?.flatMap(item =>
        item?.results?.map(history => ({
          ...history,
          page: item.pagination.page ?? 1,
        }))
      ),
    [data]
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (isNewChat) {
      mutate();
    }
  }, [isNewChat]);

  const handleSearch = async (title?: string, isNextPage?: boolean) => {
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

  const getItemsByDate = useCallback(
    (targetDate: number) =>
      historyData
        ?.filter(item => {
          const itemDate = new Date(item.create_at).setHours(0, 0, 0, 0);

          return itemDate === targetDate;
        })
        .sort((a, b) => b.create_at - a.create_at),
    [historyData]
  ); // Sort items within same create_at descending

  const datesData = useMemo(() => {
    const uniqueDates = [...new Set(historyData?.map(item => new Date(item.create_at).setHours(0, 0, 0, 0)))];

    return uniqueDates.sort((a, b) => b - a); // Sort dates descending
  }, [historyData]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) {
      return;
    }

    if (e.key === 'Enter' && searchRef.current) {
      e.preventDefault();
      handleSearch?.(searchRef.current.value ?? '');
    }
  };

  const debouncedSetSearch = useDebouncedCallback(
    () => searchRef.current && handleSearch?.(searchRef.current.value ?? ''),
    300
  );

  return (
    <div className={cn('mx-auto flex flex-col gap-2 p-4 text-foreground', className)}>
      <Input
        ref={searchRef}
        prefixIcon={<Search color="#000" width={16} height={16} />}
        className="!rounded-3xl mcaption-regular16 !border-1 w-full bg-gray-50 pl-8"
        placeholder={tGeneral('search')}
        onKeyDown={handleKeyDown}
        onChange={debouncedSetSearch}
      />
      {!isLoading && historyData?.length === 0 ? (
        <div className="p-4 text-center text-foreground">{tAI('noHistory')}</div>
      ) : (
        <Virtuoso
          style={{ display: 'flex', flexGrow: 1 }}
          data={datesData}
          firstItemIndex={0}
          initialTopMostItemIndex={0}
          increaseViewportBy={200}
          className="scrollbar"
          endReached={() => {
            handleSearch?.(undefined, true);
          }}
          itemContent={(_, date: number) => (
            <div key={date} className="mt-2 space-y-2">
              <h5 className="mcaption-semibold14">{formatDate(date)}</h5>
              <div className="pl-2">
                {getItemsByDate(date)?.map(item => {
                  const { page, ...baseData } = item;
                  return (
                    <AIHistoryItem
                      key={item.id}
                      item={baseData}
                      pageIndex={page}
                      mutate={mutate}
                      activeId={id as string}
                      callbackFn={callbackFn}
                    />
                  );
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

export function AIHistoryModal({ isLogin = false, ...props }: SearchHistoryProps) {
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => {
    setOpen(prev => !prev);
  };

  return (
    <Modal
      title="  "
      open={open}
      trigger={
        <Button
          {...props}
          className="rounded-full bg-primary/5 hover:bg-primary/10"
          onClick={handleOpenModal}
          size="icon"
        >
          <MessageTime color="hsl(var(--primary))" width={20} height={20} />
        </Button>
      }
      hasCloseIcon
      className="md:max-w-3xl"
      hasCancelButton={false}
      contentClassName="p-2 pt-0 md:pb-4"
    >
      <SearchHistory className={cn('h-[70dvh]')} isLogin={isLogin} callbackFn={handleOpenModal} />
    </Modal>
  );
}
