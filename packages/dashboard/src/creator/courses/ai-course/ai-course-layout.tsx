import { Breadcrumb } from '@oe/ui/components/breadcrumb';
import { cn } from '@oe/ui/utils/cn';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import { AICourseNavMenu } from './_components/ai-course-nav';

export default function AICourseLayout({ children }: { children: ReactNode }) {
  const tCourses = useTranslations('courses');

  const breadcrumbs = [
    {
      label: tCourses('title'),
    },
    {
      label: tCourses('aiCourse.aiCreation'),
      disabled: true,
    },
  ];
  return (
    <div className="flex h-full flex-col">
      <div className="relative flex flex-wrap items-center justify-between gap-2 px-4 lg:justify-center">
        <Breadcrumb
          className="lg:-translate-y-1/2 top-1/2 left-0 lg:absolute lg:translate-x-4"
          items={breadcrumbs}
          dashboard="creator"
        />

        <AICourseNavMenu />
      </div>
      <div className="grow overflow-hidden rounded p-4">
        <div className={cn('scrollbar m-auto h-full max-w-4xl overflow-auto rounded-xl bg-background p-4 md:px-8')}>
          {children}
        </div>
      </div>
    </div>
  );
}
