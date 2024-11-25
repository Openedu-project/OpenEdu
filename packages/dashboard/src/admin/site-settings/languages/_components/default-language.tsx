'use client';

import type { LanguageCode } from '@oe/i18n/languages';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@oe/ui/shadcn/select';
import { useTranslations } from 'next-intl';
import { useLanguageStore } from '../_store/useLanguageStore';

export function DefaultLanguage() {
  const { locales, locale, setDefaultLocale } = useLanguageStore();
  const tLanguages = useTranslations('languages');

  return (
    <div>
      <h4 className="mb-2 text-lg">{tLanguages('defaultLanguage')}</h4>
      <Select value={locale || ''} onValueChange={value => setDefaultLocale(value as LanguageCode)}>
        <SelectTrigger>
          <SelectValue placeholder={tLanguages('selectDefaultLanguage')} />
        </SelectTrigger>
        <SelectContent>
          {locales?.map(locale => (
            <SelectItem key={locale.value} value={locale.value}>
              {locale.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
