import useSWR from 'swr';
import { getCategoriesTreeService } from '#services/categories';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl } from '#utils/fetch';

export const useCategoriesTree = (queryParams?: Record<string, string | boolean>) => {
  const { data, error, isLoading, mutate } = useSWR(
    createAPIUrl({ endpoint: API_ENDPOINT.CATEGORIES_TREE, queryParams }),
    getCategoriesTreeService
  );

  return {
    categoriesTree: data,
    categoriesTreeError: error,
    categoriesTreeIsLoading: isLoading,
    categoriesTreeMutate: mutate,
  };
};
