'use client';
import { publishBlog, unpublishBlog } from '@oe/api/services/blog';
import type { IBlog } from '@oe/api/types/blog';
import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import type { HTTPErrorMetadata } from '@oe/api/utils/http-error';
import { formatDateHourMinute } from '@oe/core/utils/datetime';
import { BLOG_ADMIN_ROUTES, BLOG_ROUTES, generateRoute } from '@oe/core/utils/routes';
import { type LanguageCode, languages } from '@oe/i18n/languages';
import { useRouter } from '@oe/ui/common/navigation';
import { AITag, type IAITag } from '@oe/ui/components/ai-tag';
import type { FilterOption } from '@oe/ui/components/filter-search';
import { PublishButton } from '@oe/ui/components/publish-button';
import { type ColumnDef, Table, type TableRef } from '@oe/ui/components/table';
import { Badge, type BadgeProps, type BadgeVariant } from '@oe/ui/shadcn/badge';
import { Button } from '@oe/ui/shadcn/button';
import { Separator } from '@oe/ui/shadcn/separator';
import { toast } from '@oe/ui/shadcn/sonner';
import { cn } from '@oe/ui/utils/cn';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useRef } from 'react';

const generateVariantBadge = (status: keyof BadgeProps['variant']) => {
  const obj = {
    published: 'success',
    reviewing: 'default',
    unpublished: 'outlineError',
    generating: 'secondary',
    draft: 'outline',
    failed: 'destructive',
  };

  return obj?.[status];
};

export default function BlogManagement({ type, className }: { type: 'personal' | 'org'; className?: string }) {
  const tBlogs = useTranslations('blogManagement');
  const tGeneral = useTranslations('general');
  const tPublish = useTranslations('publishButton');
  const tError = useTranslations('errors');
  const tableRef = useRef<TableRef<IBlog>>(null);
  const router = useRouter();

  const TARGET_ROUTES = type === 'personal' ? BLOG_ROUTES : BLOG_ADMIN_ROUTES;
  const handleEdit = (blog: IBlog) => {
    router.push(generateRoute(TARGET_ROUTES.editBlog, { id: blog.id }));
  };

  const handleView = useCallback(
    (blog: IBlog) => {
      window.open(
        `/${blog.locale}${generateRoute(type === 'personal' ? BLOG_ROUTES.personBlogDetail : BLOG_ROUTES.blogDetail, {
          username: blog.author?.username,
          slug: blog.slug,
        })}`,
        '_blank'
      );
    },
    [type]
  );

  const handlePreview = (blog: IBlog) => {
    window.open(
      `/${blog.locale}${generateRoute(TARGET_ROUTES.previewBlog, {
        id: blog.id,
      })}`,
      '_blank'
    );
  };

  const handlePublish = async (param: { note?: string }, item: IBlog, action: 'publish' | 'unpublish') => {
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
      sticky: 'left',
      cell: info => {
        const item = info?.row.original;

        return (
          <div className="flex items-start gap-2">
            {item.is_ai_generated && <AITag status={item.ai_generated_info?.status as IAITag['status']} />}
            {item.status === 'draft' &&
            type === 'org' &&
            (!item.published_blog || item.unpublished?.some(blog => blog.version === item.version)) ? (
              <Button variant="link" onClick={() => handleEdit(item)} className="!p-0 h-full w-full justify-start">
                <p className="mcaption-regular14 truncate text-wrap text-start text-primary underline">
                  {info.getValue() as string}
                </p>
              </Button>
            ) : (
              <p className="mcaption-regular14 truncate text-wrap text-start">{info.getValue() as string}</p>
            )}
          </div>
        );
      },
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
      header: tBlogs('language'),
      accessorKey: 'locale',
      cell: locale => <p className="mcaption-regular14 break-word">{languages[locale.getValue() as LanguageCode]}</p>,
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
      cell: date => <>{formatDateHourMinute(date.getValue() as number)}</>,
    },
    {
      header: tBlogs('publishDate'),
      size: 200,
      cell: info => {
        const date = info.row.original.published_blog?.at(-1)?.pub_date;
        return <>{date ? formatDateHourMinute(date) : <Separator className="m-auto h-0.5 w-2 bg-primary" />}</>;
      },
    },
    {
      header: tGeneral('status'),
      cell: info => {
        const item = info.row.original;
        const status = item.published_blog?.some(blog => blog.version === item.version) ? 'published' : 'unpublished';

        return (
          <Badge variant={generateVariantBadge(status as keyof BadgeVariant)} className="capitalize">
            {tGeneral(`statusVariants.${status}`)}
          </Badge>
        );
      },
    },
    {
      header: tGeneral('actions'),
      align: 'center',
      sticky: 'right',
      size: 200,
      cell: info => {
        const item = info.row.original;
        const action = item.published_blog?.some(blog => blog.version === item.version) ? 'unpublish' : 'publish';

        return (
          <div className="flex w-full gap-2">
            {action !== 'unpublish' ? (
              <Button
                variant="outline"
                className="border border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={() => {
                  handlePreview(item);
                }}
              >
                {tGeneral('preview')}
              </Button>
            ) : (
              <Button
                variant="outline"
                className="border border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={() => {
                  handleView(item);
                }}
              >
                {tGeneral('view')}
              </Button>
            )}

            <PublishButton
              onlyText
              action={action}
              desc={tBlogs(action === 'unpublish' ? 'unpublishBlogDes' : 'publishBlogDes')}
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
    <div className={cn('p-4', className)}>
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
    </div>
  );
}
