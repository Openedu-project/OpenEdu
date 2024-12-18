import type { Metadata } from 'next';

import EarnPageClient from './_components/earn';

export const metadata: Metadata = {
  title: 'Wallet - Earnings',
};

const EarnPage = () => <EarnPageClient />;

export default EarnPage;
