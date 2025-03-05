'use client';

import { usePutEnableCourse } from '@oe/api/hooks/useCourse';
import { useGetOrganizationByDomain } from '@oe/api/hooks/useOrganization';
import type { ICoursePublished, IEnableCourseRequest } from '@oe/api/types/course/course';
import type { IPagination } from '@oe/api/types/pagination';
import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import { createAPIUrl } from '@oe/api/utils/fetch';
import type { HTTPErrorMetadata } from '@oe/api/utils/http-error';
import { formatDateHourMinute } from '@oe/core/utils/datetime';
import { PLATFORM_ROUTES } from '@oe/core/utils/routes';
import { formatPrice } from '@oe/core/utils/utils';
import { Link } from '@oe/ui/common/navigation';
import { BadgeCourseVerion } from '@oe/ui/components/badge-course-version';
import { type ColumnDef, Table, type TableRef } from '@oe/ui/components/table';
import { Button } from '@oe/ui/shadcn/button';
import { toast } from '@oe/ui/shadcn/sonner';
import { Tabs, TabsList, TabsTrigger } from '@oe/ui/shadcn/tabs';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useRef, useState } from 'react';

type TypeOrg = 'org' | 'root';

export default function OutlineCourseManagement({
  isOpenEdu,
}: {
  isOpenEdu: boolean;
}) {
  const t = useTranslations('coursesManagement');
  const tError = useTranslations('errors');

  const tableRef = useRef<TableRef<ICoursePublished>>(null);

  const { organizationByDomain } = useGetOrganizationByDomain();

  const orgId = organizationByDomain?.id;
  const [pagination, setPagination] = useState<IPagination>({
    page: 1,
    per_page: 10,
  });

  const [activeTab, setActiveTab] = useState<TypeOrg>(isOpenEdu ? 'root' : 'org');
  const orgIdParam = activeTab === 'org' ? orgId : undefined;

  const { triggerPutEnableCourse } = usePutEnableCourse();

  const handleEnableCourse = useCallback(
    async (data: IEnableCourseRequest) => {
      try {
        const res = await triggerPutEnableCourse(data);

        if (!res) {
          throw new Error('Enable failed');
        }

        toast.success(t('toastSuccess'));
        tableRef.current?.mutateAndClearCache?.();
      } catch (error) {
        console.error(error);
        toast.error(tError((error as HTTPErrorMetadata).code.toString()));
      }
    },
    [t, tError, triggerPutEnableCourse]
  );

  const columns: ColumnDef<ICoursePublished>[] = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 200,
      },
      {
        accessorKey: 'name',
        header: t('name'),
        size: 250,
        cell({ row }) {
          const item = row.original;

          return (
            <Link
              href={`https://${item.org_domain}${createAPIUrl({
                endpoint: PLATFORM_ROUTES.previewCourse,
                params: {
                  courseId: item.course_id,
                  orgId: item.org_id,
                },
              })}`}
              className="p-0 underline"
              target="_blank"
            >
              {item.name}
            </Link>
          );
        },
      },
      {
        accessorKey: 'version',
        header: t('version'),
        cell({ row }) {
          const item = row.original;

          return (
            <BadgeCourseVerion
              version={item.version}
              link={`https://${item.org_domain}${createAPIUrl({
                endpoint: PLATFORM_ROUTES.previewCourse,
                params: {
                  courseId: item.course_id,
                  orgId: item.org_id,
                },
              })}`}
            />
          );
        },
      },
      {
        accessorKey: 'price',
        header: t('price'),
        cell({ row }) {
          const item = row.original;

          return <span>{formatPrice(Number(item?.price), 'VND', !item.is_pay)}</span>;
        },
      },
      {
        accessorKey: 'learner_count',
        header: t('learners'),
        cell({ row }) {
          return <span>{row.getValue('learner_count') || '-'}</span>;
        },
      },
      {
        accessorKey: 'pub_date',
        header: t('publishedDate'),
        cell({ row }) {
          return <>{formatDateHourMinute(row.getValue('pub_date'))}</>;
        },
      },
      {
        id: 'actions',
        header: t('action'),
        cell({ row }) {
          const item = row.original;

          return (
            <Button
              variant={
                // activeTab === 'root'
                isOpenEdu ? (item.enable_root ? 'destructive' : 'outline') : item.enable ? 'destructive' : 'outline'
              }
              onClick={() => {
                const data = {
                  cuid: item.course_cuid,
                  id: item.course_id,
                  [isOpenEdu ? 'enable_root' : 'enable']: isOpenEdu ? !item.enable_root : !item.enable,
                };

                return handleEnableCourse(data);
              }}
            >
              {isOpenEdu ? (item.enable_root ? t('disable') : t('enable')) : item.enable ? t('disable') : t('enable')}
            </Button>
          );
        },
      },
    ],
    [t, isOpenEdu, handleEnableCourse]
  );

  const handleResetPagination = useCallback(() => {
    setPagination({ page: 1, per_page: 10 });
  }, []);

  return (
    <>
      <Tabs
        className="w-full"
        value={activeTab}
        onValueChange={value => {
          setActiveTab(value as TypeOrg);
          handleResetPagination();
        }}
      >
        <div className="mb-6 flex flex-col gap-3 rounded-b-2xl p-6 shadow-shadow-5">
          {isOpenEdu ? (
            <>
              <p>{t('description')}</p>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="root">OpenEdu</TabsTrigger>
                <TabsTrigger value="org">{t('organization')}</TabsTrigger>
              </TabsList>
            </>
          ) : (
            <p>{t('description')}</p>
          )}
        </div>

        <div className="rounded-2xl border bg-bg-base-canvas p-6 shadow-shadow-5">
          <Table
            columns={columns}
            api={API_ENDPOINT.PUBLISH_COURSES}
            hasNoColumn
            ref={tableRef}
            apiQueryParams={{
              org_id: isOpenEdu ? (activeTab === 'root' ? orgId : undefined) : orgIdParam,
              params: pagination,
              org_id_not: isOpenEdu ? orgIdParam : undefined,
            }}
            height="100%"
            filterSearchProps={{ useQueryParams: true }}
            tableOptions={{
              manualPagination: true,
            }}
          />
        </div>
      </Tabs>
    </>
  );
}
