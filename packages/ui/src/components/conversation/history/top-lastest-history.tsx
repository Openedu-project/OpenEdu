'use client';
import { type IChatHistory, useGetConversations } from '@oe/api';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { memo, useEffect, useMemo, useState } from 'react';
import { Button } from '#shadcn/button';
import { formatDate, getHistoryByDate, getHistoryDates } from '../utils';
import { AIHistoryModal } from './ai-history';
import { AIHistoryItem } from './history-item';

export const TopLastestHistoryParams = {
  page: 1,
  per_page: 20,
  sort: 'create_at desc',
};
export const TopLastestHistory = memo(() => {
  const tAI = useTranslations('aiAssistant');
  const tGeneral = useTranslations('general');
  const [historyData, setHistoryData] = useState<IChatHistory[]>([]);
  const { history, mutate, isLoading } = useGetConversations(TopLastestHistoryParams);
  const { id } = useParams();
  const datesData = useMemo(() => {
    return getHistoryDates(history?.results ?? []);
  }, [history?.results]);

  useEffect(() => {
    if (!history || history?.results?.length === 0) {
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
  }, [history]);

  if (isLoading) {
    return <div className="mcaption-regular14 text-center">{tAI('loadingHistory')}</div>;
  }

  if (!history || history?.results?.length === 0) {
    return <div className="mcaption-regular14 text-center">{tAI('noHistory')}</div>;
  }

  return (
    <div>
      {datesData.map(date => (
        <div key={date} className="space-y-2">
          <h5 className="mcaption-semibold14">{formatDate(date)}</h5>
          <div className="pl-2">
            {getHistoryByDate(date, historyData)?.map(item => {
              return <AIHistoryItem key={item.id} item={item} callbackFn={mutate} activeId={id as string} />;
            })}
          </div>
        </div>
      ))}
      <AIHistoryModal
        isLogin={true}
        triggerButton={
          <Button className="mx-auto flex" variant="link">
            {tGeneral('viewAll')}
          </Button>
        }
      />
    </div>
  );
});
