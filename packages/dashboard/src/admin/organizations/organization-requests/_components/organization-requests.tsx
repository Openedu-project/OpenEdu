'use client';
import { useCreateOrganization } from '@oe/api/hooks/useOrganization';
import { useGetFormRegisterOrg, useRejectRegisterOrg } from '@oe/api/hooks/useRegisterOrg';
import type { IRejectFormRegisterOrgPayload } from '@oe/api/types/form';
import type { IFormUserResponse, IFormUserResponseAnswerItem } from '@oe/api/types/form-user-response';
import type { IOrganizationPayload } from '@oe/api/types/organizations';
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
import RejectOrgModal from './reject-request-modal';

const DOMAIN_NAME = process.env.NEXT_PUBLIC_APP_ROOT_DOMAIN_NAME;
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

const getAnswerText = (key: string, answers: IFormUserResponseAnswerItem[]): string =>
  answers?.find(a => a.key === key)?.answer_text ?? '';

export default function OrganizationRequest() {
  const t = useTranslations('organizationRequests');
  const tError = useTranslations('errors');

  const tableRef = useRef<TableRef<IFormUserResponse>>(null);

  const [isOpenRejectModal, setOpenRejectModal] = useState<boolean>(false);
  const [itemSelected, setItemSelected] = useState<IFormUserResponse | null>(null);
  const { triggerRejectRegisterOrg } = useRejectRegisterOrg(itemSelected?.id ?? '');

  const { dataListFormRegisterOrg: dataFormRegister } = useGetFormRegisterOrg();

  const { triggerCreateOrganiation } = useCreateOrganization();

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
        label: t('phoneNumber'),
        type: 'search',
      },
    ],
    [t]
  ) as FilterOption[];

  const handleOpenRejectModal = useCallback((item: IFormUserResponse) => {
    setItemSelected(item);
    setOpenRejectModal(true);
  }, []);

  const handleCloseRejectModal = useCallback(() => {
    setItemSelected(null);
    setOpenRejectModal(false);
  }, []);

  const handleRejectOrg = useCallback(
    async (value: IRejectFormRegisterOrgPayload) => {
      try {
        await triggerRejectRegisterOrg(value);
        await tableRef.current?.mutate();
        toast.success(t('rejectedSuccess'));
      } catch (error) {
        console.error(error);
        toast.error(tError((error as HTTPErrorMetadata).code.toString()));
      }
    },
    [triggerRejectRegisterOrg, tError, t]
  );

  const handleApproveOrganization = useCallback(
    async (item: IFormUserResponse) => {
      if (!item) {
        return;
      }
      const { id, answers } = item;
      const params: IOrganizationPayload = {
        full_name: getAnswerText('full_name', answers as IFormUserResponseAnswerItem[]),
        name: getAnswerText('company_name', answers as IFormUserResponseAnswerItem[]),
        domain: `${getAnswerText('domain', answers as IFormUserResponseAnswerItem[])}.${DOMAIN_NAME}`,
        email: getAnswerText('email', answers as IFormUserResponseAnswerItem[]),
        phone: getAnswerText('phone', answers as IFormUserResponseAnswerItem[]),
        thumbnail_id: null,
        form_session_id: id,
      };

      try {
        await triggerCreateOrganiation(params);
        await tableRef.current?.mutate();
        toast.success(t('approvedSuccess'));
      } catch (error) {
        console.error('Error', error);
        toast.error(tError((error as HTTPErrorMetadata).code.toString()));
      }
    },
    [triggerCreateOrganiation, tError, t]
  );

  const columns: ColumnDef<IFormUserResponse>[] = useMemo(
    () => [
      {
        header: t('requesterName'),
        accessorKey: 'answers.full_name.answer_text',
        enableSorting: false,
        cell: ({ row }) => {
          return getAnswerText('full_name', row.original.answers as IFormUserResponseAnswerItem[]);
        },
      },
      {
        header: t('email'),
        accessorKey: 'answers.email.answer_text',
        enableSorting: false,
        size: 250,
        cell: ({ row }) => {
          return getAnswerText('email', row.original.answers as IFormUserResponseAnswerItem[]);
        },
      },
      {
        header: t('phoneNumber'),
        accessorKey: 'answers.phone.answer_text',
        enableSorting: false,
        cell: ({ row }) => {
          return getAnswerText('phone', row.original.answers as IFormUserResponseAnswerItem[]);
        },
      },
      {
        header: t('organizationName'),
        accessorKey: 'answers.company_name.answer_text',
        enableSorting: false,
        cell: ({ row }) => {
          return getAnswerText('company_name', row.original.answers as IFormUserResponseAnswerItem[]);
        },
      },
      {
        header: t('domain'),
        accessorKey: 'answers.domain.answer_text',
        enableSorting: false,
        cell: ({ row }) => {
          return getAnswerText('domain', row.original.answers as IFormUserResponseAnswerItem[]);
        },
      },
      {
        header: t('status'),
        accessorKey: 'status',
        cell: status => (
          <Badge variant={generateVariantBadge(String(status.getValue()))}>{t(String(status.getValue()))}</Badge>
        ),
      },
      {
        header: t('createdDate'),
        accessorKey: 'create_at',
        cell: item => <>{formatDate(Number(item.getValue()))}</>,
      },
      {
        header: t('action'),
        size: 220,
        cell: ({ row }) =>
          row.original.status === 'reviewing' ? (
            <div className="flex w-[220px] justify-center gap-4">
              <Button variant="destructive" onClick={() => handleOpenRejectModal(row.original)}>
                {t('reject')}
              </Button>
              <Button onClick={() => handleApproveOrganization(row.original)}>{t('approve')}</Button>
            </div>
          ) : null,
      },
    ],
    [t, handleOpenRejectModal, handleApproveOrganization]
  );

  return (
    <>
      <Table
        columns={columns}
        api={
          dataFormRegister?.id
            ? createAPIUrl({ endpoint: API_ENDPOINT.FORMS_ID_SESSIONS, params: { id: dataFormRegister?.id } })
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
      {isOpenRejectModal && <RejectOrgModal onSubmit={handleRejectOrg} onClose={handleCloseRejectModal} />}
    </>
  );
}
