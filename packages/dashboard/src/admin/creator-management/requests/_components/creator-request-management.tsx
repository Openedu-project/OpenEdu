'use client';
import { useCreateCreator } from '@oe/api/hooks/useCreator';
import { useGetFormRegisterCreator, useRejectRegisterCreator } from '@oe/api/hooks/useRegisterCreator';
import type { ICreatorAnswerItem, ICreatorRequest } from '@oe/api/types/creator-request';
import type { ICreatorPayload } from '@oe/api/types/creators';
import type { IRejectFormRegisterCreatorPayload } from '@oe/api/types/form';
import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import { createAPIUrl } from '@oe/api/utils/fetch';
import type { HTTPErrorMetadata } from '@oe/api/utils/http-error';
import { formatDate } from '@oe/core/utils/datetime';
import type { FilterOption } from '@oe/ui/components/filter-search';
import { type ColumnDef, Table, type TableRef } from '@oe/ui/components/table';
import { Badge } from '@oe/ui/shadcn/badge';
import { Button } from '@oe/ui/shadcn/button';
import { toast } from '@oe/ui/shadcn/sonner';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useRef, useState } from 'react';
import RejectCreatorModal from './reject-request-modal';

type BadgeVariant = 'success' | 'destructive' | 'secondary' | 'default' | 'outline' | null | undefined;
type StatusType = 'approved' | 'rejected' | 'reviewing';

const generateVariantBadge = (status: string): BadgeVariant => {
  const obj: Record<StatusType, BadgeVariant> = {
    approved: 'success',
    rejected: 'destructive',
    reviewing: 'secondary',
  };

  return obj[status as StatusType];
};

const getAnswerText = (key: string, answers: ICreatorAnswerItem[]): string =>
  answers?.find(a => a.key === key)?.answer_text ?? '';

export default function CreatorRequestMngmList() {
  const t = useTranslations('creatorManagement.requestCreator');
  const tError = useTranslations('errors');

  const tableRef = useRef<TableRef<ICreatorRequest>>(null);

  const [selectedCreator, setSelectedCreator] = useState<ICreatorRequest | null>(null);
  const [isOpenRejectModal, setIsOpenRejectModal] = useState<boolean>(false);

  const { dataListFormRegisterCreator: formRegister } = useGetFormRegisterCreator();
  const { triggerCreateCreator } = useCreateCreator();
  const { triggerRejectRegisterCreator } = useRejectRegisterCreator(selectedCreator?.id ?? '');

  const handleOpenRejectModal = useCallback((item: ICreatorRequest | null = null) => {
    setSelectedCreator(item);
    setIsOpenRejectModal(true);
  }, []);

  const handleCloseRejectModal = useCallback(() => {
    setSelectedCreator(null);
    setIsOpenRejectModal(false);
  }, []);

  const handleApproveCreator = useCallback(
    async (item: ICreatorRequest) => {
      if (!item) {
        return;
      }
      const { id, answers } = item;

      const params: ICreatorPayload = {
        display_name: getAnswerText('full_name', answers),
        email: getAnswerText('email', answers),
        phone: getAnswerText('phone', answers),
        form_session_id: id,
      };

      try {
        await triggerCreateCreator(params);
        await tableRef.current?.mutate();
        toast.success(t('approvedSuccess'));
      } catch (error) {
        console.error('Error', error);
        toast.error(tError((error as HTTPErrorMetadata).code.toString()));
      }
    },
    [triggerCreateCreator, t, tError]
  );

  const handleRejectCreator = useCallback(
    async (value: IRejectFormRegisterCreatorPayload) => {
      try {
        await triggerRejectRegisterCreator(value);

        await tableRef.current?.mutate();
        toast.success(t('rejectSuccess'));
      } catch (error) {
        console.error(error);
        toast.error(tError((error as HTTPErrorMetadata).code.toString()));
      }
    },
    [triggerRejectRegisterCreator, t, tError]
  );

  const filterOptions = useMemo(
    () => [
      {
        id: 'email',
        value: 'email',
        label: 'Email',
        type: 'search',
      },
      {
        id: 'phone',
        value: 'phone',
        label: t('phone'),
        type: 'search',
      },
    ],
    [t]
  ) as FilterOption[];

  const columns: ColumnDef<ICreatorRequest>[] = [
    {
      header: t('requestName'),
      accessorKey: 'id',
      enableSorting: false,
      size: 150,
      cell: ({ row }) => {
        return getAnswerText('full_name', row.original.answers as ICreatorAnswerItem[]);
      },
    },
    {
      header: t('email'),
      accessorKey: 'update_at',
      enableSorting: false,
      size: 250,
      cell: ({ row }) => {
        return getAnswerText('email', row.original.answers as ICreatorAnswerItem[]);
      },
    },
    {
      header: t('phone'),
      accessorKey: 'answers',
      enableSorting: false,
      cell: item => {
        return getAnswerText('phone', item.getValue() as ICreatorAnswerItem[]);
      },
    },
    {
      header: t('registerDate'),
      accessorKey: 'create_at',
      align: 'center',
      cell: item => (item ? formatDate(Number(item.getValue())) : ''),
    },
    {
      header: t('status'),
      accessorKey: 'status',
      align: 'center',
      cell: status => (
        <Badge variant={generateVariantBadge(String(status.getValue()))}>{t(String(status.getValue()))}</Badge>
      ),
    },
    {
      header: t('action'),
      align: 'center',
      cell: ({ row }) =>
        row.original.status === 'reviewing' ? (
          <div className="flex gap-2">
            <Button variant="destructive" onClick={() => handleOpenRejectModal(row.original)}>
              {t('reject')}
            </Button>
            <Button variant="default" onClick={() => handleApproveCreator(row.original)}>
              {t('approve')}
            </Button>
          </div>
        ) : null,
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        api={
          formRegister?.id
            ? createAPIUrl({ endpoint: API_ENDPOINT.FORMS_ID_SESSIONS, params: { id: formRegister?.id } })
            : undefined
        }
        hasNoColumn
        apiParams={{
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
      />
      {isOpenRejectModal && <RejectCreatorModal onSubmit={handleRejectCreator} onClose={handleCloseRejectModal} />}
    </>
  );
}
