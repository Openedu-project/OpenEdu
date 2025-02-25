"use client";
import type { ThemeName } from "@oe/themes/types/theme-page/index";
import { useTranslations } from "next-intl";
// import { createOrUpdateThemeConfigByReferrer } from "@oe/api/services/theme";
import { defaultThemeSystemConfig } from "../../../src";
import { CloneNewTheme } from "./clone-new-theme";
import { ThemeCard } from "./theme-card";

interface ThemeListProps {
  // The currently active/selected theme in use
  currentActiveTheme?: ThemeName;
  // List of all themes that user has created/customized
  userThemeList: ThemeName[];
  // Callback when user selects a different theme
  //  onThemeActivate?: (themeName: ThemeName) => void;
}

export default function ThemeList({
  currentActiveTheme,
  userThemeList,
}: // onSelect,
ThemeListProps) {
  const t = useTranslations("themeList");
  const tThemeConfig = useTranslations("themePage");

  const handleNewThemeCloned = (themeNames: ThemeName[]) => {
    //TODO: mutate the list my themes - themesData
    //OR: add theme new ThemeName to themesData by state
    const initialData = defaultThemeSystemConfig(tThemeConfig);
    let availableTheme = {};

    for (const name of themeNames) {
      availableTheme = {
        ...availableTheme,
        [name]: initialData.availableThemes?.[name],
      };
    }

    const data = {
      activedTheme: currentActiveTheme,
      availableTheme: availableTheme,
    };

    console.log(data);
    // try {
    //   const res = await createOrUpdateThemeConfigByReferrer({ config: initialData });
    //   if (!res) {
    //     toast.error("Failed to clone the templates from the system.");
    //     return;
    //   }
    //   toast.success("Clone the templates succesfully");
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <div className="p-6">
      <div>
        <h2>The list template</h2>
        <CloneNewTheme
          alreadyClonedThemes={
            currentActiveTheme ? [currentActiveTheme] : undefined
          }
          onThemeCloned={handleNewThemeCloned}
        />
      </div>
      <h2 className="mb-6 font-semibold text-2xl">{t("selectTheme")}</h2>
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
