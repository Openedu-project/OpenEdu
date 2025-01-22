import type { IQuizSettings } from '@oe/api/types/course/quiz';
import type { IQuizSubmissionResponse } from '@oe/api/types/quiz';
import background from '@oe/assets/images/learning-page/quiz.png';
import { useTranslations } from 'next-intl';
import { Button } from '#shadcn/button';
import type { IQuizzSubmissionState, TAnswerInput } from '../_types/types';
import QuizAssessment from './quiz-assessment';
import QuizLayout from './quiz-layout';
import QuizResult from './quiz-result';

const QUIZ_STATES = {
  RESULT: 'RESULT',
  ASSESSMENT: 'ASSESSMENT',
  START: 'START',
} as const;

interface IQuizContainerProps {
  quizResultState?: IQuizSubmissionResponse;
  quizSubmission: IQuizzSubmissionState;
  settings?: IQuizSettings;
  onTryAgainQuiz: () => void;
  onSubmitAnswer: (value: TAnswerInput) => Promise<void>;
  onStartQuiz: () => void;
  triggerFunction?: (quizResult: IQuizSubmissionResponse) => void;
}

const QuizContainer = ({
  quizResultState,
  quizSubmission,
  onTryAgainQuiz,
  onSubmitAnswer,
  onStartQuiz,
  triggerFunction,
  settings,
}: IQuizContainerProps) => {
  const tContentQuiz = useTranslations('learningPage.quiz');

  const QUIZ_COMPONENTS = {
    [QUIZ_STATES.RESULT]: () => (
      <QuizResult
        result={quizResultState ?? ({} as IQuizSubmissionResponse)}
        onTryAgain={onTryAgainQuiz}
        showCorrectAns={settings?.show_correct_answers_enabled}
        triggerFunction={triggerFunction}
      />
    ),

    [QUIZ_STATES.ASSESSMENT]: () =>
      quizSubmission?.data && (
        <QuizAssessment
          data={quizSubmission?.data}
          numQuestion={quizSubmission.num_questions}
          quizStartAt={quizSubmission.start_at}
          onSubmitAnswer={onSubmitAnswer}
          settings={settings}
        />
      ),

    [QUIZ_STATES.START]: () => (
      <QuizLayout background={background.src} className="flex flex-col">
        <div className="z-10 m-auto flex h-2/3 flex-col items-center justify-between">
          <h3 className="giant-iheading-bold18 sm:giant-iheading-bold24 lg:giant-iheading-bold44 text-primary uppercase">
            {tContentQuiz('quizTime')}
          </h3>
          <Button onClick={onStartQuiz}>{tContentQuiz('start')}</Button>
        </div>
      </QuizLayout>
    ),
  };

  const getCurrentState = () => {
    if (quizResultState) {
      return QUIZ_STATES.RESULT;
    }
    if (quizSubmission?.data) {
      return QUIZ_STATES.ASSESSMENT;
    }
    return QUIZ_STATES.START;
  };

  const currentState = getCurrentState();

  const Component = QUIZ_COMPONENTS[currentState];

  return (
    <div className="mx-auto h-full max-h-full min-h-full w-auto max-w-full rounded-2xl border border-primary">
      <Component />
    </div>
  );
};

export default QuizContainer;
