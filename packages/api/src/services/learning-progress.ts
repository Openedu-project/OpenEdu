import type {
  ILatestLessonProgressPayload,
  ILearningProgress,
  ILearningProgressPayload,
} from '#types/course/learning-progress';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl, fetchAPI, postAPI } from '#utils/fetch';
import type { HTTPErrorMetadata } from '#utils/http-error';

export async function getLearningProgressesService(
  url: string | undefined,
  { id, init }: { id: string; init?: RequestInit }
): Promise<ILearningProgress | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.LEARNING_PROGRESSES_COURSES_ID,
      params: {
        id,
      },
    });
  }

  try {
    const response = await fetchAPI<ILearningProgress>(endpointKey, init);

    return response.data;
  } catch {
    return null;
  }
}

export const updateLearningProgressService = async (
  url: string | undefined,
  { payload, init }: { payload: ILearningProgressPayload; init?: RequestInit }
) => {
  try {
    const response = await postAPI<ILearningProgress, ILearningProgressPayload>(
      url ?? API_ENDPOINT.LEARNING_PROGRESSES,
      payload,
      init
    );

    return response.data;
  } catch {
    return null;
  }
};

export const latestLessonProgressService = async (
  url: string | undefined,
  {
    payload,
    shouldFetch = true,
    init,
  }: {
    payload: ILatestLessonProgressPayload;
    shouldFetch?: boolean;
    init?: RequestInit;
  }
) => {
  if (shouldFetch) {
    try {
      const response = await postAPI<HTTPErrorMetadata, ILatestLessonProgressPayload>(
        url ?? API_ENDPOINT.LEARNING_PROGRESSES,
        payload,
        init
      );

      return response.data;
    } catch {
      return null;
    }
  }
};
