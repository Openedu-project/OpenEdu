import useSWR from 'swr';
import { getLessonLearnService } from '#services/lesson-learn';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl } from '#utils/fetch';

export function useGetLessonLearn({ id, cid }: { id?: string; cid?: string }) {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.LESSONS_ID_COURSES_CID,
    params: { id, cid },
  });
  const { data, isLoading, error, mutate } = useSWR(endpointKey, (endpoint: string) =>
    id && cid ? getLessonLearnService(endpoint, { id, cid }) : null
  );

  return {
    dataLessonLearn: data,
    errorLessonLearn: error,
    mutateLessonLearn: mutate,
    isLoadingLessonLearn: isLoading,
  };
}
