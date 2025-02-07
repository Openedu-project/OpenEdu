import { useTranslations } from 'next-intl';
import { CurrencySwitcher } from '../_components/currency-switcher';
import { SubPageLayout } from '../_components/sub-page-layout';
import { EarningAssets } from './earning-assets';
import { EarningTransactions } from './earning-transactions';

export const EarningPage = () => {
  const t = useTranslations('wallets.earningPage');

  return (
    <SubPageLayout title={t('title')} actions={<CurrencySwitcher />} className="mx-auto max-w-screen-xl">
      <EarningAssets />
      <EarningTransactions />
    </SubPageLayout>
  );
};
