import useSWR from 'swr';
import { getThemeConfigClient } from '#services/theme';
import type { ISystemConfigRes } from '#types/system-config';
import { API_ENDPOINT } from '#utils/endpoints';
import { createAPIUrl } from '#utils/fetch';
import { getAPIReferrerAndOriginClient } from '#utils/referrer-origin';
import { createThemeSystemConfigKeyClient } from '#utils/system-config';

import type { ThemeName, ThemeSystem } from '../../../themes/src/_types';

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
  const { host } = getAPIReferrerAndOriginClient();

  const endpoint = createAPIUrl({
    endpoint: API_ENDPOINT.SYSTEM_CONFIGS,
    queryParams: {
      keys: createThemeSystemConfigKeyClient(organizationByDomain?.domain?.split('.')?.[0] as ThemeName | undefined),
      domains: host,
    },
  });

  console.info('host', host);

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
