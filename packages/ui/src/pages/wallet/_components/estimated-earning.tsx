'use client';

import { useTotalEarnings } from '@oe/api';
import { EstimatedEarningIcon } from '@oe/assets';
import { WALLET_ROUTES } from '@oe/core';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '#common/navigation';
import { useWalletStore } from '../_store/useWalletStore';
import { AssetCard } from './asset-card';

export const EstimatedEarning = () => {
  const { selectedCurrency } = useWalletStore();
  const value = useTotalEarnings(selectedCurrency);
  const t = useTranslations('wallets');

  return (
    <AssetCard
      icon={<EstimatedEarningIcon className="h-7 w-7" />}
      label={t('estimatedEarning')}
      value={value}
      actionBtns={
        <Link href={WALLET_ROUTES.earning} variant="outline" className="h-6 w-6 px-1">
          <ChevronRight className="h-4 w-4 text-primary" />
        </Link>
      }
    />
  );
};
