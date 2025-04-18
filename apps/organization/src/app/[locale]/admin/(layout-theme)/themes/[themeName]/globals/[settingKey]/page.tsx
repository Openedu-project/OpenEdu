"use client";

import { useCreateOrUpdateThemeConfig, useGetTheme } from "@oe/api";
import { ThemeSettingGlobal, initialThemeGlobal } from "@oe/themes";
import type {
  ThemeCollection,
  ThemeGlobal,
  ThemeName,
  ThemeSidebarGlobalKey,
  ThemeSystem,
} from "@oe/themes";
import { toast } from "@oe/ui";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

export default function GlobalThemeSetting() {
  const translate = useTranslations("themeNoti");
  const { settingKey, themeName } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { theme, mutateTheme } = useGetTheme();
  const { createOrUpdateThemeConfig } = useCreateOrUpdateThemeConfig();
  const currentTheme = theme?.[0]?.value;
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const themeDefinition = useMemo(
    () => currentTheme?.availableThemes?.[themeName as ThemeName],
    [theme, currentTheme, themeName]
  );

  const updateThemeSystem = useCallback(
    (themeGlobal: ThemeGlobal): ThemeSystem => ({
      activedTheme: themeName as ThemeName,
      availableThemes: {
        ...currentTheme?.availableThemes,
        [themeName as ThemeName]: {
          ...themeDefinition,
          globals: themeGlobal,
        },
      } as ThemeCollection,
    }),
    [currentTheme, themeDefinition, themeName]
  );

  const handleSubmitThemeGlobal = useCallback(
    async (themeGlobal: ThemeGlobal) => {
      setIsSubmitting(true);
      try {
        const updatedSystem = updateThemeSystem(themeGlobal);
        const response = await createOrUpdateThemeConfig({
          config: updatedSystem,
          id: theme?.[0]?.id,
        });

        if (!response) {
          throw new Error("Failed to update theme config");
        }

        toast.success(translate("global.success"));
        mutateTheme();
      } catch (error) {
        toast.error(translate("global.error"));
        console.error("Theme update error:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      theme,
      updateThemeSystem,
      translate,
      mutateTheme,
      createOrUpdateThemeConfig,
    ]
  );

  return (
    <ThemeSettingGlobal
      isLoading={isSubmitting}
      settingKey={settingKey as ThemeSidebarGlobalKey}
      themeGlobalData={themeDefinition?.globals || initialThemeGlobal}
      onSubmit={handleSubmitThemeGlobal}
    />
  );
}
