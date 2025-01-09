"use client";

import { useRouter } from "@oe/ui/common/navigation";
import { CardContent } from "@oe/ui/shadcn/card";
import { formatVNDCurrency } from "@oe/ui/utils/format-currency";
import {
  ArrowDown,
  ArrowUp,
  CircleDollarSign,
  Clock,
  CreditCard,
  Network,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import CurrrencyToggle from "./currency-toggle";
import AssetCard from "./asset-card";

// import NetworkDialog from "./network-dialog";
import { useTotalValueCard } from "../hooks/useTotalValueCard";
import { useWalletVisibilityStore } from "../stores/wallet-visibility-store";
import MoreComboboxMenu from "./more-combobox-menu";
import AssetCardSkeleton from "./asset-card-skeleton";
import AssetCardIconWrapper from "./asset-card-icon-wrapper";
import NetworkDialog from "./network-dialog";

const TotalValueCard = () => {
  const { totalValue, isLoading } = useTotalValueCard();
  const [isNetworkDialogOpen, setIsNetworkDialogOpen] = useState(false);
  const router = useRouter();
  const t = useTranslations("walletPage");

  const handleNavigate = (path: string) => {
    router.push(`/wallet/${path}`);
  };

  if (isLoading) {
    return <AssetCardSkeleton />;
  }

  return (
    <>
      <AssetCard
        highlighted
        icon={
          <AssetCardIconWrapper
            Icon={CircleDollarSign}
            bgColor="bg-[#E1F7E2]"
            iconColor="text-[#33C639]"
          />
        }
        label={t("totalAssetCard")}
        actionBtns={
          <MoreComboboxMenu
            items={[
              {
                icon: <ArrowDown />,
                label: t("deposit"),
                onClick: () => handleNavigate("deposit"),
              },
              {
                icon: <ArrowUp />,
                label: t("withdraw"),
                onClick: () => handleNavigate("withdraw"),
              },
              {
                icon: <Clock />,
                label: t("history"),
                onClick: () => handleNavigate("history"),
              },
              {
                icon: <CreditCard />,
                label: t("bankAccounts"),
                onClick: () => handleNavigate("bank-accounts"),
              },
              {
                icon: <Network />,
                label: t("networks"),
                onClick: () => setIsNetworkDialogOpen(true),
              },
            ]}
            itemsNode={<CurrrencyToggle />}
          />
        }
        value={<EstimatedValueCardContent totalValue={totalValue} />}
      />
      <NetworkDialog
        isOpen={isNetworkDialogOpen}
        onOpenChange={setIsNetworkDialogOpen}
      />
    </>
  );
};

interface EstimatedValueCardContentProps {
  totalValue: {
    vnd: number;
    usd: number;
  } | null;
}

const EstimatedValueCardContent = ({
  totalValue,
}: EstimatedValueCardContentProps) => {
  const { isVNDCurrency } = useWalletVisibilityStore();
  const currencyLabel = isVNDCurrency ? "VND" : "USD";

  const value = useMemo(() => {
    const assetValue = isVNDCurrency
      ? totalValue?.vnd ?? 0
      : totalValue?.usd ?? 0;

    return `${formatVNDCurrency(currencyLabel, assetValue)}`;
  }, [isVNDCurrency, totalValue, currencyLabel]);

  return (
    <CardContent className="p-0 font-bold leading-[125%] text-[24px] sm:text-[28px]">
      {value} <small className="text-[14px]">{currencyLabel}</small>
    </CardContent>
  );
};

export default TotalValueCard;
