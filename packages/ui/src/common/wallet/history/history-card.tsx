import type { THistory } from '@oe/api/types/wallet';
import { formatDateHourMinute } from '@oe/core/utils/datetime';
import { cn } from '@oe/ui/utils/cn';
import { formatVNDCurrency } from '@oe/ui/utils/format-currency';
import { walletStatusColor } from '@oe/ui/utils/status-color';
import { useTranslations } from 'next-intl';
import { memo } from 'react';

export const WalletHistoryCard = memo(
  ({
    history,
    onViewDetails,
  }: {
    history: THistory;
    onViewDetails: () => void;
  }) => {
    const t = useTranslations('historyPage.table');

    return (
      <button
        type="button"
        className="my-3 cursor-pointer space-y-3 rounded-lg bg-card p-4 shadow-md md:hidden w-full text-left"
        onClick={onViewDetails}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            onViewDetails();
          }
        }}
      >
        <div className="flex items-center justify-between">
          <span className="font-semibold text-lg uppercase">{history.currency}</span>
          <span
            className={cn(
              'rounded-full px-3 py-1 font-medium text-sm text-white uppercase',
              walletStatusColor(history.status)
            )}
          >
            {history.status}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-muted-foreground text-sm">{t('date')}</p>
            <p className="font-medium text-sm">{formatDateHourMinute(Number(history.create_at))}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">{t('amount')}</p>
            <p className={cn('font-medium text-sm', history.amount > 0 ? 'text-green-600' : 'text-red-600')}>
              {formatVNDCurrency(history.currency, history.amount)}
            </p>
          </div>
          {history.note && (
            <div>
              <p className="text-muted-foreground text-sm">{t('note')}</p>
              <p className="font-medium text-muted-foreground text-sm leading-none break-all">{history.note}</p>
            </div>
          )}
        </div>
      </button>
    );
  }
);
