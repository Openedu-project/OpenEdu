import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { getPopularCoursesServices, updateFeaturedContent } from '#services/featured-contents';
import type { FeaturedContentParams, IFeaturedContentRequest } from '#types/featured-contents';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl } from '#utils/fetch';

export function useGetPopularCourses({ params }: { params: Pick<FeaturedContentParams, 'org_id'> }) {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.FEATURED_CONTENT,
    queryParams: { ...params },
  });

  const { data, isLoading, error, mutate } = useSWR(endpointKey, (endpoint: string) =>
    getPopularCoursesServices(endpoint, { params })
  );

  return {
    dataPopularCourses: data,
    errorCourses: error,
    mutatePopularCourses: mutate,
    isLoadingCourses: isLoading,
  };
}

export const useUpdateFeaturedContent = () => {
  const endpoint = createAPIUrl({ endpoint: API_ENDPOINT.FEATURED_CONTENT });

  const { trigger, error, isMutating } = useSWRMutation(
    endpoint,
    async (endpoint: string, { arg }: { arg: IFeaturedContentRequest }): Promise<boolean> => {
      const response = await updateFeaturedContent(endpoint, { payload: arg });
      return response;
    }
  );

  return {
    triggerUpdateFeaturedContent: trigger,
    updateFeaturedContentError: error,
    isLoadingUpdateFeaturedContent: isMutating,
  };
};

export function useGetPopularCoursesAtWebsite({ params }: { params: Pick<FeaturedContentParams, 'org_id'> }) {
  const endpointKey = createAPIUrl({
    endpoint: API_ENDPOINT.FEATURED_CONTENT_BY_TYPES,
    queryParams: { ...params },
  });

  const { data, isLoading, error, mutate } = useSWR(endpointKey, (endpoint: string) =>
    getPopularCoursesServices(endpoint, { params })
  );

  return {
    dataPopularCourses: data,
    errorCourses: error,
    mutatePopularCourses: mutate,
    isLoadingCourses: isLoading,
  };
}
