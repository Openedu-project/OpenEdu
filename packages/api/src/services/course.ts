import type { ICourseResponse } from '#types/course/course';
import type { IFilter } from '#types/filter';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl, fetchAPI } from '#utils/fetch';

export async function getCourseService(
  url: string,
  { params, init }: { params: IFilter; init?: RequestInit }
): Promise<ICourseResponse | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.COURSES,
      queryParams: {
        ...params,
      },
    });
  }

  try {
    const response = await fetchAPI<ICourseResponse>(endpointKey, init);

    return response.data;
  } catch {
    return null;
  }
}
