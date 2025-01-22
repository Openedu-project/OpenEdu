'use client';

import {
  useGetCurrentQuestion,
  useGetQuizSubmissionById,
  usePostQuizSubmission,
  useSubmitAnswer,
} from '@oe/api/hooks/useQuiz';
import type { IQuizItemResponse, IQuizSettings } from '@oe/api/types/course/quiz';
import type { IQuizSubmissionResponse } from '@oe/api/types/quiz';
import type { HTTPError } from '@oe/api/utils/http-error';
import { useEffect, useState } from 'react';
import { useQuizSubmissionStore } from '../../../_store/learning-store';
import { transformAnswers } from '../../../_utils/utils';
import type { IQuizzSubmissionState, TAnswerInput } from '../_types/types';
import QuizContainer from './quiz-container';

interface IContentQuizProps {
  quiz?: IQuizItemResponse;
  settings?: IQuizSettings;
  course_id: string;
  onComplete?: () => void;
  triggerFunction?: (quizResult: IQuizSubmissionResponse) => void;
}

export default function ContentQuiz({ quiz, course_id, settings, onComplete, triggerFunction }: IContentQuizProps) {
  const [quizSubmission, setQuizSubmission] = useState<IQuizzSubmissionState>({
    id: '',
    num_questions: 0,
    data: null,
    start_at: 0,
  });
  // const [quizResultState, setQuizResultState] = useState<IQuizSubmissionResponse>();
  const { setQuizResult, quizResult } = useQuizSubmissionStore();

  const { triggerPostQuizSubmission } = usePostQuizSubmission();
  const { triggerCurrentQuestion } = useGetCurrentQuestion(quizSubmission?.id);
  const { submitAnswerTrigger } = useSubmitAnswer(quizSubmission?.id);
  const { quizSubmissionData } = useGetQuizSubmissionById(quizSubmission.id);

  const getQuizSubmissionResults = async () => {
    const result = await quizSubmissionData();

    if (result.passed) {
      onComplete?.();
    }

    // setQuizResultState(result);
    setQuizResult(result);
  };

  const getCurrentQuestion = async (isFirstQuestion?: boolean) => {
    try {
      if (!(quizSubmission.data?.has_next_question || isFirstQuestion)) {
        await getQuizSubmissionResults();
        return;
      }

      const data = await triggerCurrentQuestion();
      setQuizSubmission(prevState => ({
        ...prevState,
        data,
      }));
    } catch (error) {
      console.error(error);

      const code = (error as HTTPError)?.metadata?.code;
      if (code === 6032) {
        // No more questions remaining
        await getQuizSubmissionResults().catch(console.error);
      }
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

          return res;
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

  const onTryAgainQuiz = () => {
    setQuizSubmission({
      id: '',
      num_questions: 0,
      data: undefined,
      start_at: 0,
    });

    setQuizResult(undefined);
  };

  useEffect(() => {
    setQuizResult(undefined);
  }, []);

  useEffect(() => {
    const isFirstQuestion = true;

    if (quizSubmission.id.length > 0) {
      getCurrentQuestion(isFirstQuestion).catch(error => {
        console.error(error);
      });
    }
  }, [quizSubmission?.id]);

  return (
    <QuizContainer
      quizResultState={quizResult}
      quizSubmission={quizSubmission}
      onTryAgainQuiz={onTryAgainQuiz}
      onSubmitAnswer={onSubmitAnswer}
      onStartQuiz={onStartQuiz}
      settings={settings}
      triggerFunction={triggerFunction}
    />
  );
}
