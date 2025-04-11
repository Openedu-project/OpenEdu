'use client';
import { API_ENDPOINT } from '@oe/api';
import type { IBlog } from '@oe/api';
import type { IApproval } from '@oe/api';
import { formatDateHourMinute } from '@oe/core';
import { type ColumnDef, Table, type TableRef } from '@oe/ui';
import { Badge } from '@oe/ui';
import { Button } from '@oe/ui';
import { StatusBadge, type TStatus } from '@oe/ui';
import { Separator } from '@oe/ui';
import { Tooltip } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import { ApproveButton } from './approve-button';
import { PreviewBlogModal } from './preview-blog-modal';

export function PublishRequestTable() {
  const tBlogs = useTranslations('blogManagement');
  const tGeneral = useTranslations('general');
  const tableRef = useRef<TableRef<IApproval<IBlog, null>>>(null);
  const [selectedItem, setSelectedItem] = useState<IBlog>();
  const [openModal, setOpenModal] = useState<boolean>(false);

  const columns: ColumnDef<IApproval<IBlog, null>>[] = [
    {
      header: tBlogs('title'),
      size: 250,
      cell: item => {
        const { entity, status } = item.row.original;
        return (
          <Tooltip content={entity?.title}>
            {status === 'new' ? (
              <Button
                variant="ghost"
                className="w-full p-2 text-primary underline no-underline"
                onClick={() => {
                  setSelectedItem(entity);
                  setOpenModal(true);
                }}
              >
                <p className="w-[250px] truncate text-start">{entity?.title}</p>
              </Button>
            ) : (
              <p className="w-full truncate p-2">{entity?.title}</p>
            )}
          </Tooltip>
        );
      },
    },
    {
      header: tGeneral('status'),
      accessorKey: 'status',
      align: 'center',
      size: 110,
      cell: info => {
        return <StatusBadge status={info.getValue() as TStatus} />;
      },
    },
    {
      header: tGeneral('type'),
      size: 100,
      align: 'center',
      cell: item => (
        <>
          {item.row.original?.entity?.is_ai_generated ? (
            <Tooltip content={item.row.original?.entity?.ai_generated_info?.link}>
              <Badge variant="outline_destructive">AI</Badge>
            </Tooltip>
          ) : (
            <Badge variant="outline_primary">{tBlogs('manual')}</Badge>
          )}
        </>
      ),
    },
    {
      header: tBlogs('blogOwner'),
      align: 'center',
      cell: item => {
        const { requester } = item.row.original;
        return (
          <>
            {requester?.display_name && requester?.display_name?.length > 0
              ? requester?.display_name
              : (requester?.username ?? <Separator className="m-auto h-0.5 w-2 bg-primary" />)}
          </>
        );
      },
    },
    {
      header: tBlogs('requestDate'),
      accessorKey: 'create_at',
      size: 200,
      cell: date => <>{formatDateHourMinute(date.getValue() as number)}</>,
    },
    {
      header: tBlogs('confirmDate'),
      accessorKey: 'confirm_date',
      size: 200,
      cell: date => <>{formatDateHourMinute(date.getValue() as number)}</>,
    },
    {
      header: tGeneral('actions'),
      align: 'center',
      sticky: 'right',
      size: 230,
      cell: info => {
        const item = info.row.original;

        if (item.status === 'new') {
          return (
            <div className="flex">
              <ApproveButton
                action="approve"
                id={item.id}
                handleSuccess={tableRef?.current?.mutate}
                triggerProps={{ className: 'mr-2' }}
                onlyText
              />
              <ApproveButton action="reject" id={item.id} handleSuccess={tableRef?.current?.mutate} onlyText />
            </div>
          );
        }
        return <div className="h-10" />;
      },
    },
  ];

  return (
    <>
      <Table
        api={API_ENDPOINT.APPROVALS}
        apiQueryParams={{ entity_type: 'blog', sort: 'request_date desc' }}
        columns={columns}
        ref={tableRef}
        hasNoColumn
        tableOptions={{
          manualPagination: true,
        }}
      />
      <PreviewBlogModal
        blogData={selectedItem}
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
      />
    </>
  );
}
