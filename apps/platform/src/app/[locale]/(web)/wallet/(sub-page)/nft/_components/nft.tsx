'use client';

import { memo, useCallback, useMemo, useState } from 'react';

import { Button } from '@oe/ui/shadcn/button';
import { ChevronLeft } from 'lucide-react';

import useNFTAssets from '@oe/api/hooks/useNftAssets';
import type { TNFTItem } from '@oe/api/types/wallet';
import { CHAIN } from '@oe/api/utils/wallet';
import { useRouter } from '@oe/ui/common/navigation';
import { Dialog, DialogContent, DialogTitle } from '@oe/ui/shadcn/dialog';
import { useTranslations } from 'next-intl';
import { chainAddress, useWalletDataStore } from '../../../_store/useWalletDataStore';
import NFTContent from './nft-content';
import NFTDetail from './nft-detail';

// Header Component
const Header = memo(() => {
  const router = useRouter();
  const t = useTranslations('nftPage');
  const handleBackClick = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className="flex gap-2 items-center mb-6">
      <Button variant="ghost" onClick={handleBackClick} className="p-2 w-fit">
        <ChevronLeft color="#6368DC" />
      </Button>
      <h2 className="text-[16px] md:text-[24px] font-semibold leading-9 m-0 ">{t('header')}</h2>
    </div>
  );
});

Header.displayName = 'Header';

const NFTPageClient = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const nearAddress = useWalletDataStore(chainAddress(CHAIN.NEAR)) || '';
  const { nftAssets, isLoading, error } = useNFTAssets({ nearAddress });

  const [chosenNFT, setChosenNFT] = useState<TNFTItem | null>(null);

  const handleNFTClick = useCallback(
    (token: TNFTItem) => {
      setChosenNFT(token);
      setIsDialogOpen(true);
    },
    [setChosenNFT]
  );

  const hasNFTs = useMemo(() => nftAssets && Object.values(nftAssets).some(tokens => tokens.length > 0), [nftAssets]);

  return (
    <>
      <Header />
      <NFTContent
        isLoading={isLoading}
        error={error || null}
        hasNFTs={!!hasNFTs}
        nftAssets={nftAssets}
        onNFTClick={handleNFTClick}
      />
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          {chosenNFT && (
            <>
              <DialogTitle className="pb-4">{chosenNFT?.metadata.title || 'NFT Details'}</DialogTitle>
              <NFTDetail nft={chosenNFT} />
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default memo(NFTPageClient);
