import type { Metadata } from 'next';
import HistoryPage from './_components/history';

export const metadata: Metadata = {
  title: 'Wallet - History',
};

const WalletHistoryPage = () => <HistoryPage />;

export default WalletHistoryPage;
