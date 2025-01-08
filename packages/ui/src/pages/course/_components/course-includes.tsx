import type { ICourseOutline } from '@oe/api/types/course/course';
import Book from '@oe/assets/icons/book';
import MedalStar from '@oe/assets/icons/medal-start';
import MessageQuestion from '@oe/assets/icons/message-question';
import { VideoSquare } from '@oe/assets/icons/video-square';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import { cn } from '#utils/cn';
import CourseResources from './course-resources';
import { CourseSection } from './course-section';

interface CourseFeature {
  key: string;
  condition: boolean;
  icon: ReactNode;
  content: ReactNode;
}

export default function CourseIncludes({
  className,
  courseOutline,
}: {
  className?: string;
  courseOutline: ICourseOutline;
}) {
  const tCourse = useTranslations('courseOutline.thisCourseIncludes');

  const { quiz_count, video_count, active_section, active_lesson, has_certificate, docs } = courseOutline;

  const filteredResources = docs?.filter(doc => !doc?.mime?.includes('video'));

  const courseFeatures: CourseFeature[] = [
    {
      condition: has_certificate,
      icon: <MedalStar width={20} height={20} color="hsl(var(--muted-foreground))" />,
      content: <span>{tCourse('completionCertificate')}</span>,
      key: 'has_certificate',
    },
    {
      condition: quiz_count > 0,
      icon: <MessageQuestion width={20} height={20} color="hsl(var(--muted-foreground))" />,
      content: <span>{tCourse('totalQuizzes', { total: quiz_count ?? 0 })}</span>,
      key: 'total_quiz',
    },
    {
      condition: active_section > 0 || active_lesson > 1,
      icon: <Book width={20} height={20} color="hsl(var(--muted-foreground))" />,
      content: (
        <span>
          {active_section > 1
            ? tCourse('totalSections', { total: active_section })
            : tCourse('totalSection', { total: active_section })}
          {active_section > 1 && active_lesson > 1 && <span className="mr-1">,</span>}
          {active_lesson > 1
            ? tCourse('totalLessons', { total: active_lesson })
            : tCourse('totalLessons', { total: active_lesson })}
        </span>
      ),
      key: 'total_section_lesson',
    },
    {
      condition: video_count > 0,
      icon: <VideoSquare width={20} height={20} color="hsl(var(--muted-foreground))" />,
      content: <span>{tCourse('totalVideos', { total: video_count ?? 0 })}</span>,
      key: 'total_video',
    },
  ];

  const hasAnyFeature = courseFeatures.some(feature => feature.condition);

  if (!hasAnyFeature) {
    return null;
  }

  return (
    <>
      <hr className="mb-6 md:hidden" />
      <CourseSection title={tCourse('title')} containerClass={cn(className)}>
        <div className="mcaption-regular14 grid grid-cols-1 gap-1">
          {courseFeatures?.map(
            feature =>
              feature.condition && (
                <div key={feature.key} className="flex items-center gap-3">
                  {feature.icon}
                  {feature.content}
                </div>
              )
          )}

          {filteredResources?.length > 0 && <CourseResources docs={filteredResources} />}
        </div>
      </CourseSection>
    </>
  );
}
