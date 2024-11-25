'use client';
import { DEFAULT_LOCALE } from '@oe/i18n/constants';
import { languages } from '@oe/i18n/languages';
import { AutocompeteMultiple } from '@oe/ui/components/autocomplete';
import { useTranslations } from 'next-intl';
import { type LanguageOption, useLanguageStore } from '../_store/useLanguageStore';

const languageOptions = Object.entries(languages).map(([code, name]) => ({
  value: code,
  label: name,
})) as LanguageOption[];

export function LanguageSelector() {
  const { locales = [], setSelectedLocales } = useLanguageStore();
  const tLanguages = useTranslations('languages');

  const handleChange = (options: LanguageOption[]) => {
    setSelectedLocales(options);
  };

  return (
    <div>
      <h4 className="mb-2 text-lg">{tLanguages('selectLanguages')}</h4>
      <AutocompeteMultiple
        options={languageOptions}
        value={locales}
        fixedValue={[DEFAULT_LOCALE]}
        onChange={handleChange}
        placeholder={tLanguages('search')}
      />
    </div>
  );
}
