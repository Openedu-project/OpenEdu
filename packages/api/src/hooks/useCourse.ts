import useSWR from 'swr';
import { getCourseService } from '#services/course';
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
