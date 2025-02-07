'use client';
import { useEstimatedTotalValue } from '@oe/api/hooks/useWallet';
import { EstimatedAssetsIcon } from '@oe/assets/icons/wallets/estimated-assets';
import { WALLET_ROUTES } from '@oe/core/utils/routes';
import { ArrowUp, Clock4, CreditCard, MoreHorizontal } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '#common/navigation';
import { Button } from '#shadcn/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '#shadcn/dropdown-menu';
import { useWalletStore } from '../_store/useWalletStore';
import AssetCard from './asset-card';
import { NetworkListModal } from './network-dialog';

export const EstimatedTotalValue = () => {
  const { selectedCurrency } = useWalletStore();
  const value = useEstimatedTotalValue(selectedCurrency);
  const t = useTranslations('wallets');

  return (
    <>
      <AssetCard
        highlighted
        icon={<EstimatedAssetsIcon className="h-7 w-7" />}
        label={t('totalAssetCard')}
        actionBtns={
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="xs" className="h-4 px-1">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem className="flex gap-2" asChild>
                <Link href={WALLET_ROUTES.withdraw} variant="ghost" className="flex h-8 justify-start gap-2">
                  <ArrowUp className="h-4 w-4" />
                  <span>{t('withdraw')}</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex gap-2" asChild>
                <Link href={WALLET_ROUTES.history} variant="ghost" className="flex h-8 justify-start gap-2">
                  <Clock4 className="h-4 w-4" />
                  <span>{t('history')}</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex gap-2" asChild>
                <Link href={WALLET_ROUTES.bankAccounts} variant="ghost" className="flex h-8 justify-start gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span>{t('bankAccounts')}</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex gap-2" asChild>
                <NetworkListModal />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        }
        value={value}
      />
    </>
  );
};

// interface EstimatedValueCardContentProps {
//   totalValue: {
//     vnd: number;
//     usd: number;
//   } | null;
// }

// const EstimatedValueCardContent = ({
//   totalValue,
// }: EstimatedValueCardContentProps) => {
//   const { isVNDCurrency } = useWalletVisibilityStore();
//   const currencyLabel = isVNDCurrency ? "VND" : "USD";

//   const value = useMemo(() => {
//     const assetValue = isVNDCurrency
//       ? totalValue?.vnd ?? 0
//       : totalValue?.usd ?? 0;

//     return `${formatCurrency(assetValue, {
//       currency: currencyLabel,
//       showSymbol: false,
//     })}`;
//   }, [isVNDCurrency, totalValue, currencyLabel]);

//   return (
//     <CardContent className="p-0 font-bold text-2xl">
//       {value} <small className="text-sm">{currencyLabel}</small>
//     </CardContent>
//   );
// };
