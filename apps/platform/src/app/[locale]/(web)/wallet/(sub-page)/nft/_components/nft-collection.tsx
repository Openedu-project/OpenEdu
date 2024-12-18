import { memo } from 'react';

import type { TNFTItem } from '@oe/api/types/wallet';
import NftItems from './nft-items';

const NFTCollection = memo(
  ({
    contractName,
    tokens,
    onNFTClick,
  }: {
    contractName: string;
    tokens: TNFTItem[];
    onNFTClick: (token: TNFTItem) => void;
  }) => (
    <div className="mb-8 space-y-4">
      <h3 className="capitalize font-semibold leading-[125%] text-xl">{`${contractName} (${tokens.length})`}</h3>
      <div className="gap-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {tokens.map(token => (
          <NftItems
            key={`${token.chain}-${token.token_id}`}
            imgSrc={token.metadata.media}
            name={token.metadata.title}
            chain={token.chain}
            onClick={() => onNFTClick(token)}
          />
        ))}
      </div>
    </div>
  )
);

NFTCollection.displayName = 'NFTCollection';

export default NFTCollection;
