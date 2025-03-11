import { buildUrl } from '@oe/core/utils/url';
import useSWR from 'swr';
import { getFormService, getFormsService } from '#services/forms';
import { API_ENDPOINT } from '#utils/endpoints';

export function useGetForm({ id }: { id: string }) {
  const endpointKey = buildUrl({ endpoint: API_ENDPOINT.FORMS_ID, params: { id } });
  const { data, isLoading, error, mutate } = useSWR(id ? endpointKey : null, (endpoint: string) =>
    getFormService(endpoint, { id })
  );

  return {
    dataForm: data,
    error,
    mutateForm: mutate,
    isLoading,
  };
}

export function useGetForms(queryParams?: Record<string, string | boolean | number>) {
  const endpointKey = buildUrl({ endpoint: API_ENDPOINT.FORMS, queryParams });
  const { data, isLoading, error, mutate } = useSWR(endpointKey, (endpoint: string) =>
    getFormsService(endpoint, { queryParams })
  );

  return {
    dataForms: data?.results,
    error,
    mutateForms: mutate,
    isLoading,
  };
}
