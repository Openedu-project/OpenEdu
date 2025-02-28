'use client';

import { removeCertLayerService, updateCertEnableService } from '@oe/api/services/certificate';
import type { ICertificate } from '@oe/api/types/certificate';
import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import { formatDate } from '@oe/core/utils/datetime';
import { ADMIN_ROUTES } from '@oe/core/utils/routes';
import { buildUrl } from '@oe/core/utils/url';
import { Link } from '@oe/ui/common/navigation';
import { CertificateRenderer } from '@oe/ui/components/certificate-builder';
import { DeleteButton } from '@oe/ui/components/delete-button';
import type { FilterOption } from '@oe/ui/components/filter-search';
import { type ColumnDef, Table, type TableRef } from '@oe/ui/components/table';
import { toast } from '@oe/ui/shadcn/sonner';
import { Switch } from '@oe/ui/shadcn/switch';
import { Tooltip } from '@oe/ui/shadcn/tooltip';
import { Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useRef, useState } from 'react';

export default function CertificatesList() {
  const tCertificate = useTranslations('certificate');
  const tableRef = useRef<TableRef<ICertificate>>(null);
  const [loading, setLoading] = useState(false);

  const handleDelete = useCallback(
    async (certificate: ICertificate) => {
      try {
        await removeCertLayerService(undefined, {
          params: {
            id: certificate.id,
          },
        });
        await tableRef.current?.mutateAndClearCache();
        toast.success(tCertificate('toast.deleteSuccess'));
      } catch (error) {
        console.error(error);
        toast.error(tCertificate('toast.deleteError'));
      }
    },
    [tCertificate]
  );

  const handleToggleDefault = useCallback(
    async (certificate: ICertificate) => {
      try {
        setLoading(true);
        await updateCertEnableService(undefined, {
          payload: {
            id: certificate.id,
          },
        });
        await tableRef.current?.mutateAndClearCache();
        toast.success(tCertificate('toast.updateSuccess'));
      } catch (error) {
        console.error(error);
        toast.error(tCertificate('toast.updateError'));
      } finally {
        setLoading(false);
      }
    },
    [tCertificate]
  );

  const filterOptions = useMemo(
    () => [
      {
        id: 'name',
        value: 'name',
        label: tCertificate('list.name'),
        type: 'search',
      },
    ],
    [tCertificate]
  ) as FilterOption[];

  const columns: ColumnDef<ICertificate>[] = useMemo(
    () => [
      {
        id: 'name',
        header: tCertificate('list.name'),
        accessorKey: 'name',
        enableSorting: false,
        cell: ({ row }) => {
          const name = row.original.name;
          return (
            <Tooltip content={name}>
              <Link
                href={buildUrl({
                  endpoint: ADMIN_ROUTES.certificateDetail,
                  params: {
                    id: row.original.id,
                  },
                })}
                className="h-8 gap-2 whitespace-normal px-2 py-0"
              >
                {name}
              </Link>
            </Tooltip>
          );
        },
      },
      {
        id: 'preview',
        header: tCertificate('list.preview'),
        accessorKey: 'template',
        size: 250,
        enableSorting: false,
        align: 'center',
        cell: ({ row }) => {
          const template = row.original.template;
          if (!template) {
            return null;
          }
          return (
            <div className="flex h-[150px] w-full items-center justify-center overflow-hidden">
              <div
                className="origin-center scale-[0.3] transform"
                style={{
                  width: template.frame?.width,
                  height: template.frame?.height,
                }}
              >
                <CertificateRenderer template={template} />
              </div>
            </div>
          );
        },
      },
      {
        id: 'enable',
        header: tCertificate('list.isDefault'),
        accessorKey: 'enable',
        enableSorting: false,
        cell: ({ row }) => {
          const value = row.original.enable ?? false;
          return (
            <Switch
              checked={value}
              disabled={row.original.enable}
              onCheckedChange={() => handleToggleDefault(row.original)}
            />
          );
        },
      },
      {
        id: 'update_at',
        header: tCertificate('list.updatedAt'),
        accessorKey: 'update_at',
        enableSorting: false,
        cell: ({ getValue }) => {
          const value = getValue();
          return <p>{value ? formatDate(Number(value)) : '-'}</p>;
        },
      },
      {
        id: 'action',
        header: tCertificate('list.actions'),
        accessorKey: 'action',
        sticky: 'right',
        align: 'center',
        enableSorting: false,
        cell: ({ row }) => {
          return (
            <DeleteButton
              title={tCertificate('modal.delete.title')}
              description={tCertificate('modal.delete.description')}
              variant="destructive"
              className="w-auto gap-2 px-2 py-0"
              disabled={row.original.enable}
              onDelete={async onClose => {
                await handleDelete(row.original);
                onClose?.();
              }}
            >
              <Trash2 className="h-4 w-4" />
              {tCertificate('actions.delete')}
            </DeleteButton>
          );
        },
      },
    ],
    [handleDelete, handleToggleDefault, tCertificate]
  );

  return (
    <Table
      columns={columns}
      api={API_ENDPOINT.HTML_TEMPLATES}
      hasNoColumn
      apiParams={{
        page: 1,
        per_page: 10,
      }}
      height="100%"
      ref={tableRef}
      filterOptions={filterOptions}
      filterSearchProps={{ useQueryParams: true }}
      isLoading={loading}
      tableOptions={{
        manualPagination: true,
      }}
    />
  );
}
