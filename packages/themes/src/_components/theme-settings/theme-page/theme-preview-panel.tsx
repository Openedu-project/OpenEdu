import { THEMES, THEMES_SERVER } from "@oe/themes";
import type {
  PageSectionConfig,
  PageSectionConfigs,
  PagesConfig,
  SectionsByPage,
  ThemeName,
  ThemePageKey,
} from "@oe/themes/types/index";
import { getThemeComponent } from "@oe/themes/utils/function";
import { ScrollArea } from "@oe/ui/shadcn/scroll-area";
import { useTranslations } from "next-intl";
import { memo } from "react";

export interface PreviewPanelProps {
  themeName: ThemeName;
  selectedPage: ThemePageKey;
  pageConfig: PagesConfig<ThemePageKey>;
  stateConfigSections?: PageSectionConfigs<ThemePageKey>;
  currentConfigSections?: PageSectionConfigs<ThemePageKey>;
  renderByServer?: boolean;
}
export const PreviewPanel = memo(function PreviewPanel({
  themeName,
  selectedPage,
  pageConfig,
  currentConfigSections,
  stateConfigSections,
  renderByServer = false,
}: PreviewPanelProps) {
  const t = useTranslations("themePageSettings");

  const renderPreviewSection = (key: SectionsByPage[typeof selectedPage]) => {
    const PageComponent = getThemeComponent<
      ThemePageKey,
      SectionsByPage[typeof selectedPage]
    >(renderByServer ? THEMES_SERVER : THEMES, themeName, selectedPage, key);

    const sectionConfig =
      (stateConfigSections || currentConfigSections)?.[key] ||
      pageConfig?.[selectedPage]?.config?.[key];

    if (!sectionConfig?.enable) {
      return undefined;
    }

    if (!PageComponent) {
      return undefined;
    }

    return (
      <PageComponent
        key={key}
        sectionConfig={sectionConfig as PageSectionConfig<ThemePageKey>}
        props={sectionConfig.props}
      />
    );
  };

  const sortedSections = () => {
    const configs = stateConfigSections || currentConfigSections;
    if (configs && Object.keys(configs).length > 0) {
      return Object.entries(configs)
        .sort(([, a], [, b]) => a.order - b.order)
        .map(([key, _value]) => key as SectionsByPage[typeof selectedPage]);
    }
    return [];
  };

  return (
    <ScrollArea>
      {sortedSections()?.length > 0 ? (
        sortedSections().map(renderPreviewSection)
      ) : (
        <div className="flex h-full items-center justify-center text-muted-foreground">
          {t("noPreview")}
        </div>
      )}
    </ScrollArea>
  );
});
