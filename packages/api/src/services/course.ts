import { buildUrl } from '@oe/core/utils/url';
import type { ICourseCategory } from '#types/course/category';
import type { ICourse, ICourseResponse, IEnrollCoursePayload } from '#types/course/course';
import type { ICourseOutline } from '#types/course/course';
import type { IFilter } from '#types/filter';
import { API_ENDPOINT } from '#utils/endpoints';
import { type FetchOptions, createAPIUrl, deleteAPI, fetchAPI, postAPI } from '#utils/fetch';

export async function getCoursesService(
  url: string | undefined,
  { params, init }: { params: IFilter; init?: RequestInit }
): Promise<ICourseResponse | undefined> {
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
    return undefined;
  }
}

export async function getCourseByIdService(
  url: string | undefined,
  { id, init }: { id: string; init?: RequestInit }
): Promise<ICourse | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.COURSES_ID,
      params: { id },
    });
  }

  const response = await fetchAPI<ICourse>(endpointKey, init);

  return response.data;
}

export async function getCoursesPublishService(
  url: string | undefined,
  { params, init }: { params: IFilter; init?: RequestInit }
): Promise<ICourseResponse | undefined> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = createAPIUrl({
      endpoint: API_ENDPOINT.COURSES_PUBLISH,
      queryParams: {
        ...params,
      },
    });
  }

  try {
    const response = await fetchAPI<ICourseResponse>(endpointKey, init);

    return response.data;
  } catch {
    return undefined;
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

export async function duplicateCourseService(id: string, { init }: { init?: RequestInit } = {}) {
  return await postAPI<ICourse, null>(
    buildUrl({ endpoint: API_ENDPOINT.COURSES_ID_DUPLICATE, params: { id } }),
    null,
    init
  );
}

export async function deleteCourseService(id: string, { init }: { init?: RequestInit } = {}) {
  return await deleteAPI(buildUrl({ endpoint: API_ENDPOINT.COURSES_ID, params: { id } }), undefined, init);
}

export const getLevelsService = async (
  url?: string,
  init?: FetchOptions & { queryParams?: Record<string, string | boolean> }
) => {
  const defaultUrl = createAPIUrl({ endpoint: API_ENDPOINT.CATEGORIES_TREE, queryParams: init?.queryParams });
  const response = await fetchAPI<ICourseCategory[]>(url ?? defaultUrl, init);

  return response.data;
};

export const postEnrollCourseService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload?: IEnrollCoursePayload; init?: RequestInit }
) => {
  const params = new URLSearchParams();

  if (payload) {
    for (const [key, value] of Object.entries(payload)) {
      if (value) {
        params.append(key, value as string);
      }
    }
  }

  const finalEndpoint = `${endpoint}${params.toString() ? `?${params.toString()}` : ''}`;
  console.log('finalEndpoint', finalEndpoint);
  const response = await postAPI<ICourse, null>(finalEndpoint, null, init);

  return response.data;
};
