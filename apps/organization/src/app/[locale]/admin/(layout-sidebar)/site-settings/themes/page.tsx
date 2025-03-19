import { getThemeConfigServer } from "@oe/api/services/theme";
import { CloneNewTheme } from "@oe/themes/components/theme-list/clone-new-theme";
import ThemeList from "@oe/themes/components/theme-list/theme-list";
import { DashboardHeaderCard } from "@oe/ui/common/layout";
import { getTranslations } from "next-intl/server";

export default async function ThemePage() {
  const [themeSystem, tSiteSettings, tTheme] = await Promise.all([
    getThemeConfigServer(),
    getTranslations("dashboard.siteSettings"),
    getTranslations("dashboard.siteSettings.theme"),
  ]);

  return (
    <>
      <DashboardHeaderCard
        dashboard="admin"
        breadcrumbs={[
          { label: tSiteSettings("siteSettings"), disabled: true },
          { label: tSiteSettings("themes") },
        ]}
      >
        <div className="mb-4 flex items-center justify-between gap-2">
          <div className="space-y-2">
            <h1 className="text-2xl">{tTheme("gallery")}</h1>
            <p className="text-muted-foreground">{tTheme("description")}</p>
          </div>
          <CloneNewTheme themeSystemRes={themeSystem} />
        </div>
      </DashboardHeaderCard>
      <ThemeList themeSystemRes={themeSystem} />
    </>
  );
}
