import { buildUrl } from '@oe/core/utils/url';
import type { ICreateBaseCourse, ICreateYoutubeCourse } from '#schemas/courses/createCourseSchema';
import type { ICourseCategory } from '#types/course/category';
import type { ICourse, ICourseResponse, IEnrollCoursePayload } from '#types/course/course';
import type { ICourseOutline } from '#types/course/course';
import type { IBulkSegments, ILessonContent, ISegment, ISegmentParams } from '#types/course/segment';
import type { HTTPPagination } from '#types/fetch';
import type { IFilter } from '#types/filter';
import { API_ENDPOINT } from '#utils/endpoints';
import { type FetchOptions, createAPIUrl, deleteAPI, fetchAPI, postAPI, putAPI } from '#utils/fetch';

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
  const response = await postAPI<ICourse, null>(finalEndpoint, null, init);

  return response.data;
};

export const getSegmentsService = async (url: string | undefined, queryParams: ISegmentParams, init?: FetchOptions) => {
  const endpoint = buildUrl({ endpoint: API_ENDPOINT.SEGMENTS, queryParams });
  const response = await fetchAPI<HTTPPagination<ISegment>>(url ?? endpoint, init);

  return response.data;
};

export const createCourseService = async (url: string | undefined, payload: ICreateBaseCourse, init?: RequestInit) => {
  const response = await postAPI<ICourse, ICreateBaseCourse>(url ?? API_ENDPOINT.COURSES, payload, init);

  return response.data;
};

export const createAICourseService = async (
  url: string | undefined,
  payload: ICreateYoutubeCourse,
  init?: RequestInit
) => {
  const response = await postAPI<ICourse, ICreateYoutubeCourse>(url ?? API_ENDPOINT.COURSES_AI, payload, init);

  return response.data;
};

export const updateCourseService = async (url: string | undefined, payload: ICourse, init?: RequestInit) => {
  const response = await putAPI<ICourse, ICourse>(
    url ?? buildUrl({ endpoint: API_ENDPOINT.COURSES_ID, params: { id: payload.id } }),
    payload,
    init
  );

  return response.data;
};

export interface ICreateSegmentPayload {
  course_id: string;
  title: string;
  note: string;
  order: number;
  free: boolean;
  status: string;
  id?: string;
  lessons?: ICreateLessonPayload[];
}

export interface ICreateSectionPayload extends ICreateSegmentPayload {}
export interface ICreateLessonPayload extends ICreateSegmentPayload {
  parent_id: string;
  contents: ILessonContent[];
}

export const getSegmentByIdService = async (url: string | undefined, id: string, init?: RequestInit) => {
  const response = await fetchAPI<ISegment>(
    url ?? buildUrl({ endpoint: API_ENDPOINT.SEGMENTS_ID, params: { id } }),
    init
  );

  return response.data;
};

export const createSegmentService = async (
  url: string | undefined,
  payload: ICreateSectionPayload | ICreateLessonPayload,
  init?: RequestInit
) => {
  const response = await postAPI<ISegment, ICreateSectionPayload | ICreateLessonPayload>(
    url ?? API_ENDPOINT.SEGMENTS,
    payload,
    init
  );

  return response.data;
};

export const updateSegmentService = async (url: string | undefined, payload: ISegment, init?: RequestInit) => {
  const response = await putAPI<ISegment, ISegment>(
    url ?? buildUrl({ endpoint: API_ENDPOINT.SEGMENTS_ID, params: { id: payload.id } }),
    payload,
    init
  );

  return response.data;
};

export const updateBulkSegmentsService = async (
  url: string | undefined,
  payload: IBulkSegments,
  init?: RequestInit
) => {
  const response = await putAPI<ISegment[], IBulkSegments>(url ?? API_ENDPOINT.SEGMENTS_BULK, payload, init);

  return response.data;
};

export const deleteSegmentService = async (url: string | undefined, id: string, init?: RequestInit) => {
  const response = await deleteAPI(
    url ?? buildUrl({ endpoint: API_ENDPOINT.SEGMENTS_ID, params: { id } }),
    undefined,
    init
  );

  return response.data;
};

export const deleteLessonContentService = async (url: string | undefined, id: string, init?: RequestInit) => {
  const response = await deleteAPI(
    url ?? buildUrl({ endpoint: API_ENDPOINT.LESSONS_ID, params: { id } }),
    undefined,
    init
  );

  return response.data;
};
