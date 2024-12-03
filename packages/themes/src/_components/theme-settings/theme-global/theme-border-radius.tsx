import { Button } from "@oe/ui/shadcn/button";
import { Card, CardContent, CardHeader, CardTitle } from "@oe/ui/shadcn/card";
import { Input } from "@oe/ui/shadcn/input";
import { Label } from "@oe/ui/shadcn/label";
import { RotateCcw, Save } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { initialThemeGlobalRadius } from "../../../_config/theme-global-initial";
import type {
  ThemeGlobalRadiusConfig,
  ThemeGlobalRadiusKey,
} from "../../../_types";
import { setRadiusVariable } from "./_utils";
import { RadiusPreview, SIZE_MAP } from "./radius-preview";
interface ThemeBorderRadiusProps {
  isLoading: boolean;
  radiusData?: ThemeGlobalRadiusConfig;
  onSubmitRadius: (value: ThemeGlobalRadiusConfig) => void;
}

const ThemeBorderRadius = ({
  radiusData,
  isLoading,
  onSubmitRadius,
}: ThemeBorderRadiusProps) => {
  const t = useTranslations("themeUI.radius");
  const [radiusConfig, setRadiusConfig] = useState<ThemeGlobalRadiusConfig>(
    radiusData || initialThemeGlobalRadius
  );

  const updateRadiusVariable = (key: ThemeGlobalRadiusKey, value: number) => {
    setRadiusConfig((prev) => {
      const newConfig = { ...prev, [key]: value };

      if (key === "default") {
        setRadiusVariable(value);
      }

      return newConfig;
    });
  };

  const handleReset = () => {
    setRadiusConfig(initialThemeGlobalRadius);
    setRadiusVariable(initialThemeGlobalRadius.default);
    onSubmitRadius(initialThemeGlobalRadius);
  };

  const handleSave = () => {
    onSubmitRadius(radiusConfig);
  };

  const renderPreviewSection = useMemo(
    () => (
      <div className="flex justify-center gap-8 rounded-lg border py-4">
        {(Object.keys(SIZE_MAP) as ThemeGlobalRadiusKey[]).map((size) => (
          <RadiusPreview
            key={size}
            size={size}
            radius={radiusConfig[size]}
            baseRadius={radiusConfig.default}
          />
        ))}
      </div>
    ),
    [radiusConfig]
  );

  return (
    <Card className="w-full rounded-none border-none shadow-none">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{t("title")}</CardTitle>
          <p className="mt-1 text-muted-foreground text-sm">
            {t("description")}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleReset}
            title={t("actions.resetTooltip")}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            <Save className="mr-2 h-4 w-4" />
            {t("actions.save")}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {(Object.keys(initialThemeGlobalRadius) as ThemeGlobalRadiusKey[]).map(
          (key) => (
            <div key={key} className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <Label className="capitalize">{t(`labels.${key}`)}</Label>
                  <p className="text-muted-foreground text-sm">
                    {t(`descriptions.${key}`)}
                  </p>
                </div>
                <div className="flex w-[240px] items-center justify-center gap-4">
                  {key !== "default" && (
                    <span className="whitespace-nowrap text-center text-muted-foreground text-xs">
                      {t("units.defaultPlus")}
                    </span>
                  )}
                  <Input
                    type="number"
                    value={radiusConfig[key]}
                    onChange={(e) =>
                      updateRadiusVariable(key, Number(e.target.value))
                    }
                    className="font-mono"
                    step={key === "default" ? 0.125 : 1}
                    min={key === "default" ? 0 : undefined}
                  />
                  <span className="text-center text-muted-foreground text-xs">
                    {t(`units.${key === "default" ? "rem" : "px"}`)}
                  </span>
                </div>
              </div>
              {key === "default" && renderPreviewSection}
            </div>
          )
        )}
      </CardContent>
    </Card>
  );
};

export default ThemeBorderRadius;
