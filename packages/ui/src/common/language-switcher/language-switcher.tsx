import { getCookie } from '@oe/core/utils/cookie';
import { DEFAULT_LOCALES } from '@oe/i18n/constants';
import { type LanguageCode, languages } from '@oe/i18n/languages';
import { Selectbox } from '@oe/ui/components/selectbox';
import { cn } from '#utils/cn';
import { changeLanguage } from './action';

type LanguageSwitcherProps = {
  className?: string;
};

export default async function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const localesCookie = await getCookie(process.env.NEXT_PUBLIC_COOKIE_LOCALES_KEY);
  const locales = localesCookie ? JSON.parse(localesCookie as string) : DEFAULT_LOCALES;

  const currentLang = ((await getCookie(process.env.NEXT_PUBLIC_COOKIE_LOCALE_KEY)) as LanguageCode) ?? 'en';

  if (locales?.length === 0) {
    return null;
  }

  const options = locales.map((locale: LanguageCode) => ({
    id: locale,
    value: locale,
    label: languages[locale],
  }));

  return (
    <Selectbox
      options={options}
      value={currentLang}
      onChange={changeLanguage}
      className={cn(
        'flex aspect-square h-8 w-8 items-center justify-center rounded-full border-background bg-transparent p-1 text-background capitalize outline-none ring-0 ring-offset-0 hover:bg-background/10 hover:text-background focus:border focus:border-background focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0',
        className
      )}
      hasIcon={false}
      displayValue={value => value}
      valueClassName="text-sm"
    />
  );
}
