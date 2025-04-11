import { DashboardHeaderCard } from '@oe/ui';
import { Link } from '@oe/ui';
import { getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';
import { InitLanguageState } from './_components/init-language-state';

export async function LanguagesLayout({ children }: { children: ReactNode }) {
  const [tSiteSettings, tLanguages] = await Promise.all([
    getTranslations('dashboard.siteSettings'),
    getTranslations('languages'),
  ]);

  return (
    <>
      <InitLanguageState />
      <DashboardHeaderCard
        dashboard="admin"
        breadcrumbs={[
          { label: tSiteSettings('siteSettings'), disabled: true },
          { label: tSiteSettings('languages') },
          { label: tSiteSettings('translations') },
        ]}
      >
        <h1 className="mb-4 text-2xl">{tLanguages('languages')}</h1>
        <div className="flex gap-2">
          <Link
            exact
            variant="ghost"
            size="xs"
            className="font-medium hover:text-primary"
            href="/admin/site-settings/languages"
          >
            {tLanguages('settings')}
          </Link>
          <Link
            variant="ghost"
            exact
            size="xs"
            className="font-medium hover:text-primary"
            href="/admin/site-settings/languages/translations"
          >
            {tLanguages('translations')}
          </Link>
        </div>
      </DashboardHeaderCard>
      {children}
    </>
  );
}
