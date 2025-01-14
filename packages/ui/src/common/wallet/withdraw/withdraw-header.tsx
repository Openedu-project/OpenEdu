import { useTranslations } from 'next-intl';
import React from 'react';
import WalletBackButton from '../shared/wallet-back-button';

const WithdrawHeader = React.memo(() => {
  const t = useTranslations('withdrawPage');

  return (
    <div className="inline-flex items-center gap-2">
      <WalletBackButton />
      <div className="inline-flex gap-2">
        <h2 className="m-0 font-semibold text-[#2C2C2C] text-[24px] leading-[30px]">{t('title')}</h2>
      </div>
    </div>
  );
});

WithdrawHeader.displayName = 'DepositHeader';

export default WithdrawHeader;
