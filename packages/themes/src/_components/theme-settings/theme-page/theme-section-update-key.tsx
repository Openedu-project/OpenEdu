"use client";
import { AutocompeteMultiple } from "@oe/ui/components/autocomplete";
import type { AllSectionKeys } from "../../../_types";

import { useEffect, useState } from "react";

interface ThemeAddSectionConfigProps {
  defaultConfigSectionKeys: AllSectionKeys[];
  configSectionKeys: AllSectionKeys[];
  onUpdateSectionKeys: (keys: AllSectionKeys[]) => void;
}

const ThemeSectionUpdateKeys = ({
  defaultConfigSectionKeys,
  configSectionKeys,
  onUpdateSectionKeys,
}: ThemeAddSectionConfigProps) => {
  const [currentKeys, setCurrentKeys] = useState<AllSectionKeys[]>([]);

  useEffect(() => {
    if (currentKeys.length === 0 && configSectionKeys.length > 0) {
      setCurrentKeys(configSectionKeys);
    }
  }, [currentKeys, configSectionKeys]);

  return (
    <AutocompeteMultiple
      options={defaultConfigSectionKeys}
      value={currentKeys}
      displayItems={2}
      onChange={(selected) => {
        setCurrentKeys(selected);
        onUpdateSectionKeys(selected);
      }}
    />
  );
};

export { ThemeSectionUpdateKeys };
