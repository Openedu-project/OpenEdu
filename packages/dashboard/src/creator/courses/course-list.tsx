import { DashboardMainPageLayout } from '@oe/ui/common/layout';
import { ButtonDropdown } from '@oe/ui/components/button-dropdown';
// import { NavigationDialog } from '@oe/ui/components/dialog';
import { PlusIcon, SparklesIcon, YoutubeIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Courses from './course-table/course-table';

export default function CourseListPagge() {
  const tDashboard = useTranslations('dashboard');
  const tCourses = useTranslations('courses');

  return (
    <>
      <DashboardMainPageLayout
        dashboard="creator"
        breadcrumbs={[{ label: tDashboard('courses.title') }]}
        header={
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
        }
      >
        <Courses />
      </DashboardMainPageLayout>
      {/* <NavigationDialog /> */}
    </>
  );
}
