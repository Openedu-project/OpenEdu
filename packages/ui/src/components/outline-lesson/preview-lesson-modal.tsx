import { Modal } from '#components/modal';
import { LessonContentBlocks } from '../../pages/learning/_components/lesson-content/lesson-content-blocks';
import { LearningProviders } from '../../pages/learning/_context/learning-context';

import type { ICourseOutline } from '@oe/api';
import { useGetLessonLearn } from '@oe/api';
import { NoDataAvailable } from '#components/no-data-available';
import { Spinner } from '#components/spinner';

interface PreviewLessonProps {
  lessonUid: string;
  sectionUid: string;
  courseData: ICourseOutline;
  isOpen: boolean;
  onClose: () => void;
}

const PreviewLessonModal = ({ lessonUid, sectionUid, courseData, isOpen, onClose }: PreviewLessonProps) => {
  const { dataLessonLearn, isLoadingLessonLearn } = useGetLessonLearn({
    id: lessonUid,
    cid: courseData?.id,
  });

  return (
    <Modal
      title="Preview lesson"
      open={isOpen}
      onClose={onClose}
      hasCloseIcon
      className="min-w-[50vw]"
      contentClassName="w-full h-screen max-h-[calc(100dvh-50%)]"
    >
      {isLoadingLessonLearn ? (
        <Spinner />
      ) : dataLessonLearn?.contents ? (
        <div className="h-full w-full">
          <LearningProviders course={courseData} initialSection={sectionUid} initialLesson={lessonUid}>
            <LessonContentBlocks
              course_data={courseData}
              lesson_uid={lessonUid}
              section_uid={sectionUid}
              contents={dataLessonLearn?.contents}
              isPreview
            />
          </LearningProviders>
        </div>
      ) : (
        <NoDataAvailable />
      )}
    </Modal>
  );
};

export { PreviewLessonModal, type PreviewLessonProps };
