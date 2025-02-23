"use client";

import { Modal } from "@oe/ui/components/modal";
import { toast } from "@oe/ui/shadcn/sonner";
import { useState } from "react";
import type { ThemeName } from "../../_types";
import { ThemeCard } from "./theme-card";

interface ThemeTemplatesModalProps {
  added?: ThemeName[];
  onClose: () => void;
  onSubmit: (selected: ThemeName) => void;
}

const ThemeTemplatesModal = ({
  added,
  onClose,
  onSubmit,
}: ThemeTemplatesModalProps) => {
  //TODO: call API get list the default theme templates from key theme_system
  const listDefaultTemplates: ThemeName[] = ["academia", "vbi", "avail"];
  const [selectedName, setSelectName] = useState<ThemeName | undefined>();

  const handleSubmit = () => {
    if (selectedName) {
      onSubmit(selectedName);
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
      showSubmit={!!selectedName}
    >
      <div className="grid max-w-[100px] gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {listDefaultTemplates.map((theme) => (
          <ThemeCard
            key={theme}
            name={theme}
            added={(added?.find((t) => t === theme)?.length ?? 0) > 0}
            onSelect={(name) => setSelectName(name)}
            isSelected={false}
            variant="template"
          />
        ))}
      </div>
    </Modal>
  );
};

ThemeTemplatesModal.displayName = "ThemeTemplatesModal";
export { ThemeTemplatesModal };
