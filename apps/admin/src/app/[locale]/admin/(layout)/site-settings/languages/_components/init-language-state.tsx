'use client';
import { getI18nConfig } from '@oe/api/services/i18n';
import { API_ENDPOINT } from '@oe/api/utils/endpoints';
import { languages } from '@oe/i18n/languages';
import { useEffect } from 'react';
import useSWR from 'swr';
import { useLanguageStore } from '../_store/useLanguageStore';

export function InitLanguageState() {
  const { reset, updateTranslations } = useLanguageStore();
  const { data } = useSWR(API_ENDPOINT.SYSTEM_CONFIGS, getI18nConfig);

  useEffect(() => {
    if (data) {
      reset({
        locales: data?.value?.locales?.map(code => ({ value: code, label: languages[code] })),
        locale: data?.value?.locale,
        id: data?.id,
      });
      updateTranslations();
    }
  }, [reset, updateTranslations, data]);

  return null;
}
