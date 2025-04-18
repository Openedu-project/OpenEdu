'use client';

import type { ICourseOutline } from '@oe/api';
import type { HTTPError } from '@oe/api';
import type { IQuizItemResponse, IQuizSettings } from '@oe/api';
import type { IQuizSubmissionResponse } from '@oe/api';
import { useGetCurrentQuestion, useGetQuizSubmissionById, usePostQuizSubmission, useSubmitAnswer } from '@oe/api';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useCourse, useQuiz } from '../../../_context';
import { transformAnswers } from '../../../_utils/utils';
import type { IQuizzSubmissionState, TAnswerInput } from '../_types/types';
import { QuizContainer } from './quiz-container';

interface IContentQuizProps {
  quiz?: IQuizItemResponse;
  settings?: IQuizSettings;
  course_data: ICourseOutline;
  is_preview?: boolean;
  onComplete?: () => void;
  triggerFunction?: (quizResult: IQuizSubmissionResponse) => void;
}

export function ContentQuiz({
  quiz,
  course_data,
  settings,
  is_preview,
  onComplete,
  triggerFunction,
}: IContentQuizProps) {
  const tCourseOutline = useTranslations('courseOutline');

  const [quizSubmission, setQuizSubmission] = useState<IQuizzSubmissionState>({
    id: '',
    num_questions: 0,
    data: null,
    start_at: 0,
  });

  // Sử dụng Context API thay vì Zustand store
  const { quizResult, setQuizResult } = useQuiz();
  const { course } = useCourse();

  // Sử dụng course từ context nếu không được truyền qua props
  const courseData = course_data || course;

  const { triggerPostQuizSubmission } = usePostQuizSubmission();
  const { triggerCurrentQuestion } = useGetCurrentQuestion(quizSubmission?.id);
  const { submitAnswerTrigger } = useSubmitAnswer(quizSubmission?.id);
  const { quizSubmissionData } = useGetQuizSubmissionById(quizSubmission.id);

  const getQuizSubmissionResults = async () => {
    const result = await quizSubmissionData();

    if (result.passed) {
      onComplete?.();
    }

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
    if (is_preview) {
      toast.info(tCourseOutline('joinCourseToAccess'));
    } else if (quiz) {
      triggerPostQuizSubmission({
        quiz_id: quiz?.id,
        course_id: courseData?.id,
      })
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
      courseIsCompleted={courseData?.mark_as_completed}
    />
  );
}
