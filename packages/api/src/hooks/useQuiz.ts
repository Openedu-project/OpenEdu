import { buildUrl } from '@oe/core';
import useSWRMutation from 'swr/mutation';
import {
  getCurrentQuestionService,
  getQuizzSubmissionService,
  postQuizSubmissionService,
  submitAnswerService,
} from '#services/quiz';
import type {
  ICreateQuizSubmissionPayload,
  ICreateQuizSubmissionResponse,
  IQuizSubmissionResponse,
  ISubmitAnswerPayload,
  ISubmitAnswerResponse,
} from '#types/quiz';
import { API_ENDPOINT } from '#utils/endpoints';

export const usePostQuizSubmission = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.QUIZ_SUBMISSIONS,
    async (endpoint: string, { arg }: { arg: ICreateQuizSubmissionPayload }): Promise<ICreateQuizSubmissionResponse> =>
      postQuizSubmissionService(endpoint, { payload: arg })
  );

  return {
    triggerPostQuizSubmission: trigger,
    isLoadingPostQuizSubmission: isMutating,
    errorPostQuizSubmission: error,
  };
};

export function useGetCurrentQuestion(id: string) {
  const endpointKey = buildUrl({
    endpoint: API_ENDPOINT.QUIZ_SUBMISSIONS_ID_QUESTIONS_CURRENT,
    params: { id },
  });

  const { trigger, isMutating, error } = useSWRMutation(endpointKey, (endpoint: string) =>
    getCurrentQuestionService(endpoint, { id })
  );

  return {
    triggerCurrentQuestion: trigger,
    errorCurrentQuestion: error,
    isLoadingQuestion: isMutating,
  };
}

export function useSubmitAnswer(id: string) {
  const endpointKey = buildUrl({
    endpoint: API_ENDPOINT.QUIZ_SUBMISSIONS_ID_SUBMIT,
    params: { id },
  });

  const { trigger, isMutating, error } = useSWRMutation(
    endpointKey,
    async (endpoint: string, { arg }: { arg: ISubmitAnswerPayload }): Promise<ISubmitAnswerResponse> =>
      submitAnswerService(endpoint, { id, payload: arg })
  );

  return {
    submitAnswerTrigger: trigger,
    submitAnswerLoading: isMutating,
    submitAnswerError: error,
  };
}

// Last question -> submit quizz
export function useGetQuizSubmissionById(id: string) {
  const endpointKey = buildUrl({
    endpoint: API_ENDPOINT.QUIZ_SUBMISSIONS_ID,
    params: { id },
  });

  const { trigger, isMutating, error } = useSWRMutation(
    endpointKey,
    async (endpoint: string): Promise<IQuizSubmissionResponse> => getQuizzSubmissionService(endpoint, { id })
  );

  return {
    quizSubmissionData: trigger,
    quizSubmissionLoading: isMutating,
    quizSubmissionError: error,
  };
}
