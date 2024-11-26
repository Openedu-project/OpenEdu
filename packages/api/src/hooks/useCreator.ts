import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import {
  deleteCreatorService,
  getListCreatorService,
  postCreateCreatorService,
  postCreatorAcceptInvitationService,
  postInviteCreatorsService,
} from '#services/creator';
import type {
  IAcceptInvitePayload,
  ICreator,
  ICreatorAcceptResponse,
  ICreatorPayload,
  ICreatorResponse,
  IDeleteCreatorsPayload,
  IInviteCreatorPayload,
} from '#types/creators';
import type { IFilter } from '#types/filter';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl } from '#utils/fetch';

export function useInviteCreators() {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.ADMIN_CREATORS_INVITE,
    async (endpoint: string, { arg }: { arg: IInviteCreatorPayload }): Promise<ICreatorResponse> =>
      postInviteCreatorsService(endpoint, { payload: arg })
  );
  return {
    isLoading: isMutating,
    triggerInviteCreators: trigger,
    error,
  };
}

export function useAcceptInvitation() {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.ADMIN_CREATORS_INVITE,
    async (endpoint: string, { arg }: { arg: IAcceptInvitePayload }): Promise<ICreatorAcceptResponse> =>
      postCreatorAcceptInvitationService(endpoint, { payload: arg })
  );
  return {
    triggerAcceptInvitation: trigger,
    isLoading: isMutating,
    error,
  };
}

export function useGetListCreator({ params }: { params: IFilter }) {
  const endpointKey = createAPIUrl({ endpoint: API_ENDPOINT.ADMIN_CREATORS, queryParams: { ...params } });
  const { data, isLoading, error, mutate } = useSWR(endpointKey, (endpoint: string) =>
    getListCreatorService(endpoint, { params })
  );

  return {
    dataListCreator: data,
    error,
    mutateListCreator: mutate,
    isLoading,
  };
}

export function useCreateCreator() {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.ADMIN_CREATORS,
    async (endpoint: string, { arg }: { arg: ICreatorPayload }): Promise<ICreator> =>
      postCreateCreatorService(endpoint, { payload: arg })
  );
  return {
    triggerCreateCreator: trigger,
    isLoading: isMutating,
    error,
  };
}

export function useDeleteCreator(params: IDeleteCreatorsPayload) {
  // const queryString = new URLSearchParams();

  // if (params.org_id) queryString.append('org_id', params.org_id);
  // for (const id of params.creator_ids) queryString.append('creator_ids', id);
  const endpointKey = createAPIUrl({ endpoint: API_ENDPOINT.ADMIN_CREATORS, queryParams: { ...params } });

  const { trigger, isMutating, error } = useSWRMutation(
    endpointKey,
    async (endpoint: string, { arg }: { arg: IDeleteCreatorsPayload }): Promise<ICreatorResponse | null> =>
      deleteCreatorService(endpoint, { payload: arg })
  );

  return {
    triggerDeleteCreator: trigger,
    isLoading: isMutating,
    error,
  };
}
