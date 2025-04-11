import { useTranslations } from 'next-intl';
import { SubPageLayout } from '../_components/sub-page-layout';
import { WithdrawForm } from './withdraw-form';
import { WithdrawTypeSelect } from './withdraw-type-select';

const Withdraw = () => {
  const t = useTranslations('wallets.withdrawPage');
  return (
    <SubPageLayout title={t('title')} className="mx-auto max-w-xl rounded-xl bg-background p-4 shadow-sm">
      <WithdrawTypeSelect />
      <WithdrawForm />
    </SubPageLayout>
  );
};

export { Withdraw };
