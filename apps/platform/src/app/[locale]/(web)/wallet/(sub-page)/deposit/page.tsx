import type { Metadata } from 'next';
import Deposit from './_components/deposit';

export const metadata: Metadata = {
  title: 'Wallet - Deposit',
};

const WalletDepositPage = () => (
  <main className="w-full max-w-lg mx-auto md:p-6">
    <Deposit />
  </main>
);

export default WalletDepositPage;
