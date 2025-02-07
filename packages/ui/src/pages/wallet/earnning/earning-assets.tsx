'use client';
import { useWallet } from '@oe/api/hooks/useWallet';
import type { ICryptoWithdrawPayload } from '@oe/api/schemas/withdrawSchema';
import { tokenSubmitWithdrawService } from '@oe/api/services/wallet';
import { ASSET_TYPES, CHAIN, CRYPTO_CURRENCIES } from '@oe/api/utils/wallet';
import { WALLET_ROUTES } from '@oe/core/utils/routes';
import { Button } from '@oe/ui/shadcn/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@oe/ui/shadcn/dialog';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { Link } from '#common/navigation';
import { EarnCryptoCard } from './earning-crypto-card';

export const EarningAssets = () => {
  const t = useTranslations('wallets.earningPage');
  const { wallets, mutateWallets } = useWallet();
  const [isOutOfGas, setIsOutOfGas] = useState(false);

  const { usdtWallet, usdcWallet } = useMemo(() => {
    const cryptoWallets =
      wallets?.filter(wallet => wallet.type === ASSET_TYPES.CRYPTO && wallet.network === CHAIN.NEAR) || [];

    return {
      nearWallet: cryptoWallets.find(wallet => wallet.currency === CRYPTO_CURRENCIES.NEAR.value),
      usdtWallet: cryptoWallets.find(wallet => wallet.currency === CRYPTO_CURRENCIES.USDT.value),
      usdcWallet: cryptoWallets.find(wallet => wallet.currency === CRYPTO_CURRENCIES.USDC.value),
    };
  }, [wallets]);

  const handleClaimToken = async ({
    walletId,
    amount,
    token,
    to_address,
    network,
    currency,
  }: ICryptoWithdrawPayload & { token: string; walletId: string }) => {
    try {
      if (Number(amount) < 0.2) {
        setIsOutOfGas(true);
        return;
      }

      await tokenSubmitWithdrawService(null, walletId, {
        payload: {
          withdraw_type: 'crypto',
          to_address,
          network,
          amount,
          currency,
          is_mainnet: process.env.NODE_ENV === 'production',
          token,
        },
      });

      await mutateWallets();
    } catch (error) {
      console.error('Claim token error:', error);
    }
  };

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <EarnCryptoCard
          Icon={CRYPTO_CURRENCIES.USDC.icon}
          symbol={CRYPTO_CURRENCIES.USDC.value}
          balance={Number(usdcWallet?.earning_balance ?? 0)}
          onClaim={() =>
            usdcWallet &&
            handleClaimToken({
              walletId: usdcWallet.id,
              amount: usdcWallet.earning_balance,
              token: CRYPTO_CURRENCIES.USDC.value,
              to_address: usdcWallet.address,
              network: usdcWallet.network,
              currency: usdcWallet.currency,
            })
          }
        />
        <EarnCryptoCard
          Icon={CRYPTO_CURRENCIES.USDT.icon}
          symbol={CRYPTO_CURRENCIES.USDT.value}
          balance={Number(usdtWallet?.earning_balance ?? 0)}
          onClaim={() =>
            usdtWallet &&
            handleClaimToken({
              walletId: usdtWallet.id,
              amount: usdtWallet.earning_balance,
              token: CRYPTO_CURRENCIES.USDT.value,
              to_address: usdtWallet.address,
              network: usdtWallet.network,
              currency: usdtWallet.currency,
            })
          }
        />
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
            <Link href={WALLET_ROUTES.deposit}>
              <Button>{t('depositBtn')}</Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
