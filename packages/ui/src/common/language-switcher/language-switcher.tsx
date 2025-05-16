'use client';
import { useGetI18nConfig } from '@oe/api';
import { languages } from '@oe/i18n';
import { usePathname, useRouter } from '@oe/i18n';
import { useLocale } from 'next-intl';
import { useParams } from 'next/navigation';
import { useTransition } from 'react';
import { Selectbox } from '#components/selectbox';
import { Skeleton } from '#shadcn/skeleton';
import { cn } from '#utils/cn';

type LanguageSwitcherProps = {
  className?: string;
};

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const router = useRouter();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  const { dataI18nConfig, isLoadingI18nConfig } = useGetI18nConfig();

  const handleChangeLanguage = (locale: string) => {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale }
      );
    });
  };
  if ((dataI18nConfig?.locales ?? []).length === 1) {
    return null;
  }

  if (isLoadingI18nConfig) {
    return <Skeleton className="h-8 w-8 rounded-full" />;
  }

  return (
    <Selectbox
      options={(dataI18nConfig?.locales ?? []).map(locale => ({
        id: locale,
        value: locale,
        label: languages[locale],
      }))}
      value={locale}
      onChange={handleChangeLanguage}
      className={cn(
        'flex aspect-square h-8 w-8 items-center justify-center rounded-full border-background bg-transparent p-1 text-background capitalize outline-hidden ring-0 ring-offset-0 hover:bg-background/10 hover:text-background focus:border focus:border-background focus:outline-hidden focus:ring-0 focus:ring-offset-0 focus-visible:outline-hidden focus-visible:ring-0 focus-visible:ring-offset-0',
        className
      )}
      hasIcon={false}
      displayValue={value => value}
      valueClassName="text-sm"
      disabled={isPending}
    />
  );
}
