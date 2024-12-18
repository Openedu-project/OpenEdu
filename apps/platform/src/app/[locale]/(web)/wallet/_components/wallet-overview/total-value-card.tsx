'use client';

import { useRouter } from '@oe/ui/common/navigation';
import { CardContent } from '@oe/ui/shadcn/card';
import { formatVNDCurrency } from '@oe/ui/utils/format-currency';
import { ArrowDown, ArrowUp, CircleDollarSign, Clock, CreditCard, Network } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { useWalletDataStore } from '../../_store/useWalletDataStore';
import { useWalletVisibilityStore } from '../../_store/useWalletVisibilityStore';
import AssetCard from './asset-card';
import CurrrencyToggle from './currrency-toggle';
import MoreComboboxMenu from './more-combobox-menu';
import NetworkDialog from './network-dialog';

const EstimatedValueCardContent = () => {
  const { totalAssetValue } = useWalletDataStore();
  const { isVNDCurrency } = useWalletVisibilityStore();
  const currencyLabel = isVNDCurrency ? 'VND' : 'USD';

  const value = useMemo(() => {
    const assetValue = isVNDCurrency ? (totalAssetValue?.vnd ?? 0) : (totalAssetValue?.usd ?? 0);

    return `${formatVNDCurrency(currencyLabel, assetValue)}`;
  }, [isVNDCurrency, totalAssetValue, currencyLabel]);

  return (
    <CardContent className="p-0 pl-10 font-bold leading-[125%] text-[24px] sm:text-[28px]">
      {value} <small className="text-[14px]">{currencyLabel}</small>
    </CardContent>
  );
};

const TotalValueCard = () => {
  const [isNetworkDialogOpen, setIsNetworkDialogOpen] = useState(false);
  const router = useRouter();
  const t = useTranslations('walletPage');

  const handleNavigate = (path: string) => {
    router.push(`/wallet/${path}`);
  };

  return (
    <>
      <AssetCard
        highlighted
        icon={
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E1F7E2]">
            <CircleDollarSign className="h-6 w-6 text-[#33C639]" />
          </div>
        }
        label={t('totalAssetCard')}
        actionBtns={
          <MoreComboboxMenu
            items={[
              {
                icon: <ArrowDown />,
                label: t('deposit'),
                onClick: () => handleNavigate('deposit'),
              },
              {
                icon: <ArrowUp />,
                label: t('withdraw'),
                onClick: () => handleNavigate('withdraw'),
              },
              {
                icon: <Clock />,
                label: t('history'),
                onClick: () => handleNavigate('history'),
              },
              {
                icon: <CreditCard />,
                label: t('bankAccounts'),
                onClick: () => handleNavigate('bank-accounts'),
              },
              {
                icon: <Network />,
                label: t('networks'),
                onClick: () => setIsNetworkDialogOpen(true),
              },
            ]}
            itemsNode={<CurrrencyToggle />}
          />
        }
        cardContent={<EstimatedValueCardContent />}
      />
      <NetworkDialog isOpen={isNetworkDialogOpen} onOpenChange={setIsNetworkDialogOpen} />
    </>
  );
};

export default TotalValueCard;
