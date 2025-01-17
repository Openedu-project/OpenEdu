'use client';

import type {
  AllSectionKeys,
  PageSectionConfig,
  PageSectionConfigs,
  PagesConfig,
  SectionsByPage,
  ThemeDefinition,
  ThemeMetadata,
  ThemeName,
  ThemePageKey,
  ThemeSidebarPageKey,
} from '@oe/themes/types/index';
import { MainLayoutClient } from '@oe/ui/common/layout';
import { SmartPreview } from '@oe/ui/components/smart-preview';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@oe/ui/shadcn/resizable';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';
import { defaultThemeSystemConfig } from '../../../_config/initial';
import ThemeConfigMetadata from '../theme-metadata';
import { PreviewPanel } from './theme-preview-panel';
import { SettingsPanel } from './theme-setting-panel';

export interface ThemeContentProps {
  isLoading: boolean;
  themeConfig?: ThemeDefinition;
  themeName: ThemeName;
  selectedPage: ThemePageKey;
  selectedSidebarPageKey: ThemeSidebarPageKey;
  onSubmit: (config: ThemeDefinition) => void;
}

// Helper function to perform deep clone
const deepClone = <T,>(obj: T): T => JSON.parse(JSON.stringify(obj));

export default function ThemeSettingPages({
  isLoading,
  themeName,
  selectedPage,
  selectedSidebarPageKey,
  themeConfig,
  onSubmit,
}: ThemeContentProps) {
  const tThemeConfig = useTranslations('themePage');

  const [loadingStates, setLoadingStates] = useState<Partial<Record<SectionsByPage[typeof selectedPage], boolean>>>({});
  const [currentConfigSections, setCurrentConfigSections] = useState<PageSectionConfigs<typeof selectedPage>>();
  const [selectedSectionKey, setSelectedSectionKey] = useState<AllSectionKeys>();

  const currentPath = ['themePage', themeName, selectedPage];
  const pageConfig = themeConfig?.pages || defaultThemeSystemConfig(tThemeConfig)?.availableThemes?.[themeName]?.pages;
  const defaultConfigSections =
    defaultThemeSystemConfig(tThemeConfig)?.availableThemes?.[themeName]?.pages?.[selectedPage]?.config;
  const currentPages = deepClone(
    themeConfig?.pages?.[selectedPage] ||
      defaultThemeSystemConfig(tThemeConfig)?.availableThemes?.[themeName]?.pages?.[selectedPage]
  );

  useEffect(() => {
    if (!currentConfigSections) {
      // Deep clone the initial config to prevent reference issues
      setCurrentConfigSections(currentPages?.config);
    }
  }, [currentPages, currentConfigSections]);

  const handleApplyPreview = useCallback(
    async (val: PageSectionConfig<typeof selectedPage>, sectionKey: SectionsByPage[typeof selectedPage]) => {
      setLoadingStates(prev => ({ ...prev, [sectionKey]: true }));
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCurrentConfigSections(prev => ({ ...prev, ...val }));
      } finally {
        setLoadingStates(prev => ({ ...prev, [sectionKey]: false }));
      }
    },
    []
  );

  const handleReset = useCallback(
    (sectionKey: SectionsByPage[typeof selectedPage]) => {
      // Get the original default configuration for the section
      const defaultSectionConfig = deepClone(currentPages?.config?.[sectionKey]);

      setCurrentConfigSections(prev => {
        if (!prev) {
          return prev;
        }
        return {
          ...prev,
          [sectionKey]: defaultSectionConfig,
        };
      });
    },
    [currentPages]
  );

  const handleSubmitConfig = useCallback(
    (configSections: PageSectionConfigs<ThemePageKey>) => {
      onSubmit({
        ...themeConfig,
        pages: {
          ...pageConfig,
          [selectedPage]: {
            ...currentPages,
            config: configSections,
          },
        },
      } as ThemeDefinition);
    },
    [themeConfig, selectedPage, pageConfig, onSubmit, currentPages]
  );

  const handleSubmitMetadata = useCallback(
    (data: ThemeMetadata) => {
      onSubmit({
        ...themeConfig,
        pages: {
          ...pageConfig,
          [selectedPage]: {
            ...pageConfig?.[selectedPage],
            metadata: data,
          },
        },
      } as ThemeDefinition);
    },
    [themeConfig, selectedPage, pageConfig, onSubmit]
  );

  if (selectedSidebarPageKey !== 'theme') {
    return <ThemeConfigMetadata data={pageConfig?.[selectedPage]?.metadata} onSubmit={handleSubmitMetadata} />;
  }

  return (
    <>
      <ResizablePanelGroup direction="horizontal" className="flex h-full w-full">
        <ResizablePanel defaultSize={25}>
          <SettingsPanel
            currentPath={currentPath}
            configSections={currentConfigSections ?? {}}
            defaultConfigSections={defaultConfigSections ?? {}}
            fetchConfigSections={currentPages?.config}
            selectedSectionKey={selectedSectionKey}
            loadingStates={loadingStates}
            isSubmitting={isLoading}
            onSectionSelect={setSelectedSectionKey}
            onConfigUpdate={setCurrentConfigSections}
            onPreview={handleApplyPreview}
            onReset={handleReset}
            onSubmit={handleSubmitConfig}
          />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={75}>
          <SmartPreview>
            <MainLayoutClient>
              <PreviewPanel
                themeName={themeName}
                selectedPage={selectedPage}
                pageConfig={pageConfig as PagesConfig<ThemePageKey>}
                currentConfigSections={currentConfigSections}
              />
            </MainLayoutClient>
          </SmartPreview>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}
