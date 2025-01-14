import type { TNFTItem } from '@oe/api/types/wallet';
import { CHAIN } from '@oe/api/utils/wallet';
import { useTranslations } from 'next-intl';
import { memo } from 'react';

const NFTDetail = memo(({ nft }: { nft: TNFTItem }) => {
  const t = useTranslations('nftPage.detail');

  return (
    <div className="space-y-6">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg">
        <img
          src={nft.metadata.media}
          alt={nft.metadata.title}
          className="absolute inset-0 h-full w-full object-contain"
        />
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-500 text-sm">{t('chain')}</h4>
          <p className="font-semibold text-lg capitalize">{nft.chain}</p>
        </div>

        {nft.metadata.description && (
          <div>
            <h4 className="font-medium text-gray-500 text-sm">{t('description')}</h4>
            <p className="text-base text-gray-700">{nft.metadata.description}</p>
          </div>
        )}
        {nft.token_id && (
          <div>
            <h4 className="font-medium text-gray-500 text-sm">{t('tokenId')}</h4>
            {nft.chain === CHAIN.NEAR ? (
              <a
                className="text-base text-gray-700 underline"
                href={`https://nearblocks.io/nft-token/${nft.contract}/${nft.token_id}`}
                target="_blank"
                rel="noreferrer"
              >
                {nft.token_id}
              </a>
            ) : (
              <p className="cursor-default text-base text-gray-700 underline">{nft.token_id}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

NFTDetail.displayName = 'NFTDetail';

export default NFTDetail;
