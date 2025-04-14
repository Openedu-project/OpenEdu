import { getCookieClient } from '@oe/core';
import { type LanguageCode, languages } from '@oe/i18n';
import { Autocomplete } from '#components/autocomplete';
import type { ButtonProps } from '#shadcn/button';

interface ISelectLanguageProps {
  value?: LanguageCode;
  onChange?: (opt: LanguageCode | null) => void;
  triggerProps?: ButtonProps;
}
export function SelectLanguage({ value, onChange, triggerProps }: ISelectLanguageProps) {
  const localesCookie = getCookieClient(process.env.NEXT_PUBLIC_COOKIE_LOCALES_KEY);
  const locales = localesCookie ? JSON.parse(localesCookie) : [];

  return (
    <Autocomplete
      options={locales}
      getOptionLabel={locale => languages[locale]}
      getOptionValue={locale => locale}
      triggerProps={triggerProps ?? { disabled: true }}
      value={value}
      onChange={onChange}
    />
  );
}
