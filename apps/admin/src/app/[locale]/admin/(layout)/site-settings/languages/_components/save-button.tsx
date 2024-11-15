'use client';
import { setCookie } from '@oe/core/utils/cookie';
import { Button } from '@oe/ui/shadcn/button';
import { toast } from '@oe/ui/shadcn/sonner';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { createOrUpdateI18nConfigAction } from '../_actions/languages';
import { useLanguageStore } from '../_store/useLanguageStore';

export function SaveButton() {
  const tLanguages = useTranslations('languages');
  const tGeneral = useTranslations('general');
  const { locales, locale, id, setId } = useLanguageStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const localeValues = locales?.map(locale => locale.value);
      const response = await createOrUpdateI18nConfigAction({ data: { locales: localeValues, locale }, id });
      setId(response?.id);
      setCookie(process.env.NEXT_PUBLIC_COOKIE_LOCALES_KEY, localeValues);
      setCookie(process.env.NEXT_PUBLIC_COOKIE_LOCALE_KEY, locale);
      toast.success(tLanguages('saveSuccess'));
    } catch {
      toast.error(tLanguages('saveError'));
    }
    setIsLoading(false);
  };

  return (
    <Button onClick={handleSave} className="mt-4" loading={isLoading}>
      {tGeneral('save')}
    </Button>
  );
}
