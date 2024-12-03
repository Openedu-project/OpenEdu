import { createAPIUrl } from "@oe/api/utils/fetch";
import { ADMIN_ROUTES } from "@oe/core/utils/routes";
import type { ThemeName } from "@oe/themes/types/theme-page";
import { Link } from "@oe/ui/common/navigation";
import { Badge } from "@oe/ui/shadcn/badge";
import { Button } from "@oe/ui/shadcn/button";
import { Card, CardContent } from "@oe/ui/shadcn/card";
import { cn } from "@oe/ui/utils/cn";
import { useTranslations } from "next-intl";

interface ThemeCardProps {
  name: ThemeName;
  isSelected: boolean;
  onSelect?: (theme: ThemeName) => void;
}

export const ThemeCard = ({ name, isSelected, onSelect }: ThemeCardProps) => {
  const t = useTranslations("themeList");

  const displayName = name.replace(/([A-Z])/g, " $1").trim(); // Add spaces before capital letters

  return (
    <Card
      className={cn(
        "group relative cursor-pointer overflow-hidden transition-all",
        "hover:ring-2 hover:ring-primary",
        isSelected && "ring-2 ring-primary",
        "h-[400px] w-[300px]"
      )}
      onClick={() => onSelect?.(name)}
    >
      <CardContent className="p-0">
        {/* Preview Image */}
        {/* <div className="relative h-[250px] w-full bg-muted"></div> */}

        {/* Theme Info */}
        <div className="p-4">
          <h3 className="font-semibold text-lg">{displayName}</h3>
        </div>

        {/* Overlay for selected state */}
        {isSelected && (
          <div className="absolute inset-0 flex items-center justify-center hover:bg-primary/10">
            <Badge className="absolute top-4 right-4">{t("selected")}</Badge>
            <Button variant="outline" className="hover:bg-primary">
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
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
