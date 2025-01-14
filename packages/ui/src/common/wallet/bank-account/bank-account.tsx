import { useTranslations } from 'next-intl';
import WalletBackButton from '../shared/wallet-back-button';
import BankAccountDialog, { BackAccountDialogTrigger } from './bank-account-dialog';
import BankAccountList from './bank-account-list';

const BankAccountPage = () => {
  const t = useTranslations('bankAccountPage');

  return (
    <>
      <div className="flex justify-between gap-2">
        <div className="flex gap-2 items-center">
          <WalletBackButton />
          <h2 className="text-[16px] md:text-[24px] font-semibold leading-9 m-0">{t('bankAccounts')}</h2>
        </div>
        <BackAccountDialogTrigger />
      </div>
      <BankAccountList />
      <BankAccountDialog />
    </>
  );
};

export default BankAccountPage;
