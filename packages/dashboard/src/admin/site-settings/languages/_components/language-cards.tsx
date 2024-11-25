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
              {tLanguages('languageCode')}: {stats.locale}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between gap-4">
              <div className="flex flex-col items-center">
                <Link
                  href={`/admin/site-settings/languages/translations?filter=${stats.locale}&value=true`}
                  className="font-bold text-2xl text-primary"
                >
                  {stats.translated}
                </Link>
                <span className="text-muted-foreground text-sm">{tLanguages('translated')}</span>
              </div>
              <div className="flex flex-col items-center">
                <Link
                  href={`/admin/site-settings/languages/translations?lang=${stats.locale}&value=false`}
                  className="font-bold text-2xl text-destructive"
                >
                  {stats.untranslated}
                </Link>
                <span className="text-muted-foreground text-sm">{tLanguages('untranslated')}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
