import type { Metadata } from 'next';

import NFTPageClient from './_components/nft';

export const metadata: Metadata = {
  title: 'Wallet - NFTs',
};

const NFTPage = () => <NFTPageClient />;

export default NFTPage;
