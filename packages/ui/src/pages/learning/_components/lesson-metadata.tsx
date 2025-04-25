'use client';

import { useTranslations } from 'next-intl';
import type { HTMLAttributes } from 'react';
import { Link, useRouter } from '#common/navigation';
import { cn } from '#utils/cn';
import { createCourseUrl } from '#utils/course-url';
import { useProgress } from '../_context/progress-context';
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

  const {
    state: { mergedProgress, isNavigating },
    getLessonStatus,
    setIsNavigatingLesson,
  } = useProgress();
  // const { setCurrentLesson } = useCurrentLesson();

  const currentLessonIndex = getLessonGlobalIndex(mergedProgress, lessonUid);
  const totalItems = getTotalLessons(mergedProgress);

  const checkNextLesson = getLessonStatus(currentLessonIndex + 1);
  const checkPreviousLesson = getLessonStatus(currentLessonIndex - 1);

  const handleNavigateLesson = (direction: 'prev' | 'next') => {
    let newIndex = currentLessonIndex;

    setIsNavigatingLesson(true);

    if (direction === 'prev') {
      newIndex = currentLessonIndex > 0 ? currentLessonIndex - 1 : totalItems;
    } else if (direction === 'next') {
      newIndex = currentLessonIndex < totalItems ? currentLessonIndex + 1 : 0;
    }

    const lessonInfo = getUidByLessonIndex(mergedProgress, newIndex);

    if (lessonInfo) {
      // setCurrentLesson(lessonInfo.sectionUid, lessonInfo.lessonUid);

      const learningPageUrl = createCourseUrl('learning', {
        slug,
        section: lessonInfo.sectionUid,
        lesson: lessonInfo.lessonUid,
      });

      return router.push(learningPageUrl);
    }
  };

  return (
    <div {...props} className={cn('flex flex-col justify-between gap-2 md:flex-row', props.className)}>
      <div className="flex flex-col">
        <h3 className="giant-iheading-semibold16 md:giant-iheading-semibold24 mb-1 text-primary md:mb-3 md:line-clamp-1">
          {title}
        </h3>

        <Link
          href={courseHref}
          className="giant-iheading-semibold16 md:giant-iheading-semibold20 !text-foreground/85 line-clamp-1 h-fit w-fit whitespace-normal border-none p-0 hover:no-underline"
        >
          {tLearningPage('course', { courseName })}
        </Link>
      </div>

      <NavigationButtons
        mode="lesson"
        currentIndex={currentLessonIndex}
        totalItems={totalItems}
        onNavigate={handleNavigateLesson}
        disableNext={!checkNextLesson || currentLessonIndex === totalItems || isNavigating}
        disablePrev={currentLessonIndex === 0 || !checkPreviousLesson || isNavigating}
        t={tLessonNavigate}
      />
    </div>
  );
};

export { LessonMetadata };
