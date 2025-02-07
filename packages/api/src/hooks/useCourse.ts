import { buildUrl } from '@oe/core/utils/url';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import {
  getCourseByIdService,
  getCourseOutlineService,
  getCoursesPublishService,
  getCoursesService,
  getLevelsService,
  getSegmentsService,
  postEnrollCourseService,
} from '#services/course';
import type { ICourse, ICourseOutline, ICourseResponse, IEnrollCoursePayload } from '#types/course/course';
import type { ISegmentParams } from '#types/course/segment';
import type { IFilter } from '#types/filter';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl } from '#utils/fetch';

export function useGetCourses({ params }: { params: IFilter }) {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.COURSES,
    queryParams: { ...params },
  });
  const { data, isLoading, error, mutate } = useSWR(endpointKey, (endpoint: string) =>
    getCoursesService(endpoint, { params })
  );

  return {
    dataListCourses: data,
    errorCourses: error,
    mutateListCourses: mutate,
    isLoadingCourses: isLoading,
  };
}

export function useGetCourseById(id: string) {
  const { data, isLoading, error, mutate } = useSWR(
    id ? createAPIUrl({ endpoint: API_ENDPOINT.COURSES_ID, params: { id } }) : null,
    (endpoint: string) => getCourseByIdService(endpoint, { id })
  );

  return {
    course: data,
    courseError: error,
    mutateCourse: mutate,
    courseLoading: isLoading,
  };
}

export function useGetCourseOutline(id: string, fallback: ICourseOutline | null = null) {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.COURSES_ID_OUTLINE,
    params: { id },
    queryParams: {
      preloads: ['FormRelations', 'Medias', 'Owner', 'Levels', 'Docs'],
    },
  });
  const { data, isLoading, error, mutate } = useSWR(
    id ? endpointKey : null,
    (endpoint: string) => getCourseOutlineService(endpoint, { id }),
    {
      fallbackData: fallback,
    }
  );

  return {
    course: data,
    courseError: error,
    mutateCourse: mutate,
    courseLoading: isLoading,
  };
}

export function useGetLevels(params: Record<string, string | boolean>) {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.CATEGORIES_TREE,
    queryParams: { ...params },
  });
  const { data, isLoading, error, mutate } = useSWR(params.org_id ? endpointKey : null, (endpoint: string) =>
    getLevelsService(endpoint, { queryParams: params })
  );

  return {
    levels: data,
    levelsError: error,
    mutateLevels: mutate,
    isLevelsLoading: isLoading,
  };
}

export function useGetCoursesPublish(params: IFilter, fallback?: ICourseResponse) {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.COURSES_PUBLISH,
    queryParams: { ...params },
  });
  const { data, isLoading, error, mutate } = useSWR(
    endpointKey,
    (endpoint: string) => getCoursesPublishService(endpoint, { params }),
    {
      fallbackData: fallback,
    }
  );

  return {
    dataListCourses: data,
    errorCourses: error,
    mutateListCourses: mutate,
    isLoadingCourses: isLoading,
  };
}

export const usePostEnrollCourse = (id: string) => {
  const endpoint = createAPIUrl({ endpoint: API_ENDPOINT.COURSES_ID_ENROLL, params: { id } });

  const { trigger, error, isMutating } = useSWRMutation(
    id ? endpoint : null,
    async (endpoint: string, { arg }: { arg?: IEnrollCoursePayload }): Promise<ICourse> => {
      const response = await postEnrollCourseService(endpoint, { payload: arg });
      return response;
    }
  );

  return {
    triggerPostEnrollCourse: trigger,
    postEnrollCourseError: error,
    isLoadingPostEnrollCourse: isMutating,
  };
};

export const useGetSegments = ({ course_id, page, per_page, preloads, ...rest }: ISegmentParams) => {
  const queryParams = {
    ...rest,
    course_id,
    page: page ?? 1,
    per_page: per_page ?? 9999,
    preloads: preloads ?? 'lessons',
    // sort: sort ?? 'order desc',
  };
  const endpoint = buildUrl({
    endpoint: API_ENDPOINT.SEGMENTS,
    queryParams,
  });
  const { data, isLoading, error, mutate } = useSWR(queryParams.course_id ? endpoint : null, (endpoint: string) =>
    getSegmentsService(endpoint, queryParams)
  );

  return {
    segments: data?.results,
    segmentsError: error,
    mutateSegments: mutate,
    isLoadingSegments: isLoading,
  };
};
