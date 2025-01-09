import type { IQuizSubmissionAnswer } from '@oe/api/types/quiz';
import background from '@oe/assets/images/learning-page/quiz-ans.png';
import DetailAnswerResult from './detail-answer-result';
import QuizLayout from './quiz-layout';

interface QuizCorrectAnswerProps {
  answer: IQuizSubmissionAnswer[];
  onFinishQuiz: () => void;
}

const QuizAnsResult = ({ answer, onFinishQuiz }: QuizCorrectAnswerProps) => {
  return (
    <QuizLayout background={background.src} className="p-6">
      {answer?.length > 0 && <DetailAnswerResult onFinish={onFinishQuiz} answers={answer} />}
    </QuizLayout>
  );
};

export default QuizAnsResult;
