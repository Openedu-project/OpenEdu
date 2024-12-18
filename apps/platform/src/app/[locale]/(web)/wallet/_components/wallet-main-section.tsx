'use client';

import { useTranslations } from 'next-intl';
import { useWalletVisibilityStore } from '../_store/useWalletVisibilityStore';
import AssetList from './asset-list';
import WalletOverview from './wallet-overview';

const LoadingSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    <div className="h-9 w-64 bg-gray-200 rounded" aria-hidden="true" />
    <div className="h-40 bg-gray-200 rounded" />
    <div className="h-96 bg-gray-200 rounded" />
  </div>
);

const WalletMainSection = () => {
  const { isLoading } = useWalletVisibilityStore();
  const t = useTranslations('walletPage');
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl sm:text-[28px] sm:leading-9 mb-6">{t('title')}</h2>
      <WalletOverview />
      <AssetList />
    </div>
  );
};

export default WalletMainSection;
