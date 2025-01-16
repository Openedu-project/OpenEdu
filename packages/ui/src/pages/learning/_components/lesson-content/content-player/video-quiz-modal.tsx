import type { IQuizItemResponse } from '@oe/api/types/course/quiz';
import { Modal } from '#components/modal';
import ContentQuiz from '../content-quiz/content-quiz';

interface IVideoQuizModalProps {
  duration: number;
  seconds: number;
  quizzes: IQuizItemResponse[];
  course_id: string;
  shownQuizzes: string[];
}

const getQuizById = (quizzes: IQuizItemResponse[], quizId: string): IQuizItemResponse | undefined =>
  quizzes.find(quiz => quiz.id === quizId);

const VideoQuizModal = ({ quizzes, shownQuizzes, course_id }: IVideoQuizModalProps) => {
  return (
    <Modal
      open
      title=""
      className="h-screen max-h-[calc(100vh-30%)] min-h-fit w-screen min-w-[calc(100vw-100px)] lg:min-w-0 lg:max-w-[calc(100vw-40%)]"
    >
      {shownQuizzes.length > 0
        ? (() => {
            const quizId = shownQuizzes.at(-1) ?? '';
            const currentQuiz = getQuizById(quizzes, quizId);

            return currentQuiz ? (
              <ContentQuiz
                course_id={course_id}
                settings={currentQuiz.settings}
                quiz={currentQuiz}
                // triggerFunction={() => {
                //   if (quizResult) setShowQuiz(false);

                //   onComplete?.(duration, seconds, quizzes[0]?.id);
                // }}
              />
            ) : null;
          })()
        : null}
    </Modal>
  );
};

export default VideoQuizModal;
