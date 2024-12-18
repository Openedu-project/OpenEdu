import { useGetUserSettings } from '@oe/api/hooks/useUserSettings';
import type { TBankAccounts } from '@oe/api/types/wallet';
import { INIT_PAGE_TYPE } from '@oe/api/utils/wallet';
import { useRouter } from '@oe/ui/common/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@oe/ui/shadcn/select';
import { Skeleton } from '@oe/ui/shadcn/skeleton';
import { useTranslations } from 'next-intl';
import type React from 'react';
import { FORM_STYLES } from '../../../_utils/utils';

interface BankAccountSelectProps {
  formData: {
    bankAccount: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  error?: {
    bankAccount?: string;
  };
}

const BankAccountSelect = ({ formData, handleChange, error }: BankAccountSelectProps) => {
  const { dataUserSettings, isLoadingUserSettings } = useGetUserSettings({
    type: 'bank_account',
  });
  const router = useRouter();
  const tWithdrawPage = useTranslations('withdrawPage');

  const bankAccounts = dataUserSettings?.results
    .map(bankAccount => {
      if (typeof bankAccount.value === 'object' && bankAccount.value !== null) {
        return {
          ...bankAccount.value,
          id: bankAccount.id,
        } as TBankAccounts;
      }
      return null;
    })
    .filter((bankAccount): bankAccount is TBankAccounts => bankAccount !== null);

  return isLoadingUserSettings ? (
    <Skeleton className="h-[54px] w-full" />
  ) : (
    <div className="space-y-3">
      {(bankAccounts?.length ?? 0) > 0 ? (
        <div>
          <label className={FORM_STYLES.LABEL} htmlFor="bankAccount">
            {tWithdrawPage('form.bankAccount')}
          </label>
          <Select
            name="bankAccount"
            onValueChange={value =>
              handleChange({
                target: { name: 'bankAccount', value },
              } as React.ChangeEvent<HTMLSelectElement>)
            }
            defaultValue={formData.bankAccount}
          >
            <SelectTrigger className={FORM_STYLES.SELECT_TRIGGER}>
              <SelectValue placeholder={tWithdrawPage('form.selectBankAccount')} />
            </SelectTrigger>
            <SelectContent>
              {bankAccounts?.map(account => (
                <SelectItem key={account.id} value={account.id ?? ''}>
                  {account.account_number} - {account.bank_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {error?.bankAccount && <p className="text-red-500 text-sm">{error.bankAccount}</p>}
        </div>
      ) : (
        <p className="text-red-500 text-sm">{tWithdrawPage('form.error.bankAccountEmpty')}</p>
      )}

      <button
        type="button"
        className="block cursor-pointer font-normal text-[#5055D7] text-sm leading-5"
        onClick={() => router.push(`bank-accounts?type=${INIT_PAGE_TYPE.ADD_BANK}`)}
      >
        {tWithdrawPage('btn.addNewBankAccount')}
      </button>
    </div>
  );
};

export default BankAccountSelect;
