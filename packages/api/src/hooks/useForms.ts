import { buildUrl } from '@oe/core/utils/url';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import {
  getFormResponsesService,
  getFormService,
  getFormSummaryService,
  getFormUserResponsesService,
  getFormsService,
  getQuestionAnswersStatsService,
  postCloneForm,
} from '#services/forms';
import type { IFormResponse } from '#types/form';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl } from '#utils/fetch';

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

export function useGetFormResponses(id?: string, queryParams?: Record<string, string | boolean | number>) {
  const endpointKey = buildUrl({ endpoint: API_ENDPOINT.FORMS_ID_SESSIONS, params: { id }, queryParams });
  const { data, isLoading, error, mutate } = useSWR(id ? endpointKey : null, (endpoint: string) =>
    getFormResponsesService(endpoint, { id, queryParams })
  );

  return {
    dataFormResponses: data?.results,
    error,
    mutateFormResponses: mutate,
    isLoading,
  };
}

export function useGetQuestionAnswersStats(id?: string) {
  const endpointKey = buildUrl({ endpoint: API_ENDPOINT.FORM_QUESTIONS_ID_ANSWERS, params: { id } });
  const { data, isLoading, error, mutate } = useSWR(id ? endpointKey : null, (endpoint: string) =>
    getQuestionAnswersStatsService(endpoint, { id })
  );

  return {
    dataQuestionAnswersStats: data,
    error,
    mutateQuestionAnswersStats: mutate,
    isLoading,
  };
}

export function useGetFormSummary(id?: string) {
  const endpointKey = buildUrl({ endpoint: API_ENDPOINT.FORMS_ID_SUMMARY, params: { id } });
  const { data, isLoading, error, mutate } = useSWR(id ? endpointKey : null, (endpoint: string) =>
    getFormSummaryService(endpoint, { id })
  );

  return {
    dataFormSummary: data,
    error,
    mutateFormSummary: mutate,
    isLoading,
  };
}

// Use the answers
export function useGetFormUserResponses(id?: string, queryParams?: Record<string, string | boolean | number>) {
  const endpointKey = buildUrl({ endpoint: API_ENDPOINT.FORMS_ID_SESSIONS, params: { id }, queryParams });
  const { data, isLoading, error, mutate } = useSWR(id ? endpointKey : null, (endpoint: string) =>
    getFormUserResponsesService(endpoint, { id, queryParams })
  );

  return {
    dataFormUserResponses: data?.results,
    error,
    mutateFormResponses: mutate,
    isLoading,
  };
}

export const usePostCloneForm = () => {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.FORMS_ID_DUPLICATE,
    async (_endpoint: string, { arg }: { arg: string }): Promise<IFormResponse> =>
      postCloneForm(
        createAPIUrl({
          endpoint: API_ENDPOINT.FORMS_ID_DUPLICATE,
          params: {
            id: arg,
          },
        }),
        {
          payload: arg,
        }
      )
  );

  return {
    triggerCloneForm: trigger,
    isLoadingCloneForm: isMutating,
    cloneFormError: error,
  };
};
