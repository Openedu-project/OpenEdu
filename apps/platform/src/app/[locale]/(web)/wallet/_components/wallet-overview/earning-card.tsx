import { Link } from '@oe/ui/common/navigation';
import { Button } from '@oe/ui/shadcn/button';
import { formatVNDCurrency } from '@oe/ui/utils/format-currency';
import { ChevronRight, HandCoins } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type React from 'react';
import { useMemo } from 'react';
import { useWalletDataStore } from '../../_store/useWalletDataStore';
import { useWalletVisibilityStore } from '../../_store/useWalletVisibilityStore';
import AssetCard from './asset-card';

interface NavigateButtonProps {
  href?: string;
}

const NavigateButton: React.FC<NavigateButtonProps> = ({ href }) => {
  if (!href) {
    return null;
  }

  return (
    <Link href={href} className="p-0">
      <Button variant="outline">
        <ChevronRight className="h-6 w-6 text-[#6368DC]" />
      </Button>
    </Link>
  );
};

const EarningCard = () => {
  const totalEarning = useWalletDataStore(state => state.totalEarningBalance);
  const { isVNDCurrency } = useWalletVisibilityStore();
  const currencyLabel = isVNDCurrency ? 'VND' : 'USD';
  const t = useTranslations('walletPage');

  const value = useMemo(() => {
    const assetValue = isVNDCurrency ? (totalEarning?.vnd ?? 0) : (totalEarning?.usd ?? 0);

    return `${formatVNDCurrency(currencyLabel, assetValue)}`;
  }, [isVNDCurrency, totalEarning, currencyLabel]);

  return (
    <>
      <AssetCard
        icon={
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#DDEFFF]">
            <HandCoins className="h-6 w-6 text-[#0A8AFF]" />
          </div>
        }
        label={t('estimatedEarning')}
        actionBtns={<NavigateButton href="/wallet/earn" />}
        value={
          <>
            {value} <small>{currencyLabel}</small>
          </>
        }
      />
    </>
  );
};

export default EarningCard;
