import type { TAssetList } from '@oe/api/types/wallet';
import { ASSET_TYPES } from '@oe/api/utils/wallet';
import { Link } from '@oe/ui/common/navigation';
import { Button } from '@oe/ui/shadcn/button';
import { cn } from '@oe/ui/utils/cn';
import { formatVNDCurrency } from '@oe/ui/utils/format-currency';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
// biome-ignore lint/nursery/noRestrictedImports: <explanation>
import Image from 'next/image';
import { memo, useMemo } from 'react';
import { assetList as selectAssetList, useWalletDataStore } from '../../_store/useWalletDataStore';
import { isHiddenZeroAmount, isVNDCurrency, useWalletVisibilityStore } from '../../_store/useWalletVisibilityStore';
import { CURRENCY_LOGOS } from '../../_utils/utils';

const AssetCardItem = memo(({ item }: { item: TAssetList }) => {
  const currencyType = useWalletVisibilityStore(isVNDCurrency);
  const currencyLabel = currencyType ? 'VND' : 'USD';
  const t = useTranslations('walletPage');

  return (
    <div className={cn('rounded-lg p-4 shadow', item.type === ASSET_TYPES.FIAT ? 'bg-[#E1F7E2]' : 'bg-white')}>
      <div className="mb-2 flex items-center gap-3">
        <Image src={CURRENCY_LOGOS[item.symbol]?.src ?? ''} width={24} height={24} alt={`${item.symbol} logo`} />
        <div>
          <span className="font-semibold text-lg">{item.symbol}</span>
          <span className="block text-sm capitalize">{item.type}</span>
        </div>
      </div>
      <div className="mb-4 grid grid-cols-2 gap-2">
        <div>
          <p className="text-gray-500 text-sm">{t('amount')}</p>
          <p className="font-medium">{formatVNDCurrency(item.symbol, item.amount)}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">
            {t('value')} ({currencyLabel})
          </p>
          <p className="font-medium">
            {item.exchangeValue
              ? currencyType
                ? formatVNDCurrency('VND', item.exchangeValue.vnd)
                : formatVNDCurrency('USD', item.exchangeValue.usd)
              : null}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {item.type === ASSET_TYPES.FIAT && (
          <Link href="/wallet/withdraw?type=fiat" className="p-0">
            <Button variant="outline" className="w-full text-[#5055D7]">
              {t('requestWithdraw')}
            </Button>
          </Link>
        )}
        {item.type === ASSET_TYPES.TOKEN && (
          <>
            <Link href="/wallet/deposit" className="p-0">
              <Button variant="outline" className="w-full text-[#33C639]">
                <ArrowDown className="mr-1 h-4 w-4" />
                {t('deposit')}
              </Button>
            </Link>

            <Link href="/wallet/withdraw" className="p-0">
              <Button variant="outline" className="w-full text-[#5055D7]">
                <ArrowUp className="mr-1 h-4 w-4" />
                {t('withdraw')}
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
});

AssetCardItem.displayName = 'AssetCardItem';

const EmptyState = memo(() => {
  const t = useTranslations('walletPage');
  return <div className="py-4 text-center">{t('noData')}</div>;
});

EmptyState.displayName = 'EmptyState';

const AssetListCards = memo(() => {
  const hideZeroAmount = useWalletVisibilityStore(isHiddenZeroAmount);
  const rawAssetList = useWalletDataStore(selectAssetList);

  const filteredAssetList = useMemo(() => {
    if (!rawAssetList) {
      return [];
    }

    return rawAssetList
      .filter(item => item.type !== ASSET_TYPES.POINT)
      .filter(item => !hideZeroAmount || item.value >= 1);
  }, [rawAssetList, hideZeroAmount]);

  if (filteredAssetList.length === 0) {
    return (
      <div className="sm:hidden">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:hidden">
      {filteredAssetList.map(item => (
        <AssetCardItem key={item.symbol} item={item} />
      ))}
    </div>
  );
});

AssetListCards.displayName = 'AssetListCards';

export default AssetListCards;
