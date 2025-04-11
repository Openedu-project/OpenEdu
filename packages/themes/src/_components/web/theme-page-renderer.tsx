import type { PageRender, PageSectionConfig, PageSectionConfigs, SectionsByPage, ThemePageKey } from '@oe/themes/types';
import { getThemeComponentByPagesConfig } from '@oe/themes/utils/function';
import { useTranslations } from 'next-intl';
import type { PreviewPanelProps } from '../theme-settings/theme-page/theme-preview-panel';

interface ThemePageRendererProps {
  pageRenderData: PageRender;
  pageKey: ThemePageKey;
  props?: PreviewPanelProps;
}

export function ThemePageRenderer({ pageKey, pageRenderData, props }: ThemePageRendererProps) {
  const t = useTranslations('themeWebPage');
  if (!props) {
    return null;
  }

  const renderPreviewSection = (key: SectionsByPage[typeof pageKey]) => {
    const PageComponent = getThemeComponentByPagesConfig<ThemePageKey, SectionsByPage[typeof pageKey]>(
      pageRenderData,
      pageKey,
      key
    );

    const sectionConfig = props?.currentConfigSections?.[key] || props?.pageConfig?.[pageKey]?.config?.[key];

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

  // Sort sections by order
  const sortedSections = (currentConfigSections?: PageSectionConfigs<ThemePageKey>) => {
    const configs = currentConfigSections;
    if (configs && Object.keys(configs).length > 0) {
      return Object.entries(configs)
        .sort(([, a], [, b]) => a.order - b.order)
        .map(([key]) => key as SectionsByPage[ThemePageKey]);
    }
    return [];
  };

  return (
    <>
      {sortedSections(props?.currentConfigSections)?.length > 0 ? (
        sortedSections(props?.currentConfigSections).map(renderPreviewSection)
      ) : (
        <div className="flex h-full items-center justify-center text-muted-foreground">{t('noPreview')}</div>
      )}
    </>
  );
}
