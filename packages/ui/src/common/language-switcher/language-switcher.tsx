'use client';

import { getCookieClient } from '@oe/core/utils/cookie';
import { DEFAULT_LOCALES } from '@oe/i18n/constants';
import { type LanguageCode, languages } from '@oe/i18n/languages';
import { Button } from '@oe/ui/shadcn/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@oe/ui/shadcn/dropdown-menu';
import { usePathname, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import { cn } from '#utils/cn';
import { changeLanguage } from './action';

const DROPDOWN_BUTTON_CLASS =
  'h-6 w-6 rounded-full border-white bg-transparent text-white hover:bg-white/10 hover:text-white';

type LanguageSwitcherProps = {
  className?: string;
};

export default function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const fullPath = useMemo(() => {
    const query = searchParams?.toString();
    return query ? `${pathname}?${query}` : pathname;
  }, [pathname, searchParams]);

  const locales = useMemo(() => {
    const localesCookie = getCookieClient(process.env.NEXT_PUBLIC_COOKIE_LOCALES_KEY);
    return localesCookie ? JSON.parse(localesCookie) : DEFAULT_LOCALES;
  }, []);

  const currentLang = useMemo(
    () => (getCookieClient(process.env.NEXT_PUBLIC_COOKIE_LOCALE_KEY) as LanguageCode) ?? 'en',
    []
  );

  const handleLanguageChange = useMemo(
    () => (language: LanguageCode) => () => changeLanguage(language, fullPath),
    [fullPath]
  );

  if (locales?.length === 0) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className={cn(DROPDOWN_BUTTON_CLASS, className)}>
          <span className="mcaption-semibold12 uppercase">{currentLang}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((language: LanguageCode) => (
          <DropdownMenuItem key={language} onClick={handleLanguageChange(language)}>
            {languages[language]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
