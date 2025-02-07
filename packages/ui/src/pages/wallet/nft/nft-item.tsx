import type { TNFTItem } from '@oe/api/types/wallet';
import { CRYPTO_CURRENCIES } from '@oe/api/utils/wallet';
import { Modal } from '#components/modal';
import { NFTDetail } from './nft-detail';

interface NFTItemsProps {
  onClick?: () => void;
  token: TNFTItem;
}

export const NFTItem = ({ token, onClick }: NFTItemsProps) => {
  return (
    <Modal
      title={token.metadata?.title}
      trigger={
        <button
          className="group min-w-60 flex-1 cursor-pointer space-y-[8px] rounded-lg border bg-background p-2"
          onClick={onClick}
          tabIndex={0}
          type="button"
        >
          <div className="relative h-44 w-full overflow-hidden">
            {token.metadata?.media && (
              <img
                src={token.metadata?.media}
                alt={token.metadata?.title}
                className="absolute h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            )}
            {token.chain === CRYPTO_CURRENCIES.NEAR.name && (
              <div className="absolute right-0 bottom-0 rounded-full p-1">
                <CRYPTO_CURRENCIES.NEAR.icon />
              </div>
            )}
          </div>
          <p className="mcaption-semibold14 truncate text-primary" title={token.metadata?.title}>
            {token.metadata?.title}
          </p>
        </button>
      }
    >
      <NFTDetail nft={token} />
    </Modal>
  );
};
