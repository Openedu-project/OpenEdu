import type { ICourseResponse } from '#types/course/course';
import type { ICourseOutline } from '#types/course/course';
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

export async function getCourseOutlineService(
  url: string | undefined,
  { id, init }: { id: string; init?: RequestInit }
): Promise<ICourseOutline | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.COURSES_ID_OUTLINE,
      params: {
        id,
      },
      queryParams: {
        preloads: ['FormRelations', 'Medias', 'Owner', 'Levels', 'Docs'],
      },
    });
  }

  try {
    const response = await fetchAPI<ICourseOutline>(endpointKey, {
      ...init,
      cache: 'no-store',
    });

    return response.data;
  } catch {
    return null;
  }
}
