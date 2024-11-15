import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { createSystemConfig, getSystemConfig, updateSystemConfig } from '#services/system-config';
import type { ISystemConfigKey } from '#types/system-config';
import { API_ENDPOINT } from '#utils/endpoints';

export const useSystemConfig = <T>(key: ISystemConfigKey) => {
  const { data, isLoading, error, mutate } = useSWR(API_ENDPOINT.ADMIN_SYSTEM_CONFIGS, (endpoint: string) =>
    getSystemConfig<T>(endpoint, { key })
  );

  return { systemConfig: data, systemConfigIsLoading: isLoading, systemConfigError: error, systemConfigMutate: mutate };
};

export const useCreateSystemConfig = <T>(key: ISystemConfigKey) => {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.ADMIN_SYSTEM_CONFIGS,
    (endpoint: string, { arg }: { arg: T }) => createSystemConfig<T>(endpoint, { payload: { key, value: arg } })
  );

  return { triggerCreateSystemConfig: trigger, isLoading: isMutating, error };
};

export const useUpdateSystemConfig = <T>(key: ISystemConfigKey) => {
  const { trigger, isMutating, error } = useSWRMutation(
    API_ENDPOINT.ADMIN_SYSTEM_CONFIGS,
    (endpoint: string, { arg }: { arg: { id: string; payload: T } }) =>
      updateSystemConfig<T>(endpoint, { id: arg.id, payload: { key, value: arg.payload } })
  );

  return { triggerUpdateSystemConfig: trigger, isLoading: isMutating, error };
};
