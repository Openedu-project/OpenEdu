import { buildUrl } from '@oe/core';
import useSWR from 'swr';
import { getMyCourseLearningService } from '#services/my-learning-space';
import type { IFilter } from '#types/filter';
import { API_ENDPOINT } from '#utils/endpoints';

export function useGetMyCoursesLearning(params: IFilter, revalidateOnMount?: boolean) {
  const endpointKey = buildUrl({
    endpoint: API_ENDPOINT.USERS_ME_COURSES,
    queryParams: { ...params },
  });

  const { data, isLoading, error, mutate } = useSWR(
    endpointKey,
    (endpoint: string) => getMyCourseLearningService(endpoint, { params }),
    { revalidateOnMount }
  );

  return {
    coursesLearningData: data,
    coursesLearningLoading: isLoading,
    coursesLearningError: error,
    coursesLearningMutate: mutate,
  };
}
