import { getThemeConfigServer } from "@oe/api/services/theme";
import { ADMIN_ROUTES } from "@oe/core/utils/routes";
import { Link } from "@oe/ui/common/navigation";
import { Button } from "@oe/ui/shadcn/button";
import { CircleArrowLeft } from "lucide-react";
import type { ThemeConfigKey } from "../../_types";
import { MenuToggleGroup } from "./menu-toggle-group";
import { ToggleDefaultTheme } from "./toggle-default-theme";

export default async function ThemeHeaderContent({
  configKey,
}: {
  configKey?: ThemeConfigKey;
}) {
  const [themeSystem] = await Promise.all([getThemeConfigServer()]);
  const themeName = themeSystem?.[0]?.value?.activedTheme ?? "vbi";

  if (!themeSystem?.[0]?.value) {
    return null;
  }

  return (
    <>
      <Button
        title="Back to Dashboard"
        size="sm"
        variant="ghost"
        className="hover:bg-transparent"
      >
        <Link href={ADMIN_ROUTES.themesSettings} className="border-none hover:bg-muted">
          <CircleArrowLeft
            focusable="false"
            size={20}
            className="text-muted hover:text-muted-foreground"
          />
        </Link>
      </Button>
      <MenuToggleGroup selectedThemeConfigKey={configKey} />
      <ToggleDefaultTheme
        selectedTheme={themeName}
        themeSystem={themeSystem?.[0]?.value}
        id={themeSystem?.[0]?.id}
      />
    </>
  );
}
