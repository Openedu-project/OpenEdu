import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import backgroundCongrat from '@oe/assets/images/learning-page/congratulation.png';
import backgroundStaytuned from '@oe/assets/images/learning-page/stay-tuned.png';
import { PLATFORM_ROUTES } from '@oe/core/utils/routes';
import { Link } from '#common/navigation';
import { Image } from '#components/image';
import { Modal } from '#components/modal';
import { Button } from '#shadcn/button';
import { useLessonLearningStore } from '../_store/learning-store';

type NotiType = 'completed_course' | 'completed_all_lessons' | 'not_completed_lessons_before';

interface CourseNotiProps {
  open: boolean;
  currentLessonIndex: number;
  totalItems: number;
  checkNextLesson: boolean;
  courseIsCompleted?: boolean;
  onReturnToClass: () => void;
}

interface ModalConfig {
  type: NotiType;
  title: string;
  description: string;
  backgroundSrc: string;
  buttonType: 'explore' | 'return';
}

const MODAL_CONFIGS: Record<NotiType, ModalConfig> = {
  completed_course: {
    type: 'completed_course',
    title: 'congratulation',
    description: 'completedCourse',
    backgroundSrc: backgroundCongrat?.src,
    buttonType: 'explore',
  },
  completed_all_lessons: {
    type: 'completed_all_lessons',
    title: 'greatFinish',
    description: 'bringUpcomingLessons',
    backgroundSrc: backgroundStaytuned?.src,
    buttonType: 'explore',
  },
  not_completed_lessons_before: {
    type: 'not_completed_lessons_before',
    title: 'prevNotCompleted',
    description: 'notCompletedYet',
    backgroundSrc: backgroundStaytuned?.src,
    buttonType: 'return',
  },
} as const;

export default function CompleteCourseNotiModal({
  open,
  currentLessonIndex,
  totalItems,
  checkNextLesson,
  courseIsCompleted = false,
  onReturnToClass,
}: CourseNotiProps) {
  const t = useTranslations('learningPage.courseNotiModal');
  const { isAllLessonsCompleted } = useLessonLearningStore();

  const notiType = useMemo((): NotiType => {
    const isLastLesson = currentLessonIndex === totalItems - 1;
    const allLessonsCompleted = isAllLessonsCompleted();

    if (!isLastLesson) {
      return 'not_completed_lessons_before';
    }

    if (courseIsCompleted) {
      return allLessonsCompleted ? 'completed_course' : 'not_completed_lessons_before';
    }

    if (!checkNextLesson) {
      return 'not_completed_lessons_before';
    }

    return allLessonsCompleted ? 'completed_all_lessons' : 'not_completed_lessons_before';
  }, [currentLessonIndex, totalItems, courseIsCompleted, checkNextLesson, isAllLessonsCompleted]);

  const modalConfig = MODAL_CONFIGS[notiType];

  const renderActionButton = () => {
    if (modalConfig.buttonType === 'explore') {
      return (
        <Link
          href={PLATFORM_ROUTES.courses}
          className="!text-primary-foreground rounded-md bg-primary px-4 py-2 text-sm hover:bg-primary/90 hover:no-underline"
        >
          {t('exploreNewCourse')}
        </Link>
      );
    }

    return <Button onClick={onReturnToClass}>{t('returnToClass')}</Button>;
  };

  return (
    <Modal
      open={open}
      onClose={onReturnToClass}
      title={false}
      hasCloseIcon
      hasCancelButton={false}
      contentClassName="py-4 px-0 h-full"
      className="h-[640px] max-h-[80%] w-[720px] max-w-full"
    >
      <div className="relative h-full">
        <h2 className="-translate-x-1/2 giant-iheading-bold20 md:giant-iheading-bold24 absolute top-0 left-1/2 z-10 w-[80%] text-center text-primary capitalize">
          {t(modalConfig.title)}
        </h2>
        <Image
          src={modalConfig.backgroundSrc}
          alt={t(modalConfig.title)}
          noContainer
          fill
          sizes="(max-width: 768px) 100vw"
          className="absolute top-0 left-0"
        />
        <div className="absolute right-1/2 bottom-0 flex w-full translate-x-1/2 flex-col items-center gap-6">
          <p className="max-w-[80%] text-center">{t(modalConfig.description)}</p>
          {renderActionButton()}
        </div>
      </div>
    </Modal>
  );
}
