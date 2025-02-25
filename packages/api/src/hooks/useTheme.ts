import type { ThemeSystem } from '@oe/themes/types/theme-system-config';
import useSWR from 'swr';
import { createThemeSystemConfigSWRKey } from '#services/system-config';
import { getThemeConfigClient } from '#services/theme';
import type { ISystemConfigRes } from '#types/system-config';

// export function useGetTheme(shouldFetch = true) {
//   const endpoint = createSystemConfigSWRKey({ key: systemConfigKeys.themeSystem });
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

export function useGetThemeByHost(shouldFetch = true) {
  const endpoint = createThemeSystemConfigSWRKey({});
  const { data, isLoading, error, mutate } = useSWR(shouldFetch ? endpoint : null, (endpoint: string) =>
    getThemeConfigClient(endpoint)
  );

  return {
    theme: data as ISystemConfigRes<ThemeSystem>[],
    themeError: error,
    mutateTheme: mutate,
    themeLoading: isLoading,
  };
}
