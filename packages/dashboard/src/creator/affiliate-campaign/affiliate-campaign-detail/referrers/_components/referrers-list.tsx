'use client';
import { useDeleteReferrer, usePostReferrer } from '@oe/api/hooks/useReferrer';
import type { ICreateReferrersPayload, IReferrerItem } from '@oe/api/types/referrer';
import type { HTTPErrorMetadata } from '@oe/api/utils/http-error';
import { type ColumnDef, Table, type TableRef } from '@oe/ui/components/table';

import { Badge } from '@oe/ui/shadcn/badge';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useCallback, useMemo, useRef, useState } from 'react';

import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import { createAPIUrl } from '@oe/api/utils/fetch';
import { RoleButton } from '@oe/ui/components/role-button';
import { toast } from '@oe/ui/shadcn/sonner';
import AffiliateDeleteReferrerModal from './referrers-detele-modal';
import AffiliateReferrerFormModal from './referrers-form-modal';

export default function ReferrerList() {
  const t = useTranslations('affiliateDetailReferrers');
  const tError = useTranslations('errors');

  const tableRef = useRef<TableRef<IReferrerItem>>(null);
  const [selectedItem, setSelectedItem] = useState<IReferrerItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const { campaignId } = useParams();

  const { triggerPostReferrer } = usePostReferrer();
  const { triggerDeleteReferrer } = useDeleteReferrer();

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleOpenDeleteModal = useCallback((item: IReferrerItem) => {
    setSelectedItem(item);
    setIsOpenDeleteModal(true);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setSelectedItem(null);
    setIsOpenDeleteModal(false);
  }, []);

  const handleSubmit = useCallback(
    async (referrers: ICreateReferrersPayload['referrers']) => {
      try {
        await triggerPostReferrer({
          campaign_id: campaignId as string,
          referrers,
        });
        await tableRef.current?.mutate();
        handleCloseModal();
        toast.success(t('createSuccess'));
      } catch (error) {
        console.error(error);
        toast.error(tError((error as HTTPErrorMetadata).code.toString()));
      }
    },
    [campaignId, handleCloseModal, t, tError, triggerPostReferrer]
  );

  const handleDeleteReferrer = useCallback(async () => {
    try {
      await triggerDeleteReferrer({
        ids: selectedItem ? [selectedItem.id] : [],
        campaign_id: campaignId as string,
      });
      await tableRef.current?.mutate();
      handleCloseDeleteModal();
      toast.success(t('deleteSuccess'));
    } catch (error) {
      console.error(error);
      toast.error(tError((error as HTTPErrorMetadata).code.toString()));
    }
  }, [campaignId, handleCloseDeleteModal, t, tError, triggerDeleteReferrer, selectedItem]);

  const columns: ColumnDef<IReferrerItem>[] = useMemo(
    () => [
      {
        header: t('email'),
        accessorKey: 'email',
        size: 200,
      },
      {
        header: t('type'),
        accessorKey: 'type',
        cell: info => <>{info.getValue() === 'kol' ? t('partner') : t(info.getValue())}</>,
      },
      {
        header: t('status'),
        align: 'center',
        accessorKey: 'invite_status',
        cell: info => (
          <Badge
            variant={info.getValue() === 'pending' ? 'default' : 'success'}
            className="w-[120px] justify-center py-1 capitalize"
          >
            {info.getValue() === 'pending' ? t('pending') : t('accept')}
          </Badge>
        ),
      },
      {
        header: t('action'),
        align: 'center',
        cell: ({ row }) => {
          const item = row.original;
          return (
            <RoleButton
              action="delete"
              variant="destructive"
              className="min-w-[100px]"
              onClick={() => handleOpenDeleteModal(item)}
            >
              {t('delete')}
            </RoleButton>
          );
        },
      },
    ],
    [handleOpenDeleteModal, t]
  );

  return (
    <>
      <div className="mb-4 flex justify-end">
        <RoleButton action="create" onClick={handleOpenModal} className="btn btn-primary">
          {t('addReferrers')}
        </RoleButton>
      </div>

      <Table
        api={createAPIUrl({
          endpoint: API_ENDPOINT.AFFILIATE_CAMPAIGNS_ID_REFERRERS,
          params: { id: campaignId },
        })}
        apiQueryParams={{
          page: 1,
          per_page: 10,
          sort: 'create_at desc',
        }}
        columns={columns}
        ref={tableRef}
        hasNoColumn
        height="550px"
        border="bordered-rows"
        tableOptions={{
          manualPagination: true,
        }}
      />
      {isModalOpen && <AffiliateReferrerFormModal onSubmit={handleSubmit} onClose={handleCloseModal} />}

      {isOpenDeleteModal && (
        <AffiliateDeleteReferrerModal
          open={isOpenDeleteModal}
          id={selectedItem?.id || ''}
          onSubmit={handleDeleteReferrer}
          onClose={handleCloseDeleteModal}
        />
      )}
    </>
  );
}
