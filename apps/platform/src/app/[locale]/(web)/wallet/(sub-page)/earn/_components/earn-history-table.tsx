import useWalletHistory from '@oe/api/hooks/useWalletHistory';
import { formatDateHourMinute } from '@oe/core/utils/datetime';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@oe/ui/shadcn/table';
import { cn } from '@oe/ui/utils/cn';
import { formatVNDCurrency } from '@oe/ui/utils/format-currency';
import { walletStatusColor } from '@oe/ui/utils/status-color';
import { shortenAddress, snakeToSpace } from '@oe/ui/utils/utils';
import { useTranslations } from 'next-intl';
import { memo, useState } from 'react';
import { EmptyState, ErrorState, LoadingState } from '../../../_components/shared/state-components';
import TablePagination from '../../../_components/shared/table-pagination';
import EarnHistoryCard from './earn-history-card';

const PAGE_SIZE = 10;

export const EarnHistoryTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const t = useTranslations('earnPage');

  const {
    data: histories,
    totalItems,
    isLoading,
    error,
  } = useWalletHistory({
    type: 'claim_earning',
    currencyType: 'crypto',
    page: currentPage,
    pageSize: PAGE_SIZE,
  });

  if (error) {
    return <ErrorState />;
  }
  if (isLoading) {
    return <LoadingState />;
  }
  if (histories.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="w-full">
      {/* Desktop Table */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[16.67%]">{t('token')}</TableHead>
              <TableHead className="w-[16.67%]">{t('time')}</TableHead>
              <TableHead className="w-[16.67%]">{t('type')}</TableHead>
              <TableHead className="w-[16.67%]">{t('amount')}</TableHead>
              <TableHead className="w-[16.67%]">{t('transactionHash')}</TableHead>
              <TableHead className="w-[16.67%] text-center">{t('status')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {histories.map(history => (
              <TableRow key={history.create_at} className="bg-white">
                <TableCell className="w-[16.67%]">
                  <p className="font-semibold text-[16px] leading-[125%]">{history.currency}</p>
                </TableCell>
                <TableCell className="w-[16.67%]">
                  <p className="text-[16px] leading-[125%]">{formatDateHourMinute(Number(history.create_at))}</p>
                </TableCell>
                <TableCell className="w-[16.67%]">
                  <p className="capitalize text-[16px] leading-[125%]">{snakeToSpace(history.type)}</p>
                </TableCell>
                <TableCell className="w-[16.67%]">
                  <p
                    className={cn('text-[16px] leading-[125%]', history.amount > 0 ? 'text-green-600' : 'text-red-600')}
                  >
                    {formatVNDCurrency(history.currency, history.amount)}
                  </p>
                </TableCell>
                <TableCell className="w-[16.67%]">
                  {history.tx_hash && (
                    <p className="text-[16px] leading-[125%]">
                      <a
                        className="text-primary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`https://nearblocks.io/txns/${history.tx_hash}`}
                      >
                        {shortenAddress(history.tx_hash)}
                      </a>
                    </p>
                  )}
                </TableCell>
                <TableCell className="w-[16.67%]">
                  <p className="flex justify-center text-[14px] leading-[125%]">
                    <span
                      className={cn('px-3 py-1 rounded-full font-medium uppercase', walletStatusColor(history.status))}
                    >
                      {history.status}
                    </span>
                  </p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {histories.map(history => (
          <EarnHistoryCard key={history.create_at} history={history} />
        ))}
      </div>

      <TablePagination
        currentPage={currentPage}
        totalCount={totalItems}
        pageSize={PAGE_SIZE}
        onPageChange={setCurrentPage}
        className="mt-6 mb-4"
      />
    </div>
  );
};

export default memo(EarnHistoryTable);
