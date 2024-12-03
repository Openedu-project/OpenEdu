"use client";

import type {
  PageSectionConfig,
  SectionProps,
  SectionsByPage,
  ThemeFieldConfig,
  ThemeFieldValue,
  ThemePageKey,
} from "@oe/themes/types/theme-page";
import { Button } from "@oe/ui/shadcn/button";
import { Label } from "@oe/ui/shadcn/label";
import { Switch } from "@oe/ui/shadcn/switch";
import { useTranslations } from "next-intl";
import { type ReactNode, useEffect, useState } from "react";
import {
  ThemePageSettingArrayField,
  ThemePageSettingField,
  ThemePageSettingObjectField,
  getFieldType,
} from "./theme-section-setting-field/index";

interface SettingsFormProps<K extends ThemePageKey> {
  config: PageSectionConfig<K>;
  onPreview: (config: PageSectionConfig<K>) => void;
  onReset: () => void;
  onEnable: (enable: boolean) => void;
  isLoading: boolean;
  basePath: string[];
}

function extractFormFields<K extends ThemePageKey>(
  config: PageSectionConfig<K>
): ThemeFieldConfig {
  return config?.props as ThemeFieldConfig;
}

export function SettingsForm<K extends ThemePageKey>({
  config,
  onPreview,
  isLoading,
  onReset,
  onEnable,
  basePath,
}: SettingsFormProps<K>) {
  const [values, setValues] = useState<ThemeFieldConfig>(
    extractFormFields(config)
  );
  const [enabled, setEnabled] = useState<boolean>(!!config?.enable);
  const t = useTranslations("themePageSettings");

  useEffect(() => {
    setValues(extractFormFields(config));
    setEnabled(!!config?.enable);
  }, [config]);

  const handleFieldChange = (
    path: string[],
    value: ThemeFieldValue | ThemeFieldConfig
  ) => {
    setValues((prev) => {
      const newValues = { ...prev };
      let current = newValues;

      // Filter out any undefined or empty path segments
      const validPath = path.filter(
        (segment): segment is string => segment !== undefined && segment !== ""
      );

      for (let i = 0; i < validPath.length - 1; i++) {
        const key = validPath[i];
        if (key && typeof key === "string") {
          if (!current[key]) {
            current[key] = Array.isArray(value) ? [] : {};
          }
          current = current[key] as ThemeFieldConfig;
        }
      }

      const lastKey = validPath[validPath.length - 1];
      if (lastKey) {
        current[lastKey] = value;
      }

      return newValues;
    });
  };

  const renderFields = (fields: ThemeFieldConfig): ReactNode => {
    return Object.entries(fields).map(([key, value]) => {
      const currentPath = [key];
      const fieldType = getFieldType(value);

      if (fieldType === "array") {
        return (
          <ThemePageSettingArrayField
            key={key}
            label={key}
            value={value as Array<ThemeFieldValue | ThemeFieldConfig>}
            onChange={(newValue) =>
              handleFieldChange(
                currentPath,
                newValue as unknown as ThemeFieldConfig | ThemeFieldValue
              )
            }
            path={[...basePath, ...currentPath]}
            renderItem={(itemValue, index, onChange, itemPath) => {
              const itemType = getFieldType(itemValue);

              if (itemType === "object") {
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
                  type={
                    itemType === "text" ||
                    itemType === "number" ||
                    itemType === "boolean" ||
                    itemType === "file"
                      ? itemType
                      : "text"
                  }
                  path={itemPath}
                />
              );
            }}
          />
        );
      }

      if (fieldType === "object") {
        return (
          <ThemePageSettingObjectField
            key={key}
            label={key}
            value={value as ThemeFieldConfig}
            onChange={(newValue) => handleFieldChange(currentPath, newValue)}
            path={[...basePath, ...currentPath]}
          />
        );
      }

      return (
        <ThemePageSettingField
          key={key}
          label={key}
          value={value as ThemeFieldValue}
          onChange={(newValue) => handleFieldChange(currentPath, newValue)}
          type={
            fieldType === "text" ||
            fieldType === "number" ||
            fieldType === "boolean" ||
            fieldType === "file"
              ? fieldType
              : "text"
          }
          path={[...basePath, ...currentPath]}
        />
      );
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end gap-2">
        <Label>{t("enable")}</Label>
        <Switch
          checked={enabled}
          onCheckedChange={(checked) => {
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
            {t("reset")}
          </Button>
          <Button
            onClick={() =>
              onPreview({
                ...config,
                props: { ...values } as unknown as
                  | SectionProps<ThemePageKey, SectionsByPage[K]>
                  | undefined,
              })
            }
            disabled={isLoading}
          >
            {isLoading ? t("previewing") : t("preview")}
          </Button>
        </div>
      )}
    </div>
  );
}
