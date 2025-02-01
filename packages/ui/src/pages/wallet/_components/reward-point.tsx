'use client';

import { useWallet } from '@oe/api/hooks/useWallet';
import { ASSET_TYPES } from '@oe/api/utils/wallet';
import { RewardPointIcon } from '@oe/assets/icons/wallets/reward-point';
// import { WALLET_ROUTES } from "@oe/core/utils/routes";
// import { ChevronRight } from "lucide-react";
import { useTranslations } from 'next-intl';
// import { Link } from "#common/navigation";
import AssetCard from './asset-card';

export const RewardPoint = () => {
  const { wallets } = useWallet();
  const t = useTranslations('wallets');

  const pointBalance = wallets?.find(wallet => wallet.type === ASSET_TYPES.POINT)?.balance;

  return (
    <AssetCard
      icon={<RewardPointIcon className="h-7 w-7" />}
      label={t('points')}
      value={pointBalance ?? 0}
      // actionBtns={
      //   <Link
      //     href={WALLET_ROUTES.points}
      //     variant="outline"
      //     className="h-6 w-6 px-1"
      //   >
      //     <ChevronRight className="h-4 w-4 text-primary" />
      //   </Link>
      // }
    />
  );
};
