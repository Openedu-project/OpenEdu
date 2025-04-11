'use client';

import { fonts } from '@oe/core';
import { SmartPreview } from '@oe/ui';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@oe/ui';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';
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
} from '#types';
import { defaultThemeSystemConfig } from '../../../_config/initial';
import { initialThemeGlobal } from '../../../_config/theme-global-initial';
import { ThemeConfigMetadata } from '../theme-metadata';
import { ThemePreviewLayout } from './theme-preview-layout';
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

export function ThemeSettingPages({
  isLoading,
  themeName,
  selectedPage,
  selectedSidebarPageKey,
  themeConfig,
  onSubmit,
}: ThemeContentProps) {
  const tThemeConfig = useTranslations('themePage');
  const currentPath = ['themePage', themeName, selectedPage];
  const pageConfig = themeConfig?.pages || defaultThemeSystemConfig(tThemeConfig)?.availableThemes?.[themeName]?.pages;
  const defaultConfigSections =
    defaultThemeSystemConfig(tThemeConfig)?.availableThemes?.[themeName]?.pages?.[selectedPage]?.config;
  const currentPages = themeConfig?.pages?.[selectedPage];

  const [stateConfigSections, setStateConfigSections] = useState<PageSectionConfigs<typeof selectedPage>>();
  const [loadingStates, setLoadingStates] = useState<Partial<Record<SectionsByPage[typeof selectedPage], boolean>>>({});

  const [selectedSectionKey, setSelectedSectionKey] = useState<AllSectionKeys>();

  const fontVariables = Object.values(fonts)
    .map(font => font.variable)
    .join(' ');

  const handleApplyPreview = useCallback(
    async (val: PageSectionConfig<typeof selectedPage>, sectionKey: SectionsByPage[typeof selectedPage]) => {
      setLoadingStates(prev => ({ ...prev, [sectionKey]: true }));
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStateConfigSections(prev => (prev ? { ...prev, ...val } : { ...currentPages?.config, ...val }));
      } finally {
        setLoadingStates(prev => ({ ...prev, [sectionKey]: false }));
      }
    },
    [currentPages]
  );

  const handleReset = useCallback(
    (sectionKey: SectionsByPage[typeof selectedPage]) => {
      // Get the original default configuration for the section
      const defaultSectionConfig = deepClone(currentPages?.config?.[sectionKey]);

      setStateConfigSections(prev => {
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
            configSections={stateConfigSections ?? currentPages?.config ?? {}}
            // configSections={currentPages?.config ?? {}}
            defaultConfigSections={defaultConfigSections ?? {}}
            fetchConfigSections={currentPages?.config}
            selectedSectionKey={selectedSectionKey}
            loadingStates={loadingStates}
            isSubmitting={isLoading}
            onSectionSelect={setSelectedSectionKey}
            onConfigUpdate={setStateConfigSections}
            onPreview={handleApplyPreview}
            onReset={handleReset}
            onSubmit={handleSubmitConfig}
          />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={75}>
          <SmartPreview themeGlobal={themeConfig?.globals ?? initialThemeGlobal} fontVariables={fontVariables}>
            <ThemePreviewLayout themeDefinition={themeConfig} themeName={themeName}>
              <PreviewPanel
                themeName={themeName}
                selectedPage={selectedPage}
                pageConfig={pageConfig as PagesConfig<ThemePageKey>}
                // currentConfigSections={currentConfigSections}
                stateConfigSections={stateConfigSections}
                currentConfigSections={currentPages?.config}
              />
            </ThemePreviewLayout>
          </SmartPreview>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}
