'use client';
import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import { DashboardHeaderCard } from '@oe/ui/common/layout';
import { ButtonDropdown } from '@oe/ui/components/button-dropdown';
import { Table } from '@oe/ui/components/table';
import { PlusIcon, SparklesIcon, YoutubeIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Courses() {
  const tDashboard = useTranslations('dashboard');
  const tCourses = useTranslations('courses');

  const columns = [
    {
      header: 'Name',
      accessorKey: 'name',
    },
  ];

  return (
    <>
      <DashboardHeaderCard dashboard="creator" breadcrumbs={[{ label: tDashboard('courses.title') }]}>
        <div className="flex flex-wrap items-center justify-between">
          <h1 className="text-2xl">{tCourses('title')}</h1>
          <ButtonDropdown
            label={tCourses('create.title')}
            href="/creator"
            icon={<PlusIcon className="mr-2 h-4 w-4" />}
            options={[
              {
                label: tCourses('create.title'),
                value: 'create',
                icon: <PlusIcon className="mr-2 h-4 w-4" />,
                href: '/creator',
              },
              {
                label: tCourses('create.youtube'),
                value: 'youtube',
                icon: <YoutubeIcon className="mr-2 h-4 w-4" />,
                href: '/creator/youtube',
              },
              {
                label: tCourses('create.ai'),
                value: 'ai',
                icon: <SparklesIcon className="mr-2 h-4 w-4" />,
                href: '/creator/ai',
              },
            ]}
          />
        </div>
      </DashboardHeaderCard>
      <div className="rounded bg-background p-4">
        <Table columns={columns} api={API_ENDPOINT.COURSES} tableOptions={{ manualPagination: true }} />
      </div>
    </>
  );
}
