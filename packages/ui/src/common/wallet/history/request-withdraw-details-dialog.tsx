import type { TRequestWithdrawHistory } from '@oe/api/types/wallet';
import { formatDateHourMinute } from '@oe/core/utils/datetime';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@oe/ui/shadcn/dialog';
import { formatVNDCurrency } from '@oe/ui/utils/format-currency';
import { walletStatusColor } from '@oe/ui/utils/status-color';
import { AlertCircle, Clock, CreditCard, DollarSign, FileText } from 'lucide-react';
import { useTranslations } from 'next-intl';
import HistoryDetailItem from './history-details-item';

export const RequestWithdrawDetailsDialog = ({
  isOpen,
  onClose,
  request,
}: {
  isOpen: boolean;
  onClose: () => void;
  request: TRequestWithdrawHistory;
}) => {
  const t = useTranslations('historyPage.table');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="m-0 font-bold text-2xl">{t('historyDetails')}</DialogTitle>
        </DialogHeader>
        <div className="mt-6 space-y-4">
          <HistoryDetailItem icon={Clock} label={t('date')} value={formatDateHourMinute(Number(request.create_at))} />
          <HistoryDetailItem icon={CreditCard} label={t('currency')} value={request.entity.currency} />
          <HistoryDetailItem
            icon={DollarSign}
            label={t('amount')}
            value={formatVNDCurrency(request.entity.currency, request.request_value)}
          />
          <HistoryDetailItem
            icon={AlertCircle}
            label={t('status')}
            value={request.status === 'new' ? t('processing') : request.status}
            valueClassName={`capitalize p-1 ${walletStatusColor(request.status)}`}
          />
          {request.note && (
            <HistoryDetailItem icon={FileText} label={t('note')} value={request.note} valueClassName="text-sm italic" />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
