import { ScrollArea } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { memo } from 'react';

import type {
  PageSectionConfig,
  PageSectionConfigs,
  PagesConfig,
  SectionsByPage,
  ThemeName,
  ThemePageKey,
} from '#types';
import { THEMES_RENDER_CLIENT, getThemeComponent } from '#utils';

export interface PreviewPanelProps {
  themeName: ThemeName;
  selectedPage: ThemePageKey;
  pageConfig: PagesConfig<ThemePageKey>;
  stateConfigSections?: PageSectionConfigs<ThemePageKey>;
  currentConfigSections?: PageSectionConfigs<ThemePageKey>;
}
export const PreviewPanel = memo(function PreviewPanel({
  themeName,
  selectedPage,
  pageConfig,
  currentConfigSections,
  stateConfigSections,
}: PreviewPanelProps) {
  const t = useTranslations('themePageSettings');

  const renderPreviewSection = (key: SectionsByPage[typeof selectedPage]) => {
    const PageComponent = getThemeComponent<ThemePageKey, SectionsByPage[typeof selectedPage]>(
      THEMES_RENDER_CLIENT,
      themeName,
      selectedPage,
      key
    );

    const sectionConfig =
      (stateConfigSections || currentConfigSections)?.[key] || pageConfig?.[selectedPage]?.config?.[key];

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
        <div className="flex h-full items-center justify-center text-muted-foreground">{t('noPreview')}</div>
      )}
    </ScrollArea>
  );
});
