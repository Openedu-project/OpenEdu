import useSWR from 'swr';
import { getCategoriesService, getCategoriesTreeService } from '#services/categories';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl } from '#utils/fetch';

export const useCategoriesTree = (queryParams?: Record<string, string | boolean>, shouldFetch = true) => {
  const endpointKey = createAPIUrl({ endpoint: API_ENDPOINT.CATEGORIES_TREE, queryParams });
  const { data, error, isLoading, mutate } = useSWR(shouldFetch ? endpointKey : null, getCategoriesTreeService);

  return {
    categoriesTree: data,
    categoriesTreeError: error,
    categoriesTreeIsLoading: isLoading,
    categoriesTreeMutate: mutate,
  };
};
export const useCategories = (queryParams?: Record<string, string | boolean>) => {
  const { data, error, isLoading, mutate } = useSWR(
    createAPIUrl({ endpoint: API_ENDPOINT.CATEGORIES, queryParams }),
    getCategoriesService
  );

  return {
    categories: data,
    categoriesError: error,
    categoriesIsLoading: isLoading,
    categoriesMutate: mutate,
  };
};
