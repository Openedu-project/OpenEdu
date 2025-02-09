"use client";
import { useGetTheme } from "@oe/api/hooks/useTheme";
import { createOrUpdateThemeConfig } from "@oe/api/services/theme";
import { ThemeConfigMetadata } from "@oe/themes/_components/theme-settings/index";
import type {
  ThemeCollection,
  ThemeMetadata,
  ThemeName,
  ThemeSystem,
} from "@oe/themes/types/index";
import { toast } from "@oe/ui/shadcn/sonner";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useState } from "react";
import ComingSoon from "../../_components/coming-soon";

export default function MetadataPage() {
  const translate = useTranslations("themeNoti");
  const { settingKey, themeName } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { theme } = useGetTheme();

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

    setIsSubmitting(true);
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
    } finally {
      setIsSubmitting(false);
    }
  };

  if (settingKey === "metadata") {
    return (
      <ThemeConfigMetadata
        isSubmitting={isSubmitting}
        data={themeDefinition?.metadata}
        onSubmit={handleSubmitMetadata}
        isRoot
      />
    );
  }

  return <ComingSoon />;
}
