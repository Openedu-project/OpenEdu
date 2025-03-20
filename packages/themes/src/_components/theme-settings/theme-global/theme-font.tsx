import { Button } from '@oe/ui/shadcn/button';
import { Card, CardContent, CardHeader, CardTitle } from '@oe/ui/shadcn/card';
import { Label } from '@oe/ui/shadcn/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@oe/ui/shadcn/select';
import { RotateCcw, Save } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { initialThemeGlobalFonts } from '../../../_config/theme-global-initial';
import type { ThemeGlobalFontConfig } from '../../../_types';
import { fonts } from '../../../fonts';
import { camelToKebab, getFontDisplayName, setFontVariable } from './_utils';

interface ThemeFontsProps {
  fontData: ThemeGlobalFontConfig;
  isLoading: boolean;
  onSubmitFonts: (fonts: ThemeGlobalFontConfig) => void;
}
const ThemeFonts = ({ fontData, isLoading, onSubmitFonts }: ThemeFontsProps) => {
  const t = useTranslations('themeUI.font');

  const [fontConfig, setFontConfig] = useState<ThemeGlobalFontConfig>(fontData || initialThemeGlobalFonts);

  const updateFontVariable = (key: keyof ThemeGlobalFontConfig, value: string) => {
    setFontVariable(key, value);
    setFontConfig(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleReset = () => {
    setFontConfig(initialThemeGlobalFonts);
    for (const [key, value] of Object.entries(initialThemeGlobalFonts)) {
      setFontVariable(key as keyof ThemeGlobalFontConfig, value);
    }
    onSubmitFonts(initialThemeGlobalFonts);
  };

  const handleSave = () => {
    onSubmitFonts(fontConfig);
  };

  return (
    <Card className="w-full rounded-none border-none shadow-none">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{t('title')}</CardTitle>
          <p className="mt-1 text-muted-foreground text-sm">{t('description')}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={handleReset} title={t('actions.resetTooltip')}>
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            <Save className="mr-2 h-4 w-4" />
            {t('actions.save')}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        {Object.entries(fontConfig).map(([key, value]) => (
          <div key={key} className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <Label className="capitalize">{t(`labels.${key}`)}</Label>
                <p className="text-muted-foreground text-sm">{t(`descriptions.${key}`)}</p>
              </div>
              <Select
                value={value}
                onValueChange={newValue => {
                  updateFontVariable(key as keyof ThemeGlobalFontConfig, newValue);
                }}
              >
                <SelectTrigger className="w-[240px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(fonts).map(([fontKey, _font]) => (
                    <SelectItem
                      key={fontKey}
                      value={`var(--font-${camelToKebab(fontKey)})`}
                      style={{
                        fontFamily: `var(--font-${camelToKebab(fontKey)})`,
                      }}
                    >
                      {getFontDisplayName(fontKey)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4 rounded-lg border p-4">
              <div style={{ fontFamily: value }}>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold text-2xl">{t('preview.pangram')}</h3>
                  <span className="text-muted-foreground text-sm">
                    {getFontDisplayName(value.replace('var(--font-', '').replace(')', ''))}
                  </span>
                </div>
                <p className="mb-2 leading-relaxed">{t('preview.paragraph')}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs">{t('preview.numbersLabel')}</Label>
                    <p className="font-mono">{t('preview.numbers')}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-muted-foreground text-xs">{t('preview.symbolsLabel')}</Label>
                    {/* biome-ignore lint/nursery/useConsistentCurlyBraces: <explanation> */}
                    <p>{'!@#$%^&*()_+-=[]{}|;:,.<>?'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ThemeFonts;
