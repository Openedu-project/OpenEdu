import useSWR from 'swr';
import { getCategoriesTreeService } from '#services/categories';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl } from '#utils/fetch';

export const useCategoriesTree = (queryParams?: Record<string, string | boolean>) => {
  const endpointKey = createAPIUrl({ endpoint: API_ENDPOINT.CATEGORIES_TREE, queryParams });
  const { data, error, isLoading, mutate } = useSWR(queryParams?.org_id ? endpointKey : null, getCategoriesTreeService);

  return {
    categoriesTree: data,
    categoriesTreeError: error,
    categoriesTreeIsLoading: isLoading,
    categoriesTreeMutate: mutate,
  };
};
