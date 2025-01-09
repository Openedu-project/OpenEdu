"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@oe/ui/shadcn/table";
import { useTranslations } from "next-intl";
import { memo, useMemo } from "react";
import AssetListTableRow from "./asset-list-table-row";
import { useWalletVisibilityStore } from "../stores/wallet-visibility-store";
import { useAssetList } from "../hooks/useAssetList";
import TableRowSkeleton from "../shared/table-row-skeleton";

const TableHeadCurrency = memo(() => {
  const currencyType = useWalletVisibilityStore((state) => state.isVNDCurrency);
  const t = useTranslations("walletPage");
  return (
    <TableHead className="w-1/4">
      {t("value")} ({currencyType ? "VND" : "USD"})
    </TableHead>
  );
});

TableHeadCurrency.displayName = "TableHeadCurrency";

const AssetListTableHeader = memo(() => {
  const t = useTranslations("walletPage");
  return (
    <TableHeader className="border-b">
      <TableRow>
        <TableHead className="w-1/4">{t("typeOfCurrency")}</TableHead>
        <TableHead className="w-1/4">{t("amount")}</TableHead>
        <TableHeadCurrency />
        <TableHead className="w-1/4 text-right">{t("action")}</TableHead>
      </TableRow>
    </TableHeader>
  );
});

AssetListTableHeader.displayName = "AssetListTableHeader";

const EmptyState = memo(() => {
  const t = useTranslations("walletPage");
  return (
    <TableRow>
      <TableCell colSpan={4} className="py-4 text-center">
        {t("noData")}
      </TableCell>
    </TableRow>
  );
});

EmptyState.displayName = "EmptyState";

const AssetListTableRows = memo(() => {
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

  const filteredFiatAssets = useMemo(() => {
    if (!fiatAssets) return [];
    return fiatAssets.filter((item) => !hideZeroAmount || item.value >= 1);
  }, [fiatAssets, hideZeroAmount]);

  const filteredNearAssets = useMemo(() => {
    if (!nearEcosystemAssets) return [];
    return nearEcosystemAssets.filter(
      (item) => !hideZeroAmount || item.value >= 1
    );
  }, [nearEcosystemAssets, hideZeroAmount]);

  return (
    <>
      {/* 1. Fiat Assets */}
      {isLoadingFiat ? (
        <TableRowSkeleton rowCount={2} />
      ) : (
        filteredFiatAssets.map((item) => (
          <AssetListTableRow key={item.symbol} item={item} />
        ))
      )}

      {/* 2. Near Ecosystem Assets */}
      {isLoadingNear ? (
        <TableRowSkeleton rowCount={3} />
      ) : (
        filteredNearAssets.map((item) => (
          <AssetListTableRow key={item.symbol} item={item} />
        ))
      )}

      {/* 3. Avail Asset */}
      {isLoadingAvail ? (
        <TableRowSkeleton rowCount={1} />
      ) : (
        availAsset &&
        (!hideZeroAmount || availAsset.value >= 1) && (
          <AssetListTableRow item={availAsset} />
        )
      )}
    </>
  );
});

AssetListTableRows.displayName = "AssetListTableRows";

const AssetListTable = memo(() => (
  <div className="hidden overflow-x-auto sm:block">
    <Table className="w-full">
      <AssetListTableHeader />
      <TableBody>
        <AssetListTableRows />
      </TableBody>
    </Table>
  </div>
));

AssetListTable.displayName = "AssetListTable";

export default AssetListTable;
