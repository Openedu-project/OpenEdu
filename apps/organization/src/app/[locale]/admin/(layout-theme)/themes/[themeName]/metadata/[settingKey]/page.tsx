"use client";
import { useCreateOrUpdateThemeConfig, useGetTheme } from "@oe/api";
import { ThemeConfigMetadata } from "@oe/themes";
import type {
  ThemeCollection,
  ThemeMetadata,
  ThemeName,
  ThemeSystem,
} from "@oe/themes";
import { toast } from "@oe/ui";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { ComingSoon } from "../../_components/coming-soon";

export default function MetadataPage() {
  const translate = useTranslations("themeNoti");
  const { settingKey, themeName } = useParams();
  const { theme } = useGetTheme();
  const { createOrUpdateThemeConfig, isLoadingCreateOrUpdateThemeConfig } =
    useCreateOrUpdateThemeConfig();

  const currentTheme = theme?.[0]?.value;
  const themeDefinition =
    currentTheme?.availableThemes?.[themeName as ThemeName];
  const updateThemeSystem = (themeMetadata: ThemeMetadata): ThemeSystem => ({
    activedTheme: themeName as ThemeName,
    availableThemes: {
      ...currentTheme?.availableThemes,
      [themeName as ThemeName]: {
        ...themeDefinition,
        metadata: themeMetadata,
      },
    } as ThemeCollection,
  });

  const handleSubmitMetadata = async (data: ThemeMetadata) => {
    if (!themeDefinition) {
      return;
    }

    try {
      const updatedSystem = updateThemeSystem(data);
      const response = await createOrUpdateThemeConfig({
        config: updatedSystem,
        id: theme?.[0]?.id,
      });

      if (!response) {
        throw new Error("Failed to update theme metadata");
      }

      toast.success(translate("metadata.success"));
    } catch (error) {
      toast.error(translate("metadata.error"));
      console.error("Theme update error:", error);
    }
  };

  if (settingKey === "metadata") {
    return (
      <ThemeConfigMetadata
        isSubmitting={isLoadingCreateOrUpdateThemeConfig}
        data={themeDefinition?.metadata}
        onSubmit={handleSubmitMetadata}
        isRoot
      />
    );
  }

  return <ComingSoon />;
}
