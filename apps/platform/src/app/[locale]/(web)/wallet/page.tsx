import { EarningCard, NftCard, PointCard, TotalValueCard } from '@oe/ui/common/wallet/asset-card';
import { AssetListCards, AssetListHeader, AssetListTable } from '@oe/ui/common/wallet/asset-list';
import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: 'Wallet',
};

const WalletPage = () => {
  const t = useTranslations('walletPage');

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl sm:text-[28px] sm:leading-9 mb-6">{t('title')}</h2>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <TotalValueCard />
        <EarningCard />
        <NftCard />
        <PointCard />
      </div>
      <div className="w-full">
        <AssetListHeader />
        <AssetListTable />
        <AssetListCards />
      </div>
    </div>
  );
};

export default WalletPage;
