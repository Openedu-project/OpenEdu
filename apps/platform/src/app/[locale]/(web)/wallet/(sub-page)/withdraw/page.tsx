import { Withdraw, WithdrawHeader } from '@oe/ui/common/wallet/withdraw';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wallet - Withdraw',
};

const WalletWithdrawPage = () => (
  <main className="w-full max-w-lg mx-auto md:p-6">
    <div className="rounded-2xl bg-white p-4 shadow-[0px_4px_30px_0px_#F4F5F6] sm:p-8 space-y-6">
      <WithdrawHeader />
      <Withdraw />
    </div>
  </main>
);

export default WalletWithdrawPage;
