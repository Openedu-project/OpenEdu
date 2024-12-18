import { ASSET_TYPES } from '@oe/api/utils/wallet';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@oe/ui/shadcn/table';
import { useTranslations } from 'next-intl';
import { memo, useMemo } from 'react';
import { assetList as selectAssetList, useWalletDataStore } from '../../_store/useWalletDataStore';
import { isHiddenZeroAmount, isVNDCurrency, useWalletVisibilityStore } from '../../_store/useWalletVisibilityStore';
import AssetListTableRow from './asset-list-table-row';

const TableHeadCurrency = memo(() => {
  const currencyType = useWalletVisibilityStore(isVNDCurrency);
  const t = useTranslations('walletPage');
  return (
    <TableHead className="w-1/4">
      {t('value')} ({currencyType ? 'VND' : 'USD'})
    </TableHead>
  );
});

TableHeadCurrency.displayName = 'TableHeadCurrency';

const AssetListTableHeader = memo(() => {
  const t = useTranslations('walletPage');
  return (
    <TableHeader className="border-b">
      <TableRow>
        <TableHead className="w-1/4">{t('typeOfCurrency')}</TableHead>
        <TableHead className="w-1/4">{t('amount')}</TableHead>
        <TableHeadCurrency />
        <TableHead className="w-1/4 text-right">{t('action')}</TableHead>
      </TableRow>
    </TableHeader>
  );
});

AssetListTableHeader.displayName = 'AssetListTableHeader';

const EmptyState = memo(() => {
  const t = useTranslations('walletPage');
  return (
    <TableRow>
      <TableCell colSpan={4} className="py-4 text-center">
        {t('noData')}
      </TableCell>
    </TableRow>
  );
});

EmptyState.displayName = 'EmptyState';

const AssetListTableBody = memo(() => {
  const hideZeroAmount = useWalletVisibilityStore(isHiddenZeroAmount);
  // Sử dụng selector có sẵn từ store
  const rawAssetList = useWalletDataStore(selectAssetList);

  const filteredAssetList = useMemo(() => {
    if (!rawAssetList) {
      return [];
    }

    return rawAssetList
      .filter(item => item.type !== ASSET_TYPES.POINT)
      .filter(item => !hideZeroAmount || item.value >= 1);
  }, [rawAssetList, hideZeroAmount]);

  if (filteredAssetList.length === 0) {
    return (
      <TableBody>
        <EmptyState />
      </TableBody>
    );
  }

  return (
    <TableBody>
      {filteredAssetList.map(item => (
        <AssetListTableRow key={item.symbol} item={item} />
      ))}
    </TableBody>
  );
});

AssetListTableBody.displayName = 'AssetListTableBody';

const AssetListTable = memo(() => (
  <div className="hidden overflow-x-auto sm:block">
    <Table className="w-full">
      <AssetListTableHeader />
      <AssetListTableBody />
    </Table>
  </div>
));

AssetListTable.displayName = 'AssetListTable';

export default AssetListTable;
