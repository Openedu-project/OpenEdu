import type { THistory } from '@oe/api/types/wallet';
import { formatDateHourMinute } from '@oe/core/utils/datetime';
import { cn } from '@oe/ui/utils/cn';
import { formatVNDCurrency } from '@oe/ui/utils/format-currency';
import { walletStatusColor } from '@oe/ui/utils/status-color';
import { shortenAddress, snakeToSpace } from '@oe/ui/utils/utils';
import { useTranslations } from 'next-intl';

const EarnHistoryCard = ({ history }: { history: THistory }) => {
  const t = useTranslations('earnPage');

  return (
    <div className="bg-card rounded-lg shadow-md p-4 space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold uppercase">{history.currency}</span>
        <span
          className={cn(
            'px-3 py-1 rounded-full text-sm font-medium text-white uppercase',
            walletStatusColor(history.status)
          )}
        >
          {history.status}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-sm text-muted-foreground">{t('date')}</p>
          <p className="text-sm font-medium">{formatDateHourMinute(Number(history.create_at))}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{t('type')}</p>
          <p className="text-sm font-medium capitalize">{snakeToSpace(history.type)}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{t('amount')}</p>
          <p className={cn('text-sm font-medium', history.amount > 0 ? 'text-green-600' : 'text-red-600')}>
            {formatVNDCurrency(history.currency, history.amount)}
          </p>
        </div>
        {history.tx_hash && (
          <div>
            <p className="text-sm text-muted-foreground">{t('transactionHash')}</p>
            <a
              className="text-sm font-medium text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://nearblocks.io/txns/${history.tx_hash}`}
            >
              {shortenAddress(history.tx_hash)}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default EarnHistoryCard;
