'use client';
import { useSystemConfig } from '@oe/api/hooks/useSystemConfig';
import type { I18nConfig } from '@oe/api/types/i18n';
import { systemConfigKeys } from '@oe/api/utils/system-config';
import { languages } from '@oe/i18n/languages';
import { useEffect } from 'react';
import { useLanguageStore } from '../_store/useLanguageStore';

export function InitLanguageState() {
  const { init, updateTranslations } = useLanguageStore();
  const { systemConfig } = useSystemConfig<I18nConfig>({ key: systemConfigKeys.i18nConfig });

  useEffect(() => {
    const { value, id } = systemConfig?.[0] ?? {};
    init({
      locales: value?.locales?.map(code => ({ value: code, label: languages[code] })),
      locale: value?.locale,
      id,
      languageStats: value?.stats,
    });
    updateTranslations();
  }, [init, updateTranslations, systemConfig]);

  return null;
}
