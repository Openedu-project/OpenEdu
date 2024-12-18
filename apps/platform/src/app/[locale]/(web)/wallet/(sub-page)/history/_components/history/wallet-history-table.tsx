import useWalletHistory from '@oe/api/hooks/useWalletHistory';
import type { THistory } from '@oe/api/types/wallet';
import { ASSET_TYPES, type TAssetType } from '@oe/api/utils/wallet';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@oe/ui/shadcn/table';
import { useTranslations } from 'next-intl';
import { memo, useState } from 'react';
import { EmptyState, ErrorState, LoadingState } from '../../../../_components/shared/state-components';
import TablePagination from '../../../../_components/shared/table-pagination';
import { WalletHistoryCard } from './wallet-history-card';
import WalletHistoryDetailsDialog from './wallet-history-details-dialog';
import WalletHistoryTableRow from './wallet-history-table-row';

const PAGE_SIZE = 10;

export const WalletHistoryTable = ({ type }: { type: TAssetType }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedHistory, setSelectedHistory] = useState<THistory | null>(null);

  const {
    data: histories,
    totalItems,
    isLoading,
    error,
  } = useWalletHistory({
    currencyType: type,
    page: currentPage,
    pageSize: PAGE_SIZE,
  });

  const handleViewDetails = (history: THistory) => {
    setSelectedHistory(history);
  };

  if (error) {
    return <ErrorState />;
  }
  if (isLoading) {
    return <LoadingState />;
  }
  if (histories.length === 0) {
    return <EmptyState />;
  }

  const TableHeaderComponent = type === ASSET_TYPES.FIAT ? FiatTableHeader : CryptoTableHeader;

  return (
    <>
      <div className="hidden md:block">
        <Table>
          <TableHeaderComponent />
          <TableBody>
            {histories.map(history => (
              <WalletHistoryTableRow
                key={history.create_at}
                type={type}
                history={history}
                onViewDetails={() => handleViewDetails(history)}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="md:hidden">
        {histories.map(history => (
          <WalletHistoryCard
            key={history.create_at}
            history={history}
            onViewDetails={() => setSelectedHistory(history)}
          />
        ))}
      </div>

      {selectedHistory && (
        <WalletHistoryDetailsDialog
          isOpen={!!selectedHistory}
          onClose={() => setSelectedHistory(null)}
          history={selectedHistory}
        />
      )}

      <TablePagination
        currentPage={currentPage}
        totalCount={totalItems}
        pageSize={PAGE_SIZE}
        onPageChange={setCurrentPage}
        className="mt-6"
      />
    </>
  );
};

// Table Headers Components
const FiatTableHeader = memo(() => {
  const t = useTranslations('historyPage.table');
  return (
    <TableHeader className="border-b">
      <TableRow>
        <TableHead className="w-1/4">{t('date')}</TableHead>
        <TableHead className="w-1/4">{t('currency')}</TableHead>
        <TableHead className="w-1/4">{t('type')}</TableHead>
        <TableHead className="w-1/4">{t('amount')}</TableHead>
        <TableHead className="w-1/4 text-center">{t('status')}</TableHead>
      </TableRow>
    </TableHeader>
  );
});

const CryptoTableHeader = memo(() => {
  const t = useTranslations('historyPage.table');
  return (
    <TableHeader className="border-b">
      <TableRow>
        <TableHead className="w-1/6">{t('date')}</TableHead>
        <TableHead className="w-1/6">{t('currency')}</TableHead>
        <TableHead className="w-1/6">{t('type')}</TableHead>
        <TableHead className="w-1/6">{t('amount')}</TableHead>
        <TableHead className="w-1/6">{t('txHash')}</TableHead>
        <TableHead className="w-1/6 text-center">{t('status')}</TableHead>
      </TableRow>
    </TableHeader>
  );
});

FiatTableHeader.displayName = 'FiatTableHeader';
CryptoTableHeader.displayName = 'CryptoTableHeader';
