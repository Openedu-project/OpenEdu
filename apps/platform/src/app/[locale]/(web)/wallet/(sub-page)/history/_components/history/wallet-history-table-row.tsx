import type { THistory } from '@oe/api/types/wallet';
import { ASSET_TYPES, type TAssetType } from '@oe/api/utils/wallet';
import { formatDateHourMinute } from '@oe/core/utils/datetime';
import { Button } from '@oe/ui/shadcn/button';
import { TableCell, TableRow } from '@oe/ui/shadcn/table';
import { cn } from '@oe/ui/utils/cn';
import { formatVNDCurrency } from '@oe/ui/utils/format-currency';
import { walletStatusColor } from '@oe/ui/utils/status-color';
import { shortenAddress, snakeToSpace } from '@oe/ui/utils/utils';
import { FileQuestion } from 'lucide-react';
import { getExplorerLink } from '../../../../_utils/utils';

interface WalletHistoryTableRowProps {
  type: TAssetType;
  history: THistory;
}

const WalletHistoryTableRow = ({
  type,
  history,
  onViewDetails,
}: { onViewDetails: () => void } & WalletHistoryTableRowProps) => (
  <TableRow className="bg-white flex-wrap md:flex-nowrap">
    <TableCell className="w-full md:w-auto">
      <p className="text-[16px] leading-[25px]">{formatDateHourMinute(Number(history.create_at))}</p>
    </TableCell>
    <TableCell className="w-full md:w-auto">
      <p className="text-[16px] leading-[25px]">{history.currency}</p>
    </TableCell>
    <TableCell className="w-full md:w-auto">
      <p className="text-[16px] leading-[25px] capitalize">{snakeToSpace(history.type)}</p>
    </TableCell>
    <TableCell className="w-full md:w-auto">
      <p
        className={cn(
          'text-[16px] leading-[25px]',
          history.amount > 0 && 'text-[#2BA830]',
          history.amount < 0 && 'text-red-400'
        )}
      >
        {formatVNDCurrency(history.currency, history.amount)}
      </p>
    </TableCell>

    {type === ASSET_TYPES.CRYPTO && (
      <TableCell className="w-full md:w-auto">
        <a
          className="text-[16px] leading-[25px] underline"
          target="_blank"
          href={getExplorerLink(history.network, 'transaction', history.tx_hash || '')}
          rel="noreferrer"
        >
          {history.tx_hash ? shortenAddress(history.tx_hash) : ''}
        </a>
      </TableCell>
    )}

    <TableCell className="w-full md:w-auto">
      <div className="flex items-center justify-center">
        <p
          className={cn(
            'text-[14px] leading-[125%] uppercase px-3 py-1 rounded-3xl font-medium',
            walletStatusColor(history.status)
          )}
        >
          {history.status}
        </p>
      </div>
    </TableCell>

    <TableCell>
      <Button variant="ghost" onClick={() => onViewDetails()}>
        <FileQuestion />
      </Button>
    </TableCell>
  </TableRow>
);

export default WalletHistoryTableRow;
