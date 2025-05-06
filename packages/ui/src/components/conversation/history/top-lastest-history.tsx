'use client';
import { type IChatHistory, useGetConversations } from '@oe/api';
import { AI_ROUTES } from '@oe/core';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { Link, usePathname } from '#common/navigation';
import { HISTORY_DEFAULT_PARAMS } from '../constants';
import { formatDate, getHistoryByDate, getHistoryDates } from '../utils';
import { AIHistoryItem } from './history-item';

export const TopLastestHistory = memo(({ onClickHistory }: { onClickHistory?: () => void }) => {
  const tAI = useTranslations('aiAssistant');
  const tGeneral = useTranslations('general');
  const [historyData, setHistoryData] = useState<IChatHistory[]>([]);
  const initLoading = useRef(true);
  const { history, isLoading } = useGetConversations(HISTORY_DEFAULT_PARAMS);
  const { id } = useParams();
  const pathname = usePathname();
  const datesData = useMemo(() => {
    return getHistoryDates(historyData ?? []);
  }, [historyData]);

  useEffect(() => {
    if (!history?.results) {
      return;
    }
    setHistoryData(
      history?.results?.map(item => {
        return {
          ...item,
          page: 1,
        };
      })
    );
    initLoading.current = false;
  }, [history]);

  if ((isLoading && initLoading.current) || initLoading.current) {
    return <div className="mcaption-regular14 text-center">{tAI('loadingHistory')}</div>;
  }

  if (!historyData || historyData.length === 0) {
    return <div className="mcaption-regular14 text-center">{tAI('noHistory')}</div>;
  }

  return (
    <div>
      {datesData.map(date => (
        <div key={date} className="space-y-2">
          <h5 className="mcaption-semibold14">{formatDate(date)}</h5>
          <div className="pl-2">
            {getHistoryByDate(date, historyData)?.map(item => {
              return (
                <AIHistoryItem
                  key={item.id}
                  item={item}
                  activeId={id as string}
                  callbackFn={onClickHistory}
                  hoverAction={!pathname.includes(AI_ROUTES.history)}
                />
              );
            })}
          </div>
        </div>
      ))}
      {(history?.pagination?.total_items ?? 0) > 20 && (
        <Link
          href={AI_ROUTES.history}
          className="mx-auto flex"
          variant="link"
          activeClassName=""
          onClick={onClickHistory}
        >
          {tGeneral('viewAll')}
        </Link>
      )}
    </div>
  );
});
