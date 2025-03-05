'use client';

import {
  useDeleteAffiliateCampaign,
  usePostAffiliateCampaign,
  usePutAffiliateCampaign,
} from '@oe/api/hooks/useAffiliateCampaign';
import type { IAffiliateCampaignItem, IAffiliateCampaignPayload } from '@oe/api/types/affiliate-campaign';
import { type ColumnDef, Table, type TableRef } from '@oe/ui/components/table';

import { Badge } from '@oe/ui/shadcn/badge';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useRef, useState } from 'react';

import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import { createAPIUrl } from '@oe/api/utils/fetch';
import type { HTTPErrorMetadata } from '@oe/api/utils/http-error';
import { formatDateTime } from '@oe/core/utils/datetime';
import { CREATOR_ROUTES } from '@oe/core/utils/routes';
import { Link } from '@oe/ui/common/navigation';
import type { FilterOption } from '@oe/ui/components/filter-search';
import { RoleButton } from '@oe/ui/components/role-button';
import { toast } from '@oe/ui/shadcn/sonner';
import DeleteAffiliateCampaignModal from './affiliate-campaign-detele-modal';
import FormAffiliateCampaignModal from './affiliate-campaign-form-modal';

export default function AffiliateCampaignList() {
  const t = useTranslations('affiliateCampaign');
  const tError = useTranslations('errors');

  const tableRef = useRef<TableRef<IAffiliateCampaignItem>>(null);
  const [selectedItem, setSelectedItem] = useState<IAffiliateCampaignItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const { triggerPostAffiliateCampaign, isLoadingPostAffiliateCampaign } = usePostAffiliateCampaign();
  const { triggerPutAffiliateCampaign, isLoadingPutAffiliateCampaign } = usePutAffiliateCampaign(
    selectedItem?.id ?? ''
  );
  const { triggerDeleteAffiliateCampaign, isLoadingDeleteAffiliateCampaign } = useDeleteAffiliateCampaign(
    selectedItem?.id ?? ''
  );

  const handleOpenModal = useCallback((item: IAffiliateCampaignItem | null = null) => {
    setSelectedItem(item);
    setIsCreating(!item);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedItem(null);
    setIsCreating(false);
    setIsModalOpen(false);
  }, []);

  const handleOpenDeleteModal = useCallback((item: IAffiliateCampaignItem | null = null) => {
    setSelectedItem(item);
    setIsOpenDeleteModal(true);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setSelectedItem(null);
    setIsOpenDeleteModal(false);
  }, []);

  const handleSubmit = useCallback(
    async (value: IAffiliateCampaignPayload) => {
      try {
        await (isCreating
          ? triggerPostAffiliateCampaign(value)
          : triggerPutAffiliateCampaign({ ...selectedItem, ...value }));
        await tableRef.current?.mutate();
        handleCloseModal();
        toast.success(t('success'));
        setIsCreating(false);
      } catch (error) {
        console.error(error);
        setIsCreating(false);
        toast.error(tError((error as HTTPErrorMetadata).code.toString()));
      }
    },
    [handleCloseModal, isCreating, selectedItem, t, tError, triggerPostAffiliateCampaign, triggerPutAffiliateCampaign]
  );

  const handleDeleteAffiliateCampaign = useCallback(async () => {
    try {
      await triggerDeleteAffiliateCampaign({ id: selectedItem?.id ?? '' });
      await tableRef.current?.mutate();
      handleCloseDeleteModal();
      toast.success(t('deleteSuccess'));
    } catch (error) {
      console.error(error);
      toast.error(tError((error as HTTPErrorMetadata).code.toString()));
    }
  }, [handleCloseDeleteModal, t, tError, triggerDeleteAffiliateCampaign, selectedItem?.id]);

  const columns: ColumnDef<IAffiliateCampaignItem>[] = useMemo(
    () => [
      {
        header: t('name'),
        accessorKey: 'name',
        align: 'left',
        size: 250,
        cell: ({ row }) => {
          const item = row.original;
          return (
            <Link
              href={createAPIUrl({
                endpoint: CREATOR_ROUTES.campaignDetailCourses,
                params: { id: item?.id },
              })}
              className="min-w-[250px] justify-start truncate text-primary"
            >
              {item?.name}
            </Link>
          );
        },
      },
      {
        header: t('startDate'),
        align: 'center',
        accessorKey: 'start_date',
        size: 250,
        cell: info => <>{info.getValue() ? formatDateTime(Number(info.getValue())) : ''}</>,
      },
      {
        header: t('endDate'),
        align: 'center',
        accessorKey: 'end_date',
        size: 250,
        cell: info => <>{info.getValue() ? formatDateTime(Number(info.getValue())) : ''}</>,
      },
      {
        header: t('status'),
        align: 'center',
        accessorKey: 'enable',
        cell: info => (
          <Badge
            variant={info.getValue() ? 'success' : 'destructive'}
            className="w-[120px] justify-center py-1 capitalize"
          >
            {info.getValue() ? t('active') : t('inactive')}
          </Badge>
        ),
      },
      {
        header: t('action'),
        align: 'center',
        size: 240,
        cell({ row }) {
          const item = row.original;
          return (
            <div className="flex gap-2">
              <RoleButton
                action="delete"
                variant="destructive"
                className="min-w-[100px]"
                loading={isLoadingDeleteAffiliateCampaign}
                onClick={() => handleOpenDeleteModal(item)}
              >
                {t('delete')}
              </RoleButton>
              <RoleButton
                action="update"
                variant="default"
                className="min-w-[100px]"
                onClick={() => handleOpenModal(item)}
              >
                {t('edit')}
              </RoleButton>
            </div>
          );
        },
      },
    ],
    [t, handleOpenDeleteModal, handleOpenModal, isLoadingDeleteAffiliateCampaign]
  );
  const filterOptions = useMemo(
    () => [
      {
        id: 'name',
        value: 'name',
        label: t('name'),
        type: 'search',
      },
    ],
    [t]
  ) as FilterOption[];
  return (
    <>
      <Table
        api={API_ENDPOINT.AFFILIATE_CAMPAIGNS}
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
        filterOptions={filterOptions}
      >
        <RoleButton action="create" onClick={() => handleOpenModal()} className="btn btn-primary">
          {t('createCampaign')}
        </RoleButton>
      </Table>
      {isModalOpen && (
        <FormAffiliateCampaignModal
          isCreate={isCreating}
          data={selectedItem}
          onSubmit={handleSubmit}
          onClose={handleCloseModal}
          loading={isCreating ? isLoadingPostAffiliateCampaign : isLoadingPutAffiliateCampaign}
        />
      )}
      {isOpenDeleteModal && (
        <DeleteAffiliateCampaignModal
          open={isOpenDeleteModal}
          id={selectedItem?.id ?? ''}
          onSubmit={handleDeleteAffiliateCampaign}
          onClose={handleCloseDeleteModal}
        />
      )}
    </>
  );
}
