import type { TBankAccounts } from '@oe/api/types/wallet';
import { PencilLine, Trash } from 'lucide-react';
import { useTranslations } from 'next-intl';
// components/BankAccountTable/BankAccountTableActionCell.tsx
import { Button } from '#shadcn/button';
import { TableCell, TableRow } from '#shadcn/table';
import useBankAccount from '../hooks/useBankAccount';
import { useBankAccountActions } from './useBankAccountStore';

interface BankAccountTableActionCellProps {
  bankAccount?: TBankAccounts;
}

const BankAccountTableActionCell = ({ bankAccount }: BankAccountTableActionCellProps) => {
  const { setFormData, openDialog } = useBankAccountActions();
  const { handleDeleteBankAccount } = useBankAccount();
  const t = useTranslations('bankAccountPage.table');

  const handleDelete = async () => {
    if (!bankAccount?.id) {
      console.error('Bank account ID is undefined');
      return;
    }

    try {
      await handleDeleteBankAccount(bankAccount.id);
    } catch (error) {
      console.error('Failed to delete bank account:', error);
    }
  };

  const handleEdit = () => {
    if (bankAccount) {
      setFormData(bankAccount);
      openDialog(false);
    }
  };

  return (
    <TableCell className="flex flex-wrap justify-end gap-2">
      <Button variant="outline" className="gap-2 font-semibold text-[16px] leading-5" onClick={handleEdit}>
        <PencilLine strokeWidth={1.5} className="h-5 w-5" />
        {t('editButton')}
      </Button>
      <Button variant="outline" className="gap-2 font-semibold text-[16px] leading-5" onClick={handleDelete}>
        <Trash strokeWidth={1.5} className="h-5 w-5" />
        {t('deleteButton')}
      </Button>
    </TableCell>
  );
};

interface BankAccountTableRowProps {
  item: TBankAccounts;
}

const BankAccountTableRow = ({ item }: BankAccountTableRowProps) => (
  <TableRow className="flex-wrap bg-white md:flex-nowrap">
    <TableCell className="w-full md:w-auto">
      <p className="text-[16px] leading-[25px]">{item.bank_name}</p>
    </TableCell>
    <TableCell className="w-full md:w-auto">
      <p className="text-[16px] leading-[25px]">{item.account_name}</p>
    </TableCell>
    <TableCell className="w-full md:w-auto">
      <p className="text-[16px] leading-[25px]">{item.account_number}</p>
    </TableCell>
    <BankAccountTableActionCell bankAccount={item} />
  </TableRow>
);

export default BankAccountTableRow;
