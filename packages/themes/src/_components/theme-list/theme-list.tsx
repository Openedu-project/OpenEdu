import type { ThemeName } from "@oe/themes/types/theme-page/index";
import { useTranslations } from "next-intl";
import { CloneNewTheme } from "./clone-new-theme";
import { ThemeCard } from "./theme-card";

interface ThemeListProps {
  themesData: ThemeName[];
  selectedTheme: ThemeName;
  onSelect?: (name: ThemeName) => void;
}

export default function ThemeList({
  themesData,
  selectedTheme,
  onSelect,
}: ThemeListProps) {
  const t = useTranslations("themeList");

  const handleAdded = () => {
    //TODO: mutate the list my themes - themesData
    //OR: add theme new ThemeName to themesData by state
  };

  return (
    <div className="p-6">
      <div>
        <h2>The list template</h2>
        <CloneNewTheme addedTheme={[selectedTheme]} onCloned={handleAdded} />
      </div>
      <h2 className="mb-6 font-semibold text-2xl">{t("selectTheme")}</h2>
      <h2>My customize</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {themesData.map((theme) => (
          <ThemeCard
            key={theme}
            name={theme}
            isSelected={selectedTheme === theme}
            onSelect={onSelect}
            variant="my-theme"
          />
        ))}
      </div>
    </div>
  );
}
