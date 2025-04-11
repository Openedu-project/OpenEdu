"use client";
import { useCreateOrUpdateThemeConfig, useGetTheme } from "@oe/api";
import { defaultThemeSystemConfig } from "@oe/themes";
import { ThemeSettingPages } from "@oe/themes";
import type {
  ThemeCollection,
  ThemeDefinition,
  ThemeName,
  ThemePageKey,
  ThemeSidebarPageKey,
  ThemeSystem,
} from "@oe/themes";
import { toast } from "@oe/ui";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useCallback } from "react";

interface OutlineThemeSettingPagesProps {
  selectedSidebarPageKey: ThemeSidebarPageKey;
}

const OutlineThemeSettingPages = ({
  selectedSidebarPageKey,
}: OutlineThemeSettingPagesProps) => {
  const { themeName, themePageKey } = useParams();
  const { theme, mutateTheme } = useGetTheme();
  const t = useTranslations("themePageSettings");
  const tThemeConfig = useTranslations("themePage");
  const { createOrUpdateThemeConfig, isLoadingCreateOrUpdateThemeConfig } =
    useCreateOrUpdateThemeConfig();
  const themeConfig =
    theme?.[0]?.value?.availableThemes?.[themeName as ThemeName] ||
    defaultThemeSystemConfig(tThemeConfig)?.availableThemes?.[
      themeName as ThemeName
    ];

  const handleSubmit = useCallback(
    async (specificTheme: ThemeDefinition) => {
      const currentThemeSystem: ThemeSystem = {
        activedTheme: themeName as ThemeName,
        availableThemes: {
          ...theme[0]?.value?.availableThemes,
          [themeName as ThemeName]: {
            ...theme[0]?.value?.availableThemes?.[themeName as ThemeName],
            ...specificTheme,
          },
        } as ThemeCollection,
      };

      try {
        const res = await createOrUpdateThemeConfig({
          config: currentThemeSystem,
          id: theme?.[0]?.id,
        });
        if (res) {
          await mutateTheme();
          toast.success(t("updateSuccess"));
        }
      } catch (error) {
        console.error(error);
        toast.error(t("updateFail"));
      }
    },
    [mutateTheme, t, themeName, theme, createOrUpdateThemeConfig]
  );

  if (!themeConfig) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        No data
      </div>
    );
  }

  if (!(themeName && themePageKey)) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        No data
      </div>
    );
  }

  return (
    <>
      <ThemeSettingPages
        isLoading={isLoadingCreateOrUpdateThemeConfig}
        themeConfig={themeConfig}
        themeName={themeName as ThemeName}
        selectedPage={themePageKey as ThemePageKey}
        selectedSidebarPageKey={selectedSidebarPageKey}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export { OutlineThemeSettingPages };
