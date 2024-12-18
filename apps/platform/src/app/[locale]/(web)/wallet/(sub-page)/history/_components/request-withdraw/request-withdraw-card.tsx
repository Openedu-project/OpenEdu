import type { TRequestWithdrawHistory } from '@oe/api/types/wallet';
import { formatDateHourMinute } from '@oe/core/utils/datetime';
import { cn } from '@oe/ui/utils/cn';
import { formatVNDCurrency } from '@oe/ui/utils/format-currency';
import { walletStatusColor } from '@oe/ui/utils/status-color';
import { useTranslations } from 'next-intl';

export const RequestWithdrawCard = ({
  request,
  onViewDetails,
}: {
  request: TRequestWithdrawHistory;
  onViewDetails: () => void;
}) => {
  const t = useTranslations('historyPage.table');

  return (
    <button
      type="button"
      className="mb-4 w-full space-y-3 rounded-lg bg-card p-4 shadow-md md:hidden text-left"
      onClick={onViewDetails}
    >
      <div className="flex items-center justify-between">
        <span className="font-semibold text-lg uppercase">{request.entity.currency}</span>
        <span
          className={cn(
            'rounded-full px-3 py-1 font-medium text-sm text-white uppercase',
            walletStatusColor(request.status)
          )}
        >
          {request.status === 'new' ? t('processing') : request.status}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-muted-foreground text-sm">{t('date')}</p>
          <p className="font-medium text-sm">{formatDateHourMinute(Number(request.create_at))}</p>
        </div>
        <div>
          <p className="text-muted-foreground text-sm">{t('amount')}</p>
          <p className={cn('font-medium text-sm', request.request_value > 0 ? 'text-green-600' : 'text-red-600')}>
            {formatVNDCurrency(request.entity.currency, request.request_value)}
          </p>
        </div>
      </div>
    </button>
  );
};
