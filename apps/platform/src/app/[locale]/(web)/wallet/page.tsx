import type { Metadata } from 'next';
import WalletMainSection from './_components/wallet-main-section';

export const metadata: Metadata = {
  title: 'Wallet',
};

const WalletPage = () => {
  return <WalletMainSection />;
};

export default WalletPage;
