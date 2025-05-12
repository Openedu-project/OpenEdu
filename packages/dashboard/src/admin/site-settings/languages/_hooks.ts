import { fetchTranslationFile } from '@oe/api';
import { systemConfigKeys } from '@oe/api';
import { useSystemConfig } from '@oe/api';
import type { LanguageCode } from '@oe/i18n';
import type { I18nMessage } from '@oe/i18n';
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
      const promises = Object.entries(urlMap).map(async ([locale, url]) => {
        try {
          const data = await fetchTranslationFile(url);
          return { locale, data } as { locale: LanguageCode; data: I18nMessage | null };
        } catch (error) {
          console.error(`Failed to fetch translation for ${locale}:`, error);
          return { locale, data: null };
        }
      });

      const results = await Promise.allSettled(promises);

      return results.reduce(
        (acc, result) => {
          if (result.status === 'fulfilled' && result.value.data) {
            acc[result.value.locale] = result.value.data;
          }
          return acc;
        },
        {} as Record<LanguageCode, I18nMessage>
      );
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
    translationMessages: translations,
  };
};
