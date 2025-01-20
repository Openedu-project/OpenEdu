'use client';

import { useTranslations } from 'next-intl';
import type { HTMLAttributes } from 'react';
import { Link, useRouter } from '#common/navigation';
import { LastUpdated } from '../../_components/last-updated';
import { createCourseUrl } from '../../_utils/course-url';
import { useLessonLearningStore } from '../_store/learning-store';
import { getLessonGlobalIndex, getTotalLessons, getUidByLessonIndex } from '../_utils/utils';
import { NavigationButtons } from './navigate-button';

interface ILessonMetadataProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  courseName: string;
  slug: string;
  updateAt: number;
  lessonUid: string;
}

const LessonMetadata = ({ title, courseName, slug, updateAt, lessonUid, ...props }: ILessonMetadataProps) => {
  const router = useRouter();

  const tLessonNavigate = useTranslations('learningPage.navigation');
  const tLearningPage = useTranslations('learningPage');

  const courseHref = createCourseUrl('detail', { slug });

  const { sectionsProgressData, getLessonStatus } = useLessonLearningStore();
  const currentLessonIndex = getLessonGlobalIndex(sectionsProgressData, lessonUid);
  const totalItems = getTotalLessons(sectionsProgressData);

  const checkNextLesson = getLessonStatus(currentLessonIndex + 1);
  const checkPreviousLesson = getLessonStatus(currentLessonIndex - 1);

  const handleNavigateLesson = (direction: 'prev' | 'next') => {
    let newIndex = currentLessonIndex;

    if (direction === 'prev') {
      newIndex = currentLessonIndex > 0 ? currentLessonIndex - 1 : totalItems;
    } else if (direction === 'next') {
      newIndex = currentLessonIndex < totalItems ? currentLessonIndex + 1 : 0;
    }

    const lessonInfo = getUidByLessonIndex(sectionsProgressData, newIndex);

    const learningPageUrl =
      lessonInfo &&
      createCourseUrl('learning', {
        slug,
        section: lessonInfo?.sectionUid,
        lesson: lessonInfo?.lessonUid,
      });

    return learningPageUrl && router.push(learningPageUrl);
  };

  return (
    <div {...props}>
      <div className="flex justify-between gap-2">
        <h3 className="giant-iheading-semibold16 md:giant-iheading-semibold24 mb-1 text-primary md:mb-3 md:line-clamp-1">
          {title}
        </h3>

        <NavigationButtons
          mode="lesson"
          currentIndex={currentLessonIndex}
          totalItems={totalItems}
          onNavigate={handleNavigateLesson}
          disableNext={!checkNextLesson || currentLessonIndex === totalItems}
          disablePrev={currentLessonIndex === 0 || !checkPreviousLesson}
          t={tLessonNavigate}
        />
      </div>
      <Link
        href={courseHref}
        className="giant-iheading-semibold16 md:giant-iheading-semibold20 !text-foreground/85 mb-1 line-clamp-1 h-fit w-fit border-none p-0 hover:no-underline md:mb-3"
      >
        {tLearningPage('course', { courseName })}
      </Link>
      <LastUpdated update_at={updateAt} />
    </div>
  );
};

export default LessonMetadata;
