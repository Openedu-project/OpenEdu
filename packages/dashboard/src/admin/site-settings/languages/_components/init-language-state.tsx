'use client';
import { systemConfigKeys } from '@oe/api';
import { useSystemConfig } from '@oe/api';
import type { I18nConfig } from '@oe/api';
import { languages } from '@oe/i18n';
import { useEffect } from 'react';
import { useLanguageStore } from '../_store/useLanguageStore';

export function InitLanguageState() {
  const { init, updateTranslations } = useLanguageStore();
  const { systemConfig, systemConfigIsLoading } = useSystemConfig<I18nConfig>({
    key: systemConfigKeys.i18nConfig,
  });

  useEffect(() => {
    if (!systemConfigIsLoading) {
      const { value, id } = systemConfig?.[0] ?? {};
      init({
        locales: value?.locales?.map(code => ({
          value: code,
          label: languages[code],
        })),
        locale: value?.locale,
        id,
        languageStats: value?.stats,
        files: value?.files,
      });
      updateTranslations();
    }
  }, [init, updateTranslations, systemConfig, systemConfigIsLoading]);

  return null;
}
