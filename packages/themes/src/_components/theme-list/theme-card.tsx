import { createAPIUrl } from "@oe/api/utils/fetch";
import { ADMIN_ROUTES } from "@oe/core/utils/routes";
import type { ThemeName } from "@oe/themes/types/theme-page/index";
import { Link } from "@oe/ui/common/navigation";
import { Badge } from "@oe/ui/shadcn/badge";
import { Button } from "@oe/ui/shadcn/button";
import { Card, CardContent } from "@oe/ui/shadcn/card";
import { cn } from "@oe/ui/utils/cn";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface ThemeCardProps {
  name: ThemeName;
  // Whether this theme is currently active
  isActive: boolean;
  // For template cards: whether this theme has already been cloned
  isCloned?: boolean;
  // Callback when theme is selected/activated
  onSelect?: (theme: ThemeName) => void;
  // Whether this card is for a template or user's theme
  variant: "template" | "my-theme";
}

export const ThemeCard = ({
  name,
  isActive,
  onSelect,
  isCloned,
  variant = "my-theme",
}: ThemeCardProps) => {
  const t = useTranslations("themeList");
  const [currentSelected, setCurrentSelected] = useState(isActive ?? false);
  const displayName = name.replace(/([A-Z])/g, " $1").trim(); // Add spaces before capital letters

  return (
    <Card
      className={cn(
        "group relative cursor-pointer overflow-hidden transition-all",
        "hover:ring-2 hover:ring-primary",
        isActive && "ring-2 ring-primary",
        "h-[400px] w-[300px]",
        isCloned && "cursor-not-allowed"
      )}
      onClick={() => {
        if (!isCloned && variant === "template") {
          onSelect?.(name);
          setCurrentSelected(!currentSelected);
        }
      }}
    >
      <CardContent className="p-0">
        {/* Preview Image */}
        {/* <div className="relative h-[250px] w-full bg-muted"></div> */}

        {/* Theme Info */}
        <div className="p-4">
          <h3 className="font-semibold text-lg">{displayName}</h3>
        </div>

        {/* Overlay for selected state */}
        <div className="absolute inset-0 flex items-center justify-center hover:bg-primary/10">
          {currentSelected && (
            <Badge className="absolute top-4 right-4">{t("selected")}</Badge>
          )}
          <Button
            variant="outline"
            className="hover:bg-primary"
            disabled={variant === "template" && isCloned}
          >
            {variant === "my-theme" ? (
              <Link
                href={createAPIUrl({
                  endpoint: ADMIN_ROUTES.themeConfig,
                  params: {
                    themeName: name,
                    themeConfig: "pages",
                    groupSettingKey: undefined,
                    itemSettingKey: undefined,
                  },
                  checkEmptyParams: true,
                })}
                className="hover:text-white hover:no-underline"
              >
                {t("edit")}
              </Link>
            ) : (
              "Cloned"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
