"use client";

import { Images } from "lucide-react";
import AssetCard from "./asset-card";
import AssetCardIconWrapper from "./asset-card-icon-wrapper";
import AssetCardNavigateButton from "./asset-card-navigate-button";
import AssetCardSkeleton from "./asset-card-skeleton";
import { useTranslations } from "next-intl";
import { useNFTCard } from "../hooks/useNFTCard";

const NftCard = () => {
  const { nftData, isLoading } = useNFTCard();
  const t = useTranslations("walletPage");

  if (isLoading) {
    return <AssetCardSkeleton />;
  }

  return (
    <AssetCard
      icon={
        <AssetCardIconWrapper
          Icon={Images}
          iconColor="text-[#FE95F6]"
          bgColor="bg-[#FFF0FE]"
        />
      }
      label={t("nftAssets")}
      value={`${nftData?.supply}`}
      actionBtns={<AssetCardNavigateButton href="/wallet/nft" />}
    />
  );
};

export default NftCard;
