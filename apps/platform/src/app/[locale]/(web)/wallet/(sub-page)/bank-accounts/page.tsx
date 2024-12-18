import type { Metadata } from 'next';

import BankAccountsPage from './_components/bank-accounts';

export const metadata: Metadata = {
  title: 'Wallet - Bank Accounts',
};

const WalletBankAccountsPage = () => <BankAccountsPage />;

export default WalletBankAccountsPage;
