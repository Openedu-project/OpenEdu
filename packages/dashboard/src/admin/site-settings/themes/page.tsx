import type { ISystemConfigRes } from '@oe/api/types/system-config';
import { CloneNewTheme } from '@oe/themes/_components/theme-list/clone-new-theme';
import ThemeList from '@oe/themes/_components/theme-list/theme-list';
import type { ThemeSystem } from '@oe/themes/types/theme-system-config';
import { DashboardHeaderCard } from '@oe/ui/common/layout';
import { getTranslations } from 'next-intl/server';

export default async function ThemeListPage({
  themeSystemRes,
}: {
  themeSystemRes?: ISystemConfigRes<ThemeSystem>[];
}) {
  const [tSiteSettings, tTheme] = await Promise.all([
    getTranslations('dashboard.siteSettings'),
    getTranslations('dashboard.siteSettings.theme'),
  ]);

  return (
    <>
      <DashboardHeaderCard
        dashboard="admin"
        breadcrumbs={[{ label: tSiteSettings('siteSettings'), disabled: true }, { label: tSiteSettings('themes') }]}
      >
        <div className="mb-4 flex items-center justify-between gap-2">
          <div className="space-y-2">
            <h1 className="text-2xl">{tTheme('gallery')}</h1>
            <p className="text-muted-foreground">{tTheme('description')}</p>
          </div>
          <CloneNewTheme themeSystemRes={themeSystemRes} />
        </div>
      </DashboardHeaderCard>
      <ThemeList themeSystemRes={themeSystemRes} />
    </>
  );
}
