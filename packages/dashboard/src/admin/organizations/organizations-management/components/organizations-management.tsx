'use client';

import { useCreateOrganization, useUpdateOrganization } from '@oe/api/hooks/useOrganization';
import type { ICreateOrganizationSchemaType } from '@oe/api/schemas/organization';
import type { IOrganization, IOrganizationPayload } from '@oe/api/types/organizations';
import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import type { HTTPErrorMetadata } from '@oe/api/utils/http-error';
import { formatDate } from '@oe/core/utils/datetime';
import type { FilterOption } from '@oe/ui/components/filter-search';
import { type ColumnDef, Table, type TableRef } from '@oe/ui/components/table';
import { Badge } from '@oe/ui/shadcn/badge';
import { Button } from '@oe/ui/shadcn/button';
import { toast } from '@oe/ui/shadcn/sonner';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useRef, useState } from 'react';
import ChangeStatusOrgModal from './change-status-modal';
import { ViewOrganizationModal } from './view-organization-modal';

export default function OrganizationsManagement() {
  const t = useTranslations('organizationsManagement');
  const tError = useTranslations('errors');

  const tableRef = useRef<TableRef<IOrganization>>(null);

  const [itemSelected, setItemSelected] = useState<IOrganization | null>(null);

  const [isOpenChangeStatusModal, setIsOpenChangeStatusModal] = useState<boolean>(false);
  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);

  const { triggerCreateOrganiation } = useCreateOrganization();
  const { triggerUpdateOrganiation } = useUpdateOrganization(itemSelected?.id ?? '');

  const filterOptions = useMemo(
    () => [
      {
        id: 'name',
        value: 'name',
        label: t('name'),
        type: 'search',
      },
      {
        id: 'domain',
        value: 'domain',
        label: t('organizationURL'),
        type: 'search',
      },
    ],
    [t]
  ) as FilterOption[];

  const handleOpenCreateModal = useCallback(() => {
    setIsOpenCreateModal(true);
  }, []);

  const handleCloseCreateModal = useCallback(() => {
    setIsOpenCreateModal(false);
  }, []);

  const handleOpenChangeStatusModal = useCallback((item: IOrganization) => {
    setItemSelected(item);
    setIsOpenChangeStatusModal(true);
  }, []);

  const handleCloseChangeStatusModal = useCallback(() => {
    setItemSelected(null);
    setIsOpenChangeStatusModal(false);
  }, []);

  const handleOpenEditModal = useCallback((item: IOrganization) => {
    setItemSelected(item);
    setIsOpenEditModal(true);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setItemSelected(null);
    setIsOpenEditModal(false);
  }, []);

  const handleChangeStatus = useCallback(async () => {
    try {
      await triggerUpdateOrganiation({
        name: itemSelected?.name ?? '',
        user_id: itemSelected?.user.id,
        active: !itemSelected?.active,
      });
      await tableRef.current?.mutate();
      handleCloseChangeStatusModal();
      toast.success(t('changeStatusSuccess'));
    } catch (error) {
      console.error(error);
      toast.error(tError((error as HTTPErrorMetadata).code.toString()));
    }
  }, [triggerUpdateOrganiation, itemSelected, t, tError, handleCloseChangeStatusModal]);

  const handleCreateOrganization = useCallback(
    async (value: IOrganizationPayload) => {
      const thumbnail_id = value.thumbnail_id === '' ? null : value.thumbnail_id;

      try {
        await triggerCreateOrganiation({
          email: value.email,
          name: value.name,
          phone: value.phone,
          domain: `${value.domain?.trim()}.${process.env.NEXT_PUBLIC_APP_ROOT_DOMAIN_NAME}`,
          full_name: '',
          thumbnail_id,
        });
        await tableRef.current?.mutate();
        handleCloseCreateModal();
        toast.success(t('createOrganizationSuccess'));
      } catch (error) {
        console.error(error);
        toast.error(tError((error as HTTPErrorMetadata).code.toString()));
      }
    },
    [triggerCreateOrganiation, handleCloseCreateModal, t, tError]
  );

  const handleEditOrganization = useCallback(
    async (value: ICreateOrganizationSchemaType) => {
      const thumbnail_id = value.thumbnail?.id ?? null;

      try {
        await triggerUpdateOrganiation({
          name: value.name,
          thumbnail_id,
          active: itemSelected?.active,
        });

        handleCloseEditModal();
        await tableRef.current?.mutate();
        toast.success(t('editOrganizationSuccess'));
      } catch (error) {
        console.error(error);
        toast.error(tError((error as HTTPErrorMetadata).code.toString()));
      }
    },
    [triggerUpdateOrganiation, itemSelected, t, tError, handleCloseEditModal]
  );

  const columns: ColumnDef<IOrganization>[] = useMemo(
    () => [
      {
        header: t('name'),
        accessorKey: 'name',
        cell: ({ row }) => {
          const item = row.original;
          return (
            <Button variant="link" className="p-0" onClick={() => handleOpenEditModal(item)}>
              {item?.name ?? ''}
            </Button>
          );
        },
      },
      {
        header: t('ownerEmail'),
        accessorKey: 'user',
        cell: ({ row }) => <>{row?.original?.user?.email}</>,
        className: 'max-w-[160px] overflow-x-hidden text-ellipsis',
      },
      {
        header: t('createdDate'),
        accessorKey: 'create_at',
        cell: ({ row }) => <>{formatDate(row?.original?.create_at)}</>,
      },
      {
        header: t('organizationURL'),
        className: 'max-w-[200px] text-ellipsis overflow-hidden whitespace-nowrap',
        cell: ({ row }) => (
          <a
            href={`https://${row?.original.domain}`}
            target="_blank"
            rel="noreferrer"
            className="text-primary underline"
          >
            {t('link')}
          </a>
        ),
      },
      {
        header: t('status'),
        accessorKey: 'active',
        cell: ({ row }) => {
          const item = row.original;
          return (
            <>
              {item.active ? (
                <Badge variant="success"> {t('active')}</Badge>
              ) : (
                <Badge variant="destructive"> {t('deactive')}</Badge>
              )}
            </>
          );
        },
      },
      {
        header: t('action'),
        cell: ({ row }) => {
          const item = row.original;
          const isActive = item.active;

          return (
            <Button
              className="min-w-[102px]"
              variant={isActive ? 'destructive' : 'default'}
              onClick={() => handleOpenChangeStatusModal(item)}
            >
              {isActive ? t('deactivate') : t('activate')}
            </Button>
          );
        },
      },
    ],
    [t, handleOpenEditModal, handleOpenChangeStatusModal]
  );

  return (
    <>
      <Table
        columns={columns}
        api={API_ENDPOINT.ADMIN_ORGANIZATIONS}
        hasNoColumn
        apiQueryParams={{
          page: 1,
          per_page: 10,
          sort: 'create_at desc',
        }}
        height="100%"
        ref={tableRef}
        filterOptions={filterOptions}
        filterSearchProps={{ useQueryParams: true }}
        tableOptions={{
          manualPagination: true,
        }}
      >
        <Button className="flex gap-[12px]" onClick={handleOpenCreateModal}>
          <Plus className="h-4 w-4" /> {t('createOrganization')}
        </Button>
      </Table>
      {isOpenChangeStatusModal && (
        <ChangeStatusOrgModal onSubmit={handleChangeStatus} onClose={handleCloseChangeStatusModal} />
      )}
      {isOpenCreateModal && (
        <ViewOrganizationModal
          isEdit={false}
          onSubmit={value => handleCreateOrganization(value as ICreateOrganizationSchemaType)}
          onClose={handleCloseCreateModal}
          data={null}
        />
      )}
      {isOpenEditModal && (
        <ViewOrganizationModal
          isEdit={true}
          onSubmit={value => handleEditOrganization(value as ICreateOrganizationSchemaType)}
          onClose={handleCloseEditModal}
          data={itemSelected as IOrganization}
        />
      )}
    </>
  );
}
