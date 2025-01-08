import useSWR from 'swr';
import { getCourseOutlineService, getCourseService } from '#services/course';
import type { ICourseOutline } from '#types/course/course';
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
