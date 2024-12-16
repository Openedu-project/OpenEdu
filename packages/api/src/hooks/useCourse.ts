import useSWR from 'swr';
import { getCourseOutlineService, getCourseService } from '#services/course';
import type { IFilter } from '#types/filter';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl } from '#utils/fetch';

export function useGetCourses({ params }: { params: IFilter }) {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.COURSES,
    queryParams: { ...params },
  });
  const { data, isLoading, error, mutate } = useSWR(endpointKey, (endpoint: string) =>
    getCourseService(endpoint, { params })
  );

  return {
    dataListCourses: data,
    errorCourses: error,
    mutateListCourses: mutate,
    isLoadingCourses: isLoading,
  };
}

export function useGetCourseOutline(id: string, shouldFetch = true) {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.COURSES_ID_OUTLINE,
    params: { id },
    queryParams: {
      preloads: ['FormRelations', 'Medias', 'Owner', 'Levels', 'Docs'],
    },
  });

  const { data, isLoading, error, mutate } = useSWR(shouldFetch ? endpointKey : null, (endpoint: string) =>
    getCourseOutlineService(endpoint, { id })
  );

  return {
    course: data,
    courseError: error,
    mutateCourse: mutate,
    courseLoading: isLoading,
  };
}
