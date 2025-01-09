"use client";

import type { TAssetList } from "@oe/api/types/wallet";
import { ASSET_TYPES } from "@oe/api/utils/wallet";
import { Link } from "@oe/ui/common/navigation";
import { Button } from "@oe/ui/shadcn/button";
import { cn } from "@oe/ui/utils/cn";
import { formatVNDCurrency } from "@oe/ui/utils/format-currency";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useTranslations } from "next-intl";
// biome-ignore lint/nursery/noRestrictedImports: <explanation>
import Image from "next/image";
import { memo, useMemo } from "react";
import { useWalletVisibilityStore } from "../stores/wallet-visibility-store";
import { CURRENCY_LOGOS } from "#utils/wallet";
import { useAssetList } from "../hooks/useAssetList";

const AssetCardItem = memo(({ item }: { item: TAssetList }) => {
  const currencyType = useWalletVisibilityStore((state) => state.isVNDCurrency);
  const currencyLabel = currencyType ? "VND" : "USD";
  const t = useTranslations("walletPage");

  return (
    <div
      className={cn(
        "rounded-lg p-4 shadow",
        item.type === ASSET_TYPES.FIAT ? "bg-[#E1F7E2]" : "bg-white"
      )}
    >
      <div className="mb-2 flex items-center gap-3">
        <Image
          src={CURRENCY_LOGOS[item.symbol]?.src ?? ""}
          width={24}
          height={24}
          alt={`${item.symbol} logo`}
        />
        <div>
          <span className="font-semibold text-lg">{item.symbol}</span>
          <span className="block text-sm capitalize">{item.type}</span>
        </div>
      </div>
      <div className="mb-4 grid grid-cols-2 gap-2">
        <div>
          <p className="text-gray-500 text-sm">{t("amount")}</p>
          <p className="font-medium">
            {formatVNDCurrency(item.symbol, item.amount)}
          </p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">
            {t("value")} ({currencyLabel})
          </p>
          <p className="font-medium">
            {item.exchangeValue
              ? currencyType
                ? formatVNDCurrency("VND", item.exchangeValue.vnd)
                : formatVNDCurrency("USD", item.exchangeValue.usd)
              : null}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {item.type === ASSET_TYPES.FIAT && (
          <Link href="/wallet/withdraw?type=fiat" className="p-0">
            <Button variant="outline" className="w-full text-[#5055D7]">
              {t("requestWithdraw")}
            </Button>
          </Link>
        )}
        {item.type === ASSET_TYPES.TOKEN && (
          <>
            <Link href="/wallet/deposit" className="p-0">
              <Button variant="outline" className="w-full text-[#33C639]">
                <ArrowDown className="mr-1 h-4 w-4" />
                {t("deposit")}
              </Button>
            </Link>

            <Link href="/wallet/withdraw" className="p-0">
              <Button variant="outline" className="w-full text-[#5055D7]">
                <ArrowUp className="mr-1 h-4 w-4" />
                {t("withdraw")}
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
});

AssetCardItem.displayName = "AssetCardItem";

const EmptyState = memo(() => {
  const t = useTranslations("walletPage");
  return <div className="py-4 text-center">{t("noData")}</div>;
});

EmptyState.displayName = "EmptyState";

const AssetListCards = memo(() => {
  const hideZeroAmount = useWalletVisibilityStore(
    (state) => state.isHiddenZeroAmount
  );
  const {
    fiatAssets,
    nearEcosystemAssets,
    availAsset,
    isLoadingFiat,
    isLoadingNear,
    isLoadingAvail,
  } = useAssetList();

  // Filter fiat assets
  const filteredFiatAssets = useMemo(() => {
    if (!fiatAssets) return [];
    return fiatAssets.filter((item) => !hideZeroAmount || item.value >= 1);
  }, [fiatAssets, hideZeroAmount]);

  // Filter near ecosystem assets
  const filteredNearAssets = useMemo(() => {
    if (!nearEcosystemAssets) return [];
    return nearEcosystemAssets
      .filter((item) => item.type !== ASSET_TYPES.POINT)
      .filter((item) => !hideZeroAmount || item.value >= 1);
  }, [nearEcosystemAssets, hideZeroAmount]);

  // Show full skeleton when everything is loading
  if (isLoadingFiat && isLoadingNear && isLoadingAvail) {
    return (
      <div className="space-y-4 sm:hidden">
        {[1, 2, 3].map((i) => (
          <AssetCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Show empty state when no assets and nothing is loading
  const showEmptyState =
    !isLoadingFiat &&
    !isLoadingNear &&
    !isLoadingAvail &&
    filteredFiatAssets.length === 0 &&
    filteredNearAssets.length === 0 &&
    !availAsset;

  if (showEmptyState) {
    return (
      <div className="sm:hidden">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:hidden">
      {/* Render Fiat Assets */}
      {!isLoadingFiat &&
        filteredFiatAssets.map((item) => (
          <AssetCardItem key={item.symbol} item={item} />
        ))}

      {/* Loading State for Near Ecosystem */}
      {isLoadingNear && <AssetCardSkeleton />}

      {/* Render Near Ecosystem Assets */}
      {!isLoadingNear &&
        filteredNearAssets.map((item) => (
          <AssetCardItem key={item.symbol} item={item} />
        ))}

      {/* Loading State for Avail */}
      {isLoadingAvail && <AssetCardSkeleton />}

      {/* Render Avail Asset */}
      {!isLoadingAvail &&
        availAsset &&
        (!hideZeroAmount || availAsset.value >= 1) && (
          <AssetCardItem item={availAsset} />
        )}
    </div>
  );
});
AssetListCards.displayName = "AssetListCards";

const AssetCardSkeleton = () => (
  <div className="rounded-lg p-4 shadow bg-white animate-pulse">
    <div className="mb-2 flex items-center gap-3">
      <div className="h-6 w-6 rounded-full bg-gray-200" />
      <div>
        <div className="h-5 w-16 bg-gray-200 rounded mb-1" />
        <div className="h-4 w-12 bg-gray-200 rounded" />
      </div>
    </div>
    <div className="mb-4 grid grid-cols-2 gap-2">
      <div>
        <div className="h-4 w-14 bg-gray-200 rounded mb-1" />
        <div className="h-5 w-20 bg-gray-200 rounded" />
      </div>
      <div>
        <div className="h-4 w-14 bg-gray-200 rounded mb-1" />
        <div className="h-5 w-20 bg-gray-200 rounded" />
      </div>
    </div>
    <div className="flex flex-col gap-2">
      <div className="h-9 w-full bg-gray-200 rounded" />
      <div className="h-9 w-full bg-gray-200 rounded" />
    </div>
  </div>
);

export default AssetListCards;
