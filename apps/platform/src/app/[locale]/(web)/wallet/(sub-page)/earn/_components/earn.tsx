'use client';

import useWalletEarning from '@oe/api/hooks/useWalletEarning';
import { CURRENCY_SYMBOLS } from '@oe/api/utils/wallet';
import { Link, useRouter } from '@oe/ui/common/navigation';
import { Button } from '@oe/ui/shadcn/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@oe/ui/shadcn/dialog';
import { ChevronLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { memo, useCallback, useMemo } from 'react';
import { useWalletDataStore } from '../../../_store/useWalletDataStore';
import { CURRENCY_LOGOS } from '../../../_utils/utils';
import CryptoCard from './crypto-card';
import EarnHistoryTable from './earn-history-table';

const Header = memo(() => {
  const router = useRouter();
  const t = useTranslations('earnPage');
  const handleBackClick = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <div className="mb-6 flex items-center gap-2">
      <Button variant="ghost" onClick={handleBackClick} className="w-fit p-2">
        <ChevronLeft color="#6368DC" />
      </Button>
      <h2 className="m-0 font-semibold text-[16px] leading-9 md:text-[24px]">{t('earnings')}</h2>
    </div>
  );
});

Header.displayName = 'Header';

const EarnPage = () => {
  const assetList = useWalletDataStore(state => state.assetList);
  const t = useTranslations('earnPage');

  const { nearWallet, usdtWallet, usdcWallet } = useMemo(() => {
    return {
      nearWallet: assetList?.find(asset => asset.symbol === CURRENCY_SYMBOLS.NEAR),
      usdtWallet: assetList?.find(asset => asset.symbol === CURRENCY_SYMBOLS.USDT),
      usdcWallet: assetList?.find(asset => asset.symbol === CURRENCY_SYMBOLS.USDC),
    };
  }, [assetList]);

  const { isOutOfGas, isTxLoading, claimToken, setIsOutOfGas } = useWalletEarning();

  return (
    <>
      <Header />
      <div className="mb-9 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <CryptoCard
          logo={CURRENCY_LOGOS[CURRENCY_SYMBOLS.USDC]?.src || ''}
          symbol={CURRENCY_SYMBOLS.USDC}
          balance={Number(usdcWallet?.earningBalance?.usd ?? 0)}
          onClaim={() => usdcWallet && claimToken(usdcWallet.wallet_id, nearWallet?.amount ?? 0)}
          isLoading={isTxLoading}
        />
        <CryptoCard
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

export default memo(EarnPage);
