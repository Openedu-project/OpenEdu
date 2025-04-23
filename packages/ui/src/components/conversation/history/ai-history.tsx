'use client';
import { useGetListConversation } from '@oe/api';
import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { cloneElement, useMemo, useRef, useState } from 'react';
import type { JSX, KeyboardEvent } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { useSWRConfig } from 'swr';
import { useDebouncedCallback } from 'use-debounce';
import { Modal } from '#components/modal';
import { Button } from '#shadcn/button';
import { Input } from '#shadcn/input';
import { cn } from '#utils/cn';
import { HISTORY_DEFAULT_PARAMS } from '../constants';
import { formatDate, getHistoryByDate, getHistoryDates } from '../utils';
import { AIHistoryItem } from './history-item';

interface SearchHistoryProps {
  className?: string;
  isLogin?: boolean;
  callbackFn?: () => void;
  hiddenSearch?: boolean;
  triggerButton?: JSX.Element;
}

export const SearchHistory = ({ className, isLogin, callbackFn, hiddenSearch = false }: SearchHistoryProps) => {
  const tGeneral = useTranslations('general');
  const tAI = useTranslations('aiAssistant');
  const { id } = useParams();

  const searchRef = useRef<HTMLInputElement | null>(null);
  // Add a ref to track if we're already loading more data
  const isLoadingMoreRef = useRef(false);

  const { mutate: globalMutate } = useSWRConfig();

  const [searchParams, setSearchParams] = useState(HISTORY_DEFAULT_PARAMS);

  const { data, mutate, size, setSize, isLoading, getKey } = useGetListConversation(searchParams, isLogin);

  const historyData = useMemo(
    () =>
      data?.flatMap(item =>
        item?.results?.map(history => ({
          ...history,
          page: item.pagination.page ?? 1,
        }))
      ) ?? [],
    [data]
  );

  const handleSearch = async (title?: string, isNextPage?: boolean) => {
    const pagination = data?.at(-1)?.pagination;

    if (isLoading || (title === undefined && size === pagination?.total_pages)) {
      return;
    }

    // Set loading state when starting a search
    if (isNextPage) {
      isLoadingMoreRef.current = true;
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

    // Reset loading state after search completes
    if (isNextPage) {
      isLoadingMoreRef.current = false;
    }
  };

  const datesData = useMemo(() => {
    return getHistoryDates(historyData);
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

  // Create a debounced endReached handler
  const handleEndReached = useDebouncedCallback(
    () => {
      const pagination = data?.at(-1)?.pagination;

      if (
        isLoading ||
        isLoadingMoreRef.current ||
        datesData.length === 0 ||
        (pagination && size >= pagination.total_pages)
      ) {
        return;
      }

      handleSearch?.(undefined, true);
    },
    300,
    { leading: true, trailing: false }
  );

  return (
    <div className={cn('mx-auto flex flex-col gap-2 p-4 text-foreground', className)}>
      {!hiddenSearch && (
        <Input
          ref={searchRef}
          prefixIcon={<Search color="#000" width={16} height={16} />}
          className="!rounded-3xl mcaption-regular16 !border-1 w-full bg-gray-50 pl-8"
          placeholder={tGeneral('search')}
          onKeyDown={handleKeyDown}
          onChange={debouncedSetSearch}
        />
      )}
      {!isLoading && historyData?.length === 0 ? (
        <div className="m-auto p-4 text-center text-foreground">{tAI('noHistory')}</div>
      ) : (
        <Virtuoso
          data={datesData}
          firstItemIndex={0}
          initialTopMostItemIndex={0}
          increaseViewportBy={200}
          className="scrollbar flex grow"
          endReached={handleEndReached}
          itemContent={(_, date: number) => (
            <div key={date} className="mt-2 space-y-2">
              <h5 className="mcaption-semibold14">{formatDate(date)}</h5>
              <div className="pl-2">
                {getHistoryByDate(date, historyData)?.map(item => {
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

export function AIHistoryModal({ isLogin = false, triggerButton }: SearchHistoryProps) {
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => {
    setOpen(true);
  };

  const buttonWithClickHandler = cloneElement(
    triggerButton ?? (
      <Button size="icon" variant="ghost">
        <Search width={16} height={16} />
      </Button>
    ),
    {
      onClick: handleOpenModal,
    }
  );

  return (
    <div>
      {buttonWithClickHandler}
      {open && (
        <Modal
          title="  "
          open={true}
          hasCloseIcon
          className="md:max-w-3xl"
          hasCancelButton={false}
          contentClassName="p-2 pt-0 md:pb-4"
          onClose={() => {
            setOpen(false);
          }}
        >
          <SearchHistory
            className={cn('h-[70dvh]')}
            isLogin={isLogin}
            callbackFn={() => {
              setOpen(false);
            }}
          />
        </Modal>
      )}
    </div>
  );
}
