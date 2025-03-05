'use client';

import { useCreateCreator, useDeleteCreator, useInviteCreators } from '@oe/api/hooks/useCreator';
import { type ColumnDef, Table, type TableRef } from '@oe/ui/components/table';
import { Button } from '@oe/ui/shadcn/button';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useRef, useState } from 'react';

import { useGetUserInvitationsList } from '@oe/api/hooks/useUser';
import type { ICreator, ICreatorPayload, IInviteCreatorPayload } from '@oe/api/types/creators';
import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import type { HTTPErrorMetadata } from '@oe/api/utils/http-error';
import { formatDate } from '@oe/core/utils/datetime';
import type { FilterOption } from '@oe/ui/components/filter-search';
import { Badge } from '@oe/ui/shadcn/badge';
import { toast } from '@oe/ui/shadcn/sonner';
import { Plus, Trash2, UserRoundPlus } from 'lucide-react';
import ConfirmDeleteCreatorModal from './confirm-detele-modal';
import { USER_ROLE_EVENT } from './contants';
import CreateCreatorModal from './create-creator-modal';
import InviteCreatorModal from './invite-creator-modal';

export default function CreatorsManagementList() {
  const t = useTranslations('creatorManagement');
  const tError = useTranslations('errors');

  const tableRef = useRef<TableRef<ICreator>>(null);

  const [selectedCreator, setSelectedCreator] = useState<ICreator | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState<boolean>(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);

  const { triggerInviteCreators } = useInviteCreators();
  const { triggerCreateCreator } = useCreateCreator();
  const { triggerDeleteCreator } = useDeleteCreator({
    creator_ids: [selectedCreator?.id ?? ''],
  });
  const { mutateInviteUserList } = useGetUserInvitationsList({
    params: {
      page: 1,
      per_page: 10,
      is_verified: false,
      event: USER_ROLE_EVENT.creator,
    },
  });

  const filterOptions = useMemo(
    () => [
      {
        id: 'email',
        value: 'email',
        label: 'Email',
        type: 'search',
      },
    ],
    []
  ) as FilterOption[];

  const handleOpenCreateModal = useCallback((item: ICreator | null = null) => {
    setSelectedCreator(item);
    setIsCreateModalOpen(true);
  }, []);

  const handleCloseCreateModal = useCallback(() => {
    setSelectedCreator(null);
    setIsCreateModalOpen(false);
  }, []);

  const handleOpenInviteModal = useCallback(() => {
    setIsInviteModalOpen(true);
  }, []);

  const handleCloseInviteModal = useCallback(() => {
    setIsInviteModalOpen(false);
  }, []);

  const handleOpenDeleteModal = useCallback((item: ICreator | null = null) => {
    setSelectedCreator(item);
    setIsOpenDeleteModal(true);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setSelectedCreator(null);
    setIsOpenDeleteModal(false);
  }, []);

  const handleSendInvitation = useCallback(
    async (value: IInviteCreatorPayload) => {
      const { creator_emails } = value;

      try {
        await triggerInviteCreators({ creator_emails });
        toast.success(t('inviteCreator.sentInvitationSuccess'));
        await mutateInviteUserList();
      } catch (error) {
        console.error(error);
        toast.error(tError((error as HTTPErrorMetadata).code.toString()));
      }
    },
    [triggerInviteCreators, mutateInviteUserList, t, tError]
  );

  const handleCreateCreator = useCallback(
    async (value: ICreatorPayload) => {
      const { email, display_name, phone } = value;

      try {
        await triggerCreateCreator({ email, display_name, phone });
        toast.success(t('createCreatorModal.createCreatorSuccess'));

        await tableRef?.current?.mutate();
      } catch (error) {
        console.error(error);
        toast.error(tError((error as HTTPErrorMetadata).code.toString()));
      }
    },
    [triggerCreateCreator, tError, t]
  );

  const handleDeleteCreator = useCallback(async () => {
    try {
      await triggerDeleteCreator({ creator_ids: [selectedCreator?.id ?? ''] });
      toast.success(t('deleteCreatorModal.deleteCreatorSuccess'));

      setSelectedCreator(null);
      await tableRef?.current?.mutate();
      handleCloseDeleteModal();
    } catch (error) {
      console.error(error);
      toast.error(tError((error as HTTPErrorMetadata).code.toString()));
    }
  }, [triggerDeleteCreator, handleCloseDeleteModal, selectedCreator?.id, tError, t]);

  const columns: ColumnDef<ICreator>[] = useMemo(() => {
    return [
      {
        header: t('name'),
        accessorKey: 'username',
        searchable: true,
        size: 210,
      },
      {
        header: t('email'),
        accessorKey: 'email',
        size: 250,
        cell: item => <a href={`mailto:${item.getValue()}`}>{String(item.getValue())}</a>,
      },
      {
        header: t('phone'),
        accessorKey: 'phone',
        cell: item => <a href={`tel:${item.getValue()}`}>{String(item.getValue())}</a>,
      },
      {
        header: t('joinedDate'),
        accessorKey: 'create_at',
        size: 180,
        cell: item => <p className="min-w-[180px]">{formatDate(Number(item.getValue()))}</p>,
      },
      {
        header: t('status'),
        accessorKey: 'active',
        align: 'center',
        searchable: true,
        cell: item => (
          <>
            {item.getValue() ? (
              <Badge variant="success">{t('active')}</Badge>
            ) : (
              <Badge variant="destructive">{t('inActive')}</Badge>
            )}
          </>
        ),
      },
      {
        header: t('action'),
        cell: ({ row }) => {
          return (
            <div className="flex gap-2">
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
  }, [t, handleOpenDeleteModal]);

  return (
    <>
      <Table
        columns={columns}
        api={API_ENDPOINT.ADMIN_CREATORS}
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
        <Button
          onClick={() => {
            handleOpenInviteModal();
          }}
        >
          <UserRoundPlus className="mr-2 h-4 w-4" />
          {t('inviteCreatorBtn')}
        </Button>
        <Button
          onClick={() => {
            handleOpenCreateModal();
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          {t('createNewCreator')}
        </Button>
      </Table>
      {isCreateModalOpen && <CreateCreatorModal onSubmit={handleCreateCreator} onClose={handleCloseCreateModal} />}
      {isOpenDeleteModal && (
        <ConfirmDeleteCreatorModal onSubmit={handleDeleteCreator} onClose={handleCloseDeleteModal} />
      )}
      {isInviteModalOpen && <InviteCreatorModal onSubmit={handleSendInvitation} onClose={handleCloseInviteModal} />}
    </>
  );
}
