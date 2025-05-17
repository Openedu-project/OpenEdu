import { buildUrl } from '@oe/core';
import type { ICourse } from '#types/course/course';
import type { ICourseOrganizationRequestProps } from '#types/course/org-request';
import type { IFilter } from '#types/filter';
import { API_ENDPOINT } from '#utils/endpoints';
import { fetchAPI, postAPI } from '#utils/fetch';
import type { IApproval, IApprovalPayload, IFeedbackPayload, IListApproval, IRejectPayload } from '../types/approvals';

export async function getListApprovalService<T, R>(
  url: string,
  { params, init }: { params: IFilter; init?: RequestInit }
): Promise<IListApproval<T, R> | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = buildUrl({
      endpoint: API_ENDPOINT.APPROVALS,
      queryParams: {
        ...params,
      },
    });
  }

  try {
    const response = await fetchAPI<IListApproval<T, R>>(endpointKey, init);

    return response.data;
  } catch {
    return null;
  }
}

export async function getListUserApprovalService<T, R>(
  url: string,
  { params, init }: { params: IFilter; init?: RequestInit }
): Promise<IListApproval<T, R> | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = buildUrl({
      endpoint: API_ENDPOINT.USERS_ME_APPROVALS,
      queryParams: {
        ...params,
      },
    });
  }

  try {
    const response = await fetchAPI<IListApproval<T, R>>(endpointKey, init);

    return response.data;
  } catch {
    return null;
  }
}

export async function getListApprovalByAdminService<T, R>(
  url: string,
  { params, init }: { params: IFilter; init?: RequestInit }
): Promise<IListApproval<T, R> | null> {
  let endpointKey = url;
  if (!endpointKey) {
    endpointKey = buildUrl({
      endpoint: API_ENDPOINT.ADMIN_APPROVALS,
      queryParams: {
        ...params,
      },
    });
  }

  try {
    const response = await fetchAPI<IListApproval<T, R>>(endpointKey, init);

    return response.data;
  } catch {
    return null;
  }
}

export const postApprovalService = async <T, R>(
  endpoint: string | null | undefined,
  { payload, init }: { payload: IApprovalPayload; init?: RequestInit }
) => {
  const response = await postAPI<IApproval<T, R>, IApprovalPayload>(
    endpoint ?? API_ENDPOINT.APPROVALS_ID_APPROVE,
    payload,
    init
  );

  return response.data;
};

export const postRejectService = async <T, R>(
  endpoint: string | null | undefined,
  { payload, init }: { payload: IRejectPayload; init?: RequestInit }
) => {
  const response = await postAPI<IApproval<T, R>, IRejectPayload>(
    endpoint ?? API_ENDPOINT.APPROVALS_ID_REJECT,
    payload,
    init
  );

  return response.data;
};

export const postFeedbackService = async (
  endpoint: string | null | undefined,
  { payload, init }: { payload: IFeedbackPayload; init?: RequestInit }
) => {
  const response = await postAPI<IApproval<ICourse, ICourseOrganizationRequestProps>, IFeedbackPayload>(
    endpoint ?? API_ENDPOINT.APPROVALS_ID_FEEDBACK,
    payload,
    init
  );

  return response.data;
};
