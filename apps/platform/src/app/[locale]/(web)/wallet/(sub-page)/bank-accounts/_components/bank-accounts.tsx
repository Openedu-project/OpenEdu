'use client';

import { ChevronLeft, LoaderCircle } from 'lucide-react';

import { useCallback, useMemo } from 'react';

import { useGetUserSettings } from '@oe/api/hooks/useUserSettings';
import type { TBankAccounts } from '@oe/api/types/wallet';
import { useRouter } from '@oe/ui/common/navigation';
import { Button } from '@oe/ui/shadcn/button';
import { useTranslations } from 'next-intl';
import { EmptyState } from '../../../_components/shared/state-components';
import useBankAccountStore from '../../../_store/useBankAccountStore';
import BankAccountDialog from './bank-account-dialog';
import BankAccountTable from './bank-account-table';
import BankAccountCards from './bank-accounts-cards';

const BankAccountsPage = () => {
  const router = useRouter();
  const { dataUserSettings, isLoadingUserSettings } = useGetUserSettings({
    type: 'bank_account',
  });
  const { openDialog, setFormData } = useBankAccountStore();
  const t = useTranslations('bankAccountPage');

  const handleBackClick = useCallback(() => {
    router.back();
  }, [router]);

  const handleAddNew = useCallback(() => {
    setFormData({
      account_name: '',
      account_number: '',
      bank_name: '',
    });
    openDialog(true);
  }, [setFormData, openDialog]);

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

  return (
    <div className="min-h-screen space-y-6">
      <div className="flex justify-between gap-2">
        <div className="flex gap-2 items-center">
          <Button variant="ghost" onClick={handleBackClick} className="p-2 w-fit">
            <ChevronLeft color="#6368DC" />
          </Button>
          <h2 className="text-[16px] md:text-[24px] font-semibold leading-9 m-0">{t('bankAccounts')}</h2>
        </div>
        <Button className="w-fit text-[14px] md:text-base p-2 md:p-3" onClick={handleAddNew}>
          {t('addNewBtn')}
        </Button>
      </div>

      <BankAccountTable bankAccounts={bankAccounts} />
      <BankAccountCards bankAccounts={bankAccounts} />

      {!isLoadingUserSettings && bankAccounts?.length === 0 && <EmptyState />}
      {isLoadingUserSettings && (
        <div className="mt-4 w-full flex items-center justify-center">
          <LoaderCircle className="animate-spin" />
        </div>
      )}

      <BankAccountDialog />
    </div>
  );
};

export default BankAccountsPage;
