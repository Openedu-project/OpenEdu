import type { IFilter } from '#types/filter';
import type { ICoursesCounting, IMyCourseResponse } from '#types/my-learning-space';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl, fetchAPI } from '#utils/fetch';

export const getMyCourseLearningService = async (
  url: string | null | undefined,
  { params, init }: { params: IFilter; init?: RequestInit }
): Promise<IMyCourseResponse | null> => {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.USERS_ME_COURSES,
      queryParams: {
        ...params,
      },
    });
  }

  try {
    const response = await fetchAPI<IMyCourseResponse>(endpointKey, init);

    return response.data;
  } catch {
    return null;
  }
};

export const getCoursesCountingService = async (
  endpoint: string | null | undefined,
  { init }: { init?: RequestInit }
) => {
  const response = await fetchAPI<ICoursesCounting>(
    endpoint ?? createAPIUrl({ endpoint: API_ENDPOINT.USERS_ME_COURSES_COUNT }),
    init
  );

  return response.data;
};
