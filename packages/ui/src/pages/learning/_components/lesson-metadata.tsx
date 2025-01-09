'use client';

import { useTranslations } from 'next-intl';
import type { HTMLAttributes } from 'react';
import { Link } from '#common/navigation';
import { LastUpdated } from '../../_components/last-updated';
import { createCourseUrl } from '../../_utils/course-url';
import { NavigationButtons } from './navigate-button';

interface ILessonMetadataProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  courseName: string;
  slug: string;
  updateAt: number;
}

const LessonMetadata = ({ title, courseName, slug, updateAt, ...props }: ILessonMetadataProps) => {
  const tLessonNavigate = useTranslations('learningPage.navigation');

  const courseHref = createCourseUrl('detail', { slug });

  return (
    <div {...props}>
      <div className="flex justify-between gap-2">
        <h3 className="giant-iheading-semibold16 md:giant-iheading-semibold24 mb-0 text-primary md:line-clamp-1">
          {title}
        </h3>

        <NavigationButtons
          mode="lesson"
          // currentIndex={currentLessonIndex}
          // totalItems={lessonIds.length}
          // onNavigate={handleNavigateLesson}
          t={tLessonNavigate}
        />
      </div>
      <Link
        href={courseHref}
        className="giant-iheading-semibold16 md:giant-iheading-semibold20 !text-foreground/85 w-fit border-none p-0 hover:no-underline md:line-clamp-1"
      >
        Course: {courseName}
      </Link>
      <LastUpdated update_at={updateAt} />
    </div>
  );
};

export default LessonMetadata;
