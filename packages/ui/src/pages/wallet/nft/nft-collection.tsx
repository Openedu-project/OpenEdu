'use client';

import { useNearNFTAssets } from '@oe/api';
import { NFTItem } from './nft-item';
import { NftLoadingSkeleton } from './nft-loading-skeleton';

export const NFTCollection = () => {
  const { nftAssets, isNFTAssetsLoading } = useNearNFTAssets();

  if (isNFTAssetsLoading) {
    return <NftLoadingSkeleton />;
  }

  return Object.entries(nftAssets || {}).map(([contractName, tokens]) => (
    <div className="mb-8 space-y-4" key={contractName}>
      <h3 className="mcaption-semibold14">{`${contractName} ${tokens.length > 0 ? `(${tokens.length})` : ''}`}</h3>
      <div className="flex flex-wrap gap-2">
        {tokens.map(token => (
          <NFTItem key={`${token.chain}-${token.token_id}`} token={token} />
        ))}
      </div>
    </div>
  ));
};
