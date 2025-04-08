import type { ITransaction } from '@oe/api/types/wallet';
import { FIAT_CURRENCIES } from '@oe/api/utils/wallet';
import { formatCurrency } from '@oe/core/utils/currency';
import { formatDateTime } from '@oe/core/utils/datetime';
import { Image } from '@oe/ui/components/image';
import { useTranslations } from 'next-intl';
import { Modal } from '#components/modal';
import { StatusTableCell } from '../_components/status-table-cell';

interface FiatTransactionDetailModalProps {
  transaction: ITransaction | null;
  isOpen: boolean;
  onClose: () => void;
}

export const FiatTransactionDetailModal = ({ transaction, isOpen, onClose }: FiatTransactionDetailModalProps) => {
  const t = useTranslations('wallets');

  if (!transaction) {
    return null;
  }

  const amount = Number(transaction.amount) || 0;
  const currency = transaction.currency;

  // Type assertion for files property
  const files = transaction.files as Array<{ url: string }> | null;

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title={t('historyPage.transactionDetails')}
      hasCancelButton={true}
      className="max-w-2xl"
    >
      <div className="space-y-4 p-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500 text-sm">{t('historyPage.table.date')}</p>
            <p className="font-medium">{transaction.create_at ? formatDateTime(Number(transaction.create_at)) : '-'}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">{t('historyPage.table.currency')}</p>
            <div className="flex items-center gap-2">
              {FIAT_CURRENCIES[currency as keyof typeof FIAT_CURRENCIES]?.icon({
                height: 20,
                width: 20,
              })}
              <span className="font-medium">{transaction.currency}</span>
            </div>
          </div>

          <div>
            <p className="text-gray-500 text-sm">{t('historyPage.table.typeOfAction')}</p>
            <p className="font-medium">{t(`type.${transaction.type}`)}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">{t('historyPage.table.amount')}</p>
            <p className={`font-medium ${amount < 0 ? 'text-destructive' : 'text-success'}`}>
              {amount < 0 ? '-' : '+'}
              {formatCurrency(Math.abs(amount), {
                currency: transaction.currency,
              })}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">{t('historyPage.table.status')}</p>
            <StatusTableCell status={transaction.status} />
          </div>

          <div className="col-span-2">
            <p className="text-gray-500 text-sm">{t('historyPage.table.evidence')}</p>
            {files && files.length > 0 && files[0]?.url ? (
              <div className="mt-2">
                <Image
                  src={files[0].url}
                  alt="Transaction evidence"
                  width={300}
                  height={200}
                  className="rounded-md object-cover"
                />
              </div>
            ) : (
              <p className="font-medium">-</p>
            )}
          </div>

          <div className="col-span-2">
            <p className="text-gray-500 text-sm">{t('historyPage.note')}</p>
            <p className="font-medium">{transaction.note || '-'}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};
