'use client';

import { API_ENDPOINT } from '@oe/api';
import type { HTTPErrorMetadata } from '@oe/api';
import { useResendInvitationsUser } from '@oe/api';
import type { IUserInvitationItem } from '@oe/api';
import { formatDate } from '@oe/core';
import { USER_ROLE_EVENT } from '@oe/core';
import { toast } from '@oe/ui';
import type { FilterOption } from '@oe/ui';
import { type ColumnDef, Table, type TableRef } from '@oe/ui';
import { CountdownButton } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useRef } from 'react';

export function InviteRequestMngmList() {
  const t = useTranslations('creatorManagement.inviteRequestCreator');
  const tError = useTranslations('errors');

  const tableRef = useRef<TableRef<IUserInvitationItem>>(null);

  const { triggerResendInvitationUser } = useResendInvitationsUser();

  const handleResend = useCallback(
    async (id: string) => {
      if (!id) {
        return;
      }

      try {
        await triggerResendInvitationUser({
          user_token_ids: [id],
        });
        toast.success(t('resendSuccess'));
      } catch (error) {
        console.error('Error', error);
        toast.error(tError((error as HTTPErrorMetadata).code.toString()));
      }
    },
    [triggerResendInvitationUser, tError, t]
  );

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

  const columns: ColumnDef<IUserInvitationItem>[] = useMemo(
    () => [
      {
        header: 'Email',
        accessorKey: 'email',
        size: 350,
      },
      {
        header: t('invitationDate'),
        accessorKey: 'update_at',
        size: 250,
        cell: item => <>{formatDate(Number(item.getValue()))}</>,
      },
      {
        header: t('action'),
        align: 'center',
        cell: ({ row }) => (
          <CountdownButton onClick={() => handleResend(row.original.id)}>{t('resend')}</CountdownButton>
        ),
      },
    ],
    [t, handleResend]
  );

  return (
    <>
      <Table
        columns={columns}
        api={API_ENDPOINT.USER_INVITATIONS}
        hasNoColumn
        apiQueryParams={{
          page: 1,
          per_page: 10,
          is_verified: false,
          event: USER_ROLE_EVENT.creator,
          sort: 'update_at desc',
        }}
        height="100%"
        filterOptions={filterOptions}
        ref={tableRef}
        filterSearchProps={{ useQueryParams: true }}
        tableOptions={{
          manualPagination: true,
        }}
      />
    </>
  );
}
