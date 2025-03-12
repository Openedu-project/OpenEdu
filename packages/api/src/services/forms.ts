import { buildUrl } from '@oe/core/utils/url';
import type { ICourseFormTrigger } from '#schemas/courses/forms';
import type { HTTPPagination } from '#types/fetch';
import type { IFormParams, IFormResponse } from '#types/form';
import { API_ENDPOINT } from '#utils/endpoints';
import { deleteAPI, fetchAPI, postAPI, putAPI } from '#utils/fetch';

export const getFormsService = async (
  url: string | undefined,
  { init, queryParams }: { init?: RequestInit; queryParams?: Record<string, string | boolean | number> }
) => {
  const response = await fetchAPI<HTTPPagination<IFormResponse>>(
    url ?? buildUrl({ endpoint: API_ENDPOINT.FORMS, queryParams }),
    init
  );
  return response.data;
};

export const deleteFormService = async (url: string | undefined, { id, init }: { id: string; init?: RequestInit }) => {
  const response = await deleteAPI(
    url ?? buildUrl({ endpoint: API_ENDPOINT.FORMS_ID, params: { id } }),
    undefined,
    init
  );
  return response.data;
};

export const createFormService = async (
  url: string | undefined,
  { data, init }: { data: IFormParams; init?: RequestInit }
) => {
  const response = await postAPI<IFormResponse, IFormParams>(
    url ?? buildUrl({ endpoint: API_ENDPOINT.FORMS }),
    data,
    init
  );
  return response.data;
};

export const updateFormService = async (
  url: string | undefined,
  { id, data, init }: { id: string; data: IFormParams; init?: RequestInit }
) => {
  const response = await putAPI<IFormResponse, IFormParams>(
    url ?? buildUrl({ endpoint: API_ENDPOINT.FORMS_ID, params: { id } }),
    data,
    init
  );
  return response.data;
};

export const getFormService = async (url: string | undefined, { id, init }: { id: string; init?: RequestInit }) => {
  const response = await fetchAPI<IFormResponse>(
    url ?? buildUrl({ endpoint: API_ENDPOINT.FORMS_ID, params: { id } }),
    init
  );
  return response.data;
};

export const createFormTriggerService = async (
  url: string | undefined,
  { data, init }: { data: ICourseFormTrigger; init?: RequestInit }
) => {
  const response = await postAPI<ICourseFormTrigger, ICourseFormTrigger>(
    url ?? buildUrl({ endpoint: API_ENDPOINT.FORM_RELATIONS }),
    data,
    init
  );
  return response.data;
};

export const updateFormTriggerService = async (
  url: string | undefined,
  { id, data, init }: { id: string; data: ICourseFormTrigger; init?: RequestInit }
) => {
  const response = await putAPI<ICourseFormTrigger, ICourseFormTrigger>(
    url ?? buildUrl({ endpoint: API_ENDPOINT.FORM_RELATIONS_ID, params: { id } }),
    data,
    init
  );
  return response.data;
};

export const deleteFormTriggerService = async (
  url: string | undefined,
  { id, init }: { id: string; init?: RequestInit }
) => {
  const response = await deleteAPI(
    url ?? buildUrl({ endpoint: API_ENDPOINT.FORM_RELATIONS_ID, params: { id } }),
    undefined,
    init
  );
  return response.data;
};

export const getFormResponsesService = async (
  url: string | undefined,
  {
    id,
    queryParams,
    init,
  }: { id?: string; queryParams?: Record<string, string | boolean | number>; init?: RequestInit }
) => {
  const response = await fetchAPI<HTTPPagination<IFormResponse>>(
    url ?? buildUrl({ endpoint: API_ENDPOINT.FORMS_ID_SESSIONS, params: { id }, queryParams }),
    init
  );
  return response.data;
};

export const getQuestionAnswersStatsService = async (
  url: string | undefined,
  { id, init }: { id?: string; init?: RequestInit }
) => {
  const response = await fetchAPI<HTTPPagination<IFormResponse>>(
    url ?? buildUrl({ endpoint: API_ENDPOINT.FORM_QUESTIONS_ID_ANSWERS, params: { id } }),
    init
  );
  return response.data;
};

export const getFormSummaryService = async (
  url: string | undefined,
  { id, init }: { id?: string; init?: RequestInit }
) => {
  const response = await fetchAPI<HTTPPagination<IFormResponse>>(
    url ?? buildUrl({ endpoint: API_ENDPOINT.FORMS_ID_SUMMARY, params: { id } }),
    init
  );
  return response.data;
};
