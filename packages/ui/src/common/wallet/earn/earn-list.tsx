'use client';

import useWalletEarning from '@oe/api/hooks/useWalletEarning';
import { CURRENCY_SYMBOLS } from '@oe/api/utils/wallet';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import { Link } from '#common/navigation';
import { Button } from '#shadcn/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '#shadcn/dialog';
import { CURRENCY_LOGOS } from '#utils/wallet';
import { useAssetList } from '../hooks/useAssetList';
import EarnCryptoCard from './earn-crypto-card';
import EarnHistoryTable from './earn-history-table';

const EarnList = () => {
  const t = useTranslations('earnPage');
  const { nearEcosystemAssets } = useAssetList();

  const { nearWallet, usdtWallet, usdcWallet } = useMemo(() => {
    return {
      nearWallet: nearEcosystemAssets?.find(asset => asset.symbol === CURRENCY_SYMBOLS.NEAR),
      usdtWallet: nearEcosystemAssets?.find(wallet => wallet.symbol === CURRENCY_SYMBOLS.USDT),
      usdcWallet: nearEcosystemAssets?.find(wallet => wallet.symbol === CURRENCY_SYMBOLS.USDC),
    };
  }, [nearEcosystemAssets]);

  const { isOutOfGas, isTxLoading, claimToken, setIsOutOfGas } = useWalletEarning();

  return (
    <>
      <div className="mb-9 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <EarnCryptoCard
          logo={CURRENCY_LOGOS[CURRENCY_SYMBOLS.USDC]?.src || ''}
          symbol={CURRENCY_SYMBOLS.USDC}
          balance={Number(usdcWallet?.earningBalance?.usd ?? 0)}
          onClaim={() => usdcWallet && claimToken(usdcWallet.wallet_id, nearWallet?.amount ?? 0)}
          isLoading={isTxLoading}
        />
        <EarnCryptoCard
          logo={CURRENCY_LOGOS[CURRENCY_SYMBOLS.USDT]?.src || ''}
          symbol={CURRENCY_SYMBOLS.USDT}
          balance={Number(usdtWallet?.earningBalance?.usd ?? 0)}
          onClaim={() => usdtWallet && claimToken(usdtWallet.wallet_id, nearWallet?.amount ?? 0)}
          isLoading={isTxLoading}
        />
      </div>
      <div>
        <h2 className="mb-6 font-semibold text-[#1A1A1A] text-[20px] leading-[125%]">{t('transactionHistory')}</h2>
        <EarnHistoryTable />
      </div>
      <Dialog open={isOutOfGas} onOpenChange={setIsOutOfGas}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('outOfGasTitle')}</DialogTitle>
            <DialogDescription>{t('outOfGasDescription')}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setIsOutOfGas(false)} variant="ghost">
              {t('cancelBtn')}
            </Button>
            <Link href="/wallet/deposit" className="p-0">
              <Button className="text-white">{t('depositBtn')}</Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EarnList;
