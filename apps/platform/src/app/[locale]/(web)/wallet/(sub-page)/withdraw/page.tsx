import type { Metadata } from 'next';

import WithdrawPage from './_components/withdraw';

export const metadata: Metadata = {
  title: 'Wallet - Withdraw',
};

const WalletWithdrawPage = () => (
  <main className="w-full max-w-lg mx-auto md:p-6">
    <WithdrawPage />
  </main>
);

export default WalletWithdrawPage;
