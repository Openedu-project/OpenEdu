"use client";
import { useGetTheme } from "@oe/api/hooks/useTheme";
import { createOrUpdateThemeConfig } from "@oe/api/services/theme";
import { defaultThemeSystemConfig } from "@oe/themes";
import { ThemeSettingPages } from "@oe/themes/_components/theme-settings/index";
import type {
  ThemeCollection,
  ThemeDefinition,
  ThemeName,
  ThemePageKey,
  ThemeSidebarPageKey,
  ThemeSystem,
} from "@oe/themes/types/index";
import { toast } from "@oe/ui/shadcn/sonner";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useState } from "react";

interface OutlineThemeSettingPagesProps {
  selectedSidebarPageKey: ThemeSidebarPageKey;
}

const OutlineThemeSettingPages = ({
  selectedSidebarPageKey,
}: OutlineThemeSettingPagesProps) => {
  const { themeName, themePageKey } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { theme, mutateTheme } = useGetTheme();
  const t = useTranslations("themePageSettings");
  const tThemeConfig = useTranslations("themePage");

  const themeConfig =
    theme?.[0]?.value?.availableThemes?.[themeName as ThemeName] ||
    defaultThemeSystemConfig(tThemeConfig)?.availableThemes?.[
      themeName as ThemeName
    ];

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

  const handleSubmit = async (specificTheme: ThemeDefinition) => {
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
      setIsLoading(true);
      const res = await createOrUpdateThemeConfig({
        config: currentThemeSystem,
        id: theme?.[0]?.id,
      });
      if (res) {
        setIsLoading(false);
        mutateTheme();
        toast.success(t("updateSuccess"));
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      toast.error(t("updateFaile"));
    }
  };

  return (
    <>
      <ThemeSettingPages
        isLoading={isLoading}
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
