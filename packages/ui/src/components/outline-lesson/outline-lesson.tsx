'use client';
import type { ICourseOutline } from '@oe/api/types/course/course';
import type { ILesson } from '@oe/api/types/course/segment';
import { createAPIUrl } from '@oe/api/utils/fetch';
import ArrowRight2 from '@oe/assets/icons/arrow-right-2';
import { PLATFORM_ROUTES } from '@oe/core/utils/routes';
import type { TFunction } from '@oe/i18n/types';
import { Lock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { type Ref, useState } from 'react';
import { useRouter } from '#common/navigation';
import { CircleProgressBar } from '#components/circle-progress-bar';
import { Button } from '#shadcn/button';
import { cn } from '#utils/cn';
import PreviewLessonModal from './preview-lesson-modal';

interface IOutlineLessonProps {
  index: number;
  completedPercentage?: number;
  courseSlug: string;
  sectionUid: string;
  isAvailable: boolean;
  isActive: boolean;
  lesson: ILesson;
  ref?: Ref<HTMLLIElement> | undefined;
  type?: 'learning' | 'detail';
  courseData?: ICourseOutline;
}

const LESSON_COUNT_TYPES = [
  { key: 'video_lesson', label: 'videoCount' },
  { key: 'quiz_lesson', label: 'quizCount' },
  { key: 'pdf_lesson', label: 'pdfCount' },
  { key: 'embed_lesson', label: 'embedCount' },
  { key: 'text_lesson', label: 'textCount' },
] as const;

const LessonCountDisplay = ({
  lesson,
  tCourse,
}: {
  lesson: ILesson;
  tCourse: TFunction;
}) => {
  const displayCounts = LESSON_COUNT_TYPES.map(({ key, label }) => ({
    count: lesson[`count_${key}`],
    label,
  })).filter(item => item.count > 0);

  if (displayCounts.length === 0) {
    return null;
  }

  return (
    <div className="mcaption-regular10 md:mcaption-regular12 text-primary">
      {displayCounts.map((item, index) => (
        <span key={item.label}>
          {index > 0 && <span className="mx-1">&#x2022;</span>}
          {tCourse(item.label, { count: item.count })}
        </span>
      ))}
    </div>
  );
};

const getButtonStyles = (isActive: boolean, isAvailable: boolean) =>
  cn(
    'h-fit w-full items-center gap-1 whitespace-normal rounded-2 border-[0.4px] p-2 shadow-shadow-6',
    'hover:border-primary focus:border',
    isActive ? 'border-primary' : 'border-foreground/10',
    !isAvailable && 'pointer-events-none'
  );

export const OutlineLesson = ({
  completedPercentage,
  isActive,
  isAvailable,
  lesson,
  index,
  courseSlug,
  sectionUid,
  ref,
  type = 'detail',
  courseData,
}: IOutlineLessonProps) => {
  const tCourse = useTranslations('courseOutline');
  const router = useRouter();
  const { title, uid } = lesson;

  const [openPreviewModal, setOpenPreviewModal] = useState<boolean>(false);

  const handleLessonClick = () => {
    const learningPageUrl = createAPIUrl({
      endpoint: PLATFORM_ROUTES.courseLearning,
      params: { slug: courseSlug, section: sectionUid, lesson: uid },
    });

    if (!isActive && type === 'learning') {
      router.push(learningPageUrl);
    } else if (type === 'detail') {
      setOpenPreviewModal(true);
    }
  };

  return (
    <>
      <li ref={ref}>
        <Button variant="ghost" className={getButtonStyles(isActive, isAvailable)} onClick={handleLessonClick}>
          {isAvailable ? (
            completedPercentage ? (
              <CircleProgressBar progress={completedPercentage} size="sm" />
            ) : (
              <ArrowRight2 width={16} height={16} color="var(--foreground)" />
            )
          ) : (
            <Lock size={16} />
          )}

          <div className="flex flex-1 flex-col items-start gap-[2px]">
            <span className="mcaption-regular10 md:mcaption-semibold12 text-foreground/60">
              {tCourse('lesson', { index })}
            </span>
            <span className="mbutton-semibold12 md:mbutton-semibold14 flex-1 text-left text-foreground/90">
              {title}
            </span>

            <LessonCountDisplay lesson={lesson} tCourse={tCourse} />
          </div>
        </Button>
      </li>

      {courseData && openPreviewModal && (
        <PreviewLessonModal
          isOpen={openPreviewModal}
          lessonUid={uid}
          sectionUid=""
          courseData={courseData}
          onClose={() => setOpenPreviewModal(false)}
        />
      )}
    </>
  );
};
