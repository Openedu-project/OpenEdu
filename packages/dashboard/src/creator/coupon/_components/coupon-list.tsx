'use client';

import { useDeleteCoupon, usePostCoupon, usePutCoupon } from '@oe/api/hooks/useCoupon';
import { Table } from '@oe/ui/components/table';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useRef, useState } from 'react';

import { useGetOrganizationByDomain } from '@oe/api/hooks/useOrganization';
import type { ICouponItemRes, ICouponPayload } from '@oe/api/types/coupon';
import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import type { HTTPErrorMetadata } from '@oe/api/utils/http-error';
import { formatDateTime } from '@oe/core/utils/datetime';
import type { FilterOption } from '@oe/ui/components/filter-search';
import { formatCurrency } from '@oe/ui/components/input-currency';
import type { ColumnDef, TableRef } from '@oe/ui/components/table';
import { Badge } from '@oe/ui/shadcn/badge';
import { Button } from '@oe/ui/shadcn/button';
import { toast } from '@oe/ui/shadcn/sonner';
import { Pencil, Trash2 } from 'lucide-react';
import ConfirmDeleteCouponModal from './confirm-detele-coupon-modal';
import CouponSuccessModal from './coupon-success-modal';
import FormCouponModal from './form-coupon-modal';

export default function CouponList() {
  const t = useTranslations('coupon');
  const tError = useTranslations('errors');

  const tableRef = useRef<TableRef<ICouponItemRes>>(null);
  const tCouponForm = useTranslations('coupon.couponForm');

  const [selectedItem, setSelectedItem] = useState<ICouponItemRes | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const { triggerPostCoupon, isLoadingPostCoupon } = usePostCoupon();
  const { triggerPutCoupon, isLoadingPutCoupon } = usePutCoupon();
  const { triggerDeleteCoupon } = useDeleteCoupon();
  const { organizationByDomain } = useGetOrganizationByDomain();

  const handleOpenFormModal = useCallback((item: ICouponItemRes | null = null) => {
    setSelectedItem(item);
    setIsCreating(!item);
    setIsFormModalOpen(true);
  }, []);

  const handleCloseFormModal = useCallback(() => {
    setSelectedItem(null);
    setIsCreating(false);
    setIsFormModalOpen(false);
  }, []);

  const handleOpenSuccessModal = useCallback((item: ICouponItemRes | null = null) => {
    setSelectedItem(item);
    setIsSuccessModalOpen(true);
  }, []);

  const handleCloseSuccessModal = useCallback(() => {
    setSelectedItem(null);
    setIsSuccessModalOpen(false);
  }, []);

  const handleOpenDeleteModal = useCallback((item: ICouponItemRes | null = null) => {
    setSelectedItem(item);
    setIsOpenDeleteModal(true);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setSelectedItem(null);
    setIsOpenDeleteModal(false);
  }, []);

  const handleSubmit = useCallback(
    async (value: ICouponPayload) => {
      try {
        const res = await (isCreating ? triggerPostCoupon(value) : triggerPutCoupon({ ...selectedItem, ...value }));
        handleCloseFormModal();
        if (isCreating) {
          handleOpenSuccessModal(res);
        } else {
          toast.success(t('updateSuccess'));
        }
        tableRef.current?.mutate();
      } catch (error) {
        console.error(error);
        toast.error(tError((error as HTTPErrorMetadata).code.toString()));
      }
    },
    [
      handleCloseFormModal,
      t,
      handleOpenSuccessModal,
      tError,
      isCreating,
      triggerPostCoupon,
      triggerPutCoupon,
      selectedItem,
    ]
  );

  const handleDeleteCoupon = useCallback(async () => {
    try {
      await triggerDeleteCoupon({ id: selectedItem?.id ?? '' });
      handleCloseDeleteModal();
      toast.success(t('deleteSuccess'));
      tableRef.current?.mutate();
    } catch (error) {
      console.error(error);
      toast.error(tError((error as HTTPErrorMetadata).code.toString()));
    }
  }, [triggerDeleteCoupon, tError, selectedItem?.id, handleCloseDeleteModal, t]);

  const columns: ColumnDef<ICouponItemRes>[] = useMemo(() => {
    return [
      {
        header: 'No',
        size: 50,
        cell: ({ row, table }) => {
          const pageSize = table.getState().pagination.pageSize;
          const pageIndex = table.getState().pagination.pageIndex;
          return pageIndex * pageSize + row.index + 1;
        },
      },
      {
        header: tCouponForm('name'),
        accessorKey: 'name',
        size: 180,
      },
      {
        header: tCouponForm('couponCode'),
        accessorKey: 'coupon_code',
      },
      {
        header: tCouponForm('discountAmount'),
        accessorKey: 'type',
        size: 180,
        cell: ({ row }) => {
          const rowData = row.original;

          return (
            <p className="flex min-w-[120px] flex-col">
              {rowData.fiat_discount_enabled && <span>Fiat: {rowData.fiat_discount_percentage}%</span>}
              {rowData.crypto_discount_enabled && <span>Token: {rowData.crypto_discount_percentage}%</span>}
            </p>
          );
        },
      },
      {
        header: tCouponForm('quantity'),
        accessorKey: 'maximum_total_usage',
        cell: info => <>{formatCurrency(String(info.getValue()), false)}</>,
      },
      {
        header: tCouponForm('startDate'),
        accessorKey: 'start_date',
        cell: info => <>{formatDateTime(Number(info.getValue()))}</>,
        size: 180,
      },
      {
        header: tCouponForm('endDate'),
        accessorKey: 'end_date',
        cell: info => <>{formatDateTime(Number(info.getValue()))}</>,
        size: 180,
      },
      {
        header: tCouponForm('status'),
        accessorKey: 'is_active',
        cell: info => (
          <Badge
            variant={info.getValue() ? 'success' : 'destructive'}
            className="w-[120px] justify-center py-1 capitalize"
          >
            {info.getValue() ? tCouponForm('active') : tCouponForm('inActive')}
          </Badge>
        ),
      },
      {
        header: 'Actions',
        cell: ({ row }) => {
          return (
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleOpenFormModal(row.original)}
                className="hover:text-blue-600"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleOpenDeleteModal(row.original)}
                className="hover:text-blue-600"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          );
        },
      },
    ];
  }, [tCouponForm, handleOpenDeleteModal, handleOpenFormModal]);

  const filterOptions = useMemo(
    () => [
      {
        id: 'name',
        value: 'name',
        label: tCouponForm('name'),
        type: 'search',
      },
      {
        id: 'code',
        value: 'code',
        label: tCouponForm('code'),
        type: 'search',
      },
    ],
    [tCouponForm]
  ) as FilterOption[];

  return (
    <>
      <Table
        api={API_ENDPOINT.ADMIN_COUPONS}
        apiParams={{
          page: 1,
          per_page: 10,
          sort: 'create_at desc',
        }}
        columns={columns}
        ref={tableRef}
        height="550px"
        border="bordered-rows"
        tableOptions={{
          manualPagination: true,
        }}
        filterOptions={filterOptions}
      >
        <Button onClick={() => handleOpenFormModal()} className="btn btn-primary">
          {t('createCoupon')}
        </Button>
      </Table>

      {isFormModalOpen && (
        <FormCouponModal
          isCreate={isCreating}
          data={selectedItem}
          orgId={organizationByDomain?.id ?? ''}
          onSubmit={handleSubmit}
          onClose={handleCloseFormModal}
          loading={isCreating ? isLoadingPostCoupon : isLoadingPutCoupon}
        />
      )}
      {isSuccessModalOpen && (
        <CouponSuccessModal
          open
          onClose={handleCloseSuccessModal}
          startDate={selectedItem?.start_date ?? 0}
          endDate={selectedItem?.end_date ?? null}
        />
      )}
      {isOpenDeleteModal && (
        <ConfirmDeleteCouponModal
          id={selectedItem?.id ?? ''}
          onSubmit={handleDeleteCoupon}
          onClose={handleCloseDeleteModal}
          open={isOpenDeleteModal}
        />
      )}
    </>
  );
}
