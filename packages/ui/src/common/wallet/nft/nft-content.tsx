import type { TNFTItem } from '@oe/api/types/wallet';
import { EmptyState, ErrorState, LoadingState } from '../shared/state-components';
import NFTCollection from './nft-collection';
import NftLoadingSkeleton from './nft-loading-skeleton';

const NFTContent = ({
  isLoading,
  error,
  hasNFTs,
  nftAssets,
  onNFTClick,
}: {
  isLoading: boolean;
  error: Error | null;
  hasNFTs: boolean;
  nftAssets: Record<string, TNFTItem[]> | null;
  onNFTClick: (token: TNFTItem) => void;
}) => {
  if (isLoading && !nftAssets) {
    return <NftLoadingSkeleton />;
  }

  if (isLoading && nftAssets) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState />;
  }

  if (!hasNFTs) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-8">
      {Object.entries(nftAssets || {}).map(
        ([contractName, tokens]) =>
          tokens.length > 0 && (
            <NFTCollection key={contractName} contractName={contractName} tokens={tokens} onNFTClick={onNFTClick} />
          )
      )}
    </div>
  );
};

export default NFTContent;
