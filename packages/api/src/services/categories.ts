import { buildUrl } from '@oe/core';
import type { ICategoriesResponse, ICategoryBulkUpsert, ICategoryTree } from '#types/categories';
import { API_ENDPOINT } from '#utils/endpoints';
import { fetchAPI, postAPI } from '#utils/fetch';

export const getCategoriesTreeService = async (
  url?: string,
  init?: RequestInit & { queryParams?: Record<string, string | boolean> }
) => {
  const defaultUrl = buildUrl({ endpoint: API_ENDPOINT.CATEGORIES_TREE, queryParams: init?.queryParams });
  const response = await fetchAPI<ICategoryTree[]>(url ?? defaultUrl, init);
  return response.data;
};

export const createUpdateCategoriesTreeService = async (payload: ICategoryBulkUpsert, init?: RequestInit) => {
  const response = await postAPI<ICategoryTree[], ICategoryBulkUpsert>(
    API_ENDPOINT.CATEGORIES_BULK_UPSERT,
    payload,
    init
  );

  return response.data;
};

export const bulkDeleteCategoryService = async (ids: string[], init?: RequestInit) => {
  const response = await postAPI<ICategoryTree[], { ids: string[] }>(
    API_ENDPOINT.CATEGORIES_BULK_DELETE,
    { ids },
    init
  );

  return response.data;
};

export const getCategoriesService = async (
  url?: string,
  init?: RequestInit & { queryParams?: Record<string, string> }
) => {
  const defaultUrl = buildUrl({
    endpoint: API_ENDPOINT.CATEGORIES,
    queryParams: init?.queryParams,
  });

  const response = await fetchAPI<ICategoriesResponse>(url ?? defaultUrl, init);

  return response.data;
};
