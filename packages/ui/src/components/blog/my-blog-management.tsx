'use client';
import { deleteBlog, publishBlog, unpublishBlog } from '@oe/api/services/blog';
import type { IBlog } from '@oe/api/types/blog';
import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import type { HTTPErrorMetadata } from '@oe/api/utils/http-error';
import { formatDateHourMinute } from '@oe/core/utils/datetime';
import { BLOG_ADMIN_ROUTES, BLOG_ROUTES } from '@oe/core/utils/routes';
import { buildUrl } from '@oe/core/utils/url';
import { EditIcon, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMemo, useRef } from 'react';
import { useSWRConfig } from 'swr';
import { Link, usePathname } from '#common/navigation';
import { BlogTableItemActions, URLGenerateModal } from '#components/blog';
import { DeleteButton } from '#components/delete-button';
import type { FilterOption } from '#components/filter-search';
import { PublishButton } from '#components/publish-button';
import { StatusBadge, type TStatus } from '#components/status-badge';
import { type ColumnDef, Table, type TableRef } from '#components/table';
import { Badge } from '#shadcn/badge';
import { buttonVariants } from '#shadcn/button';
import { Separator } from '#shadcn/separator';
import { toast } from '#shadcn/sonner';
import TooltipLink, { Tooltip } from '#shadcn/tooltip';
import { cn } from '#utils/cn';

export default function MyBlogManagement({
  type,
  canUnpublish = false,
  AIButton = false,
}: {
  type: 'personal' | 'org';
  canUnpublish?: boolean;
  AIButton?: boolean;
}) {
  const tBlogs = useTranslations('blogManagement');
  const tGeneral = useTranslations('general');
  const tPublish = useTranslations('publishButton');
  const tError = useTranslations('errors');
  const tableRef = useRef<TableRef<IBlog>>(null);
  const { mutate: globalMutate } = useSWRConfig();
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

  const handleDeleteBlog = async (blog: IBlog) => {
    try {
      const res = await deleteBlog(undefined, blog.cuid);

      if (res) {
        toast.success(tBlogs('deleteSuccessfully'));
        globalMutate((key: string) => !!key?.includes(API_ENDPOINT.USERS_ME_BLOGS), undefined, { revalidate: false });
        await tableRef?.current?.mutate();
      }
    } catch (error) {
      toast.error(tError((error as HTTPErrorMetadata).code.toString()));
      console.error(error);
    }
  };

  const columns: ColumnDef<IBlog>[] = [
    {
      header: tBlogs('title'),
      accessorKey: 'title',
      size: 250,
      sticky: 'left',
      cell: info => {
        const item = info?.row.original;
        const isPublish = item.published_blog?.some(blog => blog.version === item.version);
        return (
          <TooltipLink
            name={info.getValue() as string}
            aria-disabled={isPublish}
            href={
              isPublish || item.reviewing_blog
                ? '#'
                : buildUrl({
                    endpoint: TARGET_ROUTES.editBlog,
                    params: { id: item.id },
                    queryParams: { next: pathname },
                  })
            }
            className={cn(
              'block h-auto truncate no-underline',
              (isPublish || item.reviewing_blog) && 'cursor-default text-foreground hover:no-underline'
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
          item?.published_blog?.some(blog => blog.version === item.version)
            ? 'publish'
            : item?.reviewing_blog
              ? 'reviewing'
              : item?.status
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
      header: tBlogs('createdDate'),
      accessorKey: 'create_at',
      align: 'center',
      size: 200,
      cell: date => <>{formatDateHourMinute(date.getValue() as number)}</>,
    },
    {
      header: tBlogs('lastUpdate'),
      accessorKey: 'update_at',
      align: 'center',
      size: 200,
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
      size: type === 'personal' ? 220 : 150,
      cell: info => {
        const item = info.row.original;
        const previewUrl = buildUrl({
          endpoint: TARGET_ROUTES.previewBlog,
          params: {
            id: item.id,
          },
        });
        return (
          <div className="flex w-full flex-wrap justify-center gap-2">
            {item?.published_blog?.some(blog => blog.version === item.version) ? (
              <>
                <Link
                  href={buildUrl({
                    endpoint: type === 'personal' ? BLOG_ROUTES.personBlogDetail : BLOG_ROUTES.blogDetail,
                    params: {
                      username: item.author?.username,
                      slug: item.slug,
                    },
                  })}
                  target="_blank"
                  variant="default"
                >
                  {tGeneral('view')}
                </Link>

                {canUnpublish && (
                  <PublishButton
                    action="un-publish"
                    onlyText
                    desc={tBlogs('unpublishBlogDes')}
                    onConfirm={(param: { note?: string }) => handlePublish(param, item, 'un-publish')}
                  />
                )}
              </>
            ) : item.status === 'failed' ? (
              <DeleteButton
                leftSection={<Trash2 className="h-4 w-4" />}
                size="default"
                onDelete={async () => await handleDeleteBlog?.(item)}
                className="h-auto w-auto"
              >
                {tGeneral('delete')}
              </DeleteButton>
            ) : item.reviewing_blog ? (
              <Link href={previewUrl} target="_blank" variant="outline" className="border-primary text-primary">
                {tGeneral('preview')}
              </Link>
            ) : (
              item.status === 'draft' && (
                <BlogTableItemActions
                  blogData={item}
                  handleDelete={handleDeleteBlog}
                  previewUrl={previewUrl}
                  handlePublish={(param: { note?: string }) => handlePublish(param, item, 'publish')}
                />
              )
            )}
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
    <div className="bg-accent">
      <div className="mb-6 flex justify-between gap-10 rounded-b-xl bg-background p-4">
        <h2 className="giant-iheading-semibold32 tracking-tight">{tBlogs('blogManagement')}</h2>
        <div className="flex items-center gap-4">
          {AIButton && <URLGenerateModal />}

          <Link
            href={TARGET_ROUTES.createBlog}
            className={cn(buttonVariants({ variant: 'default' }), 'hover:no-underline')}
          >
            <EditIcon className="mr-2" /> {tBlogs('createNewBlog')}
          </Link>
        </div>
      </div>
      <div className="bg-background p-4">
        <Table
          api={API_ENDPOINT.USERS_ME_BLOGS}
          apiParams={{ blog_type: type, sort: 'update_at desc' }}
          hasNoColumn
          columns={columns}
          filterOptions={filterOptions}
          ref={tableRef}
          tableOptions={{
            manualPagination: true,
          }}
        />
      </div>
    </div>
  );
}
