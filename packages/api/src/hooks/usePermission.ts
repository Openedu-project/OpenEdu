import { ADMIN_ROUTES, CREATOR_ROUTES } from '@oe/core/utils/routes';
import { useMemo } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import {
  getPermissionAccessService,
  getPermissionMyAccessService,
  getPermissionPageConfigService,
  postPermissionAccessService,
  postPermissionConfigService,
} from '#services/permissions';
import type { IFilter } from '#types/filter';
import type {
  IPermissionAccessPayload,
  IPermissionAccessRes,
  IPermissionConfigPayload,
  IPermissionConfigRes,
  IPermissionGroupedRoutes,
  IPermissionRouteKey,
} from '#types/permissions';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl } from '#utils/fetch';

export const usePermissionRoutes = () => {
  return useMemo<IPermissionGroupedRoutes>(
    () => ({
      admin: Object.entries(ADMIN_ROUTES).map(([key, path]) => ({
        key: `admin.${key}` as IPermissionRouteKey,
        path,
        name: key.replace(/([A-Z])/g, ' $1').toLowerCase(),
      })),
      creator: Object.entries(CREATOR_ROUTES).map(([key, path]) => ({
        key: `creator.${key}` as IPermissionRouteKey,
        path,
        name: key.replace(/([A-Z])/g, ' $1').toLowerCase(),
      })),
    }),
    []
  );
};

// Page Config
export function useGetPermissionPageConfig({ params }: { params: IFilter }) {
  const endpointKey = createAPIUrl({ endpoint: API_ENDPOINT.PAGE_CONFIGS, queryParams: { ...params } });
  const { data, isLoading, error, mutate } = useSWR(endpointKey, (endpoint: string) =>
    getPermissionPageConfigService(endpoint, { params })
  );

  return {
    dataListPermissionPageConfig: data,
    errorPermissionPageConfig: error,
    mutateListPermissionPageConfig: mutate,
    isLoadingPermissionPageConfig: isLoading,
  };
}

export function useCreatePermissionConfig() {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.PAGE_CONFIGS,
    async (endpoint: string, { arg }: { arg: IPermissionConfigPayload }): Promise<IPermissionConfigRes> =>
      postPermissionConfigService(endpoint, { payload: arg })
  );
  return {
    triggerCreatePermissionConfig: trigger,
    isLoadingCreatePermissionConfig: isMutating,
    errorCreatePermissionConfig: error,
  };
}

// Page Access
export function useGetPermissionPageAccess({ orgId, params }: { orgId: string; params: IFilter }) {
  const endpointKey = orgId ? createAPIUrl({ endpoint: API_ENDPOINT.PAGE_ACCESSES, queryParams: { ...params } }) : null;
  const { data, isLoading, error, mutate } = useSWR(endpointKey, (endpoint: string) =>
    getPermissionAccessService(endpoint, { params })
  );

  return {
    dataListPermissionPageAccess: data,
    errorPermissionPageAccess: error,
    mutateListPermissionPageAccess: mutate,
    isLoadingPermissionPageAccess: isLoading,
  };
}
export function useGetPermissionMyPageAccess() {
  const { data, isLoading, error, mutate } = useSWR(API_ENDPOINT.USERS_ME_PERMISSIONS, (endpoint: string) =>
    getPermissionMyAccessService(endpoint, { params: undefined })
  );

  return {
    dataListPermissionMyPageAccess: data,
    errorMyPageAccess: error,
    mutateListPermissionMyPageAccess: mutate,
    isLoadingMyPageAccess: isLoading,
  };
}

export function useCreatePermissionAccess() {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.PAGE_ACCESSES,
    async (endpoint: string, { arg }: { arg: IPermissionAccessPayload }): Promise<IPermissionAccessRes> =>
      postPermissionAccessService(endpoint, { payload: arg })
  );
  return {
    triggerCreatePermissionAccess: trigger,
    isLoadingCreatePermissionAccess: isMutating,
    errorCreatePermissionAccess: error,
  };
}
