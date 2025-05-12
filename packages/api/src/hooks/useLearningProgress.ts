import { buildUrl } from '@oe/core';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { getLearningProgressesService, updateLearningProgressService } from '#services/learning-progress';
import type { ILearningProgressPayload } from '#types/course/learning-progress';
import { API_ENDPOINT } from '#utils/endpoints';

export function useGetLearningProgress({ id }: { id?: string }) {
  const endpointKey = buildUrl({
    endpoint: API_ENDPOINT.LEARNING_PROGRESSES_COURSES_ID,
    params: { id },
  });
  const { data, isLoading, error, mutate } = useSWR(endpointKey, (endpoint: string) =>
    id ? getLearningProgressesService(endpoint, { id }) : null
  );

  return {
    dataLearningProgress: data,
    errorLearningProgress: error,
    mutateLearningProgress: mutate,
    isLoadingLearningProgress: isLoading,
  };
}

export const useUpdateLearningProgress = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.LEARNING_PROGRESSES,
    async (endpoint: string, { arg }: { arg: ILearningProgressPayload }): Promise<unknown> =>
      updateLearningProgressService(endpoint, { payload: arg })
  );

  return {
    triggerLearningProgress: trigger,
    isMutatingLearningProgress: isMutating,
    errorLearningProgress: error,
  };
};
