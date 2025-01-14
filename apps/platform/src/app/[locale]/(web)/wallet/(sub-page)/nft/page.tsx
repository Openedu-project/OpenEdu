import { NftList } from '@oe/ui/common/wallet/nft';
import { WalletBackButton } from '@oe/ui/common/wallet/shared';
import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: 'Wallet - NFTs',
};

const NFTPage = () => {
  const t = useTranslations('nftPage');
  return (
    <div className="min-h-screen space-y-6">
      <div className="flex gap-2 items-center">
        <WalletBackButton />
        <h2 className="text-[16px] md:text-[24px] font-semibold leading-9 m-0">{t('header')}</h2>
      </div>
      <NftList />
    </div>
  );
};

export default NFTPage;
