import type { LanguageCode } from '@oe/i18n/languages';
import useSWR from 'swr';
import { createSystemConfigSWRKey, getSystemConfigClient } from '#services/system-config';
import type { ISystemConfigKey } from '#types/system-config';

export const useSystemConfig = <T>({
  key,
  locales,
  shouldFetch = true,
}: { key: ISystemConfigKey; locales?: LanguageCode[]; shouldFetch?: boolean }) => {
  const endpointKey = createSystemConfigSWRKey({ key, locales });
  const { data, isLoading, error, mutate } = useSWR(shouldFetch ? endpointKey : null, (endpoint: string) =>
    getSystemConfigClient<T>(endpoint, { key })
  );

  return { systemConfig: data, systemConfigIsLoading: isLoading, systemConfigError: error, systemConfigMutate: mutate };
};

// export const useCreateSystemConfig = <T>(key: ISystemConfigKey) => {
//   const { trigger, isMutating, error } = useSWRMutation(
//     API_ENDPOINT.ADMIN_SYSTEM_CONFIGS,
//     (endpoint: string, { arg }: { arg: T }) => createSystemConfig<T>(endpoint, { payload: { key, value: arg } })
//   );

//   return { triggerCreateSystemConfig: trigger, isLoading: isMutating, error };
// };

// export const useUpdateSystemConfig = <T>(key: ISystemConfigKey) => {
//   const { trigger, isMutating, error } = useSWRMutation(
//     API_ENDPOINT.ADMIN_SYSTEM_CONFIGS,
//     (endpoint: string, { arg }: { arg: { id: string; payload: T } }) =>
//       updateSystemConfig<T>(endpoint, { id: arg.id, payload: { key, value: arg.payload } })
//   );

//   return { triggerUpdateSystemConfig: trigger, isLoading: isMutating, error };
// };
