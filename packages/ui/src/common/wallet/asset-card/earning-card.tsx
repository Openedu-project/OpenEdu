"use client";

import { useTranslations } from "next-intl";
import { useWalletVisibilityStore } from "../stores/wallet-visibility-store";
import { HandCoins } from "lucide-react";
import { formatVNDCurrency } from "#utils/format-currency";
import AssetCardSkeleton from "./asset-card-skeleton";
import AssetCard from "./asset-card";
import AssetCardIconWrapper from "./asset-card-icon-wrapper";
import AssetCardNavigateButton from "./asset-card-navigate-button";
import { useEarningCard } from "../hooks/useEarningCard";

const EarningCard = () => {
  const { earnings, isLoading } = useEarningCard();
  const { isVNDCurrency } = useWalletVisibilityStore();
  const t = useTranslations("walletPage");

  if (isLoading) {
    return <AssetCardSkeleton />;
  }

  const value = isVNDCurrency ? earnings?.vnd : earnings?.usd;
  const currency = isVNDCurrency ? "VND" : "USD";

  return (
    <AssetCard
      icon={
        <AssetCardIconWrapper
          Icon={HandCoins}
          iconColor="text-[#0A8AFF]"
          bgColor="bg-[#DDEFFF]"
        />
      }
      label={t("estimatedEarning")}
      value={
        <>
          {formatVNDCurrency(currency, value || 0)}{" "}
          <small className="text-[14px]">{currency}</small>
        </>
      }
      actionBtns={<AssetCardNavigateButton href="/wallet/earn" />}
    />
  );
};

export default EarningCard;
