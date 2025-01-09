"use client";

import { Award } from "lucide-react";
import AssetCard from "./asset-card";
import AssetCardIconWrapper from "./asset-card-icon-wrapper";
import AssetCardNavigateButton from "./asset-card-navigate-button";
import AssetCardSkeleton from "./asset-card-skeleton";
import { useTranslations } from "next-intl";
import useWalletBase from "@oe/api/hooks/useWalletBase";
import { ASSET_TYPES } from "@oe/api/utils/wallet";

const PointCard = () => {
  const { wallets, isLoading } = useWalletBase();
  const t = useTranslations("walletPage");

  if (isLoading) {
    return <AssetCardSkeleton />;
  }

  const pointBalance = wallets.find(
    (wallet) => wallet.type === ASSET_TYPES.POINT
  )?.balance;

  return (
    <AssetCard
      icon={
        <AssetCardIconWrapper
          Icon={Award}
          iconColor="text-[#FFBD04]"
          bgColor="bg-[#FFF6DC]"
        />
      }
      label={t("points")}
      value={pointBalance}
      actionBtns={<AssetCardNavigateButton href="/wallet/nft" />}
    />
  );
};

export default PointCard;
