import type { TNFTItem } from '@oe/api';
import { CRYPTO_CURRENCIES } from '@oe/api';

export const NFTDetail = ({ nft }: { nft: TNFTItem }) => {
  return (
    <div className="space-y-6">
      <div className="relative h-44 overflow-hidden rounded-lg">
        <img
          src={nft.metadata.media}
          alt={nft.metadata.title}
          className="absolute inset-0 h-full w-full object-contain"
        />
      </div>

      <div className="space-y-2">
        <p className="font-semibold text-lg capitalize">{nft.chain}</p>

        {nft.metadata.description && <p className="text-sm">{nft.metadata.description}</p>}
        {nft.token_id &&
          (nft.chain === CRYPTO_CURRENCIES.NEAR.name ? (
            <a
              className="text-primary text-sm underline"
              href={`${CRYPTO_CURRENCIES.NEAR.explorerNFT}/${nft.contract}/${nft.token_id}`}
              target="_blank"
              rel="noreferrer"
            >
              {nft.token_id}
            </a>
          ) : (
            <p className="cursor-default text-sm underline">{nft.token_id}</p>
          ))}
      </div>
    </div>
  );
};
