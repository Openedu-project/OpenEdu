'use client';

import useNFTAssets from '@oe/api/hooks/useNftAssets';
import type { TNFTItem } from '@oe/api/types/wallet';
import { useCallback, useMemo, useState } from 'react';
import NFTContent from './nft-content';
import NftDialog from './nft-dialog';

const NftList = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { nftAssets, isLoading, error } = useNFTAssets();

  const [chosenNFT, setChosenNFT] = useState<TNFTItem | null>(null);

  const handleNFTClick = useCallback((token: TNFTItem) => {
    setChosenNFT(token);
    setIsDialogOpen(true);
  }, []);

  const handleDialogClose = useCallback(() => {
    setIsDialogOpen(false);
    setChosenNFT(null);
  }, []);

  const hasNFTs = useMemo(() => {
    if (!nftAssets) {
      return false;
    }
    return Object.values(nftAssets).some(tokens => tokens.length > 0);
  }, [nftAssets]);

  return (
    <>
      <NFTContent
        isLoading={isLoading}
        error={error || null}
        hasNFTs={hasNFTs}
        nftAssets={nftAssets}
        onNFTClick={handleNFTClick}
      />
      <NftDialog isOpen={isDialogOpen} onClose={handleDialogClose} nft={chosenNFT} />
    </>
  );
};

export default NftList;
