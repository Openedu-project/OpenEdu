import useSWR from 'swr';
import { createOrUpdateThemeConfig, getThemeConfigClient } from '#services/theme';
import type { ISystemConfigRes } from '#types/system-config';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl } from '#utils/fetch';
import { createThemeSystemConfigKeyClient } from '#utils/system-config';

import type { ThemeSystem } from '../../../themes/src/_types';

import useSWRMutation from 'swr/mutation';
import type { IThemeSystemConfigPayload } from '#types/theme';
import { useGetOrganizationByDomain } from './useOrganization';

// export function useGetTheme(shouldFetch = true) {
//   const endpoint = createThemeSystemConfigSWRKey({});
//   const { data, isLoading, error, mutate } = useSWR(shouldFetch ? endpoint : null, (endpoint: string) =>
//     getThemeConfigClient(endpoint)
//   );

//   return {
//     theme: data as ISystemConfigRes<ThemeSystem>[],
//     themeError: error,
//     mutateTheme: mutate,
//     themeLoading: isLoading,
//   };
// }

export function useGetTheme(fallback: ISystemConfigRes<ThemeSystem>[] | undefined = undefined) {
  const { organizationByDomain } = useGetOrganizationByDomain();

  const endpoint = createAPIUrl({
    endpoint: API_ENDPOINT.SYSTEM_CONFIGS,
    queryParams: {
      keys: createThemeSystemConfigKeyClient(organizationByDomain?.domain),
      domains: organizationByDomain?.domain,
    },
  });

  const { data, isLoading, error, mutate } = useSWR(endpoint, (endpoint: string) => getThemeConfigClient(endpoint), {
    fallbackData: fallback,
  });

  return {
    theme: data as ISystemConfigRes<ThemeSystem>[],
    themeError: error,
    mutateTheme: mutate,
    themeLoading: isLoading,
  };
}

export function useCreateOrUpdateThemeConfig() {
  const { organizationByDomain } = useGetOrganizationByDomain();

  const createConfigEndpoint = API_ENDPOINT.ADMIN_SYSTEM_CONFIGS;
  const updateConfigEdnpoint = API_ENDPOINT.ADMIN_SYSTEM_CONFIGS_ID;

  const { trigger, isMutating, error } = useSWRMutation(
    createConfigEndpoint,
    async (url: string, { arg }: { arg: IThemeSystemConfigPayload }) =>
      createOrUpdateThemeConfig(arg?.id ? updateConfigEdnpoint : url, {
        ...arg,
        domain: organizationByDomain?.domain ?? arg.domain,
      })
  );

  return {
    createOrUpdateThemeConfig: trigger,
    isLoadingCreateOrUpdateThemeConfig: isMutating,
    errorCreateOrUpdateThemeConfig: error,
  };
}
