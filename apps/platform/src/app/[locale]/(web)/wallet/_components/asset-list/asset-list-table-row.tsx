import { TableCell, TableRow } from '@oe/ui/shadcn/table';
import { memo, useCallback } from 'react';

import type { TAssetList } from '@oe/api/types/wallet';
import { ASSET_TYPES } from '@oe/api/utils/wallet';
import { Link, useRouter } from '@oe/ui/common/navigation';
import { Button } from '@oe/ui/shadcn/button';
import { cn } from '@oe/ui/utils/cn';
import { formatVNDCurrency } from '@oe/ui/utils/format-currency';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
// biome-ignore lint/nursery/noRestrictedImports: <explanation>
import Image from 'next/image';
import { useWalletVisibilityStore } from '../../_store/useWalletVisibilityStore';
import { CURRENCY_LOGOS } from '../../_utils/utils';

const AssetLogoCell = memo(({ item }: { item: TAssetList }) => (
  <TableCell className="flex items-center gap-3">
    <Image src={CURRENCY_LOGOS[item.symbol]?.src ?? ''} width={32} height={32} alt={`${item.symbol} logo`} />
    <div>
      <span className="font-semibold text-base sm:text-lg">{item.symbol}</span>
      <span className="block text-xs capitalize sm:text-sm">{item.type}</span>
    </div>
  </TableCell>
));

AssetLogoCell.displayName = 'AssetLogoCell';

const AssetAmountCell = memo(({ item }: { item: TAssetList }) => (
  <TableCell>{formatVNDCurrency(item.symbol, item.amount)}</TableCell>
));

AssetAmountCell.displayName = 'AssetAmountCell';

const AssetExchangeValueCell = memo(({ item }: { item: TAssetList }) => {
  const { isVNDCurrency } = useWalletVisibilityStore();

  if (!item.exchangeValue) {
    return <TableCell />;
  }

  return (
    <TableCell>
      {isVNDCurrency
        ? formatVNDCurrency('VND', item.exchangeValue.vnd)
        : formatVNDCurrency('USD', item.exchangeValue.usd)}
    </TableCell>
  );
});

AssetExchangeValueCell.displayName = 'AssetExchangeValueCell';

const AssetActionCell = memo(({ item }: { item: TAssetList }) => {
  const router = useRouter();
  const t = useTranslations('walletPage');

  const handleNavigate = useCallback(
    (path: string, type?: string) => {
      const query = type ? `?type=${type}` : '';
      router.push(`/wallet/${path}${query}`);
    },
    [router]
  );

  if (item.type === ASSET_TYPES.FIAT) {
    return (
      <TableCell className="text-right">
        <Link href="/wallet/withdraw?type=fiat" className="p-0">
          <Button variant="outline" className="text-[#5055D7] text-xs sm:text-sm">
            {t('requestWithdraw')}
          </Button>
        </Link>
      </TableCell>
    );
  }

  if (item.type === ASSET_TYPES.TOKEN) {
    return (
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Link href="/wallet/deposit" className="p-0">
            <Button variant="outline" className="text-[#33C639]" onClick={() => handleNavigate('deposit')}>
              <ArrowDown className="mr-1 h-4 w-4" />
              {t('deposit')}
            </Button>
          </Link>

          <Link href="/wallet/withdraw" className="p-0">
            <Button variant="outline" className="p-2 text-[#5055D7] text-xs sm:text-sm">
              <ArrowUp className="mr-1 h-4 w-4" />
              {t('withdraw')}
            </Button>
          </Link>
        </div>
      </TableCell>
    );
  }

  return <TableCell className="text-right" />;
});

AssetActionCell.displayName = 'AssetActionCell';

// Main Row Component
const AssetTableRow = memo(({ item }: { item: TAssetList }) => (
  <TableRow
    className={cn('cursor-pointer', item.type === ASSET_TYPES.FIAT ? 'bg-[#E1F7E2] hover:bg-white' : 'bg-white')}
  >
    <AssetLogoCell item={item} />
    <AssetAmountCell item={item} />
    <AssetExchangeValueCell item={item} />
    <AssetActionCell item={item} />
  </TableRow>
));

AssetTableRow.displayName = 'AssetTableRow';

export default AssetTableRow;
