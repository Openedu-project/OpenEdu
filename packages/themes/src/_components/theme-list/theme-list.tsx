"use client";
import { createOrUpdateThemeConfig } from "@oe/api/services/theme";
import type { ThemeName } from "@oe/themes/types/theme-page/index";
import { toast } from "@oe/ui/shadcn/sonner";
import { useTranslations } from "next-intl";
// import { createOrUpdateThemeConfigByReferrer } from "@oe/api/services/theme";
import { defaultThemeSystemConfig } from "../../../src";
import type { ThemeCollection, ThemeSystem } from "../../_types";
import { CloneNewTheme } from "./clone-new-theme";
import { ThemeCard } from "./theme-card";

interface ThemeListProps {
  // The currently active/selected theme in use
  currentActiveTheme?: ThemeName;
  // List of all themes that user has created/customized
  userThemeList?: ThemeName[];
  // Callback when user selects a different theme
  //  onThemeActivate?: (themeName: ThemeName) => void;
  // The id systemConfig
  configId?: string;
  currentAvailableThemes?: ThemeCollection;
}

export default function ThemeList({
  currentActiveTheme,
  userThemeList,
  configId,
  currentAvailableThemes,
}: // onSelect,
ThemeListProps) {
  // const t = useTranslations("themeList");
  const tThemeConfig = useTranslations("themePage");

  const handleNewThemeCloned = async (themeNames: ThemeName[]) => {
    //TODO: mutate the list my themes - themesData
    //OR: add theme new ThemeName to themesData by state
    const initialData = defaultThemeSystemConfig(tThemeConfig);
    let clonedThemes = {};

    for (const name of themeNames) {
      if (initialData.availableThemes?.[name]) {
        clonedThemes = {
          ...clonedThemes,
          [name]: initialData.availableThemes[name],
        };
      }
    }
    console.log("themeNames", themeNames);
    console.log("clonedThemes", clonedThemes);

    if (Object.keys(clonedThemes)?.length > 0) {
      const data: ThemeSystem = {
        activedTheme: currentActiveTheme as ThemeName | undefined,
        availableThemes: { ...clonedThemes, ...currentAvailableThemes },
      };

      console.log(data);
      try {
        const res = await createOrUpdateThemeConfig({
          config: data,
          id: configId,
        });
        if (!res) {
          toast.error("Failed to clone the templates from the system.");
          return;
        }
        console.log(res);
        toast.success("Clone the templates succesfully");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="p-6">
      <div>
        <h2>The list template</h2>
        <CloneNewTheme
          alreadyClonedThemes={userThemeList}
          onThemeCloned={handleNewThemeCloned}
        />
      </div>
      {/* <h2 className="mb-6 font-semibold text-2xl">{t("selectTheme")}</h2> */}
      <h2>My customize</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {userThemeList?.map((theme) => (
          <ThemeCard
            key={theme}
            name={theme}
            isActive={currentActiveTheme === theme}
            onSelect={undefined}
            variant="my-theme"
          />
        ))}
      </div>
    </div>
  );
}
