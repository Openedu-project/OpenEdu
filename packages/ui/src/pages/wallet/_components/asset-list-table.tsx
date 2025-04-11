'use client';
import type { IWallet } from '@oe/api';
import { useExchangeRates } from '@oe/api';
import { useNFTTotalAssets, useWallet } from '@oe/api';
import {
  ASSET_TYPES,
  CHAIN,
  FIAT_CURRENCIES,
  SUPPORTED_EXCHANGE_RATES,
  WITHDRAW_TYPE,
  currencyConverter,
} from '@oe/api';
import type { IExchangeRates } from '@oe/api';
import type { ISvgProps } from '@oe/assets';
import { DEFAULT_CURRENCY, formatCurrency } from '@oe/core';
import { WALLET_ROUTES } from '@oe/core';
import { ArrowUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { type ReactNode, useMemo } from 'react';
import { Link } from '#common/navigation';
import { type ColumnDef, Table } from '#components/table';
import { Switch } from '#shadcn/switch';
import { cn } from '#utils/cn';
import { useWalletStore } from '../_store/useWalletStore';
import { DepositModal } from './deposit-modal';
type AssetData = {
  type: string;
  icon: (props: ISvgProps) => ReactNode;
  assetType: string;
  amount: number;
  valueUSD: number;
  original: IWallet;
};

const ValueCell = ({
  value,
  selectedCurrency,
  exchangeRates,
}: {
  value: number;
  selectedCurrency?: string;
  exchangeRates?: IExchangeRates;
}) => {
  const displayCurrency = selectedCurrency ?? DEFAULT_CURRENCY;

  const finalCurrency = SUPPORTED_EXCHANGE_RATES[displayCurrency as keyof typeof SUPPORTED_EXCHANGE_RATES]
    ? displayCurrency
    : DEFAULT_CURRENCY;

  const converter = currencyConverter[finalCurrency];
  if (!converter) {
    return <span className="font-medium">{formatCurrency(value, { currency: DEFAULT_CURRENCY })}</span>;
  }

  const convertedValue = exchangeRates ? converter.fromUSD(value, exchangeRates) : value;

  return <span className="font-medium">{formatCurrency(convertedValue, { currency: finalCurrency })}</span>;
};

export const AssetListTable = () => {
  const t = useTranslations('wallets');
  const { wallets, walletsLoading } = useWallet();
  const { exchangeRates, exchangeRatesLoading } = useExchangeRates();
  const { isHiddenZeroAmount, setIsHiddenZeroAmount, selectedCurrency } = useWalletStore();
  const { tokenBalances } = useNFTTotalAssets();

  const columns: ColumnDef<AssetData>[] = useMemo(
    () => [
      {
        id: 'type',
        header: t('typeOfCurrency'),
        className: 'p-0 flex-1',
        headerClassName: 'flex-1 bg-background',
        size: 250,
        cell: ({ row }) => {
          const { icon: Icon, type, assetType } = row.original;
          return (
            <div
              className={cn(
                'flex h-full w-full items-center gap-2 p-2 font-medium',
                assetType === 'fiat' ? 'bg-success/10' : ''
              )}
            >
              <Icon className="h-6 w-6" />
              <div className="flex flex-col">
                <span className="font-medium">{type}</span>
                <span className="text-muted-foreground text-sm capitalize">{assetType}</span>
              </div>
            </div>
          );
        },
      },
      {
        id: 'amount',
        header: t('amount'),
        className: 'p-0 flex-1',
        headerClassName: 'flex-1 bg-background',
        size: 250,
        cell: ({ row }) => {
          const { amount, assetType } = row.original;
          return (
            <div
              className={cn(
                'flex h-full w-full items-center gap-2 p-2 font-medium',
                assetType === 'fiat' ? 'bg-success/10' : ''
              )}
            >
              {amount.toLocaleString()}
            </div>
          );
        },
      },
      {
        id: 'value',
        header: t('value', { currency: selectedCurrency ?? '' }),
        className: 'p-0 flex-1',
        headerClassName: 'flex-1 bg-background',
        size: 250,
        cell: ({ row }) => {
          const { valueUSD, assetType } = row.original;
          return (
            <div
              className={cn(
                'flex h-full w-full items-center gap-2 p-2 font-medium',
                assetType === 'fiat' ? 'bg-success/10' : ''
              )}
            >
              <ValueCell value={valueUSD} selectedCurrency={selectedCurrency} exchangeRates={exchangeRates} />
            </div>
          );
        },
      },
      {
        id: 'actions',
        header: t('action'),
        className: 'p-0 flex-1',
        headerClassName: 'flex-1 bg-background',
        size: 250,
        cell: ({ row }) => {
          const { assetType, original } = row.original;
          const isFiat = assetType === ASSET_TYPES.FIAT;

          return (
            <div className={cn('flex h-full w-full items-center gap-2 p-2', isFiat ? 'bg-success/10' : '')}>
              {isFiat ? (
                <Link
                  variant="outline"
                  size="xs"
                  href={`${WALLET_ROUTES.withdraw}?type=${WITHDRAW_TYPE.FIAT}`}
                  className="gap-1 text-primary hover:text-primary/80"
                >
                  <ArrowUp className="h-4 w-4" />
                  {t('requestWithdraw')}
                </Link>
              ) : (
                <>
                  <DepositModal {...original} />
                  <Link
                    variant="outline"
                    size="xs"
                    className="gap-1 text-primary hover:text-primary/80"
                    href={`${WALLET_ROUTES.withdraw}?type=${WITHDRAW_TYPE.TOKEN}`}
                  >
                    <ArrowUp className="h-4 w-4" />
                    {t('withdraw')}
                  </Link>
                </>
              )}
            </div>
          );
        },
      },
    ],
    [t, selectedCurrency, exchangeRates]
  );

  const data = useMemo(() => {
    if (!(wallets && exchangeRates)) {
      return [];
    }

    // const allCurrencies = [...FIAT_CURRENCIES, ...CRYPTO_CURRENCIES];

    const processedData = wallets
      .map(wallet => {
        const currencyInfo = SUPPORTED_EXCHANGE_RATES[wallet.currency as keyof typeof SUPPORTED_EXCHANGE_RATES];
        if (!currencyInfo) {
          return null;
        }
        const { tokens, near } = tokenBalances ?? {
          near: { balance: 0 },
          tokens: {} as { [key: string]: { balance: number } },
        };
        if (wallet.currency.toLocaleLowerCase() === CHAIN.NEAR) {
          wallet.balance = String(near.balance);
        } else if (!Object.keys(FIAT_CURRENCIES).includes(wallet.currency)) {
          // Only set balance for non-fiat currencies
          const tokenBalance = tokens[wallet.currency as keyof typeof tokens];
          wallet.balance = String(tokenBalance?.balance ?? 0);
        }
        const valueUSD =
          wallet.currency === DEFAULT_CURRENCY
            ? Number(wallet.balance)
            : Number(wallet.balance) * (exchangeRates[`${wallet.currency}_${DEFAULT_CURRENCY}`] || 0);

        return {
          type: wallet.currency,
          icon: currencyInfo.icon,
          assetType: wallet.type.toLowerCase(),
          amount: Number(wallet.balance),
          valueUSD,
          original: wallet,
        };
      })
      .filter(Boolean)
      .filter(item => !isHiddenZeroAmount || (item?.valueUSD ?? 0) >= 1) as AssetData[];

    return processedData.sort((a, b) => {
      if (a.assetType === ASSET_TYPES.FIAT && b.assetType !== ASSET_TYPES.FIAT) {
        return -1;
      }
      if (a.assetType !== ASSET_TYPES.FIAT && b.assetType === ASSET_TYPES.FIAT) {
        return 1;
      }
      return 0;
    });
  }, [wallets, exchangeRates, isHiddenZeroAmount, tokenBalances]);

  return (
    <>
      <div className="flex items-center gap-3">
        <Switch checked={isHiddenZeroAmount} onCheckedChange={setIsHiddenZeroAmount} />
        <p className="font-semibold text-sm sm:text-base">
          {t('hideAsset1usd', {
            currency:
              selectedCurrency && exchangeRates
                ? formatCurrency(
                    currencyConverter?.[selectedCurrency as keyof typeof currencyConverter]?.fromUSD(
                      1,
                      exchangeRates
                    ) ?? 0,
                    { currency: selectedCurrency }
                  )
                : '',
          })}
        </p>
      </div>
      <Table<AssetData>
        columns={columns}
        data={data}
        isLoading={walletsLoading || exchangeRatesLoading}
        key={selectedCurrency}
      />
    </>
  );
};
