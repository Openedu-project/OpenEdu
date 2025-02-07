import { useTranslations } from 'next-intl';
import { AssetListTable } from './_components/asset-list-table';
import { CurrencySwitcher } from './_components/currency-switcher';
import { EstimatedEarning } from './_components/estimated-earning';
import { EstimatedTotalValue } from './_components/estimated-total-value';
import { NFTAssets } from './_components/nft-assets';
import { RewardPoint } from './_components/reward-point';

export const WalletPage = () => {
  const t = useTranslations('wallets');

  return (
    <div className="mx-auto max-w-screen-xl space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="mb-0 font-semibold text-xl sm:text-2xl">{t('title')}</h2>
        <CurrencySwitcher />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <EstimatedTotalValue />
        <EstimatedEarning />
        <NFTAssets />
        <RewardPoint />
      </div>
      <AssetListTable />
    </div>
  );
};
