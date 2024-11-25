import { useSystemConfig } from '@oe/api/hooks/useSystemConfig';
import { fetchTranslationFile } from '@oe/api/services/i18n';
import { systemConfigKeys } from '@oe/api/utils/system-config';
import type { LanguageCode } from '@oe/i18n/languages';
import type { I18nMessage } from '@oe/i18n/types';
import { useEffect } from 'react';
import useSWR from 'swr';
import { useLanguageStore } from './_store/useLanguageStore';
import { getUrls } from './_utils';

export const useI18nTranslations = () => {
  const { locales, updateTranslations, setFiles } = useLanguageStore();

  const { systemConfig, systemConfigIsLoading } = useSystemConfig<I18nMessage>({
    key: systemConfigKeys.i18nTranslations,
    shouldFetch: (locales?.length ?? 0) > 0,
  });

  const urls = getUrls({ locales, systemConfig });

  const { data: translations } = useSWR(
    Object.keys(urls).length > 0 ? urls : null,
    async (urlMap: Record<LanguageCode, string>) => {
      const results = {} as Record<LanguageCode, I18nMessage>;

      await Promise.all(
        Object.entries(urlMap).map(async ([locale, url]) => {
          const data = await fetchTranslationFile(url);
          if (data) {
            results[locale as LanguageCode] = data;
          }
        })
      );

      return results;
    }
  );

  useEffect(() => {
    if (translations && urls) {
      setFiles(urls);
      updateTranslations(translations);
    }
  }, [translations, urls, setFiles, updateTranslations]);

  return {
    isLoading: systemConfigIsLoading,
    systemConfig,
  };
};
