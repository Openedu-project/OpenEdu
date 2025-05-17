import useSWR from 'swr';
import { getI18nConfigClient } from '#services/i18n';
import { createSystemConfigSWRKey } from '#services/system-config';
import type { I18nConfig } from '#types/i18n';
import type { ISystemConfigRes } from '#types/system-config';
import { systemConfigKeys } from '#utils/system-config';

export function useGetI18nConfig() {
  const endpoint = createSystemConfigSWRKey({ key: systemConfigKeys.i18nConfig });
  const { data, mutate, isLoading, error } = useSWR(endpoint, getI18nConfigClient);

  return {
    isLoadingI18nConfig: isLoading,
    errorI18nConfig: error,
    dataI18nConfig: (data as ISystemConfigRes<I18nConfig>[])?.[0]?.value ?? null,
    mutateI18nConfig: mutate,
  };
}
