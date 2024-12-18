import useWalletRequestWithdraw from '@oe/api/hooks/useWalletRequestWithdraw';
import type { TRequestWithdrawHistory } from '@oe/api/types/wallet';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@oe/ui/shadcn/table';
import { useTranslations } from 'next-intl';
import { memo, useState } from 'react';
import { EmptyState, ErrorState, LoadingState } from '../../../../_components/shared/state-components';
import TablePagination from '../../../../_components/shared/table-pagination';
import { RequestWithdrawCard } from './request-withdraw-card';
import { RequestWithdrawDetailsDialog } from './request-withdraw-details-dialog';
import RequestHistoryTableRow from './request-withdraw-table-row';

const PAGE_SIZE = 5;

export const RequestWithdrawTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRequest, setSelectedRequest] = useState<TRequestWithdrawHistory | null>(null);

  const {
    data: requests,
    totalItems,
    isLoading,
    error,
  } = useWalletRequestWithdraw({
    page: currentPage,
    pageSize: PAGE_SIZE,
  });

  if (error) {
    return <ErrorState />;
  }
  if (isLoading) {
    return <LoadingState />;
  }
  if (requests.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      <div className="hidden md:block">
        <Table>
          <RequestWithdrawTableHeader />
          <TableBody>
            {requests.map(request => (
              <RequestHistoryTableRow
                key={request.create_at}
                onViewDetails={() => setSelectedRequest(request)}
                {...request}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="md:hidden">
        {requests.map(request => (
          <RequestWithdrawCard
            key={request.create_at}
            request={request}
            onViewDetails={() => setSelectedRequest(request)}
          />
        ))}
      </div>

      {selectedRequest && (
        <RequestWithdrawDetailsDialog
          isOpen={!!selectedRequest}
          onClose={() => setSelectedRequest(null)}
          request={selectedRequest}
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

// Table Header Component
const RequestWithdrawTableHeader = memo(() => {
  const t = useTranslations('historyPage.table');
  return (
    <TableHeader className="border-b">
      <TableRow>
        <TableHead className="w-1/4">{t('date')}</TableHead>
        <TableHead className="w-1/4">{t('currency')}</TableHead>
        <TableHead className="w-1/4">{t('amount')}</TableHead>
        <TableHead className="w-1/4 text-center">{t('status')}</TableHead>
      </TableRow>
    </TableHeader>
  );
});

RequestWithdrawTableHeader.displayName = 'RequestWithdrawTableHeader';
