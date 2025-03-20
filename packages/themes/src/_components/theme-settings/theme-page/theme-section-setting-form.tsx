'use client';

import { useGetTheme } from '@oe/api/hooks/useTheme';
import { createOrUpdateThemeConfig } from '@oe/api/services/theme';
import type {
  PageSectionConfig,
  SectionProps,
  SectionsByPage,
  ThemeFieldConfig,
  ThemeFieldValue,
  ThemeName,
  ThemePageKey,
} from '@oe/themes/types';
import { Button } from '@oe/ui/shadcn/button';
import { Label } from '@oe/ui/shadcn/label';
import { toast } from '@oe/ui/shadcn/sonner';
import { Switch } from '@oe/ui/shadcn/switch';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { type ReactNode, useEffect, useState } from 'react';
import type { ThemeCollection, ThemeDefinition, ThemeSystem } from '../../../_types';
import { convertValueAndPathToConfig, deepMergeByPath } from '../../../_utils/function';
import {
  ThemePageSettingArrayField,
  ThemePageSettingField,
  ThemePageSettingObjectField,
  getFieldType,
} from './theme-section-setting-field/index';

interface SettingsFormProps<K extends ThemePageKey> {
  config: PageSectionConfig<K>;
  onPreview: (config: PageSectionConfig<K>) => void;
  onReset: () => void;
  onEnable: (enable: boolean) => void;
  isLoading: boolean;
  basePath: string[];
  sectionKey: SectionsByPage[ThemePageKey];
}

function extractFormFields<K extends ThemePageKey>(config: PageSectionConfig<K>): ThemeFieldConfig {
  return config?.props as ThemeFieldConfig;
}

export function SettingsForm<K extends ThemePageKey>({
  config,
  onPreview,
  isLoading,
  onReset,
  onEnable,
  basePath,
  sectionKey,
}: SettingsFormProps<K>) {
  const [values, setValues] = useState<ThemeFieldConfig>(extractFormFields(config));
  const [enabled, setEnabled] = useState<boolean>(!!config?.enable);
  const t = useTranslations('themePageSettings');
  const { themeName, themePageKey } = useParams();
  const { theme } = useGetTheme();

  useEffect(() => {
    setValues(extractFormFields(config));
    setEnabled(!!config?.enable);
  }, [config]);

  const handleFieldChange = (path: string[], value: ThemeFieldValue | ThemeFieldConfig) => {
    setValues(prev => {
      return convertValueAndPathToConfig(prev, path, value);
    });
  };

  const handleAddOrRemoveArrayItem = async (path: string[], currentValue: ThemeFieldValue | ThemeFieldConfig) => {
    if (!theme?.[0]?.value?.availableThemes?.[themeName as ThemeName]) {
      toast.error(t('themeNotFound'));
      return;
    }

    if (!(themeName && themePageKey)) {
      toast.error(t('invalidParameters'));
      return;
    }

    try {
      // Get parent configuration
      const parentThemeDefinition = theme[0]?.value?.availableThemes?.[themeName as ThemeName];

      if (!parentThemeDefinition) {
        toast.error(t('configNotFound'));
        return;
      }

      // Create new section config with updated values
      const newSectionConfig = {
        ...config,
        props: {
          ...config.props,
          ...convertValueAndPathToConfig(values, path, currentValue),
        },
      };

      // Merge configurations
      const themeDefinition = deepMergeByPath<ThemeDefinition>(parentThemeDefinition, newSectionConfig, [
        'pages',
        themePageKey as string,
        'config',
        sectionKey,
      ]);

      // Construct updated theme system
      const updatedThemeSystem: ThemeSystem = {
        activedTheme: themeName as ThemeName,
        availableThemes: {
          ...theme[0]?.value?.availableThemes,
          [themeName as ThemeName]: themeDefinition,
        } as ThemeCollection,
      };

      // Update theme configuration
      const response = await createOrUpdateThemeConfig({
        config: updatedThemeSystem,
        id: theme?.[0]?.id,
      });

      if (response) {
        toast.success(t('updateSuccess'));
      }
    } catch (error) {
      console.error('Error updating array item:', error);
      toast.error(t('updateFailed'));
    }
  };

  const renderFields = (fields: ThemeFieldConfig): ReactNode => {
    return Object.entries(fields).map(([key, value]) => {
      const currentPath = [key];
      const fieldType = getFieldType(value);

      if (fieldType === 'array') {
        return (
          <ThemePageSettingArrayField
            key={key}
            label={key}
            value={value as Array<ThemeFieldValue | ThemeFieldConfig>}
            onChange={newValue =>
              handleFieldChange(currentPath, newValue as unknown as ThemeFieldConfig | ThemeFieldValue)
            }
            path={[...basePath, ...currentPath]}
            renderItem={(itemValue, index, onChange, itemPath) => {
              const itemType = getFieldType(itemValue);

              if (itemType === 'object') {
                return (
                  <ThemePageSettingObjectField
                    label={`${key}-${index}`}
                    value={itemValue as ThemeFieldConfig}
                    onChange={onChange}
                    path={itemPath}
                  />
                );
              }

              return (
                <ThemePageSettingField
                  label={`${key}-${index}`}
                  value={itemValue as ThemeFieldValue}
                  onChange={onChange}
                  // type={
                  //   itemType === 'text' || itemType === 'number' || itemType === 'boolean' || itemType === 'file'
                  //     ? itemType
                  //     : 'text'
                  // }
                  type={itemType}
                  path={itemPath}
                />
              );
            }}
            onAdd={newValue =>
              handleAddOrRemoveArrayItem(currentPath, newValue as unknown as ThemeFieldConfig | ThemeFieldValue)
            }
            onRemove={newValue =>
              handleAddOrRemoveArrayItem(currentPath, newValue as unknown as ThemeFieldConfig | ThemeFieldValue)
            }
          />
        );
      }

      if (fieldType === 'object') {
        return (
          <ThemePageSettingObjectField
            key={key}
            label={key}
            value={value as ThemeFieldConfig}
            onChange={newValue => handleFieldChange(currentPath, newValue)}
            path={[...basePath, ...currentPath]}
          />
        );
      }

      return (
        <ThemePageSettingField
          key={key}
          label={key}
          value={value as ThemeFieldValue}
          onChange={newValue => handleFieldChange(currentPath, newValue)}
          // type={
          //   fieldType === 'text' || fieldType === 'number' || fieldType === 'boolean' || fieldType === 'file'
          //     ? fieldType
          //     : 'text'
          // }
          type={fieldType}
          path={[...basePath, ...currentPath]}
        />
      );
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end gap-2">
        <Label>{t('enable')}</Label>
        <Switch
          checked={enabled}
          onCheckedChange={checked => {
            setEnabled(checked);
            onEnable(checked);
          }}
        />
      </div>

      {enabled && <div className="space-y-6">{renderFields(values)}</div>}

      {enabled && (
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => {
              onReset();
              setValues(extractFormFields(config));
            }}
          >
            {t('reset')}
          </Button>
          <Button
            onClick={() =>
              onPreview({
                ...config,
                props: { ...values } as unknown as SectionProps<ThemePageKey, SectionsByPage[K]> | undefined,
              })
            }
            disabled={isLoading}
          >
            {isLoading ? t('previewing') : t('preview')}
          </Button>
        </div>
      )}
    </div>
  );
}
