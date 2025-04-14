'use client';
import { useExchangeRates } from '@oe/api';
import { currencyConverter } from '@oe/api';
import type { ISvgProps } from '@oe/assets';
import { DEFAULT_CURRENCY, formatCurrency } from '@oe/core';
import { useTranslations } from 'next-intl';
import { type ReactNode, useMemo } from 'react';
import { Button } from '#shadcn/button';
import { Card, CardContent } from '#shadcn/card';
import { cn } from '#utils/cn';
import { useWalletStore } from '../_store/useWalletStore';

interface EarnCryptoCardProps {
  Icon: (props: ISvgProps) => ReactNode;
  symbol: string;
  balance: number;
  onClaim: () => void;
  className?: string;
}

export const EarnCryptoCard = ({ Icon, symbol, balance, onClaim, className }: EarnCryptoCardProps) => {
  const t = useTranslations('wallets.earningPage');
  const { selectedCurrency } = useWalletStore();

  const { exchangeRates } = useExchangeRates();

  const equivalentValue = useMemo(() => {
    if (!exchangeRates) {
      return 0;
    }

    const usdValue = currencyConverter?.[symbol]?.toUSD(balance, exchangeRates);

    return currencyConverter?.[selectedCurrency ?? DEFAULT_CURRENCY]?.fromUSD(usdValue ?? 0, exchangeRates);
  }, [balance, exchangeRates, selectedCurrency, symbol]);

  const formattedBalance = useMemo(
    () =>
      formatCurrency(balance, {
        currency: symbol,
        decimals: 2,
      }),
    [balance, symbol]
  );

  const formattedEquivalent = useMemo(
    () =>
      formatCurrency(equivalentValue ?? 0, {
        currency: selectedCurrency,
      }),
    [equivalentValue, selectedCurrency]
  );

  return (
    <Card className={cn('p-3', className)}>
      <CardContent className="flex p-0">
        <div className="flex gap-2">
          <Icon />
          <div className="space-y-1">
            <p className="mcaption-semibold18 text-2xl tabular-nums">{formattedBalance}</p>
            <p className="text-muted-foreground text-sm">≈ {formattedEquivalent}</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="lg"
          onClick={onClaim}
          disabled={balance <= 0}
          className="ml-auto h-6 p-1 text-primary text-xs hover:text-primary/80"
        >
          {t('claimButton')} {symbol}
        </Button>
      </CardContent>
    </Card>
  );
};
