import {
  useGetCurrentQuestion,
  useGetQuizSubmissionById,
  usePostQuizSubmission,
  useSubmitAnswer,
} from '@oe/api/hooks/useQuiz';
import type { IQuizItemResponse } from '@oe/api/types/course/quiz';
import type { ICurrentQuestion, IQuizSubmissionResponse } from '@oe/api/types/quiz';
import type { HTTPError } from '@oe/api/utils/http-error';
import background from '@oe/assets/images/learning-page/quiz.png';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Image } from '#components/image';
import { Button } from '#shadcn/button';
import type { TAnswerInput } from '../_types/types';
import { transformAnswers } from '../_utils/utils';
import QuizAssessment from './quiz-assessment';

interface IQuizzSubmissionState {
  id: string;
  num_questions: number;
  data: ICurrentQuestion | null;
  start_at: number;
}

interface IContentQuizProps {
  quiz?: IQuizItemResponse;
  course_id: string;
}

export default function ContentQuiz({ quiz, course_id }: IContentQuizProps) {
  const tContentQuiz = useTranslations('learningPage.quiz');

  const [quizSubmission, setQuizSubmission] = useState<IQuizzSubmissionState>({
    id: '',
    num_questions: 0,
    data: null,
    start_at: 0,
  });
  const [_quizResultState, setQuizResultState] = useState<IQuizSubmissionResponse>();

  const { triggerPostQuizSubmission } = usePostQuizSubmission();
  const { triggerCurrentQuestion } = useGetCurrentQuestion(quizSubmission?.id);
  const { submitAnswerTrigger } = useSubmitAnswer(quizSubmission?.id);
  const { quizSubmissionData } = useGetQuizSubmissionById(quizSubmission.id);

  const getQuizSubmissionResults = async () => {
    const result = await quizSubmissionData();

    // if (result.passed) {
    //   onComplete?.();
    // }

    setQuizResultState(result);
  };

  const getCurrentQuestion = async () => {
    // If has_next_question is true, then get the next question, else get the result of the quiz
    if (quizSubmission.data?.has_next_question) {
      try {
        const data = await triggerCurrentQuestion();

        setQuizSubmission(prevState => {
          return {
            ...prevState,
            data,
          };
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      await getQuizSubmissionResults();
    }
  };

  const onStartQuiz = () => {
    if (quiz) {
      triggerPostQuizSubmission({ quiz_id: quiz?.id, course_id })
        .then(res => {
          const { id, num_questions, start_at } = res;

          setQuizSubmission(prev => {
            return {
              ...prev,
              id,
              num_questions,
              start_at,
            };
          });
        })
        .catch(err => console.log(err));
    }
  };

  const onSubmitAnswer = async (value: TAnswerInput) => {
    const question_id = quizSubmission.data?.question.id;

    const answered_item_sets = transformAnswers(value);

    if (quizSubmission.id.length > 0 && question_id) {
      try {
        await submitAnswerTrigger({
          question_id,
          answered_item_sets,
        });

        await getCurrentQuestion();
      } catch (error) {
        console.error(error);

        const code = (error as HTTPError).metadata?.code;

        // code 6024: Your submission is over time limit for question
        if (code === 6024) {
          await getCurrentQuestion();
        }
      }
    }
  };

  useEffect(() => {
    const fetchCurrentQuestion = async () => {
      try {
        const data = await triggerCurrentQuestion();

        setQuizSubmission(prevState => {
          return {
            ...prevState,
            data,
          };
        });
      } catch (error) {
        const code = (error as HTTPError)?.metadata?.code;

        // code 6032: all answers have been already submitted => move to the result section
        if (code === 6032) {
          getQuizSubmissionResults().catch(error => console.error(error));
        }
      }
    };

    if (quizSubmission.id.length > 0) {
      fetchCurrentQuestion().catch(error => {
        console.error(error);
      });
    }
  }, [quizSubmission?.id]);

  return (
    <>
      {quizSubmission?.data ? (
        <QuizAssessment
          data={quizSubmission.data}
          numQuestion={quizSubmission?.num_questions}
          quizStartAt={quizSubmission.start_at}
          onSubmitAnswer={onSubmitAnswer}
        />
      ) : (
        <div className="relative mx-auto flex aspect-video h-full max-h-full w-auto flex-col rounded-2xl border border-primary">
          <Image
            src={background?.src}
            alt="quiz-bg"
            aspectRatio="16:9"
            className="!h-full -z-10 absolute top-0 left-0 w-full rounded-2xl"
          />
          <div className="z-0 my-auto flex h-2/3 flex-col items-center justify-between">
            <h3 className="giant-iheading-bold18 sm:giant-iheading-bold24 lg:giant-iheading-bold44 text-primary uppercase">
              {tContentQuiz('quizTime')}
            </h3>
            <Button onClick={onStartQuiz}>{tContentQuiz('start')}</Button>
          </div>
        </div>
      )}
    </>
  );
}
