import { HistoryList } from '@oe/ui/common/wallet/history';
import { WalletBackButton } from '@oe/ui/common/wallet/shared';
import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: 'Wallet - History',
};

const WalletHistoryPage = () => {
  const t = useTranslations('historyPage');
  return (
    <div className="min-h-screen space-y-6">
      <div className="flex gap-2 items-center">
        <WalletBackButton />
        <h2 className="text-[16px] md:text-[24px] font-semibold leading-9 m-0">{t('title')}</h2>
      </div>
      <p className="mt-4 mb-4 text-[#6E6E6E] text-[14px] md:text-[16px] font-normal leading-5">{t('desc')}</p>
      <HistoryList />
    </div>
  );
};

export default WalletHistoryPage;
