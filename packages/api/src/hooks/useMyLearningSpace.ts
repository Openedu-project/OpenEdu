import useSWR from 'swr';
import { getMyCourseLearningService } from '#services/my-learning-space';
import type { IFilter } from '#types/filter';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl } from '#utils/fetch';

export function useGetMyCoursesLearning(params: IFilter) {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.USERS_ME_COURSES,
    queryParams: { ...params },
  });

  const { data, isLoading, error, mutate } = useSWR(endpointKey, (endpoint: string) =>
    getMyCourseLearningService(endpoint, { params })
  );

  return {
    coursesLearningData: data,
    coursesLearningLoading: isLoading,
    coursesLearningError: error,
    coursesLearningMutate: mutate,
  };
}
