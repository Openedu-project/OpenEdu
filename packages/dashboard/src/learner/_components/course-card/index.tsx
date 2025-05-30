import type { ICourseOutline } from '@oe/api/types/course/course';
import type { IMyCourseResponse, TMyCourseStatus } from '@oe/api/types/my-learning-space';
import { Link } from '@oe/ui/common/navigation';
import { Card, CardContent } from '@oe/ui/shadcn/card';
import { cn } from '@oe/ui/utils/cn';
import { createCourseUrl } from '@oe/ui/utils/course-url';
import type { KeyedMutator } from 'swr';
import { CourseDetails } from './course-detail';
import CourseRender from './course-render';
import { CourseThumbnail } from './course-thumbnail';

interface ICourseCard {
  courseData: ICourseOutline;
  mutate?: KeyedMutator<IMyCourseResponse | null>;
  showThumbnail?: boolean;
  showOwner?: boolean;
  contentClassName?: string;
  courseStatus: TMyCourseStatus;
  className?: string;
}

const getCoursePath = (courseData: ICourseOutline, courseStatus: TMyCourseStatus): string => {
  const { slug, learning_progress_overview } = courseData;
  const { current_section, current_lesson } = learning_progress_overview ?? {};

  return current_section && current_lesson && courseStatus === 'in_progress'
    ? createCourseUrl('learning', {
        slug,
        section: current_section.uid,
        lesson: current_lesson.uid,
      })
    : createCourseUrl('detail', { slug });
};

export default function CourseCard({
  courseData,
  className,
  contentClassName = '',
  mutate,
  showThumbnail = true,
  courseStatus,
}: ICourseCard) {
  const { org } = courseData;
  const basePath = process.env.NEXT_PUBLIC_APP_ROOT_DOMAIN_NAME;
  const isExternal = org?.domain !== basePath;
  const coursePath = getCoursePath(courseData, courseStatus);
  const externalDomain = org?.domain ? `https://${org.domain}` : '';

  return (
    <div className={cn('group relative w-full', className)}>
      <Link
        href={`${externalDomain}${coursePath}`}
        external={isExternal}
        target={isExternal ? '_blank' : undefined}
        className="h-full w-full p-0 hover:no-underline"
      >
        <Card
          id={courseData?.id}
          className={cn(
            'mx-auto flex h-full min-h-[280px] w-full flex-col gap-3 rounded-m border-[3px] border-white p-2 shadow-md hover:border-primary',
            contentClassName
          )}
        >
          {showThumbnail && <CourseThumbnail courseData={courseData} />}
          <CardContent className="flex basis-full flex-col gap-3 p-0 text-foreground">
            <CourseDetails courseData={courseData} />
            <CourseRender courseData={courseData} courseStatus={courseStatus} mutate={mutate} />
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
