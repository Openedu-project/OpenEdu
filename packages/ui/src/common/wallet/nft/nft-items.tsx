import { CHAIN, type TChain } from '@oe/api/utils/wallet';
// biome-ignore lint/nursery/noRestrictedImports: <explanation>
import Image from 'next/image';
import { memo } from 'react';
import { CHAIN_LOGOS } from '#utils/wallet';

interface NFTItemsProps {
  imgSrc: string;
  name: string;
  chain: TChain;
  onClick?: () => void;
}

const NFTItems = ({ imgSrc, name, chain, onClick }: NFTItemsProps) => (
  <button
    className="group cursor-pointer space-y-[8px] p-2"
    onClick={onClick}
    tabIndex={0}
    type="button"
    onKeyDown={e => {
      if (e.key === 'Enter' || e.key === ' ') {
        onClick?.();
      }
    }}
  >
    <div className="relative h-44 w-full overflow-hidden">
      <img
        src={imgSrc}
        alt={name}
        loading="lazy"
        className="absolute h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      {chain === CHAIN.NEAR && (
        <div className="absolute right-0 bottom-0 rounded-full p-1">
          <Image src={CHAIN_LOGOS[CHAIN.NEAR].src} alt="name" width={30} height={30} />
        </div>
      )}
    </div>
    <h4 className="truncate font-semibold text-[#5055D7] text-base leading-[125%]" title={name}>
      {name}
    </h4>
  </button>
);

NFTItems.displayName = 'NFTItems';

export default memo(NFTItems);
