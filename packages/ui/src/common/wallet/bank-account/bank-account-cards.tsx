'use client';

import { useGetUserSettings } from '@oe/api/hooks/useUserSettings';
import type { TBankAccounts } from '@oe/api/types/wallet';
import { PencilLine, Trash } from 'lucide-react';
import { Button } from '#shadcn/button';
import { Card, CardContent, CardHeader } from '#shadcn/card';
import useBankAccount from '../hooks/useBankAccount';
import { useBankAccountActions } from './useBankAccountStore';

interface BankAccountCardProps {
  item: TBankAccounts;
}

const BankAccountCard = ({ item }: BankAccountCardProps) => {
  const { setFormData, openDialog } = useBankAccountActions();
  const { handleDeleteBankAccount } = useBankAccount();

  const handleDelete = () => item.id && handleDeleteBankAccount(item.id);

  const handleEdit = () => {
    setFormData(item);
    openDialog(false);
  };

  return (
    <Card>
      <CardHeader className="px-3 pt-3 pb-0 font-semibold">{item.account_name}</CardHeader>
      <CardContent className="flex items-end justify-between gap-2 px-3 pt-1 pb-3">
        <div>
          <p className="text-xl">{item.account_number}</p>
          <p className="text-muted-foreground uppercase">{item.bank_name}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={handleEdit} aria-label="Edit bank account">
            <PencilLine className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleDelete} aria-label="Delete bank account">
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

interface BankAccountCardsProps {
  bankAccounts?: TBankAccounts[];
}

const BankAccountCards = ({ bankAccounts }: BankAccountCardsProps) => {
  const { isLoadingUserSettings } = useGetUserSettings({
    type: 'bank_account',
  });

  if (isLoadingUserSettings || bankAccounts?.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2 md:hidden">
      {bankAccounts?.map(item => (
        <BankAccountCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default BankAccountCards;
