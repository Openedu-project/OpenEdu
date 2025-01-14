import type { Metadata } from 'next';

import { EarnList } from '@oe/ui/common/wallet/earn';
import { WalletBackButton } from '@oe/ui/common/wallet/shared';
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: 'Wallet - Earnings',
};

const EarnPage = () => {
  const t = useTranslations('earnPage');
  return (
    <div className="min-h-screen space-y-6">
      <div className="flex gap-2 items-center">
        <WalletBackButton />
        <h2 className="text-[16px] md:text-[24px] font-semibold leading-9 m-0">{t('earnings')}</h2>
      </div>
      <EarnList />
    </div>
  );
};

export default EarnPage;
