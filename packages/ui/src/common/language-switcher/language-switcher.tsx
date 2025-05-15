'use client';

import { cookieOptions, getCookieClient, setCookieClient } from '@oe/core';
import { type LanguageCode, languages } from '@oe/i18n';
import { DEFAULT_LOCALES } from '@oe/i18n';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Selectbox } from '#components/selectbox';
import { cn } from '#utils/cn';

type LanguageSwitcherProps = {
  className?: string;
};

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const router = useRouter();
  const localesCookie = getCookieClient(process.env.NEXT_PUBLIC_COOKIE_LOCALES_KEY);
  const locales = localesCookie ? JSON.parse(localesCookie as string) : DEFAULT_LOCALES;

  const [currentLang, setCurrentLang] = useState<LanguageCode>('en');

  useEffect(() => {
    const savedLang = getCookieClient(process.env.NEXT_PUBLIC_COOKIE_LOCALE_KEY) as LanguageCode;
    if (savedLang) {
      setCurrentLang(savedLang);
    }
  }, []);

  if (locales?.length === 0) {
    return null;
  }

  const options = locales.map((locale: LanguageCode) => ({
    id: locale,
    value: locale,
    label: languages[locale],
  }));

  const handleChangeLanguage = (locale: string) => {
    setCookieClient(process.env.NEXT_PUBLIC_COOKIE_LOCALE_KEY, locale, {
      ...cookieOptions(),
      maxAge: 3600 * 24 * 365,
    });
    setCurrentLang(locale as LanguageCode);

    // Sử dụng router.replace để cập nhật URL mà không cần refresh toàn bộ trang
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
    const segments = currentPath.split('/');

    if (segments.length > 1 && locales.includes(segments[1])) {
      segments[1] = locale;
      router.replace(segments.join('/'));
    } else if (segments[1] === '') {
      router.replace(`/${locale}`);
    } else {
      router.replace(`/${locale}${currentPath}`);
    }
  };
  if (options.length === 1) {
    return null;
  }

  return (
    <Selectbox
      options={options}
      value={currentLang}
      onChange={handleChangeLanguage}
      className={cn(
        'flex aspect-square h-8 w-8 items-center justify-center rounded-full border-background bg-transparent p-1 text-background capitalize outline-hidden ring-0 ring-offset-0 hover:bg-background/10 hover:text-background focus:border focus:border-background focus:outline-hidden focus:ring-0 focus:ring-offset-0 focus-visible:outline-hidden focus-visible:ring-0 focus-visible:ring-offset-0',
        className
      )}
      hasIcon={false}
      displayValue={value => value}
      valueClassName="text-sm"
    />
  );
}
