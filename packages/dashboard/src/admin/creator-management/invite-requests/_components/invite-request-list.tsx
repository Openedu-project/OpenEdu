'use client';

import { useResendInvitationsUser } from '@oe/api/hooks/useUser';
import type { IUserInvitationItem } from '@oe/api/types/user';
import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import type { HTTPErrorMetadata } from '@oe/api/utils/http-error';
import { USER_ROLE_EVENT } from '@oe/core/utils/constants';
import { formatDate } from '@oe/core/utils/datetime';
import { CountdownButton } from '@oe/ui/components/countdown-button';
import type { FilterOption } from '@oe/ui/components/filter-search';
import { type ColumnDef, Table, type TableRef } from '@oe/ui/components/table';
import { Card, CardContent, CardHeader, CardTitle } from '@oe/ui/shadcn/card';
import { toast } from '@oe/ui/shadcn/sonner';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useRef } from 'react';

export default function InviteRequestMngmList() {
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
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{t('title')}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <Table
            columns={columns}
            api={API_ENDPOINT.USER_INVITATIONS}
            hasNoColumn
            apiParams={{
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
          >
            {/* biome-ignore lint/complexity/noUselessFragments: <explanation> */}
            <></>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
