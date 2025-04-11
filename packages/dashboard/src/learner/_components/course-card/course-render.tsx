'use client';

import type { ICourseOutline } from '@oe/api';
import type { IMyCourseResponse, TMyCourseStatus } from '@oe/api';
import { NotStarted } from '@oe/assets';
import { CircleProgressBar } from '@oe/ui';
import { CoursePrice } from '@oe/ui';
import { WishlistButton } from '@oe/ui';
import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { KeyedMutator } from 'swr';
// import CoursePrice from '../../../creator/courses/course-table/course-price';

export function CourseRender({
  courseData,
  courseStatus,
  mutate,
}: {
  courseData: ICourseOutline;
  courseStatus: TMyCourseStatus;
  mutate?: KeyedMutator<IMyCourseResponse | null>;
}) {
  const t = useTranslations('myLearningSpace.myCourses');

  const { learning_progress_overview } = courseData;
  const completed_lessons = learning_progress_overview?.completed_lessons ?? 0;
  const total_lessons = learning_progress_overview?.total_lessons ?? 0;
  const current_lesson = learning_progress_overview?.current_lesson;

  function WishlistCourseContent() {
    return (
      <div className="flex items-center justify-between gap-2">
        <CoursePrice priceSettings={courseData?.price_settings} variant="inline" />

        <WishlistButton
          entityId={courseData?.cuid}
          bookmarkId={courseData?.bookmark?.id ?? ''}
          isWishlist={courseData?.is_wishlist}
          entityType="course"
          onSuccess={async () => {
            await mutate?.();
          }}
        />
      </div>
    );
  }

  function InProgressCourseContent() {
    const progressPercent = total_lessons > 0 ? Math.floor((completed_lessons / total_lessons) * 100) : 0;

    return (
      <div className="flex items-center gap-3">
        <CircleProgressBar progress={progressPercent} size="lg" />
        <div className="flex w-full flex-1 flex-col justify-center">
          <span className="mcaption-regular9">{t('currentLesson')}</span>
          <p className="mcaption-semibold12 line-clamp-1 w-full whitespace-normal text-primary">
            {current_lesson?.title}
          </p>
        </div>
      </div>
    );
  }

  function CompletedCourse() {
    return (
      <div className="flex items-center gap-3">
        <div className="grid h-8 w-8 items-center justify-items-center rounded-full bg-green-600">
          <Check color="white" size={20} />
        </div>
        <p className="giant-iheading-semibold14 text-green-600">{t('finish')}</p>
      </div>
    );
  }

  function NotStartedCourse() {
    return (
      <div className="flex items-center gap-3">
        <NotStarted />
        <p className="giant-iheading-semibold14 text-foreground/60">{t('notStarted')}</p>
      </div>
    );
  }

  const renderCourse = (courseStatus: TMyCourseStatus) => {
    switch (courseStatus) {
      case 'completed': {
        return <CompletedCourse />;
      }

      case 'in_progress': {
        return <InProgressCourseContent />;
      }

      case 'not_started': {
        return <NotStartedCourse />;
      }

      case 'wishlist': {
        return <WishlistCourseContent />;
      }

      default: {
        return null;
      }
    }
  };

  return <>{renderCourse(courseStatus)}</>;
}
