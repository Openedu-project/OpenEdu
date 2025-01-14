import type { THistory } from '@oe/api/types/wallet';
import { formatDateHourMinute } from '@oe/core/utils/datetime';
import { Image } from '@oe/ui/components/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@oe/ui/shadcn/dialog';
import { formatVNDCurrency } from '@oe/ui/utils/format-currency';
import { walletStatusColor } from '@oe/ui/utils/status-color';
import { snakeToSpace } from '@oe/ui/utils/utils';
import {
  AlertCircle,
  Clock,
  CreditCard,
  DollarSign,
  ExternalLink,
  FileText,
  Globe,
  Hash,
  ImageIcon,
  Tag,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { getExplorerLink } from '#utils/wallet';
import HistoryDetailItem from './history-details-item';
interface HistoryDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  history: THistory;
}

export default function WalletHistoryDetailsDialog({
  isOpen,
  onClose,
  history: { create_at, currency, amount, type, status, note, files, tx_hash, network },
}: HistoryDetailsDialogProps) {
  const tHistoryPageTable = useTranslations('historyPage.table');
  const hasImage = files && files.length > 0 && files[0]?.url;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold m-0">{tHistoryPageTable('historyDetails')}</DialogTitle>
        </DialogHeader>
        <div className="mt-6 space-y-4 w-full">
          <HistoryDetailItem
            icon={Clock}
            label={tHistoryPageTable('date')}
            value={formatDateHourMinute(Number(create_at))}
          />
          <HistoryDetailItem icon={CreditCard} label={tHistoryPageTable('currency')} value={currency} />
          <HistoryDetailItem
            icon={Tag}
            label={tHistoryPageTable('type')}
            value={snakeToSpace(type)}
            valueClassName="capitalize"
          />
          <HistoryDetailItem
            icon={DollarSign}
            label={tHistoryPageTable('amount')}
            value={formatVNDCurrency(currency, amount)}
          />
          <HistoryDetailItem
            icon={AlertCircle}
            label={tHistoryPageTable('status')}
            value={status === 'new' ? tHistoryPageTable('processing') : status}
            valueClassName={`capitalize p-1 ${walletStatusColor(status)}`}
          />
          {network !== '' && (
            <HistoryDetailItem
              icon={Globe}
              label={tHistoryPageTable('network')}
              value={network}
              valueClassName="capitalize"
            />
          )}
          {tx_hash && (
            <HistoryDetailItem
              icon={Hash}
              label={tHistoryPageTable('txHash')}
              value={
                <a
                  className="text-[16px] leading-[25px] underline"
                  target="_blank"
                  href={getExplorerLink(network, 'transaction', tx_hash)}
                  rel="noreferrer"
                >
                  {tx_hash}
                </a>
              }
              valueClassName="text-sm break-all"
            />
          )}
          {note && <HistoryDetailItem icon={FileText} label={tHistoryPageTable('note')} value={note} />}
          {hasImage && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <ImageIcon className="h-5 w-5 text-muted-foreground" />
                <p className="text-sm font-medium leading-none text-muted-foreground">{tHistoryPageTable('image')}</p>
              </div>
              <div className="relative w-full overflow-hidden rounded-md bg-gray-100 aspect-auto min-h-[20rem]">
                <Image
                  src={files[0]?.url || ''}
                  alt="Withdrawal receipt"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-contain transition-all hover:scale-105"
                />
                <a
                  className="absolute inset-0 flex justify-center items-center hover:bg-white hover:opacity-50 transition-all group"
                  target="_blank"
                  href={files[0]?.url || ''}
                  rel="noreferrer"
                >
                  <ExternalLink className="text-black opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
