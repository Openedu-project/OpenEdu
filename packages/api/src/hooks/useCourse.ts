import { buildUrl } from '@oe/core/utils/url';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import {
  getCourseByIdService,
  getCourseOutlineService,
  getCoursesPublishService,
  getCoursesService,
  getLevelsService,
  getSegmentByIdService,
  getSegmentsService,
  getPreviewCourseByIdService,
  getPublishedCourseByAdminService,
  getSectionsHaveLessonsByCourseIdService,
  postEnrollCourseService,
  putEnableCourseService,
} from '#services/course';
import type {
  ICourse,
  ICourseOutline,
  ICourseResponse,
  IEnableCourseRequest,
  IEnrollCoursePayload,
} from '#types/course/course';
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
    id
      ? createAPIUrl({ endpoint: API_ENDPOINT.COURSES_ID, params: { id }, queryParams: { preloads: ['segments'] } })
      : null,
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
    async (endpoint: string, { arg }: { arg?: IEnrollCoursePayload }): Promise<ICourse> =>
      postEnrollCourseService(endpoint, { payload: arg })
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
  const sortedSegments = data?.results?.sort((a, b) => a.order - b.order);
  return {
    segments: sortedSegments,
    segmentsError: error,
    mutateSegments: mutate,
    isLoadingSegments: isLoading,
  };
};

export const useGetSegmentById = (id: string) => {
  const endpoint = buildUrl({ endpoint: API_ENDPOINT.SEGMENTS_ID, params: { id } });
  const { data, isLoading, error, mutate } = useSWR(id ? endpoint : null, (endpoint: string) =>
    getSegmentByIdService(endpoint, id)
  );

  return {
    segment: data,
    segmentError: error,
    mutateSegment: mutate,
    isLoadingSegment: isLoading,
  };
}
export const usePutEnableCourse = () => {
  const { trigger, error, isMutating } = useSWRMutation(
    API_ENDPOINT.COURSES_ID_STAGE,
    async (_endpoint: string, { arg }: { arg: IEnableCourseRequest }): Promise<ICourse> =>
      putEnableCourseService(
        createAPIUrl({
          endpoint: API_ENDPOINT.COURSES_ID_STAGE,
          params: {
            id: arg?.id,
          },
        }),
        { payload: arg }
      )
  );

  return {
    triggerPutEnableCourse: trigger,
    putEnableCourseError: error,
    isLoadingPutEnableCourse: isMutating,
  };
};

export const useGetPublishedCourseByAdmin = ({
  org_id,
  params,
  org_id_not,
}: {
  org_id?: string;
  params?: IFilter;
  org_id_not?: string;
}) => {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.COURSES_PUBLISH,
    queryParams: {
      ...params,
      org_id,
      org_id_not,
    },
  });
  const { data, isLoading, mutate } = useSWR(org_id || org_id_not ? endpointKey : '', (_endpoint: string) =>
    getPublishedCourseByAdminService(endpointKey, { payload: { ...params, org_id, org_id_not } })
  );

  return {
    publishedCourseByAdmin: data,
    isLoadingPublishedCourseByAdmin: isLoading,
    muatePublishedCourseByAdmin: mutate,
  };
};

export const useGetPreviewCourseById = ({ courseId, orgId }: { courseId?: string; orgId?: string }) => {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.COURSES_ID_PREVIEW_ORG_ID,
    params: {
      id: courseId,
      org_id: orgId,
    },
    queryParams: {
      preloads: ['Categories', 'Levels', 'Owner'],
    },
  });
  const { data, isLoading, mutate } = useSWR(courseId && orgId ? endpointKey : null, (_endpoint: string) =>
    getPreviewCourseByIdService(endpointKey, { payload: { courseId, orgId } })
  );

  return {
    courseData: data,
    isCourseLoading: isLoading,
    muateCourse: mutate,
  };
};

export const useGetSectionsHaveLessonsByCourseId = (params?: ISegmentParams) => {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.SEGMENTS,
    queryParams: {
      ...params,
      course_id: params?.course_id,
      page: 1,
      per_page: 999,
      preloads: 'lessons',
    },
  });

  const { data, isLoading, isValidating, mutate } = useSWR(
    params?.course_id ? endpointKey : null,
    (_endpoint: string) => getSectionsHaveLessonsByCourseIdService(endpointKey, { params })
  );

  return {
    sectionsData: data?.results?.sort((a, b) => a.order - b.order),
    loadingSections: isLoading,
    validSections: isValidating,
    mutateSectionsData: mutate,
  };
};
