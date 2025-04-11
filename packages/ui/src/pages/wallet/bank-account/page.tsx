'use client';
import { API_ENDPOINT } from '@oe/api';
import type { IBankAccount } from '@oe/api';
import { createBankAccount, deleteBankAccount, updateBankAccount } from '@oe/api';
import { WALLET_ROUTES } from '@oe/core';
import { ChevronLeft, Edit, Plus, Trash } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { toast } from 'sonner';
import { Link } from '#common/navigation';
import { DeleteButton } from '#components/delete-button';
import { type ColumnDef, Table, type TableRef } from '#components/table';
import { Button } from '#shadcn/button';
import { BankAccountModal } from './bank-account-modal';

export function BankAccountPage() {
  const t = useTranslations('wallets.bankAccountPage');
  const ref = useRef<TableRef<IBankAccount>>(null);

  const columns: ColumnDef<IBankAccount>[] = [
    {
      accessorKey: 'value.bank_name',
      header: t('table.bankName'),
      size: 200,
      enableSorting: false,
    },
    {
      accessorKey: 'value.account_name',
      header: t('table.accountName'),
      enableSorting: false,
      size: 200,
    },
    {
      accessorKey: 'value.account_number',
      header: t('table.accountNumber'),
      enableSorting: false,
      size: 200,
    },
    {
      id: 'actions',
      header: t('table.action'),
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <BankAccountModal
              trigger={
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <Edit className="h-4 w-4" />
                </Button>
              }
              defaultValues={row.original.value}
              onSubmit={async data => {
                await handleSubmit(
                  {
                    ...row.original,
                    value: data,
                  },
                  false
                );
              }}
            />
            <DeleteButton
              title={t('dialog.deleteTitle')}
              description={t('dialog.deleteDescription')}
              onDelete={() => handleDelete(row.original)}
            >
              <Trash className="h-4 w-4" />
            </DeleteButton>
          </div>
        );
      },
    },
  ];

  const handleDelete = async (account: IBankAccount) => {
    try {
      await deleteBankAccount(null, account.id);
      toast.success(t('messages.deleteSuccess'));
      ref.current?.mutateAndClearCache();
    } catch {
      toast.error(t('messages.deleteFailure'));
    }
  };

  const handleSubmit = async (data: IBankAccount, isNew: boolean) => {
    if (isNew) {
      await createBankAccount(null, {
        type: 'bank_account',
        enable: true,
        value: data.value,
      });
      toast.success(t('messages.addSuccess'));
    } else {
      await updateBankAccount(null, {
        id: data.id,
        type: 'bank_account',
        enable: true,
        value: data.value,
      });
      toast.success(t('messages.updateSuccess'));
    }
    ref.current?.mutateAndClearCache();
  };

  return (
    <div className="mx-auto max-w-screen-xl space-y-4">
      <div className="flex items-center">
        <Link
          href={WALLET_ROUTES.wallet}
          className="flex justify-start gap-2 p-0 hover:bg-transparent hover:underline"
          variant="ghost"
          activeClassName="border-none text-foreground"
        >
          <ChevronLeft className="size-4" />
          <span className="giant-iheading-semibold18">{t('bankAccounts')}</span>
        </Link>

        <BankAccountModal
          trigger={
            <Button size="sm" className="ml-auto gap-2">
              <Plus className="size-4" />
              {t('addNewBankAccount')}
            </Button>
          }
          onSubmit={async data => {
            await handleSubmit(
              {
                id: '',
                create_at: 0,
                update_at: 0,
                delete_at: 0,
                enable: true,
                org_id: '',
                type: 'bank_account',
                user_id: '',
                value: data,
              },
              true
            );
          }}
        />
      </div>

      <Table
        columns={columns}
        api={API_ENDPOINT.USER_SETTINGS}
        apiQueryParams={{
          type: 'bank_account',
          page: 1,
          per_page: 10,
          sort: 'update_at desc',
        }}
        ref={ref}
        tableOptions={{
          manualPagination: true,
          manualSorting: true,
        }}
        hasNoColumn
      />
    </div>
  );
}
