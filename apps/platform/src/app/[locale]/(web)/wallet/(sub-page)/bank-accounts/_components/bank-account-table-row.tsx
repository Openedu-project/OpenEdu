import { Button } from '@oe/ui/shadcn/button';
import { TableCell, TableRow } from '@oe/ui/shadcn/table';
import { PencilLine, Trash } from 'lucide-react';
import { useTranslations } from 'next-intl';

import type { TBankAccounts } from '@oe/api/types/wallet';
import useBankAccount from '../../../_hooks/useBankAccount';
import useBankAccountStore from '../../../_store/useBankAccountStore';

const BankAccountsTableActionCell = ({
  bankAccount,
}: {
  bankAccount?: TBankAccounts;
}) => {
  const { setFormData } = useBankAccountStore();
  const { handleDeleteBankAccount } = useBankAccount();
  const { openDialog } = useBankAccountStore();
  const t = useTranslations('bankAccountPage.table');

  const handleDelete = async () => {
    if (bankAccount?.id) {
      try {
        await handleDeleteBankAccount(bankAccount?.id);
      } catch (error) {
        console.error('Failed to delete bank account:', error);
      }
    } else {
      console.error('Bank account ID is undefined');
    }
  };

  return (
    <TableCell className="flex flex-wrap justify-end gap-2">
      <Button
        variant="outline"
        className="gap-2 font-semibold text-[16px] leading-5"
        onClick={() => {
          if (bankAccount) {
            setFormData(bankAccount);
          }
          openDialog(false);
        }}
      >
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

const BankAccountsTableRow = ({ item }: { item: TBankAccounts }) => (
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
    <BankAccountsTableActionCell bankAccount={item} />
  </TableRow>
);

export default BankAccountsTableRow;
