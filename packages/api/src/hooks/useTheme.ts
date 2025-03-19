import useSWR from 'swr';
import { createThemeSystemConfigSWRKey } from '#services/system-config';
import { getThemeConfigClient } from '#services/theme';
import type { ISystemConfigRes } from '#types/system-config';
import type { ThemeSystem } from '../../../themes/src/_types';

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
  const endpoint = createThemeSystemConfigSWRKey({});

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
