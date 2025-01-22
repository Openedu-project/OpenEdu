import type { ICourseOutline } from '@oe/api/types/course/course';
import type { IQuizItemResponse } from '@oe/api/types/course/quiz';
import type { IQuizSubmissionResponse } from '@oe/api/types/quiz';
import { Modal } from '#components/modal';
import ContentQuiz from '../content-quiz/content-quiz';

interface IVideoQuizModalProps {
  duration: number;
  seconds: number;
  quizzes: IQuizItemResponse[];
  course_data: ICourseOutline;
  shownQuizzes: string[];
  triggerFunction: (quizResult: IQuizSubmissionResponse) => void;
}

const getQuizById = (quizzes: IQuizItemResponse[], quizId: string): IQuizItemResponse | undefined =>
  quizzes.find(quiz => quiz.id === quizId);

const VideoQuizModal = ({ quizzes, shownQuizzes, course_data, triggerFunction }: IVideoQuizModalProps) => {
  return (
    <Modal
      open
      title={false}
      className="aspect-video h-full w-screen lg:max-w-[calc(100vw-40%)]"
      hasCancelButton={false}
      contentClassName="h-full py-4"
      hasCloseIcon={false}
    >
      {shownQuizzes.length > 0
        ? (() => {
            const quizId = shownQuizzes.at(-1) ?? '';
            const currentQuiz = getQuizById(quizzes, quizId);

            return currentQuiz ? (
              <ContentQuiz
                course_data={course_data}
                settings={currentQuiz.settings}
                quiz={currentQuiz}
                triggerFunction={triggerFunction}
              />
            ) : null;
          })()
        : null}
    </Modal>
  );
};

export default VideoQuizModal;
