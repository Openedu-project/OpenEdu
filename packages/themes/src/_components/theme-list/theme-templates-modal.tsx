"use client";

import { Modal } from "@oe/ui/components/modal";
import { toast } from "@oe/ui/shadcn/sonner";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { themeSystemListNames } from "../../_config/initial";
import type { ThemeName } from "../../_types";
import { ThemeCard } from "./theme-card";

interface ThemeTemplatesModalProps {
  alreadyClonedThemes?: ThemeName[];
  onClose: () => void;
  onSubmit: (selected: ThemeName[]) => void;
}

const ThemeTemplatesModal = ({
  alreadyClonedThemes,
  onClose,
  onSubmit,
}: ThemeTemplatesModalProps) => {
  const t = useTranslations("themePage");
  const listDefaultTemplates: ThemeName[] = themeSystemListNames(t);
  const [selectedNames, setSelectedNames] = useState<ThemeName[]>([]);

  const handleSubmit = () => {
    console.log("selectedNames", selectedNames);
    if (selectedNames) {
      // Remove the duplicate item
      const filteredSeletedNames = selectedNames.filter(
        (item, i) => selectedNames?.indexOf(item) === i
      );
      console.log("filteredSeletedNames", filteredSeletedNames);

      onSubmit(filteredSeletedNames);
      return;
    }

    toast.warning("Can not clone the template. Please try again");
  };
  return (
    <Modal
      open={true}
      title="Clone new theme from the templates"
      onClose={onClose}
      onSubmit={handleSubmit}
      showSubmit={!!selectedNames}
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
        {listDefaultTemplates.map((theme) => (
          <ThemeCard
            key={theme}
            name={theme}
            isCloned={
              (alreadyClonedThemes?.find((t) => t === theme)?.length ?? 0) > 0
            }
            onSelect={(name) => setSelectedNames([...selectedNames, name])}
            isActive={false}
            variant="template"
          />
        ))}
      </div>
    </Modal>
  );
};

ThemeTemplatesModal.displayName = "ThemeTemplatesModal";
export { ThemeTemplatesModal };
