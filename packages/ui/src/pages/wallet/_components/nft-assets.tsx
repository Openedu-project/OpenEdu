'use client';

import { useNFTTotalAssets } from '@oe/api/hooks/useWallet';
import { NFTAssetsIcon } from '@oe/assets/icons/wallets/nft-assets';
import { WALLET_ROUTES } from '@oe/core/utils/routes';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '#common/navigation';
import AssetCard from './asset-card';

export const NFTAssets = () => {
  const { nftData } = useNFTTotalAssets();
  const t = useTranslations('wallets');

  // if (isLoading) {
  //   return <AssetCardSkeleton />;
  // }

  return (
    <AssetCard
      icon={<NFTAssetsIcon className="h-7 w-7" />}
      label={t('nftAssets')}
      value={nftData?.supply ?? 0}
      actionBtns={
        <Link href={WALLET_ROUTES.nft} variant="outline" className="h-6 w-6 px-1">
          <ChevronRight className="h-4 w-4 text-primary" />
        </Link>
      }
    />
  );
};
