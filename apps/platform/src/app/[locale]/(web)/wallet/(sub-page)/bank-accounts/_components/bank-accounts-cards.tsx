import { useGetUserSettings } from '@oe/api/hooks/useUserSettings';
import { Button } from '@oe/ui/shadcn/button';
import { Card, CardContent, CardHeader } from '@oe/ui/shadcn/card';
import { PencilLine, Trash } from 'lucide-react';

import type { TBankAccounts } from '@oe/api/types/wallet';
import useBankAccount from '../../../_hooks/useBankAccount';
import useBankAccountStore from '../../../_store/useBankAccountStore';

const BankAccountCards = ({
  bankAccounts,
}: {
  bankAccounts?: TBankAccounts[];
}) => {
  const { isLoadingUserSettings } = useGetUserSettings({
    type: 'bank_account',
  });
  const { handleDeleteBankAccount } = useBankAccount();
  const { setFormData, openDialog } = useBankAccountStore();

  return (
    <div className="space-y-2 md:hidden">
      {!isLoadingUserSettings &&
        bankAccounts?.map((item, index) => (
          <Card key={`${item.account_number}-${index}`}>
            <CardHeader className="px-3 pt-3 pb-0 font-semibold">{item.account_name}</CardHeader>
            <CardContent className="flex items-end justify-between gap-2 px-3 pt-1 pb-3">
              <div>
                <p className="text-xl">{item.account_number}</p>
                <p className="text-gray-500 uppercase">{item.bank_name}</p>
              </div>
              <div>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setFormData(item);
                    openDialog(false);
                  }}
                >
                  <PencilLine strokeWidth={1.5} className="h-5 w-5" />
                </Button>
                <Button variant="ghost" onClick={() => item.id && handleDeleteBankAccount(item.id)}>
                  <Trash strokeWidth={1.5} className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
};

export default BankAccountCards;
