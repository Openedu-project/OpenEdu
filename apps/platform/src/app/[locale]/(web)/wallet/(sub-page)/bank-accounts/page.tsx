import type { Metadata } from 'next';

import { BackAccountDialogTrigger, BankAccountDialog, BankAccountList } from '@oe/ui/common/wallet/bank-account';
import { WalletBackButton } from '@oe/ui/common/wallet/shared';
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: 'Wallet - Bank Accounts',
};

const WalletBankAccountsPage = () => {
  const t = useTranslations('bankAccountPage');
  return (
    <div className="min-h-screen space-y-6">
      <div className="flex justify-between gap-2">
        <div className="flex gap-2 items-center">
          <WalletBackButton />
          <h2 className="text-[16px] md:text-[24px] font-semibold leading-9 m-0">{t('bankAccounts')}</h2>
        </div>
        <BackAccountDialogTrigger />
      </div>
      <BankAccountList />
      <BankAccountDialog />
    </div>
  );
};

export default WalletBankAccountsPage;
