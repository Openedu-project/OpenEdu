'use client';

import { useApprove, useReject } from '@oe/api/hooks/useApprovals';
import type { IApproval, IApprovalPayload, IRejectPayload } from '@oe/api/types/approvals';
import type { IBankAccount, IBankAccountSettingValue } from '@oe/api/types/bank-account';
import type { IWalletItem } from '@oe/api/types/wallet';
import { type ColumnDef, Table, type TableRef } from '@oe/ui/components/table';
import { Button } from '@oe/ui/shadcn/button';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useRef, useState } from 'react';

import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import type { HTTPErrorMetadata } from '@oe/api/utils/http-error';
import { formatCurrency } from '@oe/core/utils/currency';
import { formatDate } from '@oe/core/utils/datetime';
import { ImageGallery, type ImageType } from '@oe/ui/components/image-gallery';
import { Badge } from '@oe/ui/shadcn/badge';
import { toast } from '@oe/ui/shadcn/sonner';
import ApprovalWithdrawModal from './approval-withdraw-request-modal';
import RejectWithdrawModal from './reject-withdraw-request-modal';

type BadgeVariant = 'success' | 'destructive' | 'secondary' | 'default' | 'outline' | null | undefined;
type StatusType = 'approved' | 'rejected' | 'cancelled' | 'new';

const generateTransactionStatusColor = (status: string): BadgeVariant => {
  const obj: Record<StatusType, BadgeVariant> = {
    approved: 'success',
    rejected: 'destructive',
    cancelled: 'secondary',
    new: 'outline',
  };

  return obj[status as StatusType];
};

export default function WithdrawRequestList() {
  const t = useTranslations('withdrawal');
  const tError = useTranslations('errors');

  const tableRef = useRef<TableRef<IApproval<IWalletItem, IBankAccountSettingValue<IBankAccount>>>>(null);

  const [isOpenApproveModal, setOpenApproveModal] = useState<boolean>(false);
  const [isOpenRejectModal, setOpenRejectModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<IApproval<
    IWalletItem,
    IBankAccountSettingValue<IBankAccount>
  > | null>(null);

  const { triggerApprove } = useApprove(selectedItem?.id ?? '');
  const { triggerReject } = useReject(selectedItem?.id ?? '');

  const handleOpenApproveModal = useCallback((item: IApproval<IWalletItem, IBankAccountSettingValue<IBankAccount>>) => {
    setSelectedItem({ ...item });
    setOpenApproveModal(true);
  }, []);

  const handleCloseApproveModal = useCallback(() => {
    setSelectedItem(null);
    setOpenApproveModal(false);
  }, []);

  const handleOpenRejectModal = useCallback((item: IApproval<IWalletItem, IBankAccountSettingValue<IBankAccount>>) => {
    setSelectedItem({ ...item });
    setOpenRejectModal(true);
  }, []);

  const handleCloseRejectModal = useCallback(() => {
    setSelectedItem(null);
    setOpenRejectModal(false);
  }, []);

  const columns: ColumnDef<IApproval<IWalletItem, IBankAccountSettingValue<IBankAccount>>>[] = useMemo(
    () => [
      {
        header: t('requester'),
        accessorKey: 'requester.email',
        size: 180,
      },
      {
        header: t('amount'),
        accessorKey: 'request_value',
        size: 180,
        cell: ({ row }) => {
          const item = row.original;
          return (
            <>
              {formatCurrency(Number(item.request_value), {
                currency: item?.entity?.currency,
              })}
            </>
          );
        },
      },
      {
        header: t('currency'),
        accessorKey: 'entity',
        enableSorting: false,
        size: 180,
        cell: ({ row }) => {
          const item = row.original;
          return <>{item?.entity?.currency}</>;
        },
      },
      {
        header: t('status'),
        align: 'center',
        accessorKey: 'status',
        cell: info => (
          <Badge
            variant={generateTransactionStatusColor(info.getValue() as StatusType)}
            className="w-[120px] justify-center py-1 capitalize"
          >
            {String(info.getValue() ?? '')}
          </Badge>
        ),
      },
      {
        header: t('bankName'),
        accessorKey: 'props.setting_value.bank_name',
        size: 180,
        cell: ({ row }) => <>{row?.original?.props?.setting_value?.bank_name}</>,
      },
      {
        header: t('accountName'),
        accessorKey: 'props.setting_value.account_name',
        size: 280,
        cell: ({ row }) => <>{row?.original?.props?.setting_value?.account_name}</>,
      },
      {
        header: t('accountNumber'),
        accessorKey: 'props.setting_value.account_number',
        size: 180,
        cell: ({ row }) => <>{row?.original?.props?.setting_value?.account_number}</>,
      },
      {
        header: t('files'),
        accessorKey: 'files',
        size: 180,
        cell: ({ row }) => {
          const image = row.original.files?.map(item => {
            return {
              src: item.url,
              alt: item.name,
            };
          }) as ImageType[];

          return <ImageGallery images={image} title={t('clickToViewImages')} titleClassName="text-primary" />;
        },
      },
      {
        header: t('requestDate'),
        accessorKey: 'request_date',
        size: 130,
        cell: info => <>{formatDate(Number(info.getValue()))}</>,
      },
      {
        header: t('action'),
        align: 'center',
        sticky: 'right',
        size: 210,
        cell({ row }) {
          const item = row.original;
          if (item.status === 'new') {
            return (
              <div className="flex w-[210px] justify-center gap-2">
                <Button
                  variant="destructive"
                  onClick={() => {
                    handleOpenRejectModal(item);
                  }}
                >
                  {t('reject')}
                </Button>
                <Button
                  variant="default"
                  onClick={() => {
                    handleOpenApproveModal(item);
                  }}
                >
                  {t('approve')}
                </Button>
              </div>
            );
          }

          return <></>;
        },
      },
    ],
    [handleOpenApproveModal, handleOpenRejectModal, t]
  );

  const handleApprove = useCallback(
    async (values: IApprovalPayload) => {
      try {
        await triggerApprove(values);

        await tableRef?.current?.mutate();
        toast.success(t('approveSuccess'));
        handleCloseApproveModal();
      } catch (error) {
        console.error('Error Approve Withdraw', error);
        toast.error(tError((error as HTTPErrorMetadata).code.toString()));
      }
    },
    [handleCloseApproveModal, triggerApprove, t, tError]
  );

  const handleReject = useCallback(
    async (values: IRejectPayload) => {
      try {
        await triggerReject(values);
        await tableRef?.current?.mutate();
        toast.success(t('rejectSuccess'));
        handleCloseRejectModal();
      } catch (error) {
        console.error('Error Approve Withdraw', error);
        toast.error(tError((error as HTTPErrorMetadata).code.toString()));
      }
    },
    [handleCloseRejectModal, triggerReject, t, tError]
  );

  return (
    <>
      <div className="">
        <Table
          columns={columns}
          api={API_ENDPOINT.APPROVALS}
          hasNoColumn
          apiParams={{
            page: 1,
            per_page: 10,
            sort: 'request_date desc',
            type: 'wallet_fiat_withdrawal',
            preloads: 'Files',
          }}
          height="100%"
          ref={tableRef}
          // filterOptions={filterOptions}
          filterSearchProps={{ useQueryParams: true }}
          tableOptions={{
            manualPagination: true,
          }}
        />
      </div>
      {isOpenApproveModal && (
        <ApprovalWithdrawModal
          onClose={handleCloseApproveModal}
          onSubmit={handleApprove}
          selectedItem={selectedItem ?? null}
        />
      )}
      {isOpenRejectModal && (
        <RejectWithdrawModal data={selectedItem} onSubmit={handleReject} onClose={handleCloseRejectModal} />
      )}
    </>
  );
}
