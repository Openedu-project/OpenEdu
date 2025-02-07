import type {
  ICreateQuizSubmissionPayload,
  ICreateQuizSubmissionResponse,
  ICurrentQuestion,
  IQuizSubmissionResponse,
  ISubmitAnswerPayload,
  ISubmitAnswerResponse,
} from '#types/quiz';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl, fetchAPI, postAPI } from '#utils/fetch';

// Start quizz
export const postQuizSubmissionService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: ICreateQuizSubmissionPayload; init?: RequestInit }
) => {
  const response = await postAPI<ICreateQuizSubmissionResponse, ICreateQuizSubmissionPayload>(
    endpoint ?? API_ENDPOINT.QUIZ_SUBMISSIONS,
    payload,
    init
  );

  return response.data;
};

export async function getCurrentQuestionService(
  endpoint: string | null | undefined,
  { id, init }: { id: string; init?: RequestInit }
): Promise<ICurrentQuestion | null> {
  let endpointKey = endpoint;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.QUIZ_SUBMISSIONS_ID_QUESTIONS_CURRENT,
      params: { id },
    });
  }

  try {
    const response = await fetchAPI<ICurrentQuestion>(endpointKey, init);

    return response.data;
  } catch {
    return null;
  }
}

export async function submitAnswerService(
  endpoint: string | null | undefined,
  { id, payload, init }: { id: string; payload: ISubmitAnswerPayload; init?: RequestInit }
) {
  let endpointKey = endpoint;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.QUIZ_SUBMISSIONS_ID_QUESTIONS_CURRENT,
      params: { id },
    });
  }

  const response = await postAPI<ISubmitAnswerResponse, ISubmitAnswerPayload>(endpointKey, payload, init);

  return response.data;
}

// Last question -> submit quizz
export async function getQuizzSubmissionService(
  endpoint: string | null | undefined,
  { id, init }: { id: string; init?: RequestInit }
) {
  let endpointKey = endpoint;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.QUIZ_SUBMISSIONS_ID_QUESTIONS_CURRENT,
      params: { id },
    });
  }

  const response = await fetchAPI<IQuizSubmissionResponse>(endpointKey, init);

  return response.data;
}
