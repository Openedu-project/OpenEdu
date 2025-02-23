"use client";
import { Button } from "@oe/ui/shadcn/button";
import { useCallback, useState } from "react";
import type { ThemeName } from "../../_types";
import { ThemeTemplatesModal } from "./theme-templates-modal";

interface CloneNewThemeModalModal {
  addedTheme?: ThemeName[];
  onCloned: (themeNames: ThemeName) => void;
}
const CloneNewTheme = ({ addedTheme, onCloned }: CloneNewThemeModalModal) => {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleSubmit = useCallback(
    (themeNames: ThemeName) => {
      onCloned(themeNames);
      handleClose();
    },
    [handleClose]
  );
  return (
    <>
      <Button onClick={() => setOpen(true)}>Add new theme</Button>
      {open && (
        <ThemeTemplatesModal
          added={addedTheme}
          onClose={() => setOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

CloneNewTheme.displayName = "CloneNewTheme";
export { CloneNewTheme };
