import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { buildUrl } from '@oe/core';
import {
  getListApprovalByAdminService,
  getListApprovalService,
  getListUserApprovalService,
  postApprovalService,
  postFeedbackService,
  postRejectService,
} from '#services/approval';
import type { ICourse } from '#types/course/course';
import type { ICourseOrganizationRequestProps } from '#types/course/org-request';
import type { IFilter } from '#types/filter';
import { API_ENDPOINT } from '#utils/endpoints';
import type {
  IApproval,
  IApprovalPayload,
  IApprovalRes,
  IFeedbackPayload,
  IRejectPayload,
  IRejectRes,
} from '../types/approvals';

export function useGetListApprovals({ params }: { params: IFilter }) {
  const endpointKey = buildUrl({ endpoint: API_ENDPOINT.APPROVALS, queryParams: { ...params } });
  const { data, isLoading, error, mutate } = useSWR(endpointKey, (endpoint: string) =>
    getListApprovalService(endpoint, { params })
  );

  return {
    dataListApproval: data,
    errorApproval: error,
    mutateListApproval: mutate,
    isLoadingApproval: isLoading,
  };
}

export function useGetListUserApprovals({ params }: { params: IFilter }) {
  const endpointKey = buildUrl({ endpoint: API_ENDPOINT.USERS_ME_APPROVALS, queryParams: { ...params } });
  const { data, isLoading, error, mutate } = useSWR(endpointKey, (endpoint: string) =>
    getListUserApprovalService(endpoint, { params })
  );

  return {
    dataListUserApproval: data,
    errorUserApproval: error,
    mutateListUserApproval: mutate,
    isLoadingUserApproval: isLoading,
  };
}

export function useGetListApprovalByAdmin({ params }: { params: IFilter }) {
  const endpointKey = buildUrl({ endpoint: API_ENDPOINT.ADMIN_APPROVALS, queryParams: { ...params } });
  const { data, isLoading, error, mutate } = useSWR(endpointKey, (endpoint: string) =>
    getListApprovalByAdminService(endpoint, { params })
  );

  return {
    dataListApprovalByAdmin: data,
    errorApprovalByAdmin: error,
    mutateListApprovalByAdmin: mutate,
    isLoadingApprovalByAdmin: isLoading,
  };
}

export function useReject(id: string) {
  const endpointKey = buildUrl({ endpoint: API_ENDPOINT.APPROVALS_ID_REJECT, params: { id } });

  const { trigger, isMutating, error } = useSWRMutation(
    endpointKey,
    async (_endpoint: string, { arg }: { arg: IRejectPayload }): Promise<IRejectRes> =>
      postRejectService(endpointKey, { payload: arg })
  );
  return {
    triggerReject: trigger,
    isLoadingReject: isMutating,
    errorReject: error,
  };
}

export function useApprove(id: string) {
  const endpointKey = buildUrl({ endpoint: API_ENDPOINT.APPROVALS_ID_APPROVE, params: { id } });

  const { trigger, isMutating, error } = useSWRMutation(
    endpointKey,
    async (_endpoint: string, { arg }: { arg: IApprovalPayload }): Promise<IApprovalRes> =>
      postApprovalService(endpointKey, { payload: arg })
  );
  return {
    triggerApprove: trigger,
    isLoadingApprove: isMutating,
    errorApprove: error,
  };
}

export function useAdminFeedback(id: string) {
  const endpointKey = buildUrl({ endpoint: API_ENDPOINT.APPROVALS_ID_FEEDBACK, params: { id } });

  const { trigger, isMutating, error } = useSWRMutation(
    endpointKey,
    async (
      _endpoint: string,
      { arg }: { arg: IFeedbackPayload }
    ): Promise<IApproval<ICourse, ICourseOrganizationRequestProps>> =>
      postFeedbackService(endpointKey, { payload: arg })
  );
  return {
    triggerAdminFeedback: trigger,
    isFeedbackMutating: isMutating,
    errorAdminFeedback: error,
  };
}
