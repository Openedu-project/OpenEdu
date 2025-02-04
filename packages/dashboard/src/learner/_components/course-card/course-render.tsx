'use client';

import type { ICourseOutline } from '@oe/api/types/course/course';
import type { TMyCourseStatus } from '@oe/api/types/my-learning-space';
import NotStarted from '@oe/assets/icons/not-started';
import { CircleProgressBar } from '@oe/ui/components/circle-progress-bar';
import { PaymentButton } from '@oe/ui/components/payment-button';
import { RatingStars } from '@oe/ui/components/rating-stars';
import { WishlistButton } from '@oe/ui/components/wishlist-button';
import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function CourseRender({
  courseData,
  courseStatus,
}: {
  courseData: ICourseOutline;
  courseStatus: TMyCourseStatus;
}) {
  const t = useTranslations('myLearningSpace.myCourses');

  const { levels, learner_count, rating, learning_progress_overview } = courseData;
  const completed_lessons = learning_progress_overview?.completed_lessons ?? 0;
  const total_lessons = learning_progress_overview?.total_lessons ?? 0;
  // const current_section = learning_progress_overview?.current_section;
  const current_lesson = learning_progress_overview?.current_lesson;

  function WishlistCourseContent() {
    return (
      <>
        <div className="mcaption-regular12 flex justify-between gap-2 text-content-neutral-color-content-neutral-light400">
          <span>
            {levels?.[0]?.name} &#x2022;
            {learner_count}
            {learner_count && learner_count > 1 ? 'learners' : 'learner'}
          </span>
          <div>
            <RatingStars rating={rating ?? 0} />
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <PaymentButton className="mbutton-regular16 h-fit flex-grow" courseData={courseData as ICourseOutline} />

          <WishlistButton
            entityId={courseData?.cuid}
            bookmarkId={courseData?.bookmark?.id ?? ''}
            isWishlist={courseData?.is_wishlist}
            entityType="course"
            onSuccess={async () => {
              // await mutate?.();
            }}
          />
        </div>
      </>
    );
  }

  function InProgressCourseContent() {
    const progressPercent = total_lessons > 0 ? Math.floor((completed_lessons / total_lessons) * 100) : 0;

    return (
      <div className="flex items-center gap-3">
        <CircleProgressBar progress={progressPercent} size="lg" />
        <div className="flex flex-1 flex-col justify-center">
          <span className="mcaption-regular9">{t('currentLesson')}</span>
          <p className="mcaption-semibold12 line-clamp-1 text-primary">{current_lesson?.title}</p>
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
