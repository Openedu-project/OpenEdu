import { buildUrl } from '@oe/core';
import useSWR from 'swr';
import { getCategoriesService, getCategoriesTreeService } from '#services/categories';
import type { ICategoryTree } from '#types/categories';
import { API_ENDPOINT } from '#utils/endpoints';

export const useCategoriesTree = (
  queryParams?: Record<string, string | boolean>,
  fallback?: ICategoryTree[],
  shouldFetch = true
) => {
  const endpointKey = buildUrl({ endpoint: API_ENDPOINT.CATEGORIES_TREE, queryParams });
  const { data, error, isLoading, mutate } = useSWR(shouldFetch ? endpointKey : null, getCategoriesTreeService, {
    fallbackData: fallback,
  });

  return {
    categoriesTree: data,
    categoriesTreeError: error,
    categoriesTreeIsLoading: isLoading,
    categoriesTreeMutate: mutate,
  };
};
export const useCategories = (queryParams?: Record<string, string | boolean | number>) => {
  const { data, error, isLoading, mutate } = useSWR(
    buildUrl({ endpoint: API_ENDPOINT.CATEGORIES, queryParams }),
    getCategoriesService
  );

  return {
    categories: data,
    categoriesError: error,
    categoriesIsLoading: isLoading,
    categoriesMutate: mutate,
  };
};
