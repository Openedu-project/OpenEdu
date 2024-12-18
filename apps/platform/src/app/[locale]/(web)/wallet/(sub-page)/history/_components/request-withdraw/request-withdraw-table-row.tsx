import type { TRequestWithdrawHistory } from '@oe/api/types/wallet';
import { formatDateHourMinute } from '@oe/core/utils/datetime';
import { Button } from '@oe/ui/shadcn/button';
import { TableCell, TableRow } from '@oe/ui/shadcn/table';
import { cn } from '@oe/ui/utils/cn';
import { formatVNDCurrency } from '@oe/ui/utils/format-currency';
import { walletStatusColor } from '@oe/ui/utils/status-color';
import { FileQuestion } from 'lucide-react';
import { memo } from 'react';

const RequestHistoryTableRow = memo(
  ({
    create_at,
    entity,
    request_value,
    status,
    onViewDetails,
  }: { onViewDetails: () => void } & TRequestWithdrawHistory) => {
    const formattedDate = formatDateHourMinute(Number(create_at));
    const currency = entity.currency;
    const formattedValue = formatVNDCurrency(currency, request_value);
    const statusText = status === 'new' ? 'processing' : status;
    const statusClass = walletStatusColor(status);
    const valueClass = cn(
      'text-[16px] leading-[25px]',
      request_value > 0 && 'text-[#2BA830]',
      request_value < 0 && 'text-red-400'
    );

    return (
      <TableRow className="bg-white flex-wrap md:flex-nowrap">
        <TableCell className="w-full md:w-auto">
          <p className="text-[16px] leading-[25px]">{formattedDate}</p>
        </TableCell>
        <TableCell className="w-full md:w-auto">
          <p className="text-[16px] leading-[25px]">{currency}</p>
        </TableCell>
        <TableCell className="w-full md:w-auto">
          <p className={valueClass}>{formattedValue}</p>
        </TableCell>
        <TableCell className="w-full md:w-auto">
          <div className="flex items-center justify-center">
            <p className={cn('text-[14px] leading-[125%] uppercase px-3 py-1 rounded-3xl font-medium', statusClass)}>
              {statusText}
            </p>
          </div>
        </TableCell>
        <TableCell>
          <Button variant="ghost" onClick={onViewDetails}>
            <FileQuestion />
          </Button>
        </TableCell>
      </TableRow>
    );
  }
);

RequestHistoryTableRow.displayName = 'WalletHistoryTableRow';

export default RequestHistoryTableRow;
