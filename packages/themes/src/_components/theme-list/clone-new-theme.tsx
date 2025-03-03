"use client";
import { Button } from "@oe/ui/shadcn/button";
import { useCallback, useState } from "react";
import type { ThemeName } from "../../_types";
import { ThemeTemplatesModal } from "./theme-templates-modal";

interface CloneNewThemeModalModal {
  alreadyClonedThemes?: ThemeName[];
  onThemeCloned: (themeNames: ThemeName[]) => void;
}
const CloneNewTheme = ({
  alreadyClonedThemes,
  onThemeCloned,
}: CloneNewThemeModalModal) => {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  console.log("alreadyClonedThemes", alreadyClonedThemes)
  const handleSubmit = useCallback(
    (themeNames: ThemeName[]) => {
      onThemeCloned(themeNames);
      handleClose();
      console.log("themeNames", themeNames);
    },
    [handleClose]
  );
  return (
    <>
      <Button onClick={() => setOpen(true)}>Add new theme</Button>
      {open && (
        <ThemeTemplatesModal
          alreadyClonedThemes={alreadyClonedThemes}
          onClose={() => setOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

CloneNewTheme.displayName = "CloneNewTheme";
export { CloneNewTheme };
