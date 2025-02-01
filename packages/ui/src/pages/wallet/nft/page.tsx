import { useTranslations } from 'next-intl';
import { SubPageLayout } from '../_components/sub-page-layout';
import { NFTCollection } from './nft-collection';

export const NFTPage = () => {
  const t = useTranslations('wallets.nftPage');
  return (
    <SubPageLayout title={t('title')} className="mx-auto max-w-screen-xl">
      <NFTCollection />
    </SubPageLayout>
  );
};
