'use client';
import { publishBlog, unpublishBlog } from '@oe/api/services/blog';
import type { IBlog } from '@oe/api/types/blog';
import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import type { HTTPErrorMetadata } from '@oe/api/utils/http-error';
import { formatDateHourMinute } from '@oe/core/utils/datetime';
import { BLOG_ADMIN_ROUTES, BLOG_ROUTES } from '@oe/core/utils/routes';
import { buildUrl } from '@oe/core/utils/url';
import { Link, usePathname } from '@oe/ui/common/navigation';
import type { FilterOption } from '@oe/ui/components/filter-search';
import { PublishButton } from '@oe/ui/components/publish-button';
import { StatusBadge, type TStatus } from '@oe/ui/components/status-badge';
import { type ColumnDef, Table, type TableRef } from '@oe/ui/components/table';
import { Badge } from '@oe/ui/shadcn/badge';
import { Separator } from '@oe/ui/shadcn/separator';
import { toast } from '@oe/ui/shadcn/sonner';
import TooltipLink, { Tooltip } from '@oe/ui/shadcn/tooltip';
import { cn } from '@oe/ui/utils/cn';
import { useTranslations } from 'next-intl';
import { useMemo, useRef } from 'react';

export default function BlogTable({
  type,
}: {
  type: 'personal' | 'org';
}) {
  const tBlogs = useTranslations('blogManagement');
  const tGeneral = useTranslations('general');
  const tPublish = useTranslations('publishButton');
  const tError = useTranslations('errors');
  const tableRef = useRef<TableRef<IBlog>>(null);
  const pathname = usePathname();

  const TARGET_ROUTES = type === 'personal' ? BLOG_ROUTES : BLOG_ADMIN_ROUTES;

  const handlePublish = async (param: { note?: string }, item: IBlog, action: 'publish' | 'un-publish') => {
    try {
      action === 'publish'
        ? await publishBlog(undefined, item.id, { payload: param })
        : await unpublishBlog(type, undefined, item.cuid);

      if (action === 'publish') {
        toast.success(tPublish('publishSuccess'));
      } else {
        toast.success(tPublish('unpublishSuccess'));
      }
      await tableRef?.current?.mutate();
    } catch (error) {
      toast.error(tError((error as HTTPErrorMetadata).code.toString()));
      console.error(error);
    }
  };

  const columns: ColumnDef<IBlog>[] = [
    {
      header: tBlogs('title'),
      accessorKey: 'title',
      size: 300,
      cell: info => {
        const item = info?.row.original;
        const isPublish = item.published_blog?.some(blog => blog.version === item.version);
        return (
          <TooltipLink
            name={info.getValue() as string}
            aria-disabled={isPublish}
            href={
              isPublish
                ? '#'
                : buildUrl({
                    endpoint: TARGET_ROUTES.editBlog,
                    params: { id: item.id },
                    queryParams: { next: pathname },
                  })
            }
            className={cn(
              'block h-auto truncate no-underline',
              isPublish && 'cursor-default text-foreground hover:no-underline'
            )}
          />
        );
      },
    },
    {
      header: tGeneral('status'),
      align: 'center',
      cell: info => {
        const item = info.row.original;
        const status = (
          item.published_blog?.some(blog => blog.version === item.version) ? 'publish' : 'un-publish'
        ) as TStatus;

        return <StatusBadge status={status} />;
      },
    },
    {
      header: tGeneral('type'),
      size: 100,
      align: 'center',
      cell: item => (
        <>
          {item.row.original.is_ai_generated ? (
            <Tooltip content={item.row.original.ai_generated_info?.link}>
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
        const { author } = item.row.original;
        return (
          <>
            {author?.display_name && author?.display_name?.length > 0
              ? author?.display_name
              : (author?.username ?? <Separator className="m-auto h-0.5 w-2 bg-primary" />)}
          </>
        );
      },
    },

    {
      header: tBlogs('createdDate'),
      accessorKey: 'create_at',
      size: 200,
      cell: date => <>{formatDateHourMinute(date.getValue() as number)}</>,
    },
    {
      header: tBlogs('lastUpdate'),
      accessorKey: 'update_at',
      size: 200,
      align: 'center',
      cell: date => <>{formatDateHourMinute(date.getValue() as number)}</>,
    },
    {
      header: tBlogs('publishDate'),
      size: 200,
      align: 'center',
      cell: info => {
        const date = info.row.original.published_blog?.at(-1)?.pub_date;
        return <>{date ? formatDateHourMinute(date) : <Separator className="m-auto h-0.5 w-2 bg-primary" />}</>;
      },
    },
    {
      header: tGeneral('actions'),
      align: 'center',
      sticky: 'right',
      size: 230,
      cell: info => {
        const item = info.row.original;
        const action = item.published_blog?.some(blog => blog.version === item.version) ? 'un-publish' : 'publish';

        return (
          <div className="flex">
            <Link
              href={buildUrl({
                endpoint:
                  action !== 'un-publish'
                    ? TARGET_ROUTES.previewBlog
                    : type === 'personal'
                      ? BLOG_ROUTES.personBlogDetail
                      : BLOG_ROUTES.blogDetail,
                params: {
                  username: item.author?.username,
                  slug: item.slug,
                  id: item.id,
                },
              })}
              target="_blank"
              variant="outline"
              className={cn('mr-2', action === 'un-publish' && 'border-primary text-primary')}
            >
              {tGeneral(action === 'un-publish' ? 'view' : 'preview')}
            </Link>

            <PublishButton
              onlyText
              action={action}
              desc={tBlogs(action === 'un-publish' ? 'unpublishBlogDes' : 'publishBlogDes')}
              onConfirm={(param: { note?: string }) => handlePublish(param, item, action)}
            />
          </div>
        );
      },
    },
  ];

  const filterOptions = useMemo(
    () => [
      {
        id: 'title',
        value: 'title',
        label: tBlogs('title'),
        type: 'search',
      },
    ],
    [tBlogs]
  ) as FilterOption[];

  return (
    <Table
      api={API_ENDPOINT.ADMIN_BLOGS}
      apiParams={{ blog_type: type, sort: 'update_at desc' }}
      columns={columns}
      filterOptions={filterOptions}
      ref={tableRef}
      tableOptions={{
        manualPagination: true,
      }}
    />
  );
}
