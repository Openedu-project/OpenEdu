import { useGetUserSettings } from '@oe/api/hooks/useUserSettings';
import type { TBankAccounts } from '@oe/api/types/wallet';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@oe/ui/shadcn/table';
import { useTranslations } from 'next-intl';
import { memo } from 'react';
import BankAccountsTableRow from './bank-account-table-row';

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

export default BankAccountTable;
