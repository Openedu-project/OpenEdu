'use client';
import { deleteBlog, publishBlog, unpublishBlog } from '@oe/api/services/blog';
import type { IBlog } from '@oe/api/types/blog';
import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import type { HTTPErrorMetadata } from '@oe/api/utils/http-error';
import { formatDateHourMinute } from '@oe/core/utils/datetime';
import { BLOG_ADMIN_ROUTES, BLOG_ROUTES, generateRoute } from '@oe/core/utils/routes';
import { type LanguageCode, languages } from '@oe/i18n/languages';
import { EditIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useRef } from 'react';
import { Link, useRouter } from '#common/navigation';
import { AITag, type IAITag } from '#components/ai-tag';
import { BlogTableItemActions, URLGenerateModal } from '#components/blog';
import type { FilterOption } from '#components/filter-search';
import { PublishButton } from '#components/publish-button';
import { type ColumnDef, Table, type TableRef } from '#components/table';
import { Badge, type BadgeProps, type BadgeVariant } from '#shadcn/badge';
import { Button, buttonVariants } from '#shadcn/button';
import { Separator } from '#shadcn/separator';
import { toast } from '#shadcn/sonner';
import { cn } from '#utils/cn';

const generateVariantBadge = (status: keyof BadgeProps['variant']) => {
  const obj = {
    published: 'success',
    reviewing: 'default',
    unpublished: 'destructive',
    generating: 'secondary',
    draft: 'outline',
    failed: 'error',
  };

  return obj?.[status];
};

export default function MyBlogManagement({
  type,
  canUnpublish = false,
  AIButton = false,
}: { type: 'personal' | 'org'; canUnpublish?: boolean; AIButton?: boolean }) {
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
        `/${blog.locale}${generateRoute(type === 'personal' ? BLOG_ROUTES.personBlogDetail : BLOG_ROUTES.blogDetail, { username: blog.author?.username, slug: blog.slug })}`,
        '_blank'
      );
    },
    [type]
  );

  const handlePreview = (blog: IBlog) => {
    window.open(`/${blog.locale}${generateRoute(TARGET_ROUTES.previewBlog, { id: blog.id })}`, '_blank');
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

  const handleDeleteBlog = async (blog: IBlog) => {
    try {
      const res = await deleteBlog(undefined, blog.cuid);

      if (res) {
        toast.success(tBlogs('deleteSuccessfully'));
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
      size: 300,
      sticky: 'left',
      cell: info => {
        const item = info?.row.original;

        return (
          <div className="flex items-start gap-2">
            {item.is_ai_generated && <AITag status={item.ai_generated_info?.status as IAITag['status']} />}
            {item.status === 'draft' &&
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
      header: tBlogs('generateFrom'),
      size: 300,
      align: 'center',
      cell: info => {
        const row = info.row.original;
        return row.ai_generated_info?.link ? (
          <p className="mcaption-regular14 break-word w-full text-start">{row.ai_generated_info?.link as string}</p>
        ) : (
          <Separator className="m-auto h-0.5 w-2 bg-primary" />
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
        const status = item?.published_blog?.some(blog => blog.version === item.version)
          ? 'published'
          : item?.reviewing_blog
            ? 'reviewing'
            : item?.status;

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
      size: type === 'personal' ? 220 : 150,
      cell: info => {
        const item = info.row.original;
        return (
          <div className="flex w-full flex-wrap justify-center gap-2">
            {item?.published_blog?.some(blog => blog.version === item.version) ? (
              <>
                <Button
                  variant="outline"
                  className="border-primary text-primary"
                  onClick={() => {
                    handleView(item);
                  }}
                >
                  {tGeneral('view')}
                </Button>

                {canUnpublish && (
                  <PublishButton
                    action="unpublish"
                    onlyText
                    desc={tBlogs('unpublishBlogDes')}
                    onConfirm={(param: { note?: string }) => handlePublish(param, item, 'unpublish')}
                  />
                )}
              </>
            ) : item.status === 'failed' ? (
              <Button variant="destructive" onClick={() => console.log('delete')}>
                {tGeneral('delete')}
              </Button>
            ) : item.reviewing_blog ? (
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
              item.status === 'draft' && (
                <BlogTableItemActions
                  blogData={item}
                  handleDelete={handleDeleteBlog}
                  handlePreview={handlePreview}
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
        <h2 className="giant-iheading-semibold32 tracking-tight md:text-3xl">{tBlogs('blogManagement')}</h2>
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
