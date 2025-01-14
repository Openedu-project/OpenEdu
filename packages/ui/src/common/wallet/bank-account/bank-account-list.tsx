'use client';

import { useGetUserSettings } from '@oe/api/hooks/useUserSettings';
import type { TBankAccounts } from '@oe/api/types/wallet';
import { LoaderCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { memo, useMemo, useState } from 'react';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '#shadcn/table';
import { EmptyState } from '../shared/state-components';
import TablePagination from '../shared/table-pagination';
import BankAccountCards from './bank-account-cards';
import BankAccountsTableRow from './bank-account-table-row';

const PAGE_SIZE = 10;

const BankAccountList = () => {
  const [page, setPage] = useState<number>(1);
  const { dataUserSettings, isLoadingUserSettings } = useGetUserSettings({
    type: 'bank_account',
    page: page,
    pageSize: PAGE_SIZE,
  });

  const bankAccounts = useMemo(
    () =>
      dataUserSettings?.results
        .map(bankAccount => {
          if (typeof bankAccount.value === 'object' && bankAccount.value !== null) {
            return {
              ...bankAccount.value,
              id: bankAccount.id,
            } as TBankAccounts;
          }
          return null;
        })
        .filter((bankAccount): bankAccount is TBankAccounts => bankAccount !== null),
    [dataUserSettings?.results]
  );

  if (isLoadingUserSettings) {
    return (
      <div className="mt-4 flex w-full items-center justify-center">
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }

  if (bankAccounts?.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      <BankAccountTable bankAccounts={bankAccounts} />
      <BankAccountCards bankAccounts={bankAccounts} />
      <TablePagination
        currentPage={page}
        totalCount={dataUserSettings?.pagination.total_items || 0}
        pageSize={PAGE_SIZE}
        onPageChange={setPage}
      />
    </>
  );
};

const BankAccountTableHeader = memo(() => {
  const t = useTranslations('bankAccountPage.table');
  return (
    <TableHeader className="border-b">
      <TableRow>
        <TableHead className="w-1/4">{t('bankName')}</TableHead>
        <TableHead className="w-1/4">{t('accountName')}</TableHead>
        <TableHead className="w-1/4">{t('accountNumber')}</TableHead>
        <TableHead className="w-1/4 text-right">{t('action')}</TableHead>
      </TableRow>
    </TableHeader>
  );
});

BankAccountTableHeader.displayName = 'BankAccountTableHeader';

const BankAccountTable = ({
  bankAccounts,
}: {
  bankAccounts?: TBankAccounts[];
}) => {
  const { isLoadingUserSettings } = useGetUserSettings({
    type: 'bank_account',
  });

  return (
    <div className="hidden md:block">
      <Table className="w-full">
        <BankAccountTableHeader />
        {!isLoadingUserSettings && (
          <TableBody>
            {bankAccounts?.map(bankAccount => (
              <BankAccountsTableRow key={bankAccount.id} item={bankAccount} />
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default BankAccountList;
