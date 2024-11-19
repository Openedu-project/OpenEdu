import { useSystemConfig } from '@oe/api/hooks/useSystemConfig';
import { systemConfigKeys } from '@oe/api/utils/system-config';
import type { LanguageCode } from '@oe/i18n/languages';
import type { I18nMessage } from '@oe/i18n/types';
import { useCallback, useEffect } from 'react';
import { useLanguageStore } from './_store/useLanguageStore';
import { getCurrentI18nFile, groupI18nConfigsByLocale } from './_utils';

export const useI18nTranslations = () => {
  const { locales, updateTranslations } = useLanguageStore();

  const { systemConfig, systemConfigIsLoading } = useSystemConfig<I18nMessage>({
    key: systemConfigKeys.i18nTranslations,
    shouldFetch: (locales?.length ?? 0) > 0,
  });

  // const processedRef = useRef<{
  //   systemConfigId?: string;
  //   locales?: string;
  // }>({});

  const fetchTranslationFile = useCallback(async (url: string) => {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.error('Error fetching translation file:', error);
      return null;
    }
  }, []);

  useEffect(() => {
    const localesMap = locales?.map(l => l.value) ?? [];

    const processTranslations = async () => {
      if (!systemConfig || systemConfig.length === 0) {
        return;
      }

      // const systemConfigId = systemConfig.map(c => c.id).join(',');
      // const localesKey = localesMap?.join(',');

      // if (processedRef.current.systemConfigId === systemConfigId && processedRef.current.locales === localesKey) {
      //   return;
      // }

      const configsByLocale = groupI18nConfigsByLocale(systemConfig);
      const translations = {} as Record<LanguageCode, I18nMessage>;
      console.log(11111);

      const fetchPromises = localesMap.map(async locale => {
        const config = configsByLocale[locale];
        if (!config) {
          return;
        }

        const currentFile = getCurrentI18nFile(config.files, locale);
        if (currentFile) {
          const fileData = await fetchTranslationFile(currentFile.url);
          if (fileData) {
            translations[locale] = fileData;
          }
        }
      });

      await Promise.all(fetchPromises);

      // processedRef.current = {
      //   systemConfigId,
      //   locales: localesKey,
      // };

      updateTranslations(translations);
    };

    processTranslations();
  }, [systemConfig, locales, fetchTranslationFile, updateTranslations]);

  return {
    isLoading: systemConfigIsLoading,
    systemConfig,
  };
};
