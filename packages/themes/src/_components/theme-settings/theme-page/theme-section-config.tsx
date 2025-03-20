import type { PageSectionConfig, SectionsByPage, ThemePageKey } from '@oe/themes/types';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@oe/ui/shadcn/collapsible';
import { cn } from '@oe/ui/utils/cn';
import { ChevronDown } from 'lucide-react';
import { memo } from 'react';
import type React from 'react';
import { camelToNormal } from '../../../_utils/function';
import { SettingsForm } from './theme-section-setting-form';

interface ConfigSectionProps {
  sectionKey: SectionsByPage[ThemePageKey];
  config: PageSectionConfig<ThemePageKey>;
  isSelected: boolean;
  isLoading: boolean;
  currentPath: string[];
  dragButton?: React.JSX.Element;
  onSelect: (key: SectionsByPage[ThemePageKey] | undefined) => void;
  onPreview: (val: PageSectionConfig<ThemePageKey>, sectionKey: SectionsByPage[ThemePageKey]) => void;
  onReset: (sectionKey: SectionsByPage[ThemePageKey]) => void;
}

export const ConfigSection = memo(function ConfigSection({
  sectionKey,
  config,
  isSelected,
  isLoading,
  currentPath,
  dragButton,
  onSelect,
  onPreview,
  onReset,
}: ConfigSectionProps) {
  return (
    <Collapsible
      open={isSelected}
      onOpenChange={open => onSelect(open ? sectionKey : undefined)}
      className={`group/collapsible w-full space-y-1 rounded-md border-[0.4px] shadow ${
        isSelected ? '!border-primary' : 'border-border'
      }`}
    >
      <div
        className={cn(
          'flex w-full items-center gap-2 px-4 py-2 hover:bg-accent/50 ',
          isSelected ? 'bg-accent/50' : 'bg-accent'
        )}
      >
        {dragButton}
        <CollapsibleTrigger className="flex w-full items-center justify-between group-data-[state=open]/collapsible:bg-accent/50 group-data-[state=open]/collapsible:text-primary">
          <span className="font-medium text-sm">{camelToNormal(sectionKey)}</span>
          <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="px-4 pb-4">
        <SettingsForm
          basePath={[...currentPath, sectionKey]}
          config={config}
          onPreview={configContent =>
            onPreview(
              {
                [sectionKey]: configContent,
              } as unknown as PageSectionConfig<ThemePageKey>,
              sectionKey
            )
          }
          onReset={() => onReset(sectionKey)}
          onEnable={enable => {
            onPreview(
              {
                [sectionKey]: { ...config, enable },
              } as unknown as PageSectionConfig<ThemePageKey>,
              sectionKey
            );
          }}
          isLoading={isLoading}
          sectionKey={sectionKey}
        />
      </CollapsibleContent>
    </Collapsible>
  );
});
