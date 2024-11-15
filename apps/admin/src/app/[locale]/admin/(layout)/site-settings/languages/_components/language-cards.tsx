'use client';
import { Link } from '@oe/ui/common/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@oe/ui/shadcn/card';
import { useTranslations } from 'next-intl';
import { useLanguageStore } from '../_store/useLanguageStore';

export function LanguageCards() {
  const { locale } = useLanguageStore();
  const { languageStats } = useLanguageStore();
  const tLanguages = useTranslations('languages');
  const tGeneral = useTranslations('general');

  return (
    <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {languageStats?.map(stats => (
        <Card key={stats.language}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-lg">
              <span>{stats.language}</span>
              {stats.locale === locale && (
                <span className="text-muted-foreground text-sm">({tGeneral('default')})</span>
              )}
            </CardTitle>
            <CardDescription>
              {tLanguages('languageCode')}: {stats.language}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Link
                href={`/admin/site-settings/languages/translations?lang=${stats.language}&status=translated`}
                className="flex flex-col items-center"
              >
                <span className="font-bold text-2xl text-primary">{stats.translated}</span>
                <span className="text-muted-foreground text-sm">{tLanguages('translated')}</span>
              </Link>
              <Link
                href={`/admin/site-settings/languages/translations?lang=${stats.language}&status=untranslated`}
                className="flex flex-col items-center"
              >
                <span className="font-bold text-2xl text-destructive">{stats.untranslated}</span>
                <span className="text-muted-foreground text-sm">{tLanguages('untranslated')}</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
