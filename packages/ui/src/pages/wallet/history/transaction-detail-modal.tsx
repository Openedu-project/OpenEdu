import type { ITransaction } from '@oe/api';
import { CRYPTO_CURRENCIES } from '@oe/api';
import { formatCurrency } from '@oe/core';
import { formatDateTime } from '@oe/core';
import { useTranslations } from 'next-intl';
import { Modal } from '#components/modal';
import { shortenAddress } from '#utils/crypto';
import { StatusTableCell } from '../_components/status-table-cell';

interface TransactionDetailModalProps {
  transaction: ITransaction | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TransactionDetailModal = ({ transaction, isOpen, onClose }: TransactionDetailModalProps) => {
  const t = useTranslations('wallets');

  if (!transaction) {
    return null;
  }

  const amount = Number(transaction.amount) || 0;
  const currency = transaction.currency;
  const explorerUrl = CRYPTO_CURRENCIES[currency as keyof typeof CRYPTO_CURRENCIES]?.explorerTx;

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
            <p className="text-gray-500 text-sm">{t('historyPage.token')}</p>
            <div className="flex items-center gap-2">
              {CRYPTO_CURRENCIES[currency as keyof typeof CRYPTO_CURRENCIES]?.icon({
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
                showSymbol: false,
                decimals: 2,
              })}
            </p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">{t('historyPage.table.status')}</p>
            <StatusTableCell status={transaction.status} />
          </div>

          <div>
            <p className="text-gray-500 text-sm">{t('historyPage.network')}</p>
            <p className="font-medium">{CRYPTO_CURRENCIES[currency as keyof typeof CRYPTO_CURRENCIES]?.name || '-'}</p>
          </div>

          <div className="col-span-2">
            <p className="text-gray-500 text-sm">{t('historyPage.table.txHash')}</p>
            {transaction.tx_hash && explorerUrl ? (
              <a
                className="font-medium text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
                href={`${explorerUrl}/${transaction.tx_hash}`}
              >
                {shortenAddress(transaction.tx_hash)}
              </a>
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
