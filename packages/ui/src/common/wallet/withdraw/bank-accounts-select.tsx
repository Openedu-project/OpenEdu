import { useGetUserSettings } from '@oe/api/hooks/useUserSettings';
import type { TBankAccounts } from '@oe/api/types/wallet';
import { INIT_PAGE_TYPE } from '@oe/api/utils/wallet';
import { useRouter } from '@oe/ui/common/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@oe/ui/shadcn/select';
import { Skeleton } from '@oe/ui/shadcn/skeleton';
import { useTranslations } from 'next-intl';
import { FORM_STYLES } from '#utils/wallet';

interface BankAccountSelectProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: string;
}

const BankAccountSelect = ({ value, onChange, disabled }: BankAccountSelectProps) => {
  const { dataUserSettings, isLoadingUserSettings } = useGetUserSettings({
    type: 'bank_account',
  });
  const router = useRouter();
  const t = useTranslations('withdrawPage');

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

  if (isLoadingUserSettings) {
    return <Skeleton className="h-[54px] w-full" />;
  }

  return (
    <div className="space-y-3">
      {(bankAccounts?.length ?? 0) > 0 ? (
        <Select value={value} onValueChange={onChange} disabled={disabled || isLoadingUserSettings}>
          <SelectTrigger className={FORM_STYLES.SELECT_TRIGGER}>
            <SelectValue placeholder={t('form.selectBankAccount')} />
          </SelectTrigger>
          <SelectContent>
            {bankAccounts?.map(account => (
              <SelectItem key={account.id} value={account.id ?? ''}>
                {account.account_number} - {account.bank_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <p className="text-red-500 text-sm">{t('form.error.bankAccountEmpty')}</p>
      )}

      <button
        type="button"
        className="block cursor-pointer font-normal text-[#5055D7] text-sm leading-5"
        onClick={() => router.push(`bank-accounts?type=${INIT_PAGE_TYPE.ADD_BANK}`)}
      >
        {t('btn.addNewBankAccount')}
      </button>
    </div>
  );
};

export default BankAccountSelect;
