'use client';
import { postUserRolesService } from '@oe/api/services/user';
import type { IUser } from '@oe/api/types/user';
import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import { DeleteButton } from '@oe/ui/components/delete-button';
import { type ColumnDef, Table, type TableRef } from '@oe/ui/components/table';
import { Separator } from '@oe/ui/shadcn/separator';
import { toast } from '@oe/ui/shadcn/sonner';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';

export type IBlogUserRole = 'org_writer' | 'org_editor';

export function UserTable({ userRole }: { userRole: IBlogUserRole }) {
  const tBlogs = useTranslations('blogManagement');
  const tGeneral = useTranslations('general');
  const tableRef = useRef<TableRef<IUser>>(null);

  const columns: ColumnDef<IUser>[] = [
    {
      header: tBlogs('email'),
      accessorKey: 'email',
      size: 300,
      cell: info => <>{info.getValue() as string}</>,
    },
    {
      header: tBlogs('displayName'),
      align: 'center',
      size: 200,
      cell: info => {
        const item = info?.row.original;

        if (item?.display_name) {
          return <p>{item?.display_name}</p>;
        }
        return <Separator className="m-auto h-0.5 w-2 bg-primary" />;
      },
    },
    {
      header: tBlogs('username'),
      accessorKey: 'username',
      align: 'center',
      size: 250,
      cell: info => {
        const item = info?.row.original;

        return <p className="truncate">{item.username}</p>;
      },
    },
    {
      header: tGeneral('actions'),
      align: 'center',
      size: 200,
      cell: info => {
        const item = info?.row.original;

        return (
          <DeleteButton
            variant="destructive"
            size="default"
            className="w-auto"
            title={tBlogs('delRoleTitle')}
            description={
              tBlogs.rich(userRole === 'org_editor' ? 'delEditorDesc' : 'delWriterDesc', {
                name: item.email,
                strong: chunks => <strong>{chunks}</strong>,
              }) as string
            }
            descClassName="inline-block text-center"
            confirmBtnMessage={tGeneral('remove')}
            onDelete={handleClose => handleConfirmDelete(item, handleClose)}
          >
            {tGeneral('remove')}
          </DeleteButton>
        );
      },
    },
  ];

  const handleConfirmDelete = async (user: IUser, handleClose?: () => void) => {
    handleClose?.();

    try {
      const res = await postUserRolesService(undefined, {
        payload: {
          remove_ids: [
            {
              role_id: [userRole],
              user_id: user?.id ?? '',
            },
          ],
        },
      });

      if (res) {
        toast.success(tBlogs('deleteSuccessfully'));
        void tableRef?.current?.mutate();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Table<IUser>
      columns={columns}
      ref={tableRef}
      api={API_ENDPOINT.USERS}
      hasNoColumn
      apiQueryParams={{
        page: 1,
        per_page: 10,
        role_id: userRole,
        sort: 'create_at desc',
      }}
    />
  );
}
